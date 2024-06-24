document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        if (window.location.pathname.includes('organize.html')) {
            showEventManagement();
        } else if (window.location.pathname.includes('book.html')) {
            showUserEvents();
        }
    } else {
        if (window.location.pathname.includes('organize.html') || window.location.pathname.includes('book.html')) {
            window.location.href = 'signin.html';
        }
    }

    // Event listener for registration form submission
    if (document.getElementById('signupForm')) {
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault();

            let username = document.getElementById('username').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            if (username && email && password) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));

                alert('Registration successful!');
                window.location.href = 'signin.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Event listener for login form submission
    if (document.getElementById('signinForm')) {
        document.getElementById('signinForm').addEventListener('submit', function(event) {
            event.preventDefault();

            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'organize.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Event listener for event form submission
    if (document.getElementById('eventForm')) {
        document.getElementById('eventForm').addEventListener('submit', function(event) {
            event.preventDefault();

            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;

            if (title && description) {
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                let userEvents = JSON.parse(localStorage.getItem('userEvents')) || {};

                if (!userEvents[currentUser.username]) {
                    userEvents[currentUser.username] = [];
                }

                userEvents[currentUser.username].push({ title, description });
                localStorage.setItem('userEvents', JSON.stringify(userEvents));

                alert('Event added successfully!');
                window.location.href = 'book.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Show user events on the book.html page
    function showUserEvents() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let userEvents = JSON.parse(localStorage.getItem('userEvents')) || {};
        let eventsList = document.getElementById('eventsList');

        if (eventsList) {
            eventsList.innerHTML = '';

            if (userEvents[currentUser.username]) {
                userEvents[currentUser.username].forEach(event => {
                    let eventItem = document.createElement('div');
                    eventItem.className = 'event-item';
                    eventItem.innerHTML = `
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    `;
                    eventsList.appendChild(eventItem);
                });
            } else {
                eventsList.innerHTML = '<p>No events found.</p>';
            }
        }
    }

    // Event listener for logout
    if (document.getElementById('logout')) {
        document.getElementById('logout').addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'signin.html';
        });
    }

    function showEventManagement() {
        window.location.href = 'organize.html';
    }
});
