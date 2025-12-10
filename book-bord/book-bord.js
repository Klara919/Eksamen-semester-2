document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const modal = document.getElementById('thankyou-modal');
    
    // --- SEKTIONER ---
    const guestSection = document.getElementById("guest-section");
    const dateSection = document.getElementById("date-section");
    const timeSection = document.getElementById("time-section");
    const tableSection = document.getElementById("table-selection");
    const formSection = document.getElementById("form-section");


    // STARTSKJUL ALLE SEKTIONER UNDTAGEN GUEST
    dateSection.style.display = "none";
    timeSection.style.display = "none";
    tableSection.style.display = "none";
    formSection.style.display = "none";

    // --- FORM SUBMISSION ---
    form.addEventListener('submit', e => {
        e.preventDefault();
        modal.classList.add('show');
        form.reset();
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected"));
        document.querySelectorAll(".calendar-days button").forEach(b => b.classList.remove("selected"));
        document.querySelectorAll(".table").forEach(t => t.classList.remove("selected"));
    });

    // --- GUEST SELECTION ---
    const guestBtns = document.querySelectorAll(".guest-btn");
    const guestSpan = document.getElementById("guest-count");
    const antalInput = document.getElementById("antal-input");

    guestBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            guestBtns.forEach(b => b.setAttribute("aria-pressed","false"));
            btn.setAttribute("aria-pressed","true");
            const guests = btn.dataset.guests;
            guestSpan.textContent = guests;
            antalInput.value = guests;
            
            // VIS DATE SECTION & SCROLL
            dateSection.style.display = "block";
            dateSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // --- CALENDAR SECTION ---
    const calendarDays = document.querySelector(".calendar-days");
    const daySpan = document.querySelector(".selected-date .day");
    const monthYearSpan = document.querySelector(".selected-date .month-year");
    const prevMonthBtn = document.querySelector(".prev-month");
    const nextMonthBtn = document.querySelector(".next-month");
    const eventDateSpan = document.getElementById("event-date");
    const selectedDatetime = document.getElementById("selected-datetime");

    let currentDate = new Date();

    function renderCalendar(date) {
        calendarDays.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        daySpan.textContent = String(date.getDate()).padStart(2,"0");
        monthYearSpan.textContent = date.toLocaleString("da-DK", { month: "long", year: "numeric" });

        let startDay = firstDay === 0 ? 6 : firstDay - 1; // Mandag = start
        for(let i=0; i<startDay; i++) calendarDays.appendChild(document.createElement("div"));

        for(let d=1; d<=daysInMonth; d++) {
            const btn = document.createElement("button");
            btn.textContent = d;

            const btnDate = new Date(year, month, d);
            const today = new Date();
            today.setHours(0,0,0,0);
            if(btnDate < today) { btn.disabled = true; btn.style.opacity = 0.5; }

            btn.addEventListener("click", () => {
                document.querySelectorAll(".calendar-days button").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                daySpan.textContent = String(d).padStart(2,"0");
                eventDateSpan.textContent = btnDate.toLocaleDateString("da-DK");
                selectedDatetime.value = btnDate.toISOString().split("T")[0];

                // VIS TIME SECTION & SCROLL
                timeSection.style.display = "block";
                timeSection.scrollIntoView({ behavior: "smooth", block: "start" });

                renderTimeButtons(btnDate);
            });

            calendarDays.appendChild(btn);
        }
    }

    prevMonthBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(currentDate); });
    nextMonthBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(currentDate); });

    renderCalendar(currentDate);

    // --- OPENING HOURS & TIME BUTTONS ---
    const openingHours = {
        monday: { open: "09:00", close: "17:30" },
        tuesday: { open: "09:00", close: "17:30" },
        wednesday: { open: "09:00", close: "17:30" },
        thursday: { open: "09:00", close: "17:30" },
        friday: { open: "09:00", close: "18:00" },
        saturday: { open: "09:30", close: "16:00" },
        sunday: { open: "09:30", close: "16:00" }
    };
    const timeContainer = document.getElementById("time-buttons");

    function convertToMinutes(time) {
        const [h,m] = time.split(":").map(Number);
        return h*60 + m;
    }
    function formatTime(mins) {
        return String(Math.floor(mins/60)).padStart(2,"0") + ":" + String(mins%60).padStart(2,"0");
    }

    function renderTimeButtons(selectedDate) {
        const weekday = selectedDate.toLocaleDateString("en-US",{weekday:"long"}).toLowerCase();
        const hours = openingHours[weekday];
        if(!hours) return;

        timeContainer.innerHTML = "";
        let start = convertToMinutes(hours.open);
        let end = convertToMinutes(hours.close);

        for(let t=start; t+60<=end; t+=60) {
            const btn = document.createElement("button");
            btn.textContent = formatTime(t);
            btn.classList.add("time-btn");
            btn.setAttribute("aria-pressed","false");

            btn.addEventListener("click", () => {
                document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected"));
                document.querySelectorAll(".time-btn").forEach(b => b.setAttribute("aria-pressed","false"));
                btn.classList.add("selected");
                btn.setAttribute("aria-pressed","true");
                eventDateSpan.textContent = selectedDate.toLocaleDateString("da-DK") + " kl. " + btn.textContent;
                selectedDatetime.value = selectedDate.toISOString().split("T")[0] + " " + btn.textContent;

                // VIS KUN BORDVALG & SCROLL
                tableSection.style.display = "block";
                tableSection.scrollIntoView({ behavior: "smooth", block: "start" });
            });

            timeContainer.appendChild(btn);
        }
    }

// --- TABLE SELECTION ---
const tables = document.querySelectorAll(".table");
const output = document.getElementById("chosen-table"); // Valgt bord visning under bordvalg
const chosenTableDisplay = document.getElementById("chosen-table-display"); // Oversigt i formular
const randomBtn = document.getElementById("random-table-btn");

// --- Manuel bordvalg ---
tables.forEach(table => {
    table.addEventListener("click", () => {
        // Fjern tidligere valg
        tables.forEach(t => t.classList.remove("selected"));

        // Marker valgt bord
        table.classList.add("selected");

        // Opdater visning begge steder
        output.textContent = table.dataset.table;
        chosenTableDisplay.textContent = table.dataset.table;

        // Vis formular og scroll
        formSection.style.display = "block";
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// --- Tilfældigt bordvalg ---
randomBtn.addEventListener("click", () => {
    // Fjern tidligere valg
    tables.forEach(t => t.classList.remove("selected"));

    // Vælg tilfældigt bord
    const randomIndex = Math.floor(Math.random() * tables.length);
    const table = tables[randomIndex];
    table.classList.add("selected");

    // Opdater visning begge steder
    output.textContent = table.dataset.table;
    chosenTableDisplay.textContent = table.dataset.table;

    // Vis formular og scroll
    formSection.style.display = "block";
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

});

