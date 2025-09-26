# Thesis
df <- read.csv("responses.csv", header = TRUE, sep = ",")


# Data Cleaning

## Participants not using Chrome
df_filtered <- df[grepl("^Chrome", df$browser), ]

## Participants who simply wanted to make quick progress
df_filtered <- df_filtered[rowSums(df_filtered[, c("a11y1task", "a11y2task", "a11y3task", "a11y4task")] == 0, na.rm = TRUE) < 3, ]
df_filtered <- df_filtered[rowSums(df_filtered[, c("a11y6task", "a11y7task", "a11y8task", "a11y9task")] == 0, na.rm = TRUE) < 3, ]
df_filtered <- df_filtered[rowSums(df_filtered[, c("ina11y1task", "ina11y2task", "ina11y3task", "ina11y4task")] == 0, na.rm = TRUE) < 3, ]
df_filtered <- df_filtered[rowSums(df_filtered[, c("ina11y6task", "ina11y7task", "ina11y8task", "ina11y9task")] == 0, na.rm = TRUE) < 3, ]
nrow(df_filtered)


# Data Aggregation
df_filtered[df_filtered == ""] <- NA


## Task 1

### Answers
df_filtered$a11y1task <- ifelse(is.na(df_filtered$a11y1task), df_filtered$ina11y6task, df_filtered$a11y1task)
colnames(df_filtered)[colnames(df_filtered) == "a11y1task"] <- "accessible_1_task"
df_filtered$ina11y1task <- ifelse(is.na(df_filtered$ina11y1task), df_filtered$a11y6task, df_filtered$ina11y1task)
colnames(df_filtered)[colnames(df_filtered) == "ina11y1task"] <- "inaccessible_1_task"

### Timing
df_filtered$a11y1taskTime <- ifelse(is.na(df_filtered$a11y1taskTime), df_filtered$ina11y6taskTime, df_filtered$a11y1taskTime)
colnames(df_filtered)[colnames(df_filtered) == "a11y1taskTime"] <- "accessible_1_taskTime"
df_filtered$ina11y1taskTime <- ifelse(is.na(df_filtered$ina11y1taskTime), df_filtered$a11y6taskTime, df_filtered$ina11y1taskTime)
colnames(df_filtered)[colnames(df_filtered) == "ina11y1taskTime"] <- "inaccessible_1_taskTime"


## Task 2

### Answers
df_filtered$a11y2task <- ifelse(is.na(df_filtered$a11y2task), df_filtered$ina11y7task, df_filtered$a11y2task)
colnames(df_filtered)[colnames(df_filtered) == "a11y2task"] <- "accessible_2_task"
df_filtered$ina11y2task <- ifelse(is.na(df_filtered$ina11y2task), df_filtered$a11y7task, df_filtered$ina11y2task)
colnames(df_filtered)[colnames(df_filtered) == "ina11y2task"] <- "inaccessible_2_task"

### Timing
df_filtered$a11y2taskTime <- ifelse(is.na(df_filtered$a11y2taskTime), df_filtered$ina11y7taskTime, df_filtered$a11y2taskTime)
colnames(df_filtered)[colnames(df_filtered) == "a11y2taskTime"] <- "accessible_2_taskTime"
df_filtered$ina11y2taskTime <- ifelse(is.na(df_filtered$ina11y2taskTime), df_filtered$a11y7taskTime, df_filtered$ina11y2taskTime)
colnames(df_filtered)[colnames(df_filtered) == "ina11y2taskTime"] <- "inaccessible_2_taskTime"


## Task 3

### Answers
df_filtered$a11y3task <- ifelse(is.na(df_filtered$a11y3task), df_filtered$ina11y8task, df_filtered$a11y3task)
colnames(df_filtered)[colnames(df_filtered) == "a11y3task"] <- "accessible_3_task"
df_filtered$ina11y3task <- ifelse(is.na(df_filtered$ina11y3task), df_filtered$a11y8task, df_filtered$ina11y3task)
colnames(df_filtered)[colnames(df_filtered) == "ina11y3task"] <- "inaccessible_3_task"

### Timing
df_filtered$a11y3taskTime <- ifelse(is.na(df_filtered$a11y3taskTime), df_filtered$ina11y8taskTime, df_filtered$a11y3taskTime)
colnames(df_filtered)[colnames(df_filtered) == "a11y3taskTime"] <- "accessible_3_taskTime"
df_filtered$ina11y3taskTime <- ifelse(is.na(df_filtered$ina11y3taskTime), df_filtered$a11y8taskTime, df_filtered$ina11y3taskTime)
colnames(df_filtered)[colnames(df_filtered) == "ina11y3taskTime"] <- "inaccessible_3_taskTime"


## Task 4

### Answers
df_filtered$a11y4task <- ifelse(is.na(df_filtered$a11y4task), df_filtered$ina11y9task, df_filtered$a11y4task)
colnames(df_filtered)[colnames(df_filtered) == "a11y4task"] <- "accessible_4_task"
df_filtered$ina11y4task <- ifelse(is.na(df_filtered$ina11y4task), df_filtered$a11y9task, df_filtered$ina11y4task)
colnames(df_filtered)[colnames(df_filtered) == "ina11y4task"] <- "inaccessible_4_task"

### Timing
df_filtered$a11y4taskTime <- ifelse(is.na(df_filtered$a11y4taskTime), df_filtered$ina11y9taskTime, df_filtered$a11y4taskTime)
colnames(df_filtered)[colnames(df_filtered) == "a11y4taskTime"] <- "accessible_4_taskTime"
df_filtered$ina11y4taskTime <- ifelse(is.na(df_filtered$ina11y4taskTime), df_filtered$a11y9taskTime, df_filtered$ina11y4taskTime)
colnames(df_filtered)[colnames(df_filtered) == "ina11y4taskTime"] <- "inaccessible_4_taskTime"


## Task 5

### Answers
for (i in 1:8) {
  outcol <- paste0("accessible_5_task", i)
  hacker <- paste0("a11yvideo", i, "hacker1")
  merz <- paste0("a11yvideo", i, "merz2")
  in_hacker <- paste0("ina11yvideo", i, "hacker1")
  in_merz <- paste0("ina11yvideo", i, "merz2")
  
  correct_answers_hacker <- c("AO02", "AO02", "AO03", "AO04", "AO02", "AO04", "AO04", "AO02")
  correct_answers_merz <- c("AO02", "AO02", "AO02", "AO03", "AO01", "AO01", "AO03", "AO03")
  
  df_filtered[[outcol]] <- with(df_filtered,
    case_when(
      !is.na(get(hacker)) & get(hacker) == correct_answers_hacker[i] ~ 1,
      !is.na(get(hacker)) & get(hacker) != correct_answers_hacker[i] ~ 0,
      !is.na(get(merz)) & get(merz) == correct_answers_merz[i] ~ 1,
      !is.na(get(merz)) & get(merz) != correct_answers_merz[i] ~ 0,
      !is.na(get(in_hacker)) & get(in_hacker) == correct_answers_hacker[i] ~ 1,
      !is.na(get(in_hacker)) & get(in_hacker) != correct_answers_hacker[i] ~ 0,
      !is.na(get(in_merz)) & get(in_merz) == correct_answers_merz[i] ~ 1,
      !is.na(get(in_merz)) & get(in_merz) != correct_answers_merz[i] ~ 0,
      TRUE ~ NA_real_
    )
  )
}

for (i in 1:8) {
  outcol <- paste0("inaccessible_5_task", i)
  hacker <- paste0("a11yvideo", i, "hacker2")
  merz <- paste0("a11yvideo", i, "merz1")
  in_hacker <- paste0("ina11yvideo", i, "hacker2")
  in_merz <- paste0("ina11yvideo", i, "merz1")
  
  correct_answers_hacker <- c("AO02", "AO02", "AO03", "AO04", "AO02", "AO04", "AO04", "AO02")
  correct_answers_merz <- c("AO02", "AO02", "AO02", "AO03", "AO01", "AO01", "AO03", "AO03")
  
  df_filtered[[outcol]] <- with(df_filtered,
    case_when(
      !is.na(get(hacker)) & get(hacker) == correct_answers_hacker[i] ~ 1,
      !is.na(get(hacker)) & get(hacker) != correct_answers_hacker[i] ~ 0,
      !is.na(get(merz)) & get(merz) == correct_answers_merz[i] ~ 1,
      !is.na(get(merz)) & get(merz) != correct_answers_merz[i] ~ 0,
      !is.na(get(in_hacker)) & get(in_hacker) == correct_answers_hacker[i] ~ 1,
      !is.na(get(in_hacker)) & get(in_hacker) != correct_answers_hacker[i] ~ 0,
      !is.na(get(in_merz)) & get(in_merz) == correct_answers_merz[i] ~ 1,
      !is.na(get(in_merz)) & get(in_merz) != correct_answers_merz[i] ~ 0,
      TRUE ~ NA_real_
    )
  )
}

### Timing
for (i in 1:8) {
  outcol <- paste0("accessible_5_task", i, "Time")
  hacker <- paste0("a11yvideo", i, "hacker1Time")
  merz <- paste0("a11yvideo", i, "merz2Time")
  in_hacker <- paste0("ina11yvideo", i, "hacker1Time")
  in_merz <- paste0("ina11yvideo", i, "merz2Time")
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(hacker)), get(hacker),
           ifelse(!is.na(get(merz)), get(merz),
                  ifelse(!is.na(get(in_hacker)), get(in_hacker),
                         ifelse(!is.na(get(in_merz)), get(in_merz), NA)
                  )
           )
    )
  )
}

for (i in 1:8) {
  outcol <- paste0("inaccessible_5_task", i, "Time")
  hacker <- paste0("a11yvideo", i, "hacker2Time")
  merz <- paste0("a11yvideo", i, "merz1Time")
  in_hacker <- paste0("ina11yvideo", i, "hacker2Time")
  in_merz <- paste0("ina11yvideo", i, "merz1Time")
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(hacker)), get(hacker),
           ifelse(!is.na(get(merz)), get(merz),
                  ifelse(!is.na(get(in_hacker)), get(in_hacker),
                         ifelse(!is.na(get(in_merz)), get(in_merz), NA)
                  )
           )
    )
  )
}


## NASA-TLX

### Answers
for (i in 1:6) {
  outcol <- paste0("accessible_NASA_", i)
  nasa1 <- paste0("a11yNASA1.SQ00", i,".")
  nasa2 <- paste0("ina11yNASA2.SQ00", i,".")
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(nasa1)), get(nasa1), get(nasa2))
  )
}

for (i in 1:6) {
  outcol <- paste0("inaccessible_NASA_", i)
  nasa1 <- paste0("ina11yNASA1.SQ00", i,".")
  nasa2 <- paste0("a11yNASA2.SQ00", i,".")
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(nasa1)), get(nasa1), get(nasa2))
  )
}


## UEQ

### Answers
for (i in 1:26) {
  outcol <- paste0("accessible_UEQ_", i)
  if (i < 10) {
    ueq1 <- paste0("a11yUEQ1.SQ00", i, ".")
    ueq2 <- paste0("ina11yUEQ2.SQ00", i,".")
  } else {
    ueq1 <- paste0("a11yUEQ1.SQ0", i, ".")
    ueq2 <- paste0("ina11yUEQ2.SQ0", i,".")
  }
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(ueq1)), get(ueq1), get(ueq2))
  )
}

for (i in 1:26) {
  outcol <- paste0("inaccessible_UEQ_", i)
  if (i < 10) {
    ueq1 <- paste0("ina11yUEQ1.SQ00", i,".")
    ueq2 <- paste0("a11yUEQ2.SQ00", i,".")
  } else {
    ueq1 <- paste0("ina11yUEQ1.SQ0", i,".")
    ueq2 <- paste0("a11yUEQ2.SQ0", i,".")
  }
  
  df_filtered[[outcol]] <- with(
    df_filtered, 
    ifelse(!is.na(get(ueq1)), get(ueq1), get(ueq2))
  )
}

#### Export to Excel
library(writexl)

aggregated_accessible_ueq_df <- df_filtered[, grepl("^id$|^accessible_UEQ_", names(df_filtered))]
aggregated_inaccessible_ueq_df <- df_filtered[, grepl("^id$|^inaccessible_UEQ_", names(df_filtered))]

extract_last_digit <- function(x) {
  as.integer(substr(x, nchar(x), nchar(x)))
}

aggregated_accessible_ueq_df[-1] <- lapply(aggregated_accessible_ueq_df[-1], extract_last_digit)
aggregated_inaccessible_ueq_df[-1] <- lapply(aggregated_inaccessible_ueq_df[-1], extract_last_digit)

write_xlsx(aggregated_accessible_ueq_df, "accessible_ueq.xlsx")
write_xlsx(aggregated_inaccessible_ueq_df, "inaccessible_ueq.xlsx")


aggregated_df <- df_filtered[c(
  "id",
  "accessible_1_task", "inaccessible_1_task", 
  "accessible_2_task", "inaccessible_2_task",
  "accessible_3_task", "inaccessible_3_task",
  "accessible_4_task", "inaccessible_4_task",
  "accessible_1_taskTime", "inaccessible_1_taskTime", 
  "accessible_2_taskTime", "inaccessible_2_taskTime",
  "accessible_3_taskTime", "inaccessible_3_taskTime",
  "accessible_4_taskTime", "inaccessible_4_taskTime",
  "accessible_5_task1", "inaccessible_5_task1",
  "accessible_5_task2", "inaccessible_5_task2",
  "accessible_5_task3", "inaccessible_5_task3",
  "accessible_5_task4", "inaccessible_5_task4",
  "accessible_5_task5", "inaccessible_5_task5",
  "accessible_5_task6", "inaccessible_5_task6",
  "accessible_5_task7", "inaccessible_5_task7",
  "accessible_5_task8", "inaccessible_5_task8",
  "accessible_5_task1Time", "inaccessible_5_task1Time",
  "accessible_5_task2Time", "inaccessible_5_task2Time",
  "accessible_5_task3Time", "inaccessible_5_task3Time",
  "accessible_5_task4Time", "inaccessible_5_task4Time",
  "accessible_5_task5Time", "inaccessible_5_task5Time",
  "accessible_5_task6Time", "inaccessible_5_task6Time",
  "accessible_5_task7Time", "inaccessible_5_task7Time",
  "accessible_5_task8Time", "inaccessible_5_task8Time",
  "accessible_NASA_1", "inaccessible_NASA_1",
  "accessible_NASA_2", "inaccessible_NASA_2",
  "accessible_NASA_3", "inaccessible_NASA_3",
  "accessible_NASA_4", "inaccessible_NASA_4",
  "accessible_NASA_5", "inaccessible_NASA_5",
  "accessible_NASA_6", "inaccessible_NASA_6"
  )]

View(aggregated_df)


# Data Analysis
library(exact2x2)

n <- nrow(aggregated_df)

perform_exact_mcnemar <- function(firstColumn, secondColumn, alternative = "greater") {
  # Create contingency table
  table_mcnemar <- table(firstColumn, secondColumn)

  # Extract discordant pair counts
  x <- table_mcnemar["1", "0"]
  y <- table_mcnemar["0", "1"]
  m <- x + y
  
  # Run exact McNemar test
  result <- exact2x2::mcnemarExactDP(x, m, n, alternative = alternative, conf.level = 0.95)
  
  print(result)
  
  return(result)
}

plot_densities <- function(dens_acc, dens_inacc) {
  plot(dens_acc, lwd = 2, col = "blue", main = "Density: NASA-Summen", xlab = "Summe", xlim = range(c(dens_acc$x, dens_inacc$x)), ylim = range(c(dens_acc$y, dens_inacc$y)))
  lines(dens_inacc, lwd = 2, col = "red")
  
  legend("topright",
         legend = c("Accessible", "Inaccessible"),
         col = c("blue", "red"),
         lwd = 2)
}

# Normality Test on all without outliers
# Q1 <- quantile(aggregated_df$accessible_1_taskTime, 0.25)
# Q3 <- quantile(aggregated_df$accessible_1_taskTime, 0.75)
# IQR <- Q3 - Q1
# upper_limit <- Q3 + 1.5 * IQR
# filtered_data <- aggregated_df$accessible_1_taskTime[aggregated_df$accessible_1_taskTime <= upper_limit]
# plot(density(filtered_data))
# shapiro.test(filtered_data)


## Task 1

### Answers
aggregated_df$accessible_1_task <- ifelse(aggregated_df$accessible_1_task == 15, 1, 0)
aggregated_df$inaccessible_1_task <- ifelse(aggregated_df$inaccessible_1_task == 15, 1, 0)
result <- perform_exact_mcnemar(aggregated_df$accessible_1_task, aggregated_df$inaccessible_1_task)

### Timing
shapiro.test(aggregated_df$accessible_1_taskTime)
shapiro.test(aggregated_df$inaccessible_1_taskTime)
plot(density(aggregated_df$accessible_1_taskTime))
plot(density(aggregated_df$inaccessible_1_taskTime))

wilcox.test(aggregated_df$accessible_1_taskTime, aggregated_df$inaccessible_1_taskTime, paired = TRUE, alternative = "less")


## Task 2

### Answers
aggregated_df$accessible_2_task <- ifelse(aggregated_df$accessible_2_task == 352, 1, 0)
aggregated_df$inaccessible_2_task <- ifelse(aggregated_df$inaccessible_2_task == 637, 1, 0)
result <- perform_exact_mcnemar(aggregated_df$accessible_2_task, aggregated_df$inaccessible_2_task)

### Timing
shapiro.test(aggregated_df$accessible_2_taskTime)
shapiro.test(aggregated_df$inaccessible_2_taskTime)
plot(density(aggregated_df$accessible_2_taskTime))
plot(density(aggregated_df$inaccessible_2_taskTime))

wilcox.test(aggregated_df$accessible_2_taskTime, aggregated_df$inaccessible_2_taskTime, paired = TRUE, alternative = "less")


## Task 3

### Answers
aggregated_df$accessible_3_task <- ifelse(aggregated_df$accessible_3_task == 908, 1, 0)
aggregated_df$inaccessible_3_task <- ifelse(aggregated_df$inaccessible_3_task == 850, 1, 0)
result <- perform_exact_mcnemar(aggregated_df$accessible_3_task, aggregated_df$inaccessible_3_task)

### Timing
shapiro.test(aggregated_df$accessible_3_taskTime)
shapiro.test(aggregated_df$inaccessible_3_taskTime)
plot(density(aggregated_df$accessible_3_taskTime))
plot(density(aggregated_df$inaccessible_3_taskTime))

wilcox.test(aggregated_df$accessible_3_taskTime, aggregated_df$inaccessible_3_taskTime, paired = TRUE, alternative = "less")


## Task 4

### Answers
aggregated_df$accessible_4_task <- ifelse(aggregated_df$accessible_4_task == 193, 1, 0)
aggregated_df$inaccessible_4_task <- ifelse(aggregated_df$inaccessible_4_task == 113, 1, 0)
result <- perform_exact_mcnemar(aggregated_df$accessible_4_task, aggregated_df$inaccessible_4_task)

### Timing
shapiro.test(aggregated_df$accessible_4_taskTime)
shapiro.test(aggregated_df$inaccessible_4_taskTime)
plot(density(aggregated_df$accessible_4_taskTime))
plot(density(aggregated_df$inaccessible_4_taskTime))

wilcox.test(aggregated_df$accessible_4_taskTime, aggregated_df$inaccessible_4_taskTime, paired = TRUE, alternative = "less")

## Task 5

### Answers
cols_to_sum <- paste0("accessible_5_task", 1:8)
aggregated_df$correct_sum_per_row_task_5_accessible <- rowSums(aggregated_df[, cols_to_sum], na.rm = TRUE)

cols_to_sum <- paste0("inaccessible_5_task", 1:8)
aggregated_df$correct_sum_per_row_task_5_inaccessible <- rowSums(aggregated_df[, cols_to_sum], na.rm = TRUE)

dens_acc <- density(aggregated_df$correct_sum_per_row_task_5_accessible)
dens_inacc <- density(aggregated_df$correct_sum_per_row_task_5_inaccessible)

plot_densities(dens_acc, dens_inacc)

shapiro.test(aggregated_df$correct_sum_per_row_task_5_accessible)
shapiro.test(aggregated_df$correct_sum_per_row_task_5_inaccessible)

wilcox.test(aggregated_df$correct_sum_per_row_task_5_accessible, aggregated_df$correct_sum_per_row_task_5_inaccessible, paired = TRUE, alternative = "greater", exact = FALSE)

### Timing
cols_to_sum <- paste0("accessible_5_task", 1:8, "Time")
aggregated_df$correct_sum_per_row_task_5_accessible_time <- rowSums(aggregated_df[, cols_to_sum], na.rm = TRUE)

cols_to_sum <- paste0("inaccessible_5_task", 1:8, "Time")
aggregated_df$correct_sum_per_row_task_5_inaccessible_time <- rowSums(aggregated_df[, cols_to_sum], na.rm = TRUE)

dens_acc <- density(aggregated_df$correct_sum_per_row_task_5_accessible_time)
dens_inacc <- density(aggregated_df$correct_sum_per_row_task_5_inaccessible_time)

plot_densities(dens_acc, dens_inacc)

shapiro.test(aggregated_df$correct_sum_per_row_task_5_accessible_time)
shapiro.test(aggregated_df$correct_sum_per_row_task_5_inaccessible_time)

wilcox.test(aggregated_df$correct_sum_per_row_task_5_accessible_time, aggregated_df$correct_sum_per_row_task_5_inaccessible_time, paired = TRUE, alternative = "less")


## NASA-TLX

### Answers
extract_last_two_digits <- function(x) {
  as.integer(substr(x, nchar(x)-1, nchar(x)))
}

aggregated_accessible_nasa_df <- aggregated_df[, grepl("^id$|^accessible_NASA_", names(aggregated_df))]
aggregated_inaccessible_nasa_df <- aggregated_df[, grepl("^id$|^inaccessible_NASA_", names(aggregated_df))]

aggregated_accessible_nasa_df[-1] <- lapply(aggregated_accessible_nasa_df[-1], extract_last_two_digits)
aggregated_inaccessible_nasa_df[-1] <- lapply(aggregated_inaccessible_nasa_df[-1], extract_last_two_digits)

aggregated_accessible_nasa_df[-1] <- lapply(aggregated_accessible_nasa_df[-1], function(x) x - 1)
aggregated_inaccessible_nasa_df[-1] <- lapply(aggregated_inaccessible_nasa_df[-1], function(x) x - 1)

aggregated_accessible_nasa_df$accessible_NASA_4 <- abs(as.integer(aggregated_accessible_nasa_df$accessible_NASA_4 - 20))
aggregated_inaccessible_nasa_df$inaccessible_NASA_4 <- abs(as.integer(aggregated_inaccessible_nasa_df$inaccessible_NASA_4 - 20))

aggregated_accessible_nasa_df$sum <- rowSums(aggregated_accessible_nasa_df[-1], na.rm = TRUE)
aggregated_inaccessible_nasa_df$sum <- rowSums(aggregated_inaccessible_nasa_df[-1], na.rm = TRUE)

shapiro.test(aggregated_accessible_nasa_df$sum)
shapiro.test(aggregated_inaccessible_nasa_df$sum)

dens_acc <- density(aggregated_accessible_nasa_df$sum)
dens_inacc <- density(aggregated_inaccessible_nasa_df$sum)

plot_densities(dens_acc, dens_inacc)

t.test(aggregated_accessible_nasa_df$sum, aggregated_inaccessible_nasa_df$sum, paired = TRUE, alternative = "less")


## Moderation Analysis Captions
aggregated_df$usingsubsmoreoftenthannot <- ifelse(
  df_filtered$usingsubs.SQ001. %in% c("AO01", "AO02"),
  1,
  0
)

aggregated_df$correct_sum_per_row_task_5_accessible <- aggregated_df$correct_sum_per_row_task_5_accessible / 8
aggregated_df$correct_sum_per_row_task_5_inaccessible <- aggregated_df$correct_sum_per_row_task_5_inaccessible / 8

moderation_df <- data.frame(
  percentage_correct_acc = aggregated_df$correct_sum_per_row_task_5_accessible,
  percentage_correct_inacc = aggregated_df$correct_sum_per_row_task_5_inaccessible,
  binary_feature = aggregated_df$usingsubsmoreoftenthannot
)

df_long <- pivot_longer(
  moderation_df,
  cols = c(percentage_correct_acc, percentage_correct_inacc),
  names_to = "condition",
  values_to = "percentage_correct"
)

# Plot grouped bar chart with means calculated per group and error bars showing standard error
ggplot(df_long, aes(x = factor(binary_feature), y = percentage_correct, fill = condition)) +
  stat_summary(fun = mean, geom = "bar", position = position_dodge()) +
  stat_summary(fun.data = mean_se, geom = "errorbar", position = position_dodge(width = 0.9), width = 0.25) +
  labs(
    x = "Using subs more than ten",
    y = "Mean Percentage Correct",
    fill = "Condition"
  ) +
  theme_minimal()

wilcox.test(aggregated_df$correct_sum_per_row_task_5_accessible ~ aggregated_df$usingsubsmoreoftenthannot, data = aggregated_df)


## Moderation Analysis Tab-Key
aggregated_df$usingtabmoreoftenthanmouse <- ifelse(
  df_filtered$usingsubs.SQ001. %in% c("AO01", "AO02", "AO03"),
  1,
  0
)

moderation_df <- data.frame(
  time_acc = aggregated_df$accessible_2_taskTime,
  time_inacc = aggregated_df$inaccessible_2_taskTime,
  binary_feature = aggregated_df$usingtabmoreoftenthanmouse
)

df_long <- pivot_longer(
  moderation_df,
  cols = c(time_acc, time_inacc),
  names_to = "condition",
  values_to = "timing"
)

df_acc <- moderation_df[moderation_df$binary_feature == 1, c("binary_feature", "time_acc")]
df_inacc <- moderation_df[moderation_df$binary_feature == 1, c("binary_feature", "time_inacc")]

wilcox.test(df_acc$time_acc, df_inacc$time_inacc, paired = TRUE, alternative = "less")

# Plot grouped bar chart with means calculated per group and error bars showing standard error
ggplot(df_long, aes(x = factor(binary_feature), y = timing, fill = condition)) +
  stat_summary(fun = mean, geom = "bar", position = position_dodge()) +
  stat_summary(fun.data = mean_se, geom = "errorbar", position = position_dodge(width = 0.9), width = 0.25) +
  labs(
    x = "Using tab more than mouse",
    y = "Mean Timing",
    fill = "Condition"
  ) +
  theme_minimal()





