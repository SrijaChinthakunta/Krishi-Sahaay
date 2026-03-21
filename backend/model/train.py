import tensorflow as tf
from tensorflow.keras import layers, models

train_path = "model/dataset/train"
valid_path = "model/dataset/valid"

# Load datasets
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    train_path,
    image_size=(128, 128),
    batch_size=32
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    valid_path,
    image_size=(128, 128),
    batch_size=32
)

class_names = train_ds.class_names
print("Classes:", class_names)

# Normalize
train_ds = train_ds.map(lambda x, y: (x / 255.0, y))
val_ds = val_ds.map(lambda x, y: (x / 255.0, y))

# Model
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    layers.MaxPooling2D(),

    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(),

    layers.Conv2D(128, (3,3), activation='relu'),
    layers.MaxPooling2D(),

    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(len(class_names), activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train with validation
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=5
)

# Save model
model.save("model/plant_model.h5")

# Save class names
with open("model/classes.txt", "w") as f:
    for name in class_names:
        f.write(name + "\n")