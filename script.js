

async function Load() {

    try {

        const url = "https://fakestoreapi.com/users";

    let userData = await fetch(url);
    console.log("userData : ", userData);

    let parsed_data = await userData.json();
    console.log("parsed_data : ", parsed_data);

    const userList = document.getElementById('userList');

    parsed_data.forEach(user => {
        const tr = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.classList.add('Id');
        idCell.innerHTML = user.id;
        tr.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.innerHTML = `
                             <strong>${user.name.firstname} ${user.name.lastname}</strong><br>
                             <small>${user.username}</small>
                                          `;
        tr.appendChild(nameCell);

        const addressCell = document.createElement('td');
        
        addressCell.innerHTML = user.address.city;
        tr.appendChild(addressCell);

        const streetCell = document.createElement('td');
        
        streetCell.innerHTML = user.address.street;
        tr.appendChild(streetCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        tr.appendChild(emailCell);

        const phoneCell = document.createElement('td');
        
        phoneCell.innerHTML = user.phone;
        tr.appendChild(phoneCell);

        const showCell = document.createElement('td');
        


        const viewButton = document.createElement('button');
        viewButton.textContent = "View";
        
        viewButton.addEventListener('click', () => {
            window.location.href = `user.html?id=${user.id}`;

        });
        showCell.appendChild(viewButton);
        tr.appendChild(showCell)

        userList.appendChild(tr);
    })
        
    } catch (error) {
        console.log("error : ", error);
        
    }

    
}

async function UserData() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams:", urlParams);
    
    // Extract userId from URL
    const userId = urlParams.get('id');
    console.log("userId:", userId);
    
    if (userId) {
        try {
            // Fetch user data from the API
            const userUrl = `https://fakestoreapi.com/users/${userId}`;
            const response = await fetch(userUrl);
            
            // Check if response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Parse the JSON data
            const userData = await response.json();
            console.log("userData:", userData);
            
            // Display user details in the DOM
            const userDetailsDiv = document.getElementById('userDetails');
            userDetailsDiv.innerHTML = `
                <p><strong>Name:</strong> ${userData.name.firstname} ${userData.name.lastname}</p>
                <p><strong>Username:</strong> ${userData.username}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Phone:</strong> ${userData.phone}</p>
                <p><strong>Address:</strong> ${userData.address.street}, ${userData.address.city}, ${userData.address.zipcode}</p>
            `;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        console.error('No userId found in URL parameters');
    }
}

// Call the function to load user data
UserData();
