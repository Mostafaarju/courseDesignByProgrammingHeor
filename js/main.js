const milestonesData = JSON.parse(data).data;

function loadMilestone() {
  const milestones = document.querySelector('.milestones');

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
      <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick='markMilestone(this,${
          milestone._id
        })' /></div>
        <div onclick="openMilestone(this,${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
          .map(module => {
            return `<div class="module border-b">
          <p>${module.name}</p>
        </div>`;
          })
          .join('')}
      </div>
    </div>`;
    })
    .join('')}`;
}

function openMilestone(milestoneElement, id) {
  const currentElement = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector('.show');
  const active = document.querySelector('.active');
  const milestoneImage = document.querySelector('.milestoneImage');
  const title = document.querySelector('.title');
  const details = document.querySelector('.details');

  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;

  milestoneImage.style.opacity = '0';

  if (!milestoneElement.classList.contains('active') && active) {
    active.classList.remove('active');
  }

  milestoneElement.classList.toggle('active');

  if (!currentElement.classList.contains('show') && shownPanel) {
    shownPanel.classList.remove('show');
  }
  currentElement.classList.toggle('show');
}

const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function () {
  this.style.opacity = '1';
};

function markMilestone(checkbox, id) {
  const doneList = document.querySelector('.doneList');
  const milestoneList = document.querySelector('.milestones');
  const idItem = document.getElementById(id);

  if (checkbox.checked) {
    doneList.appendChild(idItem);
    milestoneList.removeChild(idItem);
  } else {
    milestoneList.appendChild(idItem);
    [...milestoneList.children]
      .sort((a, b) => a.id - b.id)
      .forEach(item => {
        milestoneList.appendChild(item);
      });
    doneList.removeChild(idItem);
  }
}

loadMilestone();
