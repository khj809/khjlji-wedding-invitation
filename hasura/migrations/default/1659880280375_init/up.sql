SET check_function_bodies = false;
CREATE TABLE public."Comments" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    text text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public."Gifts" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    link text NOT NULL
);
CREATE TABLE public."Reservations" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    "giftId" text NOT NULL,
    "userId" text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now()
);
CREATE TABLE public."Users" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    provider text NOT NULL,
    key text NOT NULL
);
ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Gifts"
    ADD CONSTRAINT "Gifts_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_userId_giftId_key" UNIQUE ("userId", "giftId");
ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_provider_key_key" UNIQUE (provider, key);
ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES public."Gifts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
