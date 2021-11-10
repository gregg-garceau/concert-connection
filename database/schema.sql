set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events" (
	"userId" integer NOT NULL,
	"eventId" serial NOT NULL,
	"eventName" TEXT NOT NULL,
	"artistName" TEXT NOT NULL,
	"venueName" TEXT NOT NULL,
	"eventLocation" TEXT NOT NULL,
	"eventDate" TEXT NOT NULL,
	"covidRisk" TEXT NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
