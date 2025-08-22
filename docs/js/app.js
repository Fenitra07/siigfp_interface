
      // Données de test
      const situationData = [
        { type: "BS", aRepartir: 0, reparti: 0 },
        { type: "Transfert", aRepartir: 0, reparti: 0 },
        { type: "Indemnité", aRepartir: 0, reparti: 0 },
        { type: "PIP interne", aRepartir: 0, reparti: 0 },
        { type: "PIP externe", aRepartir: 0, reparti: 0 },
      ];

      const saisieData = [
        {
          codeMission: "760",
          libelleMission: "Population et développement",
          codeProgramme: "813",
          programme: "Promotion de l'Amélioration...",
          montant: 0,
        },
        {
          codeMission: "760",
          libelleMission: "Population et développement",
          codeProgramme: "025",
          programme: "Administration de Coordination",
          montant: 0,
        },
        {
          codeMission: "762",
          libelleMission: "Développement social",
          codeProgramme: "830",
          programme: "Promotion sociale",
          montant: 0,
        },
      ];

      // Initialisation
      document.addEventListener("DOMContentLoaded", function () {
        initSituationTable();
        initSaisieTable();
        initEventListeners();

        // Animation d'entrée séquentielle
        setTimeout(() => {
          document
            .querySelectorAll(".animate-slide-up")
            .forEach((el, index) => {
              el.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
      });

      function initSituationTable() {
        const tbody = document.getElementById("situationTable");
        situationData.forEach((row, index) => {
          const tr = document.createElement("tr");
          tr.className =
            "border-b border-slate-300 hover:bg-slate-100 transition-colors duration-200";
          tr.innerHTML = `
                    <td class="py-3 px-4 bg-[#ebebeb] text-black font-medium">${row.type}</td>
                    <td class="py-3 px-4 text-center bg-white hover:bg-slate-200 transition-colors duration-200">
                        <input type="number" value="${row.aRepartir}" 
                               class="w-full text-center border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-black"
                               onchange="updateValue(${index}, 'aRepartir', this.value)">
                    </td>
                    <td class="py-3 px-4 bg-white text-center hover:bg-slate-200 transition-colors duration-200">
                        <input type="number" value="${row.reparti}" 
                               class="w-full text-center border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-black"
                               onchange="updateValue(${index}, 'reparti', this.value)">
                    </td>
                `;
          tbody.appendChild(tr);
        });
      }

      function initSaisieTable() {
        const tbody = document.getElementById("saisieTable");
        saisieData.forEach((row, index) => {
          const tr = document.createElement("tr");
          tr.className =
            "border-b hover:bg-slate-50 transition-all duration-200";
          tr.innerHTML = `
                    <td class="py-3 px-4 text-black">${row.codeMission}</td>
                    <td class="py-3 px-4 text-black">${row.libelleMission}</td>
                    <td class="py-3 px-4 text-black">${row.codeProgramme}</td>
                    <td class="py-3 px-4 text-black">${row.programme}</td>
                    <td class="py-3 px-4 text-center">
                        <input type="number" value="${row.montant}" 
                               class="w-full text-center border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                               onchange="updateSaisieValue(${index}, this.value)">
                    </td>
                `;
          tbody.appendChild(tr);
        });

        // Ajouter la ligne total
        const totalRow = document.createElement("tr");
        totalRow.className = "bg-[#ebebeb] text-black font-semibold";
        totalRow.innerHTML = `
                <td colspan="4" class="py-3 px-4 text-center">Total grande rubrique</td>
                <td class="py-3 px-4 text-center" id="totalAmount">0</td>
            `;
        tbody.appendChild(totalRow);
      }

      function initEventListeners() {
        // Boutons d'affichage
        document.querySelectorAll(".afficher-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll(".afficher-btn").forEach((b) => {
              b.classList.remove("bg-white-500", "shadow-lg", "scale-105");
              b.classList.add("bg-white-300");
            });

            // Ajouter la classe active au bouton cliqué
            this.classList.remove("bg-white-300");
            this.classList.add("bg-white-500", "shadow-lg", "scale-105");

            // Animation de pulsation
            this.style.animation = "none";
            setTimeout(() => {
              this.style.animation = "pulseSoft 0.5s ease-in-out";
            }, 10);
          });
        });

        // Bouton enregistrer
        document
          .getElementById("enregistrerBtn")
          .addEventListener("click", function () {
            // Animation de succès
            this.innerHTML = `
                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Enregistré !
                `;
            this.classList.add("bg-white-500", "hover:bg-slate-200");
            this.classList.remove("bg-orange-500", "hover:bg-orange-600");

            setTimeout(() => {
              this.innerHTML = `
                        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                        </svg>
                        Enregistrer
                    `;
              this.classList.remove("bg-white-500", "hover:bg-white-600");
              this.classList.add("bg-orange-500", "hover:bg-orange-600");
            }, 2000);
          });

        // Boutons de filtre
        document
          .getElementById("missionBtn")
          .addEventListener("click", function () {
            showModal("Sélection Mission");
          });

        document
          .getElementById("programmeBtn")
          .addEventListener("click", function () {
            showModal("Sélection Programme");
          });
      }

      function updateValue(index, field, value) {
        situationData[index][field] = parseFloat(value) || 0;

        // Animation de validation
        event.target.classList.add("bg-white-100");
        setTimeout(() => {
          event.target.classList.remove("bg-white-100");
        }, 300);
      }

      function updateSaisieValue(index, value) {
        saisieData[index].montant = parseFloat(value) || 0;
        updateTotal();

        // Animation de validation
        event.target.classList.add("bg-blue-100");
        setTimeout(() => {
          event.target.classList.remove("bg-blue-100");
        }, 300);
      }

      function updateTotal() {
        const total = saisieData.reduce((sum, row) => sum + row.montant, 0);
        document.getElementById("totalAmount").textContent = total;

        // Animation du total
        const totalElement = document.getElementById("totalAmount");
        totalElement.style.transform = "scale(1.1)";
        setTimeout(() => {
          totalElement.style.transform = "scale(1)";
        }, 200);
      }

      function showModal(title) {
        // Créer une modal simple avec animation
        const modal = document.createElement("div");
        modal.className =
          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";
        modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform scale-95 transition-transform duration-300">
                    <h3 class="text-lg font-semibold mb-4 text-black">${title}</h3>
                    <p class="text-gray-600 mb-4">Fonctionnalité à implémenter...</p>
                    <button onclick="closeModal(this)" class="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors">
                        Fermer
                    </button>
                </div>
            `;

        document.body.appendChild(modal);

        // Animation d'ouverture
        setTimeout(() => {
          modal.classList.remove("opacity-0");
          modal.querySelector("div").classList.remove("scale-95");
        }, 10);
      }

      function closeModal(btn) {
        const modal = btn.closest(".fixed");
        modal.classList.add("opacity-0");
        modal.querySelector("div").classList.add("scale-95");

        setTimeout(() => {
          modal.remove();
        }, 300);
      }

      // Animation au scroll
      window.addEventListener("scroll", function () {
        const elements = document.querySelectorAll(".glass-effect");
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8) {
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
          }
        });
      });
