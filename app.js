(function (self) {
    let userName = document.getElementById('userName').value || '';
    let balanceValue = document.getElementById('userBalance').value || '';
    const addUserButton = document.getElementById('addUser');
    const historyList = document.getElementById('history');


    const userAccount = [];

    self.construct = function () {
        self.reset();
        self.domLoaded();
        self.handleOnChangeInput();
    };

    self.reset = function () {
        // reset the input fields
        document.getElementById('userName').value = '';
        document.getElementById('userBalance').value = '';
    };

    //create a function to handle all the dom loaded events


    self.domLoaded = function () {
        window.addEventListener('load', (event) => {

            addUserButton.addEventListener('click', function () {
                // if username and balance value are not empty create a new user object sequential id after click the add user button
                if (userName !== '' && balanceValue !== '') {
                    const user = {
                        id: userAccount.length + 1,
                        name: userName,
                        balance: balanceValue,
                    };

                    // push the user object into the userAccount array
                    userAccount.push(user);
                    // reset the input fields
                    self.reset();
                    // display the userAccount array
                    self.displayUserAccount();
                    // add tracker mesaage to history list
                    self.addUserMessage(user);
                } else {
                    console.log('Inputs are empty');
                }
            });
        });
    };

    self.handleOnChangeInput = function () {
        document.getElementById('userName').addEventListener('change', function () {
            userName = document.getElementById('userName').value;
        });

        document.getElementById('userBalance').addEventListener('change', function () {
            balanceValue = document.getElementById('userBalance').value;
        });
    };

    // create a function to display the userAccount array in the userAccountList table body
    self.displayUserAccount = function () {
        const userAccountList = document.getElementById('userAccountList');

        userAccountList.innerHTML = '';
        for (let i = 0; i < userAccount.length; i++) {
            const user = userAccount[i];
            const row = document.createElement('tr');

            row.innerHTML = `
                <th scope="row" id="userid" data-id="${user.id}">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.balance}$</td>
            `;
            userAccountList.appendChild(row);
        }
    };

    self.addUserMessage = function (user) {
        const message = document.createElement('tr');

        message.innerHTML = `
            <td>User ${user.name} has been added with balance ${user.balance}$</td>
        `;
        historyList.appendChild(message);
    };

    return self.construct();
})({});