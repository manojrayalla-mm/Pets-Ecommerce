# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy pom.xml first (cache dependencies layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# ---- Run Stage ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR
COPY --from=build /app/target/pet-kingdom-1.0.0.jar app.jar

# Railway injects PORT at runtime
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
