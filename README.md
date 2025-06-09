# CreditDebitCardFraudDetection

# 💳 Credit/Debit Card Fraud Detection System

A machine learning-based system designed to detect fraudulent credit/debit card transactions. This project uses real-world data and various algorithms to identify potentially suspicious activities, helping financial institutions reduce losses and enhance security.

---

## 🚀 Features

- Preprocessing of real-world transaction data
- Detection of fraudulent transactions using ML algorithms
- Exploratory Data Analysis (EDA) and visualization
- Model evaluation and performance metrics
- Scalable and easy to integrate with financial systems

---

## 📊 Algorithms Used

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost / LightGBM (optional)
- Neural Network (optional)

---

## 🧠 Dataset

We used the [Kaggle Credit Card Fraud Detection Dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud), which contains:

- **Transactions**: 284,807
- **Frauds**: 492 (highly imbalanced dataset)
- **Features**: 30 (including time, amount, and anonymized PCA components)

---

## 🧰 Tech Stack

- **Language**: Python 3.x
- **Libraries**: 
  - NumPy, Pandas
  - Scikit-learn
  - Matplotlib, Seaborn
  - Imbalanced-learn (for SMOTE/oversampling)
  - Jupyter Notebook / Google Colab
- **Optional**: Flask or Streamlit for deployment

---

## 🔎 Exploratory Data Analysis (EDA)

- Class imbalance visualization
- Correlation heatmap
- Distribution of transaction amounts and time
- Box plots and PCA visualizations

---

## ⚙️ Model Workflow

1. Load and explore the dataset
2. Preprocess data (scaling, handling imbalance)
3. Split data into training/testing sets
4. Train multiple ML models
5. Evaluate using accuracy, precision, recall, F1-score, AUC
6. Plot confusion matrix and ROC curve
7. (Optional) Save best model for deployment

---

## 📈 Evaluation Metrics

- **Accuracy**
- **Precision**
- **Recall**
- **F1-Score**
- **AUC-ROC Curve**

Imbalanced data is addressed using:
- SMOTE (Synthetic Minority Over-sampling Technique)
- Random Under-sampling

---

## 💻 How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/card-fraud-detection.git
   cd card-fraud-detection


Install dependencies:
pip install -r requirements.txt


Run the Jupyter notebook:
jupyter notebook

To deploy the model using Streamlit:
streamlit run app.py

# 📂 Project Structure
📁 card-fraud-detection/
├── 📄 README.md
├── 📄 requirements.txt
├── 📄 fraud_detection.ipynb
├── 📁 models/             # saved ML models
├── 📁 data/               # dataset (CSV)
├── 📁 images/             # EDA and results plots
└── 📄 app.py              # optional web app


# 🛡️ Challenges Addressed

Highly imbalanced dataset
Real-time fraud detection simulation
Preventing false positives and false negatives
Trade-off between recall (catching fraud) and precision (avoiding false alarms)


# 📌 Future Enhancements

Real-time data pipeline with Kafka
Integration with APIs for real banking systems
Advanced deep learning models (e.g., LSTM for time-series)
Dashboard using Power BI or Streamlit


# 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
