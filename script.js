document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const searchInput = document.getElementById('searchInput');

    let talkCounter = 0;
    let time = new Date();
    time.setHours(10, 0, 0, 0);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const generateSchedule = () => {
        scheduleContainer.innerHTML = '';
        talkCounter = 0;
        time.setHours(10, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule-item');

            const startTime = new Date(time);
            const endTime = new Date(time.getTime() + 60 * 60 * 1000);

            if (i === 3) { // Lunch break after the 3rd talk
                scheduleItem.classList.add('break');
                scheduleItem.innerHTML = `<h2>Lunch Break</h2><p>${formatTime(startTime)} - ${formatTime(endTime)}</p>`;
            } else {
                if (talkCounter < talks.length) {
                    const talk = talks[talkCounter];
                    scheduleItem.innerHTML = `
                        <h2>${talk.title}</h2>
                        <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                        <p><strong>Time:</strong> ${formatTime(startTime)} - ${formatTime(endTime)}</p>
                        <p>${talk.description}</p>
                        <p class="category"><strong>Categories:</strong> ${talk.category.join(', ')}</p>
                    `;
                    scheduleItem.dataset.categories = talk.category.join(',').toLowerCase();
                    talkCounter++;
                }
            }
            scheduleContainer.appendChild(scheduleItem);
            time = new Date(endTime.getTime() + 10 * 60 * 1000); // 10-minute break
        }
    };

    const filterTalks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const scheduleItems = document.querySelectorAll('.schedule-item');

        scheduleItems.forEach(item => {
            if (item.classList.contains('break')) {
                item.classList.remove('hidden');
                return;
            }

            const categories = item.dataset.categories;
            if (categories && categories.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    searchInput.addEventListener('input', filterTalks);

    generateSchedule();
});
