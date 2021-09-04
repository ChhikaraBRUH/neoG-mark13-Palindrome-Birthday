import React, { useState } from "react";
import "./styles.css";

export default function App() {
	const [outputTxt, setOutputTxt] = useState("");

	function reverseStr(str) {
		var listOfChars = str.split("");
		var reverseListOfChars = listOfChars.reverse();
		var reversedStr = reverseListOfChars.join("");
		return reversedStr;
	}

	function isPalindrome(str) {
		var reverse = reverseStr(str);
		return str === reverse;
	}

	function convertDateToStr(date) {
		var dateStr = { day: "", month: "", year: "" };

		if (date.day < 10) {
			dateStr.day = "0" + date.day;
		} else {
			dateStr.day = date.day.toString();
		}

		if (date.month < 10) {
			dateStr.month = "0" + date.month;
		} else {
			dateStr.month = date.month.toString();
		}

		dateStr.year = date.year.toString();
		return dateStr;
	}

	function dateFormat(date) {
		var dateStr = convertDateToStr(date);

		var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
		var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
		var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;

		return [yyyymmdd, ddmmyyyy, mmddyyyy];
	}

	function checkPalindrome(date) {
		var listOfPalindromes = dateFormat(date);
		var check = false;

		for (var i = 0; i < listOfPalindromes.length; i++) {
			if (isPalindrome(listOfPalindromes[i])) {
				check = true;
				break;
			}
		}
		return check;
	}

	function isLeapYear(year) {
		if (year % 400 === 0) {
			return true;
		}
		if (year % 100 === 0) {
			return false;
		}
		if (year % 4 === 0) {
			return true;
		}
		return false;
	}

	function getNextDate(date) {
		var day = date.day + 1;
		var month = date.month;
		var year = date.year;

		var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		if (month === 2) {
			if (isLeapYear(year)) {
				if (day > 29) {
					day = 1;
					month++;
				}
			} else {
				if (day > 28) {
					day = 1;
					month++;
				}
			}
		} else {
			if (day > daysInMonth[month - 1]) {
				day = 1;
				month++;
			}
		}
		if (month > 12) {
			month = 1;
			year++;
		}

		return {
			day: day,
			month: month,
			year: year
		};
	}

	function getNextPalindromeDate(date) {
		var ctr = 0;
		var nextDate = getNextDate(date);

		while (1) {
			ctr++;
			var isPalindrome = checkPalindrome(nextDate);
			if (isPalindrome) {
				break;
			}
			nextDate = getNextDate(nextDate);
		}
		return [ctr, nextDate];
	}

	function clickHandler() {
		var bdayStr = document.getElementById("dateInput").value;

		if (bdayStr !== "") {
			var listOfDate = bdayStr.split("-");

			var date = {
				day: Number(listOfDate[2]),
				month: Number(listOfDate[1]),
				year: Number(listOfDate[0])
			};

			var isPalindrome = checkPalindrome(date);

			if (isPalindrome) {
				setOutputTxt("✔️ Congrats!!! Your birthday is a palindrome!!");
			} else {
				var [ctr, nextDate] = getNextPalindromeDate(date);

				setOutputTxt(
					"❌ Oops!! This birthday is not a palindrome. The next palindrome date is " +
						nextDate.day +
						"-" +
						nextDate.month +
						"-" +
						nextDate.year +
						" (dd-mm-yyy). You missed it by " +
						ctr +
						" days!"
				);
			}
		}
	}

	return (
		<div className="App container-fluid">
			<div>
				<h1>Palindrome Birthday</h1>
				<hr />

				<div id="dateLabel">
					Select your birthday to check if it's a plaindrome or not. I
					currently check in DDMMYYYY, MMDDYYYY & YYYYMMDD formats.
				</div>
				<input
					id="dateInput"
					className="input-date"
					type="date"
					min="1000-01-01"
					max="9999-12-31"
				/>
				<button
					id="checkBtn"
					className="btn btn-primary"
					type="submit"
					onClick={clickHandler}
				>
					Check Now!
				</button>
				<div id="outputTxt">{outputTxt}</div>
				<hr />
				<div>
					Made with{"  "}
					<span role="img" aria-label="Red Heart">
						❤️{" "}
					</span>
					by <a href="https://bruh.dev">Chaitanya</a>
				</div>
				<a href="https://twitter.com/ChhikaraBRUH">
					<img
						alt="Twitter Icon"
						src="https://image.flaticon.com/icons/png/512/1384/1384017.png"
					/>
				</a>
				<a href="https://github.com/ChhikaraBRUH">
					<img
						alt="GitHub Icon"
						src="https://image.flaticon.com/icons/png/512/733/733609.png"
					/>
				</a>
				<a href="https://linkedin.com/in/ChaitanyaChhikara">
					<img
						alt="LinkedIn Icon"
						src="https://image.flaticon.com/icons/png/512/1384/1384014.png"
					/>
				</a>
				<div id="cautionNotice">
					<span role="img" aria-label="bulb">
						💡
					</span>{" "}
					We don't store any data. Nothing to worry about!{" "}
					<span role="img" aria-label="bulb">
						💡
					</span>
				</div>
			</div>
		</div>
	);
}
