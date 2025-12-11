document.addEventListener('DOMContentLoaded', () => { 
    // Når hele DOM'en er indlæst, kører denne funktion

    const form = document.getElementById('signup-form'); 
    // Henter formular-elementet
    const modal = document.getElementById('thankyou-modal'); 
    // Henter modal til "Tak for tilmeldingen"
    
    // --- SEKTIONER ---
    const guestSection = document.getElementById("guest-section"); 
    const dateSection = document.getElementById("date-section"); 
    const timeSection = document.getElementById("time-section"); 
    const tableSection = document.getElementById("table-selection"); 
    const formSection = document.getElementById("form-section"); 
    // Henter alle de nødvendige sektioner på siden

    // STARTSKJUL ALLE SEKTIONER UNDTAGEN GUEST
    dateSection.style.display = "none"; 
    timeSection.style.display = "none"; 
    tableSection.style.display = "none"; 
    formSection.style.display = "none"; 
    // Gør alle andre sektioner skjulte til fra start

    // --- FORM SUBMISSION ---
    form.addEventListener('submit', e => { 
        e.preventDefault(); 
        // Forhindrer formular i at reload siden
        modal.classList.add('show'); 
        // Viser tak-for-tilmeldingen modal
        form.reset(); 
        // Nulstiller formularfelter
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("selected")); 
        document.querySelectorAll(".calendar-days button").forEach(b => b.classList.remove("selected")); 
        document.querySelectorAll(".table").forEach(t => t.classList.remove("selected")); 
        // Fjerner alle tidligere valg
    });

    // --- GUEST SELECTION ---
    const guestBtns = document.querySelectorAll(".guest-btn"); 
    const guestSpan = document.getElementById("guest-count"); 
    const antalInput = document.getElementById("antal-input"); 
    // Henter knapper og felter til gæstevalg

    guestBtns.forEach(btn => {              // Gå igennem hver gæste-knap
    btn.addEventListener("click", () => {   // Tilføj klik-event til knappen
    guestBtns.forEach(b => b.setAttribute("aria-pressed","false"));  // Sæt alle knappers "aria-pressed" til false (nulstil alle knapper for screenreaders)
    btn.setAttribute("aria-pressed","true");  // Sæt den klikkede knap til "true" (markeret valgt for screenreaders)
        
    const guests = btn.dataset.guests; // Hent antal gæster fra data-attribute
    guestSpan.textContent = guests; 
    antalInput.value = guests; // Opdater tekst og inputfelt
            
     // VIS DATE SECTION & SCROLL
    dateSection.style.display = "block"; 
    dateSection.scrollIntoView({ behavior: "smooth", block: "start" }); // Vis dato-sektionen og scroll til den
    
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
    // Henter kalender-elementer og felter til valgt dato/tid

    let currentDate = new Date(); 
    // Initialiserer kalender med dagens dato

    function renderCalendar(date) {
        calendarDays.innerHTML = ""; 
        // Rydder eksisterende dage
        const year = date.getFullYear(); 
        const month = date.getMonth(); 
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate(); 
        // Beregn antal dage og første ugedag

        daySpan.textContent = String(date.getDate()).padStart(2,"0"); 
        monthYearSpan.textContent = date.toLocaleString("da-DK", { month: "long", year: "numeric" }); 
        // Opdater tekst til valgt dag og måned/år

        let startDay = firstDay === 0 ? 6 : firstDay - 1; 
        // Mandag = startdag
        for(let i=0; i<startDay; i++) calendarDays.appendChild(document.createElement("div")); 
        // Tilføj tomme divs for at starte ugen korrekt

        for(let d=1; d<=daysInMonth; d++) {
            const btn = document.createElement("button"); 
            btn.textContent = d; 
            const btnDate = new Date(year, month, d); 
            const today = new Date(); 
            today.setHours(0,0,0,0); 
            if(btnDate < today) { btn.disabled = true; btn.style.opacity = 0.5; } 
            // Deaktiver tidligere dage

            btn.addEventListener("click", () => {
                document.querySelectorAll(".calendar-days button").forEach(b => b.classList.remove("selected")); 
                btn.classList.add("selected"); 
                daySpan.textContent = String(d).padStart(2,"0"); 
                eventDateSpan.textContent = btnDate.toLocaleDateString("da-DK"); 
                selectedDatetime.value = btnDate.toISOString().split("T")[0]; 
                // Opdater valgte dag og skjulte felter

                // VIS TIME SECTION & SCROLL
                timeSection.style.display = "block"; 
                timeSection.scrollIntoView({ behavior: "smooth", block: "start" }); 

                renderTimeButtons(btnDate); 
                // Generer tilgængelige tider
            });

            calendarDays.appendChild(btn); 
        }
    }

    prevMonthBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(currentDate); }); 
    nextMonthBtn.addEventListener("click", () => { currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(currentDate); }); 
    // Navigation for måneds-pile

    renderCalendar(currentDate); 
    // Initial kalender-render

    // --- OPENING HOURS & TIME BUTTONS ---
    const openingHours = { monday: { open: "09:00", close: "17:30" }, tuesday: { open: "09:00", close: "17:30" }, wednesday: { open: "09:00", close: "17:30" }, thursday: { open: "09:00", close: "17:30" }, friday: { open: "09:00", close: "18:00" }, saturday: { open: "09:30", close: "16:00" }, sunday: { open: "09:30", close: "16:00" } }; 
    const timeContainer = document.getElementById("time-buttons"); 
    // Åbningstider og container for tidsknapper

    function convertToMinutes(time) {
        const [h,m] = time.split(":").map(Number); 
        return h*60 + m; 
        // Konverterer "HH:MM" til minutter
    }
    function formatTime(mins) {
        return String(Math.floor(mins/60)).padStart(2,"0") + ":" + String(mins%60).padStart(2,"0"); 
        // Formater minutter til "HH:MM"
    }

    function renderTimeButtons(selectedDate) {
        const weekday = selectedDate.toLocaleDateString("en-US",{weekday:"long"}).toLowerCase(); 
        const hours = openingHours[weekday]; 
        if(!hours) return; 
        // Hent åbningstider for valgt dag

        timeContainer.innerHTML = ""; 
        let start = convertToMinutes(hours.open); 
        let end = convertToMinutes(hours.close); 
        // Start- og sluttid i minutter

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
    const output = document.getElementById("chosen-table"); 
    const chosenTableDisplay = document.getElementById("chosen-table-display"); 
    const randomBtn = document.getElementById("random-table-btn"); 
    // Hent bordknapper, output felter og random knap

    // --- Manuel bordvalg ---
    tables.forEach(table => {
        table.addEventListener("click", () => {
            tables.forEach(t => t.classList.remove("selected")); 
            table.classList.add("selected"); 
            output.textContent = table.dataset.table; 
            chosenTableDisplay.textContent = table.dataset.table; 
            formSection.style.display = "block"; 
            formSection.scrollIntoView({ behavior: "smooth", block: "start" }); 
        });
    });

    // --- Tilfældigt bordvalg ---
    randomBtn.addEventListener("click", () => {
        tables.forEach(t => t.classList.remove("selected")); 
        const randomIndex = Math.floor(Math.random() * tables.length); 
        const table = tables[randomIndex]; 
        table.classList.add("selected"); 
        output.textContent = table.dataset.table; 
        chosenTableDisplay.textContent = table.dataset.table; 
        formSection.style.display = "block"; 
        formSection.scrollIntoView({ behavior: "smooth", block: "start" }); 
    });

});
