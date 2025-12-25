const toggle = document.getElementById('toggle');
const dropdown = document.getElementById('dropdown');
toggle.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
})