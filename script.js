const numberOfCookies = 8;
const votes = JSON.parse(localStorage.getItem('votes')) || new Array(numberOfCookies).fill(0);
const cookieList = document.getElementById('cookie-list');
const modal = document.getElementById('confirmation-modal');
const modalMessage = document.getElementById('modal-message');
const confirmButton = document.getElementById('confirm-vote');
const cancelButton = document.getElementById('cancel-vote');
const resultsDiv = document.getElementById('results');

let selectedCookie = null;

// Function to handle a vote
function voteForCookie(cookieNumber) {
    selectedCookie = cookieNumber;
    modalMessage.textContent = `Are you sure you want to vote for Cookie ${cookieNumber + 1}?`;
    modal.classList.remove('hidden'); // Show the modal
}

// Confirm the vote
if (confirmButton) {
    confirmButton.addEventListener('click', () => {
        if (selectedCookie !== null) {
            votes[selectedCookie]++;
            localStorage.setItem('votes', JSON.stringify(votes));
            alert(`Your vote for Cookie ${selectedCookie + 1} has been recorded.`);
            modal.classList.add('hidden'); // Hide the modal
            selectedCookie = null;
        }
    });
}

// Cancel the vote
if (cancelButton) {
    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden'); // Hide the modal
        selectedCookie = null;
    });
}

// Generate buttons for each cookie
if (cookieList) {
    for (let i = 0; i < numberOfCookies; i++) {
        const button = document.createElement('button');
        button.textContent = `Vote for Cookie ${i + 1}`;
        button.onclick = () => voteForCookie(i); // Attach click event
        cookieList.appendChild(button);
    }
}

// Function to navigate to the results page
function viewResults() {
    window.location.href = 'results.html';
}

// Display results on the results page
/*if (resultsDiv) {
    const sortedVotes = votes
        .map((vote, index) => ({ cookie: `Cookie ${index + 1}`, votes: vote }))
        .sort((a, b) => b.votes - a.votes);

    sortedVotes.forEach(({ cookie, votes }) => {
        const resultItem = document.createElement('p');
        resultItem.textContent = `${cookie}: ${votes} votes`;
        resultsDiv.appendChild(resultItem);
    });
}*/

// Display results on the results page
if (resultsDiv) {
    const sortedVotes = votes
        .map((vote, index) => ({ cookie: `Cookie ${index + 1}`, votes: vote }))
        .sort((a, b) => b.votes - a.votes);

    sortedVotes.forEach((item, index) => {
        const { cookie, votes } = item;
        
        // Determine the rank (1st, 2nd, 3rd, etc.)
        let rank = `${index + 1}${getRankSuffix(index + 1)}`;

        const resultItem = document.createElement('p');
        resultItem.textContent = `${rank}: ${cookie} - ${votes} votes`;
        resultsDiv.appendChild(resultItem);
    });
}

// Helper function to get rank suffix (1st, 2nd, 3rd, etc.)
function getRankSuffix(rank) {
    if (rank % 10 === 1 && rank !== 11) {
        return 'st';
    } else if (rank % 10 === 2 && rank !== 12) {
        return 'nd';
    } else if (rank % 10 === 3 && rank !== 13) {
        return 'rd';
    } else {
        return 'th';
    }
}


// Reset votes
function resetVotes() {
    localStorage.setItem('votes', JSON.stringify(new Array(numberOfCookies).fill(0)));
    alert('Votes have been reset!');
    location.reload();
}

// Go back to the voting page
function goBack() {
    window.location.href = 'index.html';
}
