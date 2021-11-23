const dateInput = document.querySelector('#date');
const btn = document.querySelector('.btn');
const message = document.querySelector('.message');

const convertDateToString = (date) => {
    // Incoming date is in Object form
    console.log(date)
    let newDate = { day: '', month: '', year: ''};
    if(date.day <= 9) {
        newDate.day = '0' + date.day;
    } else {
        newDate.day = date.day.toString();
    }

    if(date.month <= 9) {
        newDate.month = '0' + date.month;
    } else {
        newDate.month = date.month.toString();
    }

    newDate.year = date.year.toString();
    
    return newDate;
    
}

const reverseDate = (date) => {
    let listOfChars = date.split('');
    let reverseCharsList = listOfChars.reverse();
    let reverseDate = reverseCharsList.join('');
    return reverseDate;
}

const isPalindrome = (dateStr) => {
    // reversing the string date
    let reverseDateStr = reverseDate(dateStr);
    return dateStr === reverseDateStr;
}

const getAllDateFormats = (date) => {
    // Date is in object form
    let dateStr = convertDateToString(date);

    // framing all formats
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd ];
}

const checkPalindromeForAllDateFormats = (date) => {
    // Date is in object form
    let listOfDateFormats = getAllDateFormats(date);
    flag = false;
    for(let i=0; i < listOfDateFormats.length; i++) {
        if(isPalindrome(listOfDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}


// Checking Leap Year
const isLeapYear = (year) => {
    if(year % 400 === 0) return true;
    if(year % 4 === 0 && year % 100 !== 0) return true;
    return false;
}

// Getting next Date
const getNextDate = (date) => {
    // Incoming date is in object
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        } else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if(day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if(month > 12) {
        month = 1;
        year++;
    }

    let newDate = {
        day: day,
        month: month,
        year: year
    }

    return newDate;

}

const getNextPalindromeDate = (date) => {
    let newDate = getNextDate(date);
    let counter = 0;

    while(true) {
        counter++;
        if(checkPalindromeForAllDateFormats(newDate)) {
            break;
        } else {
            newDate = getNextDate(newDate);
        }
    }

    return [counter, newDate];
}

// Getting One Previous Date
const getPreviousDate = (date) => {
    // Incoming date is in object
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(month === 3) {
        if(isLeapYear(year)) {
            if(day < 1) {
                day = 29;
                month--;
            }
        } else {
            day = 28;
            month--;
        }
    } else {
        if(day <  1) {
            day = daysInMonth[month-2];
            month--;
        }
    }

    if(month < 1) {
        month = 12;
        year--;
    }

    let newDate = {
        day: day,
        month: month,
        year: year
    }

    return newDate;

}

const getPreviousPalindromeDate = (date) => {
    let counter = 0;
    let newDate = getPreviousDate(date);

    while(true) {
        counter++;
        if(checkPalindromeForAllDateFormats(newDate)) {
            break;
        } else {
            newDate = getPreviousDate(newDate);
        }
    }

    return [counter, newDate];
}


const clickHandler = () => {
    let bday = dateInput.value;
    if(bday !== '') {
        bday = bday.split('-')
    
    let date = {
        day: Number(bday[2]),
        month: Number(bday[1]),
        year: Number(bday[0])
    }
    console.log(date, typeof date.day)

    if(checkPalindromeForAllDateFormats(date)) {
        message.innerText = 'Yay! Your B\'day is a Palindrome Date.'
    } else {
        let [nextCounter, nextDate] = getNextPalindromeDate(date);
        let [prevCounter, previousDate] = getPreviousPalindromeDate(date);
        message.innerText = `Oops! You missed by ${prevCounter}. Last Palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}. Also the next palindrome Date is ${nextCounter} days in future on ${nextDate.day}-${nextDate.month}-${nextDate.year}.`
    }
    }
    
}

btn.addEventListener('click', clickHandler);
