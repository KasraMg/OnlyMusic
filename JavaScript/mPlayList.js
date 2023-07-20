const headerEdit = document.querySelector('#headerEdit');
const editBtn = document.querySelector('#editBtn');

const showEditButtons = document.querySelector('#showEditButtons');
const cancelBtn = document.querySelector('#cancelBtn');
// const confirmBtn = document.querySelector('#confirmBtn');


editBtn.addEventListener('click', () => {
    headerEdit.classList.remove('flex');
    headerEdit.classList.add('hidden');
    showEditButtons.classList.remove('hidden');
    showEditButtons.classList.add('flex');
})


cancelBtn.addEventListener('click',()=>{
    headerEdit.classList.remove('hidden');
    headerEdit.classList.add('flex');
    showEditButtons.classList.add('hidden');
    showEditButtons.classList.remove('flex');
})