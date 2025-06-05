import CustomPopover from "../components/UI/MaterialUI/CustomPopover";

export function cleanText(text, thePlayers) {
    if (text === undefined || text.length === 0)
        return;

    var newText = text;
    var words = [];
    while (newText.length >= 1) {
        const start = newText.indexOf("@{") + 2;
        const end = newText.indexOf("}");
        if (end < start)
            break;
        const word = newText.substring(start, end);
        words.push(word);
        newText = newText.substring(end + 1);
    }

    for (let i = 0; i < thePlayers.length; i++) {
        if (thePlayers[i].alternate) {
            for (let y = 0; y < thePlayers[i].alternate.length; y++) {
                const name = thePlayers[i].alternate[y].toLowerCase();
                var toreplace = words.find((w) => w.toLowerCase() === name);
                if (!name || !toreplace) {
                    continue;
                }
                const word = thePlayers[i].name;
                const firstLetter = word.charAt(0)
                const firstLetterCap = firstLetter.toUpperCase()
                const remainingLetters = word.slice(1)
                const capitalizedWord = firstLetterCap + remainingLetters
                text = text.replaceAll(`@{${toreplace}}`, capitalizedWord);
            }
        }
    }
    return text;
}

export function tokenizeText(text) {
    return text.match(/@\{[^}]+\}|\S+/g) || [];
}

function getText(text, playersOnBet) {
    const player = playersOnBet.find(obj => obj.alternate_names.some(name => name.toLowerCase().startsWith(text.toLowerCase())));
    return <CustomPopover name={player.display_name} />
}

export function replaceTextWithJSX(tokens, playersOnBet) {
    return tokens.map((part, index) => (
        <p key={index} style={{ display: 'inline' }}>
            {part.startsWith("@{")
                ? getText(part.substring(2, part.length - 1), playersOnBet)
                : part}
            {index !== tokens.length - 1 && ' '}
        </p>
    ));
}

export function getStatus(status) {
    if (status === 'ongoing') {
        return "On Going";
    } else if (status === 'void') {
        return "Void";
    } else if (status === 'complete') {
        return "Completed";
    }
    return status;
}