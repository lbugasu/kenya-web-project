import matplotlib.pyplot as plt
import json

data = json.loads(open('data/combinedWebsiteData.json').read())

# Performance
t = []
# download size
m = 0
totalTime = 0
count = 0
for dataPoint in data:
    timeString = dataPoint['daily time on site'].split(':')
    time = int(timeString[0])
    totalTime += int(timeString[0])*60 + int(timeString[1])
    count += 1
    t.append(time)
    if(time > m):
        m = time

# plotting points as a scatter plot
# setting the ranges and no. of intervals
range = (0, m)
bins = m

# plotting a histogram
plt.hist(t, bins, range, color='#00695c',
         histtype='bar', rwidth=0.8)

# x-axis label
plt.xlabel('time in minutes')
# frequency label
plt.ylabel('No. of websites')
# plot title
plt.title('Time Spent on A Website')

# function to show the plot
print("average time spent on site: " + str((totalTime/count)/60) + " mins.")
plt.show()
