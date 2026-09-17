(() => {
  'use strict';

  const storageKey = 'mgt3745.skillEvidence.v1';

  // Paths and skills are hard-coded for HW3. FEATURES.md requires this list to be
  // editable, which a stored or fetched list would satisfy; see ADR-001.
  const careerPaths = [
    {
      id: 'audit',
      name: 'Audit',
      skills: ['Reviewing documents for missing detail', 'Applying compliance rules', 'Explaining findings to a client']
    },
    {
      id: 'forensic',
      name: 'Forensic accounting',
      skills: ['Investigating inconsistencies', 'Building a written case', 'Reading financial statements critically']
    },
    {
      id: 'government',
      name: 'Government or IRS',
      skills: ['Interpreting tax regulation', 'Handling confidential records', 'Documenting a decision trail']
    }
  ];

  const pathSelect = document.querySelector('#path-select');
  const skillSelect = document.querySelector('#skill-select');
  const skillList = document.querySelector('#skill-list');
  const evidenceForm = document.querySelector('#evidence-form');
  const evidenceInput = document.querySelector('#evidence-input');
  const evidenceError = document.querySelector('#evidence-error');
  const saveStatus = document.querySelector('#save-status');

  // Lets the save-failure acceptance statement be tested without corrupting real storage.
  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');

  let savedEvidence = loadEvidence();
  let selectedPathId = careerPaths[0].id;

  function loadEvidence() {
    try {
      const storedText = window.localStorage.getItem(storageKey);
      const parsed = storedText === null ? {} : JSON.parse(storedText);
      const isPlainObject = typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed);
      if (!isPlainObject || Object.values(parsed).some(entry => typeof entry !== 'string')) {
        throw new Error('Unexpected stored data');
      }
      return parsed;
    } catch {
      saveStatus.textContent = 'Saved evidence could not be read. Your stored data was left unchanged; the next successful save will replace it.';
      return {};
    }
  }

  function saveEvidence(proposedEvidence) {
    try {
      if (simulateFailedSave) throw new Error('Simulated write failure');
      // Persist before changing visible state, so a failure never shows a save that did not happen.
      window.localStorage.setItem(storageKey, JSON.stringify(proposedEvidence));
      return true;
    } catch {
      evidenceError.textContent = 'Could not save. Your text is still here. Try again when storage is available.';
      saveStatus.textContent = '';
      return false;
    }
  }

  function findPath(pathId) {
    return careerPaths.find(path => path.id === pathId);
  }

  function evidenceKey(pathId, skillName) {
    return `${pathId}::${skillName}`;
  }

  function renderPathOptions() {
    careerPaths.forEach(path => {
      const option = document.createElement('option');
      option.value = path.id;
      option.textContent = path.name;
      pathSelect.append(option);
    });
  }

  function renderSkills() {
    const currentPath = findPath(selectedPathId);

    skillList.replaceChildren();
    skillSelect.replaceChildren();

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a skill';
    skillSelect.append(placeholder);

    currentPath.skills.forEach(skillName => {
      const storedText = savedEvidence[evidenceKey(selectedPathId, skillName)];

      const listItem = document.createElement('li');

      const nameElement = document.createElement('span');
      nameElement.className = 'skill-name';
      nameElement.textContent = skillName;

      const statusElement = document.createElement('span');
      statusElement.className = 'skill-status';
      statusElement.dataset.state = storedText ? 'evidenced' : 'not-evidenced';
      statusElement.textContent = storedText ? 'Evidenced' : 'Not yet evidenced';

      listItem.append(nameElement, statusElement);

      if (storedText) {
        const evidenceElement = document.createElement('p');
        evidenceElement.className = 'skill-evidence';
        evidenceElement.textContent = storedText;
        listItem.append(evidenceElement);
      }

      skillList.append(listItem);

      const option = document.createElement('option');
      option.value = skillName;
      option.textContent = skillName;
      skillSelect.append(option);
    });
  }

  pathSelect.addEventListener('change', () => {
    selectedPathId = pathSelect.value;
    evidenceError.textContent = '';
    saveStatus.textContent = '';
    renderSkills();
  });

  evidenceForm.addEventListener('submit', event => {
    event.preventDefault();

    const chosenSkill = skillSelect.value;
    const candidate = evidenceInput.value.trim();
    const characterCount = Array.from(candidate).length;

    if (chosenSkill === '') {
      evidenceError.textContent = 'Choose a skill before saving.';
      saveStatus.textContent = '';
      skillSelect.focus();
      return;
    }

    if (characterCount < 1 || characterCount > 200) {
      evidenceError.textContent = 'Enter evidence containing 1–200 characters.';
      evidenceInput.setAttribute('aria-invalid', 'true');
      saveStatus.textContent = '';
      evidenceInput.focus();
      return;
    }

    evidenceInput.removeAttribute('aria-invalid');
    evidenceError.textContent = '';

    const proposedEvidence = { ...savedEvidence, [evidenceKey(selectedPathId, chosenSkill)]: candidate };
    if (!saveEvidence(proposedEvidence)) return;

    savedEvidence = proposedEvidence;
    renderSkills();
    evidenceInput.value = '';
    skillSelect.value = '';
    evidenceInput.focus();
    saveStatus.textContent = `Evidence saved. ${chosenSkill} is now evidenced.`;
  });

  renderPathOptions();
  renderSkills();
})();