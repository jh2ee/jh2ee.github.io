---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RP2F3T2E%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIHS%2B%2FdCpIPPadMv8RM9nqLAnkLwfVCqxFgT97yV2tvHQAiEAvFcTgdfpcCVNnJw%2FZSVqif%2B7feNxLXwwV4KUkLArqTMq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDLh9WOYztLimFIkKcyrcA%2BtP%2FndoTgBtwDlJQzXspp2ZH4mikLjXcGZM0kvRaRxxR2bOlaX015kkgF846f%2BjhMPHdGZQMe6RqL7DcLA5wjIuKUPwFJpb8eFV2VWHu73uACGLUxYJC0h6NdKJvJSpD4po8Hz2pGeEXpZhP1LxzIv%2FEIR0XtK%2B%2F%2Bo72c9sIeiiyrBPSF6QiskpYYht2dv6F3NkD2r%2FxxiWOa2WaAbaUh2%2BW3jkU8mce7iHdcjRaE9AWgT1v%2FXanoXIHPINlpaxA%2F1QW%2FYCH8dRXunHMvhAtFCpTUydFHeLnc9q9yXX8AWkLKUB27VnRHBj5Nipw5CVasgd7q3xBW2p9kF0Nz4%2FZ3SFm%2F7bKy%2F0yKPBJCrZBhkOqbvEAfeUAC0QJKAIwJFy51FobDzVhzneoWBDgiv40jk0aijn29iR%2FpJvkCG%2FR90BEbboh0UzJSuvkgGLaSY%2FPtq8YAEvCDVPenf4BsS%2BuM4oPjCpji7FdQFfOtQ%2FqtBC2e1ac%2FHiYd953xcdzMXexFNYk3V%2FRMI9cA1Oy1EwgW%2BMXlDplwX744waJ2t5PnHdsw4nyh0APSW5O07yzPfFLhnzulwBbUDdjCoGx%2BfEKClvfbKQTbHa8UMb6XNnwPdUq36U2tCDGVcO7pm6MJCw6M4GOqUBoJy1EMyi8NEMNmP1YuaqrFC%2BionJYgzjZWmazpbw54F%2FkB5F25DInCA7QyTdF%2F2Zio14iNZ2luUMKHtGhiDuuYqeqYMl2vR6iR5bYltOjPjelUW9%2FhFQ96dZcmYedqE6LahC1xcdTLOe2hX15GAd6jKSoFDmyVY%2BmAx15qekw7UMbaXER8D6XXGsVIYPykogyMrPEnPCfvxboLjmrSoK2MT0KkK8&X-Amz-Signature=663308f7c407266f76f05b680263206a3782672a435ce971a5c87d5e761558a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RP2F3T2E%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIHS%2B%2FdCpIPPadMv8RM9nqLAnkLwfVCqxFgT97yV2tvHQAiEAvFcTgdfpcCVNnJw%2FZSVqif%2B7feNxLXwwV4KUkLArqTMq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDLh9WOYztLimFIkKcyrcA%2BtP%2FndoTgBtwDlJQzXspp2ZH4mikLjXcGZM0kvRaRxxR2bOlaX015kkgF846f%2BjhMPHdGZQMe6RqL7DcLA5wjIuKUPwFJpb8eFV2VWHu73uACGLUxYJC0h6NdKJvJSpD4po8Hz2pGeEXpZhP1LxzIv%2FEIR0XtK%2B%2F%2Bo72c9sIeiiyrBPSF6QiskpYYht2dv6F3NkD2r%2FxxiWOa2WaAbaUh2%2BW3jkU8mce7iHdcjRaE9AWgT1v%2FXanoXIHPINlpaxA%2F1QW%2FYCH8dRXunHMvhAtFCpTUydFHeLnc9q9yXX8AWkLKUB27VnRHBj5Nipw5CVasgd7q3xBW2p9kF0Nz4%2FZ3SFm%2F7bKy%2F0yKPBJCrZBhkOqbvEAfeUAC0QJKAIwJFy51FobDzVhzneoWBDgiv40jk0aijn29iR%2FpJvkCG%2FR90BEbboh0UzJSuvkgGLaSY%2FPtq8YAEvCDVPenf4BsS%2BuM4oPjCpji7FdQFfOtQ%2FqtBC2e1ac%2FHiYd953xcdzMXexFNYk3V%2FRMI9cA1Oy1EwgW%2BMXlDplwX744waJ2t5PnHdsw4nyh0APSW5O07yzPfFLhnzulwBbUDdjCoGx%2BfEKClvfbKQTbHa8UMb6XNnwPdUq36U2tCDGVcO7pm6MJCw6M4GOqUBoJy1EMyi8NEMNmP1YuaqrFC%2BionJYgzjZWmazpbw54F%2FkB5F25DInCA7QyTdF%2F2Zio14iNZ2luUMKHtGhiDuuYqeqYMl2vR6iR5bYltOjPjelUW9%2FhFQ96dZcmYedqE6LahC1xcdTLOe2hX15GAd6jKSoFDmyVY%2BmAx15qekw7UMbaXER8D6XXGsVIYPykogyMrPEnPCfvxboLjmrSoK2MT0KkK8&X-Amz-Signature=663308f7c407266f76f05b680263206a3782672a435ce971a5c87d5e761558a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPUC3RZG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIFx2MvYhMXocg0QhGMWhH7jzzDHQrWLqwWZhHqZdto%2FwAiB1VMjS9oaAu0Uaay5QVzhPbeC2jAvGdhqCCpw5hk%2BlRyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMSA6VvVa4A3ujGrQZKtwDQ%2BPJqd5UT3okjD8%2BIzDLsbqRhCOiTKkhTDQ7dDFKOPUfdHYPZvgFK2fxEbsUl3DuhmMb6DVWtgfS8f5wapN9Ogf4%2Fc7%2BYo%2B4B2yvRNIObSr2BJsakpMtWESkQM5XJlLwP9rUkegpqmhgtQua%2BlctH34WgnTLq0RTEhCiDC83LZ%2BI4wI4rBqWEedkrGibBZFFyNy2MWVBRixmyFSSaj0Rk%2BIA8LVqeEX%2BA3bHUHY1tabk6CvSca9OmVW7SnMose5hcpvfhQcy6ecq99FMRQxLG9mWcRvDtGo32ZNDgAW%2FJ6IdcFGmjYlbCQzkVvnlA33zMnf2XirQj9%2Fg7%2BJYm2birK3Fi%2FOpmG6pn1x%2BOfZx8yJ9padj0u5RMLs1yU1OonRUcMi695cNk70vXMHK%2FRaead3nQHLJYbpA4dywdyJO6qLciWmSqk5DRAMdkv7Wga1Vl0NecgTy5%2FXM4l7g4CewZScON6Bm6GLnTkI05z8DNQW3YNUI9UPZBlL3JMmL7Ln%2BEzsMiq%2Bhm68Iq12sa5D6N6MFdvBe9ICbx3klQ1hvh2wSA9h5h1%2FFj8OCFIJuWg8qqKkjy8KRqLfi1TSWMFvsxIO78xEz9ujCsWgA7apDa6Gh0euWF3hv41ymJrYw4a%2FozgY6pgHouHfvkWyzbPpzG7GxTZorfe6Bej9hcwwP8xQuFcKiD34axCjNC2XxJh4D%2FP7ey0TvUd2TM%2FlIYsc2fPnHLT3TEqGWIHPdGU2GYRVKv3os1Xr29U1Z2j1UVQ4AJOVqvURseda%2BUDPt%2FSG1KCbS4is28KRxyEcqDLhEGn2TVc6d%2FGcF3P7nI97YAZAFgkDYlxinHC989x9OWCkV2AsXPwGDfnROFbwi&X-Amz-Signature=4cff6e8984ae9d8fde470b5c9f121b258ae37549dc0cffade9656e0872af3968&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKHA4GW5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIFQW36chrQiL3Kou%2BKD6IqBAMtQTG21z9szEAZWqTrH9AiEAs1A6z3oAZ%2FnaO431rxKtotS9y6lNG7RykomHb85H49Eq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDMDtjC2rfxVT8vA9uyrcA5xtc0moynkZNm%2FVeCInfvyvIk9Ok%2F9coaTtZGzmLrHyAXpIsIxhgVV3mQVzxbgtLqEiqpKXSa0ydm0%2F00y1jiu4uaAuqHyi4uU70p1mUCX3zgfXuLrwQKwleqDWi08DdbamdtEgVadFDt4V%2FDrb42ojSMYdPjDjHKkMCLLL%2BB803NaKcTCFYNXrJrHdS5K6DkGOILs9XjeH4JGop0yH6N7Wfzr8Gy3PRs9ImK4LVoX3gUDGNj9Owyk0fqb6GbgfvZpephmmjue%2BDYmKI5vRw8QObDz2MYnTuGUwWR3VnEULK%2FBJuajhAFPg87rrZ0wVds5pbL4JVJxDp62xP5acJclL2bAwUSu3l9Lt4mhZXsCO8QVuK097dQD0wI%2FJDG0mekH%2F9HWOHsTOS7%2FCme05eCO%2B%2Bagk8tcrnnKcu9vd5R5zguqSLnKKJsxd5hFKqhZhS%2FPqZjbySbSASQno5giFyFd9yRJvnAw%2BNlZx4smzKj%2FR7bV3TLC1LVot8yE5InT62YVrBbx3zlAPfSdS8WUA%2BhRN13gZNhZTp%2FLVM5VTWmp0ptQJkrnqd3mbnC6kqExTg84U6hYmjNEw25aLJQRt5q7eTof%2BBUmCiLUMYa2UmKhhq2xzI7n1rhfXgmsJMNit6M4GOqUBww6PAds0tOWMV5mo6NhYEUKySRSfs46LcMc%2FGPt4soeysIXDD2F%2BtWsQA4tyChPjPzHgnBuddIzQH7h4JXq3rjAX9WbaJ9mgLGVVYhQKmR3KH0ABEfXBxsbm055G2yaEtsqvgCt8yI82qJoGdW%2BdS5nytyqSd7%2FKzCjoz4Qoq3rsmUTF4MeSCytG%2BDsDwQlFi0a%2B3VNXL8JzlFsod0BC%2BHZkcV5l&X-Amz-Signature=8774b18d01cbd50d946f4e364365e2904cce86319b0175802b6a1c4ac4826d53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKHA4GW5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIFQW36chrQiL3Kou%2BKD6IqBAMtQTG21z9szEAZWqTrH9AiEAs1A6z3oAZ%2FnaO431rxKtotS9y6lNG7RykomHb85H49Eq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDMDtjC2rfxVT8vA9uyrcA5xtc0moynkZNm%2FVeCInfvyvIk9Ok%2F9coaTtZGzmLrHyAXpIsIxhgVV3mQVzxbgtLqEiqpKXSa0ydm0%2F00y1jiu4uaAuqHyi4uU70p1mUCX3zgfXuLrwQKwleqDWi08DdbamdtEgVadFDt4V%2FDrb42ojSMYdPjDjHKkMCLLL%2BB803NaKcTCFYNXrJrHdS5K6DkGOILs9XjeH4JGop0yH6N7Wfzr8Gy3PRs9ImK4LVoX3gUDGNj9Owyk0fqb6GbgfvZpephmmjue%2BDYmKI5vRw8QObDz2MYnTuGUwWR3VnEULK%2FBJuajhAFPg87rrZ0wVds5pbL4JVJxDp62xP5acJclL2bAwUSu3l9Lt4mhZXsCO8QVuK097dQD0wI%2FJDG0mekH%2F9HWOHsTOS7%2FCme05eCO%2B%2Bagk8tcrnnKcu9vd5R5zguqSLnKKJsxd5hFKqhZhS%2FPqZjbySbSASQno5giFyFd9yRJvnAw%2BNlZx4smzKj%2FR7bV3TLC1LVot8yE5InT62YVrBbx3zlAPfSdS8WUA%2BhRN13gZNhZTp%2FLVM5VTWmp0ptQJkrnqd3mbnC6kqExTg84U6hYmjNEw25aLJQRt5q7eTof%2BBUmCiLUMYa2UmKhhq2xzI7n1rhfXgmsJMNit6M4GOqUBww6PAds0tOWMV5mo6NhYEUKySRSfs46LcMc%2FGPt4soeysIXDD2F%2BtWsQA4tyChPjPzHgnBuddIzQH7h4JXq3rjAX9WbaJ9mgLGVVYhQKmR3KH0ABEfXBxsbm055G2yaEtsqvgCt8yI82qJoGdW%2BdS5nytyqSd7%2FKzCjoz4Qoq3rsmUTF4MeSCytG%2BDsDwQlFi0a%2B3VNXL8JzlFsod0BC%2BHZkcV5l&X-Amz-Signature=17d39c6a1f37fc2e9dd5408c7f0ba33841d89ffbc847b154169fa47b82742575&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFH66H5U%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQD2tuJGeq2MfzHHyvwd7JBbcby9gqzpbexGP5KhVmkQaQIgMz1f7w41b1WLoEarGSo7jdWK0ZUBzhAy76G3lHFhwicq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDBZAAYtGZt1fOyfd2ircA4rJMFO8yv4B3PUN%2BFcM0XGEmNInEBdHMpcnuJarMnUg5R%2F9jTsQ3pXN1HtwLMU%2FTXsTXDfBBnWf4jJ80WkBO%2FUf4dHU%2BpDsWQDm1StYMH1c6DILb%2FQTZ1HpSFin5oqauodubGN7%2BFZCtl8%2FtDfVRL8n9JWGizaDDTW%2FJqpIdQ%2BGGYfzFbRDCRP4beKyOV7fRA8KChpVFmZNGu1bVqkgp6cgjsaIefLsC4kNNEZwMjm4z9aGnR3BlNjDM40VUACmiyxs4PHg3S5SecGM91TaeoF%2Bjk3SadM2O00fUb%2FxJfftZSRpaRzcpOfpE8qZKDHqnMrLQwsQTJF2JotMBuxtLu5%2BhkggFujXWmf3Hh%2BjlIJ284s%2BZdF88urxd8viOTeU5vQHKNefQuxEF1hiOE9GIn6W7I9XjV9szvnEgiSvaylwY8CWqBOyf3m7q6c1ijbauRpfm5dVGkPU2KgDpEbCipdihH5pGpU8Vxvru%2FvFkWkxzdHMBR2%2Fp5n6B5cgYD6oi8dxQoa5awUdNJYxlWCii6ioUzA4%2FJtiDt9IgQfz1MVHUzX72HftXD5jNc4JHuDutdxMoUKic4bdiCWTNfI6imXDhElhigKMWHktDnq3rNjYhf4BECs3Qn%2BAmM%2B1MJ6v6M4GOqUBeLihYEfJXI6enqJfMAjBZTKor1g6aTNwqlISOYtRqldlB0jaMOYS%2Bi3B9%2FjyMar1Z6rQ6E%2FgAMkF%2Fe6rpmf3LyuFP5WM7eMWN3vuRMwYgwTbNpV%2BIc5hqROx90lA4dh%2Fpui0RZPYcE3%2Fal%2FkvvHGvO7jZRf3CTBqloX8pzhyVlGwJwTvxQyDyXykHqMHjq3WnJF5I%2Ff%2BzwQntncTHzcTwagyhuK4&X-Amz-Signature=898e2baf1b081d94ac451190e5eda91796c89d3aa351aadb62b476561d2d635f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663MXH2O5%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQDdD0K6Xp9NwYeAzi0vRxMETsSkM0EnngRDyj1nsE70PQIhAJLxq8Scbu3pEJ%2FUHvmmlpML5ud6xA97f8Odo2%2Fgs%2BbiKv8DCEMQABoMNjM3NDIzMTgzODA1Igz4NlPV%2FL7FsZH5LyEq3ANa1lEhAdtp9%2BajgmlvSEcBZhNi%2Bg%2FoI6ZSD1KCe00p2AwuSTS%2Bh%2Fjg%2BZo9drKCq%2FCnM%2BMlWqyZXxDnFektT3L5hbKscAjew2fqq4rDoBaOLBWPEIKCovC0DJt8uLL9zBElpUSgQh9wr0kNb2i0rEyLPh%2FwHcGyK%2BiTGC%2BYmciUwFhqCzrVSI6WV8HVaUURUG%2B3ReJY9naR6Mf5MExarxe7QuLbpG5zcxhHQLplnsye9oHSlP6vTvPKPHP87LuPGvE8kwg6kkBdM3F%2BaZ%2BRqi7IuXfY%2F9MCls67XAF3wPYD8Z5B%2Byc%2BJ5r03uQTmbFL7XB6YsHC3OhMZDf9EaWKhll6rnLcWnY99JV8pmT65XRp2dlg9AyVkdA%2FaQtlyyz2mTDV%2BUz9gYtUCS3rhRlbn53RhmWzstnBpWjMgcOPS1G0YSpVVvyVX0lv1nWiQ7RlYt%2Frrf6hyLHOYRSJ0O0cnl5t0HzNzJZTx8Jg5oi%2BcB%2Br7noQNL3d5YmVHYULt4X%2B5GEWf4yyMHYAI963iXbJfOuB0Yostizwme1i5CKHmynkU2roy2zqVu%2B7xsU4xkPSd9wDeeNdIERDndqn097JifalxsiFVgey6OuneK1Bh2alRTsYll9X5KXzNptMpDCPr%2BjOBjqkAXVm4Lmh1458op%2BPHFdEDGssZEonyWQQr%2BCocL%2FkMsv1aqUvb%2F17HCqegS%2FQvfg1jzUytQHWNmjN9aTxb3fohxGHamuTvx0zn3B6oCAJNr94iQnndw6nzRwNPfL0woCF6vyEREiddHqWSsNRr3uMpS9FkDisvCMjvMJ%2F8N2qnfdcM7xsxLMY9nTFlge7g0dDiARv2WP%2Bcqc%2BuVMjqS5y1Dnri6Qq&X-Amz-Signature=8a24ab351531c849e8a3c3f20a0b6678866dc04f4f909bcba4720fa08a87a06c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEKVXPTQ%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCyaiszbsabtDlZx9ksH00tDmrmyGkwBMJfNSkfw1bRUQIhAPbuPkMEIzW04prBO82Xi4uhxhMy36nyD%2FwB03IisDVyKv8DCEMQABoMNjM3NDIzMTgzODA1Igx53VsaxrEZ03BRhjIq3AOhH20SBViEIFxTEEJN1wPnatTJwwWBXwUwiW4Q85%2FibEf2JfMF7Vt%2FRjVI6FJaXjDoK2Ztz498CY4tqlxvXxpk%2B52JVSwHskfJQyr3n0U5R1ex%2FAqz5IXWLxkbV8EFNQyDGPM6j%2Fr7QOlDJHJwe0OfauKZSmbruDg3BdtU083DU%2FSPkI%2BD4T%2FN4MgW9saFYPxWUj223AWJbY8kJTpdOmxOoClLSFowh%2F4PzSLLI%2FG3l9x9KCTUyIAtJqCaoDb8jKwAOLCW3oiXdkMwD%2BZlpkPhD3P251K6D79vxo1jGAP0zxQI26o%2BYNpiCayBJRLW1ZhXsxw2PZtFfWGbTbOR8m2lfgA0%2B%2FthLTRVMAou6ZVW4YvG0Ah3EtZ81vPknhccg7U41ZJxh%2FfWh4LfAmMEg%2BBBqX8L5JLwvkmNEYmpxio92vXEcLNO%2BXW4OC9mZMTE2z5v7FDwYZ5zH7Q8NVqNUX01cC0Vb4HcrrPAjA8cx9s8waiCfjm0qB2QDKOk9ah4V7y%2Fxin59qK2ocy%2BQE2o%2FKrpebNmmFMpH8S%2BPJmh9j2tYXfmkOmuf5PBwSR9gN%2FJddbEZ%2BL%2BRpSly534TnJE%2BIb%2BIbw4BLQp3U1H6FhB8ZSwvpJC5lT40aFDvpIAfDD0rejOBjqkAdEtUUcXvPh2tYZhHQl9V8odq%2B3DpJjSfmLY2IpvPkAKPuYKsKFJ9SbSNwa9vskR%2FRvuKoGuuDBfF5kxFb4mHvptzhUZDYvMp3TH8l9ZpCUN7YBRbo4YEl%2BGM5dc2EFwsnKsaYMXmvF5nZaJT9Rj80bmodaObgIjDC10T%2BOTa0p90WCTCVLWqfuWNVT2BbG8T3PqAwjgEVUxH6Oodr6XJvyvgaT3&X-Amz-Signature=61ce0909dc69f4c4ffc56e878d783a747b7252f53c74d39e92a7866dec876ee8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z43D33UN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDoWACo1CPcR251OiO48kXB3wwhKQ0j6rex2dl5los8wQIgL82EvtLwqm%2FmJr%2B2WA%2Bn5zAYpxRXSDTWvDQZN0Rjbz0q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCtD28BnO6tjN7m3qSrcAzTTMy75ZXw11kb%2B0gXaoRFyW%2FgPVrsAUleCjalLXJfKnSD0M%2F90Pn5d8CB3db9Pfc%2B9EKJtxDiIYSa9ya4%2BAnvtscIEehsdk0XO1dOsSOSyCKCm2xqLgM8RCYoPGF%2BU7vRRBIIFhcMuohYGLyhvkCwumlKFOHiH9uOSmbYSE5xk%2FNCuu%2Fq7oVdjSt%2FhAI8%2BIIk8AWyMumOZlnvq7g2AMpwv43g4H7rr4PCwSsZw4VqSzkL4F%2Bhs9doWj%2Fty1XR8vilUL2RI43it66rLp9%2ByQKrL9pryigT15UYW7cjuVAhPVfuj78kRqmLoERkK%2FsBniAFdI8rBQpuC%2FQKgYTq%2F5MnFpu9dJMCxJT4ITjH6KQAC4Bn8BoQ6isQFqjxxESE2pRNoDZGcwDa1El5WsnhKMolNcoR7DCE%2FxEL7HNB7uxta1LHP0dKUi3SnXhdc7TZgrMrwOcDfSPkDBdZTjtWfeipX2B7kjvvWl8CpgCd7jsx9Ms4kxFC9Xahlmt6vt233RkpaGmggHjEHL3d14ux%2BRJzfv67aEFJVMSy8dNDExFPaxNPFxnsbVRS9GE%2FbHN%2B9sB76RG4w%2F2C8V%2FRKVC87ugQWXs0zh9sj4CgIhaeimYPqYEQSEbHD4JXRrbjRMK%2Bt6M4GOqUBxb%2FhSa%2FukRTRxhVRhhZovm6QFXxJYoOUSHmajBUlo9ilGA2DPApJowMxfazu%2Fu1D0Lp9bKHnmwtoZy923BlZbu5qarN7PB%2Bepwvuenk11AstjqicNXvMi3aCnvg4ImoyOd03yXn%2B0ACeEaeAoQP8GxjjkczuSQiRNR0cdv8cKmWHn%2FDg6p7R55FeATOlQcQ3F1%2BGjFaHHQgLEFZ9UVS%2BJz34vA24&X-Amz-Signature=305f5478a0f9f03edff17ddaaf666aea7e3cc8a2c07c09df40d50c4e5df888a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z43D33UN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDoWACo1CPcR251OiO48kXB3wwhKQ0j6rex2dl5los8wQIgL82EvtLwqm%2FmJr%2B2WA%2Bn5zAYpxRXSDTWvDQZN0Rjbz0q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCtD28BnO6tjN7m3qSrcAzTTMy75ZXw11kb%2B0gXaoRFyW%2FgPVrsAUleCjalLXJfKnSD0M%2F90Pn5d8CB3db9Pfc%2B9EKJtxDiIYSa9ya4%2BAnvtscIEehsdk0XO1dOsSOSyCKCm2xqLgM8RCYoPGF%2BU7vRRBIIFhcMuohYGLyhvkCwumlKFOHiH9uOSmbYSE5xk%2FNCuu%2Fq7oVdjSt%2FhAI8%2BIIk8AWyMumOZlnvq7g2AMpwv43g4H7rr4PCwSsZw4VqSzkL4F%2Bhs9doWj%2Fty1XR8vilUL2RI43it66rLp9%2ByQKrL9pryigT15UYW7cjuVAhPVfuj78kRqmLoERkK%2FsBniAFdI8rBQpuC%2FQKgYTq%2F5MnFpu9dJMCxJT4ITjH6KQAC4Bn8BoQ6isQFqjxxESE2pRNoDZGcwDa1El5WsnhKMolNcoR7DCE%2FxEL7HNB7uxta1LHP0dKUi3SnXhdc7TZgrMrwOcDfSPkDBdZTjtWfeipX2B7kjvvWl8CpgCd7jsx9Ms4kxFC9Xahlmt6vt233RkpaGmggHjEHL3d14ux%2BRJzfv67aEFJVMSy8dNDExFPaxNPFxnsbVRS9GE%2FbHN%2B9sB76RG4w%2F2C8V%2FRKVC87ugQWXs0zh9sj4CgIhaeimYPqYEQSEbHD4JXRrbjRMK%2Bt6M4GOqUBxb%2FhSa%2FukRTRxhVRhhZovm6QFXxJYoOUSHmajBUlo9ilGA2DPApJowMxfazu%2Fu1D0Lp9bKHnmwtoZy923BlZbu5qarN7PB%2Bepwvuenk11AstjqicNXvMi3aCnvg4ImoyOd03yXn%2B0ACeEaeAoQP8GxjjkczuSQiRNR0cdv8cKmWHn%2FDg6p7R55FeATOlQcQ3F1%2BGjFaHHQgLEFZ9UVS%2BJz34vA24&X-Amz-Signature=aabdf9bc2409b2dc0bf19909aadf672644449303a259ba3be53790661503f7ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AIHUMI3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCQA8QzhLaTf3xo0Mme6vniJKe85SvkZAWR%2FbxtS%2BbjigIgZt%2BgtQanav3hH9Yo0wgHSHB4k3SdQg71%2F%2BaNaTxZAnkq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDEFIDjI%2B8%2F5tAEGDMircA68qqxVi%2BVhgUTo%2BomCGA%2FVe%2BMeMWVhV1ZHzIlyBfXLzfnO6NzSBCNNwiW5YopO4blauejxgctlGHnm5lne56LSgq5p4Xb7XxIOYUUPd9ox6tE0GepKi0oib2bPG4DchtMA37CTvAZJ%2FQSsQhF28KTFwxaq%2BjafQqgYW0uaWG7kkVvnmw782h91QYWvlk0Yl%2Fj1qcaH0cSySvnZiCpoSgzfVHQBz0IdA%2BrSgSvmNUsf6US7UgvbQAnyNhO%2B909JazeAoVa%2FKgXigG4XoWtz%2FKWyW%2Fd3Lak0kUqtwsS9tP6x%2FxoPXRfIiaCiWTYJ6CY5neKDZoZp2aQDsoQSqOBbnvStfDLzNJwEB6yIleBSib0OLS47sUkzmm%2FPhGrPmdQ8%2FCC824787%2BNRJjTjd7rzithz%2B744NoogmuWxncnD7hp1dECIzEMSvtFD8YJ6xFOkeTPsjfJJDON49K9fltrZRgSyc%2Ffn%2FS5oPHVKP6oG0gmk68rfkPMahFYxgJ3S5xONZQ1HWPfsU6tVCPH90EApU3qrxQaTGFfftzYR0oOMV3vHv8dpW5y4yDlpBL2qdzaTtqQVDebozpOF7bpMEKDWZFeGXgX9oWdHA4GpR9tGlHHo9NX8xphmPo61y7QqZMM2v6M4GOqUBGJ%2FE1jiiHn2TvnOo6K8Yk6IEGgbIkUmXNgw6Bd4T%2B3u4e6y3xlSW1wGxZHqDmq0Qq4CZhL5RQmlRoisnygg9TCloWhRbURdHqk6qrYwoOErdpDydE1DJJvvADrP5DjWMTdvPRAS1qMRzbMvLwHwpDbqnPIJAVjOkqyawLN53TNlqDrJDqHWnzLRJKiVan6XCnqazuGShznjWBNTxGcFyjeoGtaT1&X-Amz-Signature=80e9bd82b180829ac9d5a5e1f25bce7614c6cd12675265ff101d25ae9db18186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGWHAQYE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDQtPW9jQj9oFzyyIzJjOwYPe1B9lvx5mmwsMHCx9TEogIgNsTmOYKtLnsglBf1cGQrkdO4lPVY3KSkT0QvYA4PXuYq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDEvFgjNqEByfB9AHVCrcAx%2BgN46EQ4d5obYkhVFsHn88DY48AZKkAfeBVgR%2BYRnPQJkheXpMMjHsT8DUkxeipaT2TdAss62Gt%2BvWEBC7XTMWWzdCYhZeVXxy0ti7Jc9qWzWW9Wtqm2GWrhi2KdGy%2FNIS3O18e4P4w%2BFb2xTf3YzN6lMT4CGGGer1lYPy1rOnvbPdJnspfCIGQcnCgJ824%2Bw60qbxFttZ0Ms7jt3dYiEBB2M4WADx1JP5EH0dE0OWhR36gCczpL68tc1z1EyWR9BInp%2F1ZgrQinci9Ii%2F3EGLMZwIH7MlC8hdplM%2B7hT%2BrUbzlOoqAp%2Fk%2FBNXK7ly6rEF76U5IXL5rXOTRJe1tGkiJxR3%2F39NJ1awg1kkd6LxqXkV8yP8DobExuKPontg%2BIOumHaMI8L5rknCQPFuGVZRT4d8WunyuvLOI7iM%2BsaLkTEu7s%2BLeG0fIXOJfXv%2BI4jUKc6qWEJkEDqMsZmZnOtnOfyevCRBxLi37nHiFCDl20i%2FXR9rOpgok705uJJF2CCFeJwRwyd8BTxSJc%2Bz0eRbV%2FgFm1iOhM93r3LsK48BHdf%2B0Ppnaj4t5mtQ3wzOtQEO0G5AFANpXgV043lGiZTd1YIojJToRJ4DQYuXBnDGTl98dcy7dfUywshoMJCv6M4GOqUB0VzDAbNbuCcGM1hPXLTgSzRHi8Qf4QiUP6Q0CsyYyV5U3S5Sz5RGfV1U3JBot1O2ZCUcZ9bvIgcqWjcXW%2BQ0%2B5DMQUECeEINfrbq5gtjA3YxyXyEu3IXEwc8mTMmp8p7xSdQALwC%2BfX2AMiXyzqjHNfzqn1nzoouOl3Q2BONVZBliBvwf%2BLJJl7w5mD2mBgA6he3n5XMEkwjkfeFg9PyYHNwoghS&X-Amz-Signature=7da16a84b7013283f8cd79c7e13fe16629b5f7b6d66600987d60ba365302ed82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGWHAQYE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQDQtPW9jQj9oFzyyIzJjOwYPe1B9lvx5mmwsMHCx9TEogIgNsTmOYKtLnsglBf1cGQrkdO4lPVY3KSkT0QvYA4PXuYq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDEvFgjNqEByfB9AHVCrcAx%2BgN46EQ4d5obYkhVFsHn88DY48AZKkAfeBVgR%2BYRnPQJkheXpMMjHsT8DUkxeipaT2TdAss62Gt%2BvWEBC7XTMWWzdCYhZeVXxy0ti7Jc9qWzWW9Wtqm2GWrhi2KdGy%2FNIS3O18e4P4w%2BFb2xTf3YzN6lMT4CGGGer1lYPy1rOnvbPdJnspfCIGQcnCgJ824%2Bw60qbxFttZ0Ms7jt3dYiEBB2M4WADx1JP5EH0dE0OWhR36gCczpL68tc1z1EyWR9BInp%2F1ZgrQinci9Ii%2F3EGLMZwIH7MlC8hdplM%2B7hT%2BrUbzlOoqAp%2Fk%2FBNXK7ly6rEF76U5IXL5rXOTRJe1tGkiJxR3%2F39NJ1awg1kkd6LxqXkV8yP8DobExuKPontg%2BIOumHaMI8L5rknCQPFuGVZRT4d8WunyuvLOI7iM%2BsaLkTEu7s%2BLeG0fIXOJfXv%2BI4jUKc6qWEJkEDqMsZmZnOtnOfyevCRBxLi37nHiFCDl20i%2FXR9rOpgok705uJJF2CCFeJwRwyd8BTxSJc%2Bz0eRbV%2FgFm1iOhM93r3LsK48BHdf%2B0Ppnaj4t5mtQ3wzOtQEO0G5AFANpXgV043lGiZTd1YIojJToRJ4DQYuXBnDGTl98dcy7dfUywshoMJCv6M4GOqUB0VzDAbNbuCcGM1hPXLTgSzRHi8Qf4QiUP6Q0CsyYyV5U3S5Sz5RGfV1U3JBot1O2ZCUcZ9bvIgcqWjcXW%2BQ0%2B5DMQUECeEINfrbq5gtjA3YxyXyEu3IXEwc8mTMmp8p7xSdQALwC%2BfX2AMiXyzqjHNfzqn1nzoouOl3Q2BONVZBliBvwf%2BLJJl7w5mD2mBgA6he3n5XMEkwjkfeFg9PyYHNwoghS&X-Amz-Signature=7da16a84b7013283f8cd79c7e13fe16629b5f7b6d66600987d60ba365302ed82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673LF2KNH%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T134444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCKrMMQVvrdMHnNxtqRwfSsYltKFpItaXjbiECtkG272gIhAOXYfZX3usKPdZ%2BURf%2FhbpR70mS02ByZuk9JhKPVCYvcKv8DCEMQABoMNjM3NDIzMTgzODA1Igz1BYTzZ8B48TFvNdsq3AN6Fl0hMLNPSFolW3unQUuhzYKD74kP5qm2D5pvfpbLNC0ClW0Sltn%2BGrs9beGwZW4TJVi0ajDjkn5bgpUMer8Qz9YvZ049cC1XgMp4Ex4FXjreLjLZZS8l9%2FWoZPjUzexr3CWiJgTMfJB1WpACrj76uI18zTsAtQ9StGjzitl2ovS65jRejJYICRzpfSEjCV9%2BmRGEG6J7TFtT6oXNndGHR1amTR8f3EEJXAE281ODTwPwBMebBB%2B6ObYdy4%2BMDLxrR4men07N0klWQz5xrZT%2B%2B19uWNnGVadwHDoSniauU3idS6UdwRuRKx1Lqyqg4DSYDygaPjdXB20W2Dfbqn6sxrF4K8sAJxTPllrnUCiIaO4xnZYiSY3ZOx8bY0BZYFfGzxr%2FNnrizQkxmythhtljM99mcBUPfN4y2NpfUKTzEXVPiBzEwNhgd9HRiwndLOUH6Qh7NVZgbIF8PBVth%2BLDHnW6Vv4rPMc4YAMzeKh527RAoJih8irR18u%2B6RHE4K6va2vyqnAlT7ytzbfIlrTs%2B%2FkNHlT8Wsr5dGSV%2Ff3lX0P41iVoo5ZT1XojFqLNJgzCw4CpuGhItQDfVATpCdTW9Q%2B%2BrUoS7m8vUyFngq6anIxm7Yh8L3oyD8veATDlr%2BjOBjqkAanogU1wcp%2FMECHvAy1pvVz2LvoqM7S0LiZ3Cu3AcfFdz8BV2Nrb%2B%2By%2BWLz6M0kzoX48hyfWA2A1E3345G8mOc85iAnk0v5FkhGbMOtIFQwieQOYB5DP0EoJr4yWlLfk4iyvYkmEXqJ4Ke1avzZ5QjGOBK5zuFalMaAv7YMCjhhloXgufLOA8t%2FhTPU4hbARVbdyhnIFAE%2BCMJlL3UOTEPNkfPs%2F&X-Amz-Signature=4b9cf2f4f6a73ef332266127e7852745a3f5b9f3aec8722e80e1ecd2bb405baa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

