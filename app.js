(function (self) {
    let userName = document.getElementById('userName').value || '';
    let balanceValue = document.getElementById('userBalance').value || '';
    let receivedFrom = document.getElementById('receivedFrom').value;
    let receiver = document.getElementById('receiver').value;
    let amount = document.getElementById('amount').value;

    const createUserForm = document.querySelector('.createUserForm');
    const createTransactionForm = document.querySelector('.userTransferForm');

    const historyList = document.querySelector('#history tbody');
    const sendAmount = document.getElementById('sendAmount');
    const userAccount = [];

    self.construct = function () {
        self.reset();
        self.domLoaded();
        self.handleOnChangeInput();
        self.receivedFromChange();
    };

    self.reset = function () {
        // reset all input fields
        createUserForm.reset();
        createTransactionForm.reset();
    };

    //create a function to handle all the dom loaded events
    self.domLoaded = function () {
        window.addEventListener('load', () => {

            createUserForm.addEventListener('submit', self.createUserFunc);
            createTransactionForm.addEventListener('submit', self.createTransactionFunc);
        });
    };

    self.createUserFunc = function (e) {
        e.preventDefault();

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
            // add tracker message to history list
            self.addUserMessage(user);
            self.addUserNames();
        } else {
            alert('Inputs are empty');
        }
    };

    self.createTransactionFunc = function (e) {
        e.preventDefault();

        // if the receiver and amount are not empty
        if (receiver !== '' && amount !== '') {
            // find the receiver object
            self.sendBalance();
            self.reset();
        } else {
            alert('Inputs are empty');
        }
    };

    self.handleOnChangeInput = function () {
        document.getElementById('userName').addEventListener('change', function () {
            userName = document.getElementById('userName').value;
        });

        document.getElementById('userBalance').addEventListener('change', function () {
            balanceValue = Number(document.getElementById('userBalance').value);
        });

        document.getElementById('receivedFrom').addEventListener('change', function () {
            receivedFrom = document.getElementById('receivedFrom').value;
        });

        document.getElementById('receiver').addEventListener('change', function () {
            receiver = document.getElementById('receiver').value;
        });

        document.getElementById('amount').addEventListener('change', function () {
            amount = Number(document.getElementById('amount').value);
        });
    };

    // create a function to display the userAccount array in the userAccountList table body
    self.displayUserAccount = function () {
        const userAccountList = document.querySelector('#userAccountList tbody');

        userAccountList.innerHTML = '';
        userAccount.map(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td scope="row" data-id="${user.id}">${user.id}</td>
            <td>${user.name}</td>
            <td>${user.balance}$</td>
        `;
            userAccountList.appendChild(row);
        });
    };

    // create a function to add all usernames to receivedFrom and receiver select element
    self.addUserNames = function () {
        const receivedFromElement = document.getElementById('receivedFrom');
        const receiverElement = document.getElementById('receiver');

        receivedFromElement.innerHTML = '';
        receiverElement.innerHTML = '';
        userAccount.map(function (user) {
            const option = document.createElement('option');

            option.innerHTML = user.name;
            receivedFromElement.appendChild(option);
            receiverElement.appendChild(option.cloneNode(true));
        });
    };

    //create function send amount to receiver and update the balance of the sender
    self.sendBalance = function () {

        // if the amount is not empty and the amount is a number
        if (amount !== '' && !isNaN(amount)) {
            // find the index of the sender
            const senderIndex = userAccount.findIndex(function (user) {
                return user.name === receivedFrom;
            });

            // find the index of the receiver
            const receiverIndex = userAccount.findIndex(function (user) {
                return user.name === receiver;
            });

            // if the sender and receiver index are equal to each other
            if (senderIndex === receiverIndex) {
                alert('You cannot send money to yourself');
            } else {
                // if the sender and receiver index are not equal to -1
                if (senderIndex !== -1 && receiverIndex !== -1) {
                    // if the sender balance is greater than the amount
                    if (userAccount[senderIndex].balance >= amount) {
                        // update the sender balance
                        userAccount[senderIndex].balance -= amount;
                        // update the receiver balance
                        userAccount[receiverIndex].balance += amount;
                        // display the userAccount array
                        self.displayUserAccount();
                        // add tracker message to history list
                        self.sendBalanceMessage(receivedFrom, receiver, amount);
                    } else {
                        alert('Insufficient balance');
                    }
                } else {
                    alert('User not found');
                }
            }
        } else {
            alert('Amount is not a number');
        }
    };

    // create a function to handle the onchange event of the receivedFrom select element
    self.receivedFromChange = function () {
        document.getElementById('receivedFrom').addEventListener('change', function () {
            // if the receivedFrom is not equal to the receiver then enable the transfer button
            if (receivedFrom !== receiver) {
                sendAmount.disabled = false;
            } else {
                sendAmount.disabled = true;
            }
        });
    };

    // create a function to add a message to the history list
    self.addUserMessage = function (user) {
        const message = document.createElement('tr');

        message.innerHTML = `
                <td>User ${user.name} has been added with balance ${user.balance}$</td>
            `;
        historyList.prepend(message);
    };

    self.sendBalanceMessage = function (sender, recipient, balance) {
        const message = document.createElement('tr');

        message.innerHTML = `
            <td>${sender} has sent ${balance}$ to ${recipient}</td>
        `;
        historyList.prepend(message);
    };

    return self.construct();
})({});