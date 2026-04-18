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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VYKZ4QK%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCID8HzZwFdDLkKeXmP%2FK%2Br6%2FUWSHbIfB38PzVfZr4R4SWAiAVbmHL%2BCDYqtxjrfygBHB%2Fi7wccCiAijZVl6ymxTAIWSqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBN6duJjACfBgbwPtKtwDFjjfxTxXpQDBV4Mo%2F8I%2Bvsz%2FVToiuSpFBZWgjxZNouGsU5jL2dNpofzG15xrfeOYuJVRn8UgvHyOdUmaEiGd8s3YUAhBOqYShHsK4vNT3CmYlc5lyuGCj%2FaWj6CLgLAuUwSqRMpYpkHi6jYpPCSjwa7aJeSYiW5xmMUecFL9%2BvD6j0PpwyFw6hwpuOTeodcRBtrJFWtH9Ge%2FM5c%2FErhn0rqR0KBZgUYZvbZbatyfcijQktKFaNpCOTPMdvmPwnHqe7iQ8pmxuneoL0QhPqme%2FSdrwY1cDZNxnkOhbb28PeIH0LNeuPReWtMZNHOxtdS9cFCpuQeUl6KBcSVuWWsQmDq1cMUULU%2BrsS32zroylGQSrWZVIJA8kyVwIpvef%2F2%2B4%2BUZHKcB6fned6IWwn45i%2B9X6i0YDlUdAbgmFMEjW4e7e1Cnqd%2Bb3IDUCJWISJD4bXJ7wNEHn65pm3mSzYdmNKrU7ijUMIrCN8WV53hF4NB1nWJyCaHqEj9AQw4H4yCcigwtngoNJCP2d9OY2UX4srMxO%2FQhYcwf2kaw6f45XyF6CR2%2BhjsE%2Bsj%2F60rACtyoP27PdwsvWLpaqNy2Goe1njjG3gFRcgGt9iJ6mN%2Fy7zz1Zr4g6zG3hscqt8Yw65OPzwY6pgGMZtBhnrnl8NcJUIRILqdjx8kxDKqgDyM36UG%2F%2F%2FY%2BFcANHac7KsaEvkuWK1YZVzroZ9tPALYV2GELBOb5c%2Fvm24Gv0sIjbkmvxMv6md43YHUIxqc80drxdYUxrxgLSrEGYKda%2BPyqh%2BnsRPf5bsoBlgwVjY2Pm7Ukht%2BvVRntTo2jeP%2FbXy%2BTNGKr0pheEFovJa1FfKE7yVP5R2wnSq7C4n%2BsNkp6&X-Amz-Signature=404e1a0359029f7974306be87f95e81bea7935704f285fcb4e7f3ba6fb112c61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VYKZ4QK%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCID8HzZwFdDLkKeXmP%2FK%2Br6%2FUWSHbIfB38PzVfZr4R4SWAiAVbmHL%2BCDYqtxjrfygBHB%2Fi7wccCiAijZVl6ymxTAIWSqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBN6duJjACfBgbwPtKtwDFjjfxTxXpQDBV4Mo%2F8I%2Bvsz%2FVToiuSpFBZWgjxZNouGsU5jL2dNpofzG15xrfeOYuJVRn8UgvHyOdUmaEiGd8s3YUAhBOqYShHsK4vNT3CmYlc5lyuGCj%2FaWj6CLgLAuUwSqRMpYpkHi6jYpPCSjwa7aJeSYiW5xmMUecFL9%2BvD6j0PpwyFw6hwpuOTeodcRBtrJFWtH9Ge%2FM5c%2FErhn0rqR0KBZgUYZvbZbatyfcijQktKFaNpCOTPMdvmPwnHqe7iQ8pmxuneoL0QhPqme%2FSdrwY1cDZNxnkOhbb28PeIH0LNeuPReWtMZNHOxtdS9cFCpuQeUl6KBcSVuWWsQmDq1cMUULU%2BrsS32zroylGQSrWZVIJA8kyVwIpvef%2F2%2B4%2BUZHKcB6fned6IWwn45i%2B9X6i0YDlUdAbgmFMEjW4e7e1Cnqd%2Bb3IDUCJWISJD4bXJ7wNEHn65pm3mSzYdmNKrU7ijUMIrCN8WV53hF4NB1nWJyCaHqEj9AQw4H4yCcigwtngoNJCP2d9OY2UX4srMxO%2FQhYcwf2kaw6f45XyF6CR2%2BhjsE%2Bsj%2F60rACtyoP27PdwsvWLpaqNy2Goe1njjG3gFRcgGt9iJ6mN%2Fy7zz1Zr4g6zG3hscqt8Yw65OPzwY6pgGMZtBhnrnl8NcJUIRILqdjx8kxDKqgDyM36UG%2F%2F%2FY%2BFcANHac7KsaEvkuWK1YZVzroZ9tPALYV2GELBOb5c%2Fvm24Gv0sIjbkmvxMv6md43YHUIxqc80drxdYUxrxgLSrEGYKda%2BPyqh%2BnsRPf5bsoBlgwVjY2Pm7Ukht%2BvVRntTo2jeP%2FbXy%2BTNGKr0pheEFovJa1FfKE7yVP5R2wnSq7C4n%2BsNkp6&X-Amz-Signature=404e1a0359029f7974306be87f95e81bea7935704f285fcb4e7f3ba6fb112c61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLOLJM5D%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDNFAG3JRh8JGnDKxpzLoae21rghvpu4ZxUa9N8dvGY1AIhAP1EzsijxOpbMt1M9obWVUA3HJJ%2FPqdcJVdR0G%2B6p2H8KogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwuZVKYtOgOb4WA5Gwq3AOzJO40kmqqaZpnUi%2F%2F3IvYDxBd6ynCljjwCz%2FpUuz8Zlkle0Bi5u7WYWDXGgLgsSex90vTbgx67P4rIu1IXxauSCDyMsRMXBds96B8Hg4EkcVOWNSYWrEGPAE3v%2BznMaL2tVvnTxugNMFa3EDM4OICTaC2u0ynfAC9UL079bpOkkXVO4hhJ94HmcAQ%2FE474shpUz2%2Byc2PC8efaIBNzQPwol%2FiuH32I94x52%2FGFN8xhgh9TkQxKDE92ZulAarM0xsKM0m5bLfjeLua1QomIVML4%2BZooUXPS51A1UYqlPcM7n5xcw9olYLXtLEf8ahf7mLEYpncVfcZIx3SdzBHv%2B0z8Zz3KGSLtE4GJCG46QM9A8EeOqe%2FRUVUve6DAORdyjbJ7Z3D3KqMBOquwvilakalYE2Hh%2FDuII3COjx4X28Kf4IcibqrmXhPuqhm45xBdwyxV1lfZ11UlVB0bxhIHJICL41GpvUq0LzLlqYc4nh11UVhZoZpqsA%2BBcIyiRk0DdoL0ALq8ulmUQHS4hLXBPLyT9jxqM0zAuTsZLjPgDALciCudR%2FmA9cv8%2BNxiegKMYQlHJJLIvKqejAGesZ2NoQUX3FSCqhi2HZMeKseMOA9djfrl22U7MWmPFiKwDCvk4%2FPBjqkAbloW%2BDRtomNZCn4CUMMWE7hGCd2tMl2L0chWWGkMsV0rYEws5%2BTeBhxJYoXUydaYA%2BwxIaZqmf63qfR%2FdJjcO0mZLZ6YDfxbExJ93v1ejLeymCk9d4XobMqwrXVtmUKeD%2B2K6eJH13HJmEE1pLRSyRroah5i72E%2BTP6VL2w0h64wS%2FryBJAT2yt65AQnrSABLeIGq1tCKlOkdWomNWWr5cug%2F2U&X-Amz-Signature=f8e2da2c6f6686954b00ed07fe20f4ee6d557b2e39ed5129632f5e3c63dfe280&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IEY26LI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDIjYRuFTgcRl5MwlJ5E1DKCP%2B6VsfBM8C7t3BPM13GtgIhAIxpjQtiiq5EgYa46UdEYzU7sqUZGKDG3LpFxxGN%2Bb7AKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlaJk4AjGL8pq2Y2oq3AMOemXONHPYh3HRlb8TIIEIdvT0eSlL6hhzUMbkRIZKlXxFGuWVYUDR%2Bs4qnqJgNKqustQIzOj4sgkUdkxAhfDfoGOeg0cSaknNKw31vNgQvDNvwaAmhMCtAV5A0VV%2F4OD2nsYl1CSqh7IwruLe4dDG5EaemTiYfpvjLLI9icDazNhs%2FVjD4%2FHGlaUMuZakagGNSYd3g9Oy1VhpFYeM3zDo8%2B6L%2BYYSPx%2FpvZYIaDBWvyVdssQAkmu6X2h8RtA8mYUkTG8mWqtJhjNRbebBn%2FHD9vMdf3u0crh6%2F1G2ObnOamzvqJ156ylkNuIGrVSurybCB%2FFRoMCMK%2Btd62wvn6grqjz5a%2FN3SbcCl3ImC2GYClhAZ8spU6qz%2BoiIgyzk%2BvQOBaYZdaKAn3dKZItOS6DtzfYXAsXIXwbABC%2FOazikVvrJWnFznX5nYoZ0y5vzqOd6Tz74ELeduZIwbS8peQ1uH9B0iw45mPYcv2Nyd7vXDowVO1KZHtI8P%2FljmPZrGsLZ0MJvUnZoMehTiUyHr5bcyyq%2F9IwiAfUzsrD4IK9KpRJi%2B54q5IPeTJ8zAOnRIKXuVUW5nj49Lx0PO6boN1%2F8bEc5GucM06vIdApU2PgPo5K%2BJ7U129wTj47DJjDnkY%2FPBjqkAQ4yX%2FcszKfAHiUzqMA%2FQlbv00SJS3z5OXWVhtgBhzMOJILyl7lyV%2F96aEmBpbKnZuRYvtlQlUcfM4etEy5n5uezVQGeiQomYZVrv4QgT%2FxIxMq31BkQZKSiXS5QkA4TAE0uN22YdVcBjH6hx4FFeDf5jwQUgDCdAcykBH5NO8bw2xwkokDZ37aX6PPTZm%2FIh9ek4USdbW0pmWDlNvwFjhGws08P&X-Amz-Signature=584c31b6a302749f17432b3faae720f70100944f7477d80563fed734d9b27f1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IEY26LI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDIjYRuFTgcRl5MwlJ5E1DKCP%2B6VsfBM8C7t3BPM13GtgIhAIxpjQtiiq5EgYa46UdEYzU7sqUZGKDG3LpFxxGN%2Bb7AKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlaJk4AjGL8pq2Y2oq3AMOemXONHPYh3HRlb8TIIEIdvT0eSlL6hhzUMbkRIZKlXxFGuWVYUDR%2Bs4qnqJgNKqustQIzOj4sgkUdkxAhfDfoGOeg0cSaknNKw31vNgQvDNvwaAmhMCtAV5A0VV%2F4OD2nsYl1CSqh7IwruLe4dDG5EaemTiYfpvjLLI9icDazNhs%2FVjD4%2FHGlaUMuZakagGNSYd3g9Oy1VhpFYeM3zDo8%2B6L%2BYYSPx%2FpvZYIaDBWvyVdssQAkmu6X2h8RtA8mYUkTG8mWqtJhjNRbebBn%2FHD9vMdf3u0crh6%2F1G2ObnOamzvqJ156ylkNuIGrVSurybCB%2FFRoMCMK%2Btd62wvn6grqjz5a%2FN3SbcCl3ImC2GYClhAZ8spU6qz%2BoiIgyzk%2BvQOBaYZdaKAn3dKZItOS6DtzfYXAsXIXwbABC%2FOazikVvrJWnFznX5nYoZ0y5vzqOd6Tz74ELeduZIwbS8peQ1uH9B0iw45mPYcv2Nyd7vXDowVO1KZHtI8P%2FljmPZrGsLZ0MJvUnZoMehTiUyHr5bcyyq%2F9IwiAfUzsrD4IK9KpRJi%2B54q5IPeTJ8zAOnRIKXuVUW5nj49Lx0PO6boN1%2F8bEc5GucM06vIdApU2PgPo5K%2BJ7U129wTj47DJjDnkY%2FPBjqkAQ4yX%2FcszKfAHiUzqMA%2FQlbv00SJS3z5OXWVhtgBhzMOJILyl7lyV%2F96aEmBpbKnZuRYvtlQlUcfM4etEy5n5uezVQGeiQomYZVrv4QgT%2FxIxMq31BkQZKSiXS5QkA4TAE0uN22YdVcBjH6hx4FFeDf5jwQUgDCdAcykBH5NO8bw2xwkokDZ37aX6PPTZm%2FIh9ek4USdbW0pmWDlNvwFjhGws08P&X-Amz-Signature=8b4efec847d479cc3b107b48699e12c29fdb2d83d59d9a02a18ac2dfe9090269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V5WDJDS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIBUfF%2F6Rbviwxw8wwQAfqgOQgZBSweiLndmPSyzIJXBTAiEAl5OlneVkE%2Fu8uGo%2BXy%2BHI5j34GtUznms3kiIlUzulcIqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKC9kucuA7%2BNeLd4kyrcAwT16ANp4VUdGeMOZNxpg7r0a2OfyQE1Us9OTZE6ciiWQMNqiHY6I8wpzS6IS3csU5wDkD5lVsBSaXp2zKKgj%2B4c2MFxUKA59iUmIHbBj4wM67gzCE6XL%2Ff4bQIolvcNOVf77T2FsvSiKh4N34jpRUyrKeIQlDTpTQDerVFCIxmUj2pvi9QReIVCZQAp4yIEcM3MtsOYwIu8xKCZbdlTPBFYQMUzIakqD%2BUT41IEFvkGCmx9oXKp5cwqp%2F%2ByAs2ONJd8N7buDA1aa0Foyj4FPLhLz%2Be1BQE7mqFqzDP5qLHYUHokrrdHqPW2G%2B9uzgNrTdA3ibG3T8nEjODuz39ticPsVZpDUIv264Lbx77o0SJoT19qc%2BnzR%2BVUnC5XJskYa%2Bb4h2zbUk62K8RZQh7I0%2FHSLCjXrUf7ZfwR%2FMckT1mMHL6ctlnVutUgqq592vVPFhcImbBxsp8BxepQPaX3oTFnjvi35lS1mSEUvl0VmQwQMZJnDZEFYcnvymVk6rI928nW9zdywf3bp2hK3QCg2ISbx3rhFbxuSmgAmw8X484lLrLsn3JEgMKxROyXRrZ95fAWUefrV75NCtVoTFx1vctzklfpxqqlQDQ53e8%2B6PqeTLgvNKZgVKxxBvGQMIGRj88GOqUB%2F0hJee5hC2Rt2dh0tOmW8tf6DspuNWach5B3rKtyZ%2B5F%2FxMZO8S7saQa9mYjgGXJzs3m1ZYyCJNenXm0Ol2QrbyzYemP9xcUbrqvRgozYp4B7g3LczsoL2zcusGHZphZNxfkDcFAvoGTae%2F0%2F2dfAG8engsyobNw23N%2BxIxODu7iRn5jYeq042AuYieWzycCOpS1qvWFxACvGUIbwXm%2F4WecXc9U&X-Amz-Signature=9f687856442a88454bf716992875a2989b316b6e59c49347b5cd3fbff8260469&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZA2EV6G%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCICaYfPpcbulYCEm%2FLYEndgQez7CC20Aqly2O6SpHRT64AiA%2FpxxxPdCDifQSXe7oWiYCUalT5QN5%2BfMVYmzbNWPNxyqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3ESXtJWk5pKP8sIwKtwDixJWOQY9d5BqVplT24q%2Fif3nhn2v%2BsMUR1DhNhU4bZxZXUDVCK3wePmiGOMyWFTKxOcb7jkzvZ7yU2l8I1Lt0Xy%2F2cYrGBujHqXGTdp99pnsvr%2FQjJ45pB7Snc5FrsOlHEGg4lJYZ31FPjTQsbzqUOFkZNNiAxHsIPLd7W7r7MQ3s1E%2B%2FeED8KAFPOz6dCScmmwUw0iz1Zhv7Dz3iouWGsTSCqS%2F9CqkPUmPEqB5dSMStRZr4D31BX2wTgn82UYcIMBfRAF8PUH20NNQXJd92UIUqKaLLWWmlqYoJHBpEYT6nY%2BDN3CkF66KsJCg%2B9ri%2BsBk5h2YmJyFXg2Ybz3ha4Ff%2BGfS%2FjOMS5hk%2BWIy01ELJGgSSV8CyT0FrG8Ad8URx6%2FSdTsjIHCsrZYQVXOka1nvYyfO9P46DBqZOYCQxq6Quo%2BKfChENTUmC%2FCPf6b2fYImPfdoO7AIrdqjUp1YDWD3CniK0ANkngcDxHnMB%2BYt6Ww5rySqdbo0m%2BGAzQWZ%2F3VhH7wlFw9wuyCq0noNGHLjRlg%2FyYw5l%2B1UpLve1Vw0Y4sGLKnAiuED3c%2BD%2FOIVLXIacKTADni9Rvw%2FcKEx2rLywgD%2B%2F2HLp45vpcI1DluiQDntHfxhAU%2FhXdYw%2BZKPzwY6pgH5dAk1Lk4FcrtrON4qmTOtjOKQ0%2FvOG3JpaOczCj6kxhR7mGYtYSkTRwOcC%2FvXMJdJZHR2iB9Xlo4hqk3YIHpGzCJr9Hnj%2BSfRhxhsBOqWb1Fljs8bZPWa%2Fxxb07orOC%2FdfTlWocZg2WlgrGbxn%2BQSNDE1Yak7a2vAgl98xtrnGGqFJbDg88t9i4X6cCWPlWbaMoh7wufBOhsZHE6Y12RGnRePv0Vl&X-Amz-Signature=fdd27f8c78ce6bc9cd02d7bb6726fa612cf7d3a2665ba59fbb58bd04f3d6e9e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGOY43ND%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQDa%2Ffvon8STgmv9Pr1U5HdP%2BSUlUISEXa8RYGR6%2FALNxwIgZoADZdt7scnZwJoO%2FkzE4rs%2Fq1Z%2BUCbcaYQUEXLb5vsqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA%2BKKqmJovy36xlUTCrcA8m3A1RKRTKyveXzwozlRw1HuMP2uQvlDzu5ej8hqt0of4u1iFGmL8%2BEkyBDMXqxjDbfZWRC0sovB%2FPbwM8YRTYjPzXUklX28QmYQzpQ2wx8eiT%2B%2BGXUxg5B97oTy8fZThDqfVsSFQoEsSduNg1AC0i0ssiOIJ3d411U1K3%2BnYgxZWzIkCFvnZ0Gr1fes7cs%2FpGrCHTKb1zszr5NeIctU0v4piFvicOQqazJ6XRr8hTJj%2F2MTenn6zx22dq87dBWpATDFryJSVQY63WL3sgQWxpVx3wYjlpYogPfP%2BwnxcHjiwA57w7STGcBYvWwocjBKYIOILNZLZL6IW1KR8Xnx4fcHXf%2BAzLZd4sTq6DOkpo9%2FxSQwrTRHbZ9UuKCin9eEuFpM5JBnZa7xnBGC%2BPPM9LbeI8DeqDd2QCU8vdHhBmA6MOzbwYjq7Q7%2FvCVwy0XJcWnQnap8nHysfvFoDXaetBUYhOhlbwIeUCHapliCYE6qyDzD3clNX5sUIrVs9T4tKtQaAulfCApXhpKOTAC08LjSLmlQdMW%2FgyCnhf%2FwaaOk0lEuwUS2dUKRuf8xGnXReiDqZlOAUI7B76Q3dmdJI48NHNhpnf6E7r6GT8RM%2F%2BqcqmpaqVEOeRWZTHrMOqQj88GOqUB4Qb2yulW%2BinkVT%2FtXoGwc3xuAo6fYAh4bxWeUd5AO19Qs%2BOU0g3EqnRQgR3dQGY9c%2FcbIy%2F5j4t4C7OfUJXVEhOjhm06DXIS7Bo2s9Lpxc2KuadVDnbTVXBzdFb8owVWoRrQiii2Szopl3OQQCTbCqN5JGOoncdi2q8nc6Bo04ViWPphVbOj%2F5v8Mvm4pmF03o0Vkqh5CAXRDuFNxraQpk1CLfC6&X-Amz-Signature=c734eec13350b6552c5c40c4c2591652676f9e90c2fc6c068a9df627b270da8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3T43Z7K%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIGk0auHUumY7tBp8uAGNE%2BgWaWTY5J2sGv9jJYcQhbOiAiAZMGPkNot7Xa4ZnVQVGtifP2j7XQAnFFL6G0mQyLZ8HiqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdEFvaeuXjhKAxkDaKtwD9jK7XIfu%2BOvMLSwS%2B%2BsG%2FHszBmH8A%2BKf%2FrLnJFuDvJzDPiNafAl9Zwh%2FwFBR%2FAwdE2hknukQBGnKzfRFDM2CfpEChXz%2FPmr2WIV0cHFu0oxRjLyCPPf%2FJJUFbi0Kn1Y629fxPpnRk7DLfgoEgxLY7jhVFfHUG%2Fibdh7XzXVB1Zry38D7Zf5XaiZfLZNCUoKYNiwFR9N37NH2gdUvf0y6yqRqII0sLbks91%2FC%2FbPNjRhWmR1CR3xF3mmGYneNOuPQ2rjx8g4z7TUiIt7LPPNFO1fxDmG1v5dRHQJo2DAQ%2Fl77%2BwpA3AYp%2BHYz6%2F3WPdy3ki2VvjGzGVQFkrWXq7fbIji%2BrZfon9tw6w3ycLzHJh1ukVrtH9BltW1VT4syFl2cJ0rGY3fmwOZiVlAlS%2BBpzkSzYn7xunuTCveKxkxQ5HjfV%2FacOmgnLwlS4bTHc9SNMTeWH1s8hdPY5L%2Fqo%2ByCF%2BtfTESudCVcuQt8vdgmh9W5KdbBkN15QuAzurfKGZUrDhR8FiYJl72BdBjX24SUjwOffh4zZXCvq0U0h8124tMP9BYOjfxL9qb7Bx3yNCKptYvcA%2BKcPLvHry5bGNfwq1O7ytFeO4rZUcYdGGI6P2Ivd1fsIPL%2F1TIzTcwwg5SPzwY6pgFA6EtQJoqFW7h1YcA9FbPY0NYBrBxAqjJKkx2T%2BkLrbD%2BY4l5Joyjrfkyka4lamYuhbDFYzl6w1UAR8biCCmc1acVJOd3DZnw%2BZC1w0ir92WNugXqNlEazg3eJ6a7VfTngQS%2FZS%2BeYrWGsF0PdR%2FHIq3oS2qbUN29mRaalGM7BjAkdJhbG0KUnvnO8FaCdeIXbyqoSK5QR5EvAD4zCZLjipM1JzlZM&X-Amz-Signature=ac0a66536c43f4f6a0609e15dc5f83757eeb619089a10d66d4eb3dacfe1aef4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3T43Z7K%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIGk0auHUumY7tBp8uAGNE%2BgWaWTY5J2sGv9jJYcQhbOiAiAZMGPkNot7Xa4ZnVQVGtifP2j7XQAnFFL6G0mQyLZ8HiqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdEFvaeuXjhKAxkDaKtwD9jK7XIfu%2BOvMLSwS%2B%2BsG%2FHszBmH8A%2BKf%2FrLnJFuDvJzDPiNafAl9Zwh%2FwFBR%2FAwdE2hknukQBGnKzfRFDM2CfpEChXz%2FPmr2WIV0cHFu0oxRjLyCPPf%2FJJUFbi0Kn1Y629fxPpnRk7DLfgoEgxLY7jhVFfHUG%2Fibdh7XzXVB1Zry38D7Zf5XaiZfLZNCUoKYNiwFR9N37NH2gdUvf0y6yqRqII0sLbks91%2FC%2FbPNjRhWmR1CR3xF3mmGYneNOuPQ2rjx8g4z7TUiIt7LPPNFO1fxDmG1v5dRHQJo2DAQ%2Fl77%2BwpA3AYp%2BHYz6%2F3WPdy3ki2VvjGzGVQFkrWXq7fbIji%2BrZfon9tw6w3ycLzHJh1ukVrtH9BltW1VT4syFl2cJ0rGY3fmwOZiVlAlS%2BBpzkSzYn7xunuTCveKxkxQ5HjfV%2FacOmgnLwlS4bTHc9SNMTeWH1s8hdPY5L%2Fqo%2ByCF%2BtfTESudCVcuQt8vdgmh9W5KdbBkN15QuAzurfKGZUrDhR8FiYJl72BdBjX24SUjwOffh4zZXCvq0U0h8124tMP9BYOjfxL9qb7Bx3yNCKptYvcA%2BKcPLvHry5bGNfwq1O7ytFeO4rZUcYdGGI6P2Ivd1fsIPL%2F1TIzTcwwg5SPzwY6pgFA6EtQJoqFW7h1YcA9FbPY0NYBrBxAqjJKkx2T%2BkLrbD%2BY4l5Joyjrfkyka4lamYuhbDFYzl6w1UAR8biCCmc1acVJOd3DZnw%2BZC1w0ir92WNugXqNlEazg3eJ6a7VfTngQS%2FZS%2BeYrWGsF0PdR%2FHIq3oS2qbUN29mRaalGM7BjAkdJhbG0KUnvnO8FaCdeIXbyqoSK5QR5EvAD4zCZLjipM1JzlZM&X-Amz-Signature=eb81f118457d660d81b5ccd5defffd13bf8409a7b73f4102ab6d9a87f67c50c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROYS7NJI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIDF69o2wcSGzzPjkmxTXfkgTuRCTRb8SNdxRVibkdIFCAiBNCerfGlR9krvDiAd0mqqpEqHp4gfoyN1VcfRyl9wa2SqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMDk9u7k6LSB2RPmoYKtwDn8UTyYvVa%2FYrf7CKmckqSGQEUx25ZjZC6YY7SfbsVrqhbu8ZeHOgF0OjjJ7ac5VT9LEu%2FCv6lnB%2FIUc1maSx%2BBc1xOx3WJjzPfXBQTJeQ3y8xd20LBE%2F2UIbEjbZJ4wSKEHVhtT103vddoGIdlexbi7363RlJR2SLb0yf%2B0B0Ycfuj4eFhzJLx6Xbn9kyJUge6jAeurB%2BlnEnwZvdXVcFlGWq9ZTkWYdfKca%2BOC%2B21SjXh8TLT8l1xfKoW2kBLoYHmTF5ryvOBllrWbgjzcZDvdiP61x78stH72O%2FvpD7pLjCsQj7pn1826amBqbTxtEqFsjFHFFKNcy%2FUiQ3l4%2BOxgU7cjUXFDRe2e08YTfv3qmjuoRNdu%2F4MgS7iN1rq8zk8nc3qdPgTh8OMKD3oBMZznhwqu5aGJRt3ur0ivTXOmVb2QezOVtPXmUeBFT99Y3EGqE7Q31ehS5T35ML4HBUWspEfCvLsyG3haE52MOlLM8BnR7wCRCU0E0rwR0E%2BpbYNv55I3ZB7UqDuOriLYP5AHWKuphVdjp0B6W7uPwZckGp8VDPHA3xspT7xv0D2momkacyOcIWEbv4KfOKgTxiSMzx181zaVeO%2BG7GDq08vPfdtEJ6ZULC9%2BwFAQwrZKPzwY6pgGGVx1tI8qhfFo7%2BU%2BhEknXJ2uFmXEFATMh4%2Frk6LvDQnL%2BIIzScysygMAhOXQd1fOB68Nt%2F2QUbXPpidVSz7a55zx1w3uz138DtucbTF%2Fhzcl2yVciLHX7obbdFcKZqzHdLJxo36P4Lk98XK1LkO6SSCHzbJnaeSsepTS7wYsznD6%2FqPOUdwdUkEwTNUys%2F9htTleg2GH5PwskFA3NzUN%2BiGoiT%2BJN&X-Amz-Signature=8788f4a671c5e6b52a408459509292b4a8ea7aa20795f2f290c32a9fa8e3716f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IEY26LI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDIjYRuFTgcRl5MwlJ5E1DKCP%2B6VsfBM8C7t3BPM13GtgIhAIxpjQtiiq5EgYa46UdEYzU7sqUZGKDG3LpFxxGN%2Bb7AKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlaJk4AjGL8pq2Y2oq3AMOemXONHPYh3HRlb8TIIEIdvT0eSlL6hhzUMbkRIZKlXxFGuWVYUDR%2Bs4qnqJgNKqustQIzOj4sgkUdkxAhfDfoGOeg0cSaknNKw31vNgQvDNvwaAmhMCtAV5A0VV%2F4OD2nsYl1CSqh7IwruLe4dDG5EaemTiYfpvjLLI9icDazNhs%2FVjD4%2FHGlaUMuZakagGNSYd3g9Oy1VhpFYeM3zDo8%2B6L%2BYYSPx%2FpvZYIaDBWvyVdssQAkmu6X2h8RtA8mYUkTG8mWqtJhjNRbebBn%2FHD9vMdf3u0crh6%2F1G2ObnOamzvqJ156ylkNuIGrVSurybCB%2FFRoMCMK%2Btd62wvn6grqjz5a%2FN3SbcCl3ImC2GYClhAZ8spU6qz%2BoiIgyzk%2BvQOBaYZdaKAn3dKZItOS6DtzfYXAsXIXwbABC%2FOazikVvrJWnFznX5nYoZ0y5vzqOd6Tz74ELeduZIwbS8peQ1uH9B0iw45mPYcv2Nyd7vXDowVO1KZHtI8P%2FljmPZrGsLZ0MJvUnZoMehTiUyHr5bcyyq%2F9IwiAfUzsrD4IK9KpRJi%2B54q5IPeTJ8zAOnRIKXuVUW5nj49Lx0PO6boN1%2F8bEc5GucM06vIdApU2PgPo5K%2BJ7U129wTj47DJjDnkY%2FPBjqkAQ4yX%2FcszKfAHiUzqMA%2FQlbv00SJS3z5OXWVhtgBhzMOJILyl7lyV%2F96aEmBpbKnZuRYvtlQlUcfM4etEy5n5uezVQGeiQomYZVrv4QgT%2FxIxMq31BkQZKSiXS5QkA4TAE0uN22YdVcBjH6hx4FFeDf5jwQUgDCdAcykBH5NO8bw2xwkokDZ37aX6PPTZm%2FIh9ek4USdbW0pmWDlNvwFjhGws08P&X-Amz-Signature=dc983937a2b9a381f1b7cdda997634dce289aa171542b53d90fa822f9a9a1103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IEY26LI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDIjYRuFTgcRl5MwlJ5E1DKCP%2B6VsfBM8C7t3BPM13GtgIhAIxpjQtiiq5EgYa46UdEYzU7sqUZGKDG3LpFxxGN%2Bb7AKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlaJk4AjGL8pq2Y2oq3AMOemXONHPYh3HRlb8TIIEIdvT0eSlL6hhzUMbkRIZKlXxFGuWVYUDR%2Bs4qnqJgNKqustQIzOj4sgkUdkxAhfDfoGOeg0cSaknNKw31vNgQvDNvwaAmhMCtAV5A0VV%2F4OD2nsYl1CSqh7IwruLe4dDG5EaemTiYfpvjLLI9icDazNhs%2FVjD4%2FHGlaUMuZakagGNSYd3g9Oy1VhpFYeM3zDo8%2B6L%2BYYSPx%2FpvZYIaDBWvyVdssQAkmu6X2h8RtA8mYUkTG8mWqtJhjNRbebBn%2FHD9vMdf3u0crh6%2F1G2ObnOamzvqJ156ylkNuIGrVSurybCB%2FFRoMCMK%2Btd62wvn6grqjz5a%2FN3SbcCl3ImC2GYClhAZ8spU6qz%2BoiIgyzk%2BvQOBaYZdaKAn3dKZItOS6DtzfYXAsXIXwbABC%2FOazikVvrJWnFznX5nYoZ0y5vzqOd6Tz74ELeduZIwbS8peQ1uH9B0iw45mPYcv2Nyd7vXDowVO1KZHtI8P%2FljmPZrGsLZ0MJvUnZoMehTiUyHr5bcyyq%2F9IwiAfUzsrD4IK9KpRJi%2B54q5IPeTJ8zAOnRIKXuVUW5nj49Lx0PO6boN1%2F8bEc5GucM06vIdApU2PgPo5K%2BJ7U129wTj47DJjDnkY%2FPBjqkAQ4yX%2FcszKfAHiUzqMA%2FQlbv00SJS3z5OXWVhtgBhzMOJILyl7lyV%2F96aEmBpbKnZuRYvtlQlUcfM4etEy5n5uezVQGeiQomYZVrv4QgT%2FxIxMq31BkQZKSiXS5QkA4TAE0uN22YdVcBjH6hx4FFeDf5jwQUgDCdAcykBH5NO8bw2xwkokDZ37aX6PPTZm%2FIh9ek4USdbW0pmWDlNvwFjhGws08P&X-Amz-Signature=dc983937a2b9a381f1b7cdda997634dce289aa171542b53d90fa822f9a9a1103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XE2K42U%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T193156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIC9k%2Fw%2F9P%2Bs9uO7lz%2BMLNKx4LjaFXjiP%2FBs3FmdIUJ2iAiATWbzU%2BR%2BcfWQyopRVusOwYhNOdhqkTa1Y5JuRXf2ONyqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMay4EqDYxrPjofP1SKtwDU0G4IWRncZILxZtgiJhXk492Z73dvNePCJ5shyhLJcJJIS026XJT%2B9EEgBWUcU%2F8AUXU3tCdM7OEXuA6NwOME8XdF7rzvpuBEbj%2FDThPfJcUDO0BXzO5fteV1JuySdRcmB4aUtPrKYhtzlBD8MtD5hvK5aM%2FhScy%2BisFEEWWxRVx0KFVT6UhL%2BOz3r77jBxnzDNRSQBVqlxlmVHbcRqbq3xAvuUSlqAPQtjWd8sc0m8sfB0%2BW4%2BvdfjIC3gTKLnRWqUNSIPNft5Kc9Fa4zDggPISJMDCdQWAd8ekZ%2Bdnw5nw3OyLvM8Fw4KJwC1QIZwICcoCRSr3X%2FxZ17afza7yUwpuZ6lRzwhSMpzoKWc3q%2FGWu4tlVo49u3CIzncoXW%2Bjb5rNPhywJLWVZ3pAMcjZBqXN%2B70bcKX0KKG5Vo6O3pnARrKzDNuddAnsLjyy34BJnSHyogVEehDzSZNvIecNWVL%2Ba%2FjcuF8DuCZe4NdA8ycx7WmXdyhfddkWubWO%2Fbk3zPil1u8FFOsBPoxDHZ1F8iDWF7iPlxyTS5Qhg1JJdSkO%2Fb7ZupFM5qeA0zG%2BTdMSC3%2BBH1QOaee5IefmduPxu6YJlNT1QM8ABj9mB5dfEivL5V4SsthFpPM5GfIw35KPzwY6pgGcolntHzroEzmg7w08cQAPsk6K0x7Do%2F9L9pa9DMkawG8kTPdfHg7kpmk0K8dMAIoZ1f3%2BRB8UFv%2Fr1iK8EowQDJL1z%2Fs%2FtnZ7R6kqFfptqt5Nmch67u9v%2BuLxpQxYocHj1COaYeGmteai9AoZgN5ztyZ%2Fn8N%2BKFKtRmUSytc4j%2FgbFRO3S1hMnQ8JLpLsatcllAIGOKwAGWXFDhZyGnlCkCzsSH6m&X-Amz-Signature=7724ba8514fcf39288511d2d18863749045e82f40efd3d8ca754c8a6f870d967&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

