function calculateRandomOutcome(probability) {
	const randomValue = Math.floor(Math.random() * 1000);
	return randomValue < probability;
}

function simulatePoolOnce(poolType, targetFiveStars, targetFiveStars_weapon, currentPulls, currentPulls_weapon, target4Stars, current4Pulls, draw4Star, hardPity, hardPity_weapon, hardCount) {
	let totalPull = 0;
	let hartIn = 0;
	let hartOut = 0;
	let pull4success = 0;

	const hardPity4Initial = document.getElementById('hardPity4').checked ? true : false;

	// 角色部分
	{
		let pullsTimes = currentPulls + 1;
		let hardPityFlag = hardPity;
		let pulls4Times = current4Pulls;
		let star4 = 0;
		let hard4Pity = hardPity4Initial;

		for (let fiveStars = 0; fiveStars < targetFiveStars;) {
			totalPull += 1;
			let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
			for (; !calculateRandomOutcome(random);) {
				pullsTimes += 1;
				totalPull += 1;
				random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;

				if (draw4Star && star4 < target4Stars) {
					pulls4Times += 1;
					let random4;
					if (poolType === 'jue') {
						random4 = pulls4Times <= 9 ? 94 : 1000;
					} else {
						random4 = pulls4Times <= 8 ? 51 : (pulls4Times === 9 ? 562 : 1000);
					}

					if (calculateRandomOutcome(random4)) {
						pulls4Times = 0;
						if (hard4Pity) {
							if (poolType === 'jue') {
								if (calculateRandomOutcome(500)) star4 += 1;
							} else {
								if (calculateRandomOutcome(334)) star4 += 1;
							}
							hard4Pity = false;
						} else {
							if (calculateRandomOutcome(500)) {
								if (poolType === 'jue') {
									if (calculateRandomOutcome(500)) star4 += 1;
								} else {
									if (calculateRandomOutcome(334)) star4 += 1;
								}
							} else {
								hard4Pity = true;
							}
						}

						if (star4 >= target4Stars) {
							pull4success += 1;
						}
					}
				}
			}

			if (hardPityFlag) {
				fiveStars += 1;
				hardPityFlag = false;
			} else {
				if (poolType === 'yuan') {
					if (hardCount == 3) {
						fiveStars += 1;
						hartIn += 1;
						hardCount = 1;
					} else if (hardCount == 2) {
						if (calculateRandomOutcome(600)) {
							fiveStars += 1;
							hartIn += 1;
							hardCount = 1;
						} else {
							hardPityFlag = true;
							hartOut += 1;
							hardCount += 1;
						}
					} else if (calculateRandomOutcome(500)) {
						fiveStars += 1;
						hartIn += 1;
						if (hardCount > 0) hardCount -= 1;
					} else {
						hardPityFlag = true;
						hartOut += 1;
						hardCount += 1;
					}
				} else if (poolType === 'tie') {
					if (calculateRandomOutcome(500)) {
						fiveStars += 1;
					} else if (calculateRandomOutcome(143)) {
						fiveStars += 1;
					} else {
						hardPityFlag = true;
					}
				} else if (poolType === 'jue') {
					if (calculateRandomOutcome(500)) {
						fiveStars += 1;
					} else {
						hardPityFlag = true;
					}
				}
			}

			pullsTimes = 1;

			if (poolType === 'jue') {
				pulls4Times = 0;
			}
		}
	}

	// 武器部分
	{
		let pullsTimes = currentPulls_weapon + 1;
		let hardPityFlag = hardPity_weapon;
		for (let fiveStars = 0; fiveStars < targetFiveStars_weapon;) {
			totalPull += 1;
			let random;
			if (poolType === 'jue') {
				random = pullsTimes >= 80 ? 1000 : (pullsTimes < 65 ? 10 : (70 + (pullsTimes - 65) * 60));
			} else {
				random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777);
			}
			for (; !calculateRandomOutcome(random);) {
				pullsTimes += 1;
				totalPull += 1;
				if (poolType === 'jue') {
					random = pullsTimes >= 80 ? 1000 : (pullsTimes < 65 ? 10 : (70 + (pullsTimes - 65) * 60));
				} else {
					random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777);
				}
			}
			if (hardPityFlag) {
				fiveStars += 1;
				hardPityFlag = false;
			} else {
				if (poolType === 'yuan') {
					if (calculateRandomOutcome(250)) {
						hardPityFlag = true;
					} else {
						if (calculateRandomOutcome(500)) {
							fiveStars += 1;
						} else {
							hardPityFlag = true;
						}
					}
				} else {
					if (calculateRandomOutcome(250)) {
						hardPityFlag = true;
					} else {
						fiveStars += 1;
					}
				}
			}
			pullsTimes = 1;
		}
	}

	return { totalPull, hartIn, hartOut, pull4success };
}

document.getElementById("simulateButton").addEventListener("click", async function() {
	const getIntValue = (id) => parseInt(document.getElementById(id)?.value) || 0;
	const targetFiveStarsSum = getIntValue('targetFiveStars_yuan') + getIntValue('targetFiveStars_tie') + getIntValue('targetFiveStars_jue');
	const targetFiveStarsWeaponSum = getIntValue('targetFiveStars_weapon_yuan') + getIntValue('targetFiveStars_weapon_tie') + getIntValue('targetFiveStars_weapon_jue');
	const currentPullsSum = getIntValue('currentPulls_yuan') + getIntValue('currentPulls_tie') + getIntValue('currentPulls_jue');
	const currentPullsWeaponSum = getIntValue('currentPulls_weapon_yuan') + getIntValue('currentPulls_weapon_tie') + getIntValue('currentPulls_weapon_jue');

	gtag("event", "simulate", {
	  poolType: 'yuan',
	  targetFiveStars: targetFiveStarsSum,
	  targetFiveStars_weapon: targetFiveStarsWeaponSum,
	  currentPulls: currentPullsSum,
	  currentPulls_weapon: currentPullsWeaponSum
	});
	document.getElementById("loadingOverlay").style.display = "flex";

	try {
		// 以非同步方式呼叫 simulateGacha 並等待其完成
		await simulateGacha();
	} finally {
		// 執行完成後隱藏 loading overlay
		document.getElementById("loadingOverlay").style.display = "none";
	}

});

async function simulateGacha() {

	return new Promise((resolve) => {
		const checkField = (id, min, max) => {
			const el = document.getElementById(id);
			if (!el) return;
			let v = parseInt(el.value) || 0;
			if (v < min) v = min;
			if (v > max) v = max;
			el.value = v;
		};

		checkField('currentPulls_yuan', 0, 999999999);
		checkField('currentPulls_tie', 0, 999999999);
		checkField('currentPulls_jue', 0, 999999999);
		checkField('currentPulls_weapon_yuan', 0, 999999999);
		checkField('currentPulls_weapon_tie', 0, 999999999);
		checkField('currentPulls_weapon_jue', 0, 999999999);
		checkField('targetFiveStars_yuan', 0, 999999999);
		checkField('targetFiveStars_tie', 0, 999999999);
		checkField('targetFiveStars_jue', 0, 999999999);
		checkField('targetFiveStars_weapon_yuan', 0, 999999999);
		checkField('targetFiveStars_weapon_tie', 0, 999999999);
		checkField('targetFiveStars_weapon_jue', 0, 999999999);
		checkField('target4Stars', 0, 999999999);
		checkField('current4Pulls', 0, 999999999);
		checkField('hardCount', 0, 3);

		setTimeout(() => {
			const startTime = new Date();

			const currentPulls_yuan = parseInt(document.getElementById('currentPulls_yuan')?.value) || 0;
			const currentPulls_tie = parseInt(document.getElementById('currentPulls_tie')?.value) || 0;
			const currentPulls_jue = parseInt(document.getElementById('currentPulls_jue')?.value) || 0;
			const currentPulls_weapon_yuan = parseInt(document.getElementById('currentPulls_weapon_yuan')?.value) || 0;
			const currentPulls_weapon_tie = parseInt(document.getElementById('currentPulls_weapon_tie')?.value) || 0;
			const currentPulls_weapon_jue = parseInt(document.getElementById('currentPulls_weapon_jue')?.value) || 0;

			const targetFiveStars_yuan = parseInt(document.getElementById('targetFiveStars_yuan')?.value) || 0;
			const targetFiveStars_tie = parseInt(document.getElementById('targetFiveStars_tie')?.value) || 0;
			const targetFiveStars_jue = parseInt(document.getElementById('targetFiveStars_jue')?.value) || 0;
			const targetFiveStars_weapon_yuan = parseInt(document.getElementById('targetFiveStars_weapon_yuan')?.value) || 0;
			const targetFiveStars_weapon_tie = parseInt(document.getElementById('targetFiveStars_weapon_tie')?.value) || 0;
			const targetFiveStars_weapon_jue = parseInt(document.getElementById('targetFiveStars_weapon_jue')?.value) || 0;

			const simTimes = parseInt(document.getElementById('simTimes').value) || 1000000;
			const target4Stars = parseInt(document.getElementById('target4Stars').value) || 0;
			const current4Pulls = parseInt(document.getElementById('current4Pulls').value) || 0;
			const hardPity = document.getElementById('hardPity').checked;
			const hardPityWeapon = document.getElementById('hardPity_weapon').checked;
			const hardCount = parseInt(document.getElementById('hardCount').value) || 0;
			const draw4Star = document.getElementById('draw4Star').checked;

			let cluster = new StatisticsCluster();
			let totalHartIn = 0;
			let totalHartOut = 0;
			let totalPull4success = 0;

			for (let i = 0; i < simTimes; i++) {
				const poolYuan = simulatePoolOnce('yuan', targetFiveStars_yuan, targetFiveStars_weapon_yuan, currentPulls_yuan, currentPulls_weapon_yuan, target4Stars, current4Pulls, draw4Star, hardPity, hardPityWeapon, hardCount);
				const poolTie = simulatePoolOnce('tie', targetFiveStars_tie, targetFiveStars_weapon_tie, currentPulls_tie, currentPulls_weapon_tie, target4Stars, current4Pulls, draw4Star, hardPity, hardPityWeapon, 0);
				const poolJue = simulatePoolOnce('jue', targetFiveStars_jue, targetFiveStars_weapon_jue, currentPulls_jue, currentPulls_weapon_jue, target4Stars, current4Pulls, draw4Star, hardPity, hardPityWeapon, 0);

				const combinedPull = poolYuan.totalPull + poolTie.totalPull + poolJue.totalPull;
				cluster.add(combinedPull);

				totalHartIn += poolYuan.hartIn + poolTie.hartIn + poolJue.hartIn;
				totalHartOut += poolYuan.hartOut + poolTie.hartOut + poolJue.hartOut;
				totalPull4success += poolYuan.pull4success + poolTie.pull4success + poolJue.pull4success;
			}

			const average = cluster.getAverage();
			const min = cluster.getMin();
			const max = cluster.getMax();
			const median = cluster.getMedian();

			const endTime = new Date();
			const elapsedTime = endTime - startTime;

			let total = totalHartIn + totalHartOut;
			let percentage = 0;
			if (total > 0) percentage = (totalHartIn / total) * 100;

			const pullData = cluster.getData();
			const pullCounts = {};
			pullData.forEach(pull => {
				pullCounts[pull] = (pullCounts[pull] || 0) + 1;
			});

			const totalPulls = pullData.length;
			const labels = Object.keys(pullCounts);
			const percentages = Object.values(pullCounts).map(count => (count / totalPulls) * 100);
			const cumulativePercentages = [];
			let p10d = 0, p90d = 0;
			percentages.reduce((acc, curr, idx) => {
				const cumulative = acc + curr;
				if (p10d === 0 && cumulative >= 10) p10d = labels[idx];
				if (p90d === 0 && cumulative >= 90) p90d = labels[idx];
				cumulativePercentages.push(cumulative.toFixed(5));
				return cumulative;
			}, 0);

			let extraLine = '';
			if (draw4Star) {
				const successRate = ((totalPull4success / simTimes) * 100).toFixed(2);
				extraLine = `<p>${t('successRate4')}: ${successRate}%</p>`;
			}

			const resultDiv = document.getElementById('result');
			resultDiv.style.backgroundColor = '#e6f7ff';
			resultDiv.style.padding = '10px';
			resultDiv.style.borderRadius = '5px';
			resultDiv.innerHTML = `
				<p>${t('expected')}: ${average}</p>
				<p>${t('p10')}: ${p10d}</p>
				<p>${t('p50')}: ${median}</p>
				<p>${t('p90')}: ${p90d}</p>
				${extraLine}
				<p>${t('runtime')}: ${elapsedTime} ${t('ms')}</p>
			`;

			const ctx = document.getElementById('resultChart').getContext('2d');
			if (window.resultChart instanceof Chart) window.resultChart.destroy();
			window.resultChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [{
						label: t('chartLabel'),
						data: cumulativePercentages,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 2,
						fill: true,
						pointRadius: 0
					}]
				},
				options: {
					interaction: { mode: 'nearest', axis: 'x', intersect: false },
					plugins: { tooltip: { callbacks: { label: function(context){ return `${context.dataset.label}: ${context.raw}%`; } } } },
					scales: { x: { title: { display: true, text: t('chartXAxis') } }, y: { title: { display: true, text: t('chartYAxis') }, beginAtZero: true, max: 100 } },
					elements: { line: { tension: 0.4 }, point: { hoverRadius: 8, hitRadius: 10 } }
				}
			});

			resolve();
		}, 50);
	});
}
class StatisticsCluster {
	constructor() {
		this.data = [];
		this.min = Infinity;
		this.max = -Infinity;
		this.sum = 0;
		this.avg = 0;
	}

	add(value) {
		if (Number.isInteger(value)) {
			if (value < this.min) this.min = value;
			if (value > this.max) this.max = value;

			this.sum += value;
			this.data.push(value);
			this.avg = this.sum / this.data.length;
		} else {
			throw new Error("Value must be an integer.");
		}
	}

	getAverage() {
		return this.avg;
	}

	getMin() {
		return this.min;
	}

	getMax() {
		return this.max;
	}

	getData() {
		return this.data;
	}

	getMedian() {
		if (this.data.length === 0) return null;

		const sortedData = [...this.data].sort((a, b) => a - b);
		const midIndex = Math.floor(sortedData.length / 2);

		return sortedData.length % 2 !== 0
			? sortedData[midIndex]
			: (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
	}
}

document.querySelectorAll('input[name="poolType"]').forEach(radio => {
	radio.addEventListener('change', function() {
		const selectedPoolType = document.querySelector('input[name="poolType"]:checked').value;
		const hardCountSection = document.getElementById('hardCount');
		const hardCountLabelSection = document.getElementById('hardCountLabel');

		const loadingImg = document.querySelector('#loadingOverlay img');
		
		if (selectedPoolType === 'yuan') {
			hardCountSection.style.display = 'inline';
			hardCountLabelSection.style.display = 'inline';
			loadingImg.src = `image/gi_load.gif`;
		} else if (selectedPoolType === 'tie') {
			hardCountSection.style.display = 'none';
			hardCountLabelSection.style.display = 'none';
			loadingImg.src = `image/37d.gif`;
		} else if (selectedPoolType === 'jue') {
			hardCountSection.style.display = 'none';
			hardCountLabelSection.style.display = 'none';
			loadingImg.src = `image/zzz_fufueat.gif`;
		}
		
	});
});

window.onload = function() {
	const selectedPoolType = document.querySelector('input[name="poolType"]:checked').value;
	const hardCountSection = document.getElementById('hardCount');
	const hardCountLabelSection = document.getElementById('hardCountLabel');
	if (selectedPoolType === 'yuan') {
		hardCountSection.style.display = 'inline';
		hardCountLabelSection.style.display = 'inline';
	} else {
		hardCountSection.style.display = 'none';
		hardCountLabelSection.style.display = 'none';
	}
	
	
};

document.addEventListener('DOMContentLoaded', function () {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', (e) => {
            //e.preventDefault();
            // Toggle active class on click
            tooltip.classList.toggle('active');
        });

        // Close tooltip if clicked outside
        document.addEventListener('click', (event) => {
            if (!tooltip.contains(event.target)) {
                tooltip.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const draw4StarCheckbox = document.getElementById('draw4Star');
    const form4StarsSection = document.querySelector('.form4stars');

    function toggleForm4Stars() {
        form4StarsSection.style.display = draw4StarCheckbox.checked ? 'block' : 'none';
    }

    toggleForm4Stars();
    draw4StarCheckbox.addEventListener('change', toggleForm4Stars);
});

