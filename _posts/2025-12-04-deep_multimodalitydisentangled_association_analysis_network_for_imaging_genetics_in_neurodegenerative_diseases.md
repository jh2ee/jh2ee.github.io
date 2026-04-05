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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5ROLVBL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDRO8p21zHe7Hq%2FcOd6kLwfyshiojjtnjbmJ2Gg5QeBbAiAWaSJVHcWsNHVT8EadwiyxWgSCJPgeSc7XWbyTWbARKSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmNmBrh0D2puPOPczKtwDT0bM%2BAAskuVpftTuqoA626CPaKpXptbBiryFJ9Z3OQMMMMpfj0vCEsdFERHRq%2FQkNDtTzsRtNnqIjfiw2Nkx%2B5rE76CtEW1NkS5MXiuirZ%2Bks0yBBfUNJaoE%2FlviLRAx8U2dcmT6Ol1mBg1GYMEn97luHkGdWxjBzWQ6hlrjZD5qV4S3qI3faom3t47WwPYMpKvEyR5eBsVxtgfCW%2B5hoIHTmKDWwRdk%2Big1ZjlheyQoGbgQfjbuRgsgPsK5618XBfI6ETHJG2I7DdxpB5%2BxxuJMuUrQe8519Pt8VRYiALEfwSchIiy3ZWTBjZKy7ALhBchi4MeeKtQ%2FuaerbF1BeyOGuYRzeJZ5W8bYjOkE%2FNkkBqvDkQJys1iTNLy7wJINTQAdq3xjMsP1QRoJHvBTZIJ4gzEqvYF7BP1FkDpii6bfT7OopKq3H2NJPlfBY1oucIH%2BVoQ9y6Rg6aTakaSlpDbXA6r2hEWIGJeZOqsKaAR3IzhHD%2Fj3uiBw0STc3XVdkxb4os5mVKjlhRpgS6niYcw7bha%2FSD2v1vPKi%2BM4u0qix9HVa9a1YJEB0ege8Zs9DmoWE4UyKn8kMpwaRYaysgIXIKn8gWoYJm%2BU9%2FvVrszobDCHzyR2%2BMHKR9Iw1%2BbKzgY6pgG5gKlY%2BTXiuFFhAQBwX0OES0H3LH8Z7kAjI%2BG6jPXX2ebMk1mwXyg18oloaAusRjRVj%2FUF10RfntSwFjkaA1oeQBZCx2FHeYZpGOm7yCj6x4GJ1rGHDGlENAA%2BWXTRnCICjdtKNlMpzuoUZHJ4kgZ5ClXje5nDpeMHcA89KV4jU62jQZmdfjvIq6r%2FoaCmJ9%2F0s8gWYALE9vHaUmz2If2Os2gcFkjb&X-Amz-Signature=4cecfa015ab90393253ea5bb23fb95a928eb60dc131c596f4399f04e8af94093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5ROLVBL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDRO8p21zHe7Hq%2FcOd6kLwfyshiojjtnjbmJ2Gg5QeBbAiAWaSJVHcWsNHVT8EadwiyxWgSCJPgeSc7XWbyTWbARKSqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmNmBrh0D2puPOPczKtwDT0bM%2BAAskuVpftTuqoA626CPaKpXptbBiryFJ9Z3OQMMMMpfj0vCEsdFERHRq%2FQkNDtTzsRtNnqIjfiw2Nkx%2B5rE76CtEW1NkS5MXiuirZ%2Bks0yBBfUNJaoE%2FlviLRAx8U2dcmT6Ol1mBg1GYMEn97luHkGdWxjBzWQ6hlrjZD5qV4S3qI3faom3t47WwPYMpKvEyR5eBsVxtgfCW%2B5hoIHTmKDWwRdk%2Big1ZjlheyQoGbgQfjbuRgsgPsK5618XBfI6ETHJG2I7DdxpB5%2BxxuJMuUrQe8519Pt8VRYiALEfwSchIiy3ZWTBjZKy7ALhBchi4MeeKtQ%2FuaerbF1BeyOGuYRzeJZ5W8bYjOkE%2FNkkBqvDkQJys1iTNLy7wJINTQAdq3xjMsP1QRoJHvBTZIJ4gzEqvYF7BP1FkDpii6bfT7OopKq3H2NJPlfBY1oucIH%2BVoQ9y6Rg6aTakaSlpDbXA6r2hEWIGJeZOqsKaAR3IzhHD%2Fj3uiBw0STc3XVdkxb4os5mVKjlhRpgS6niYcw7bha%2FSD2v1vPKi%2BM4u0qix9HVa9a1YJEB0ege8Zs9DmoWE4UyKn8kMpwaRYaysgIXIKn8gWoYJm%2BU9%2FvVrszobDCHzyR2%2BMHKR9Iw1%2BbKzgY6pgG5gKlY%2BTXiuFFhAQBwX0OES0H3LH8Z7kAjI%2BG6jPXX2ebMk1mwXyg18oloaAusRjRVj%2FUF10RfntSwFjkaA1oeQBZCx2FHeYZpGOm7yCj6x4GJ1rGHDGlENAA%2BWXTRnCICjdtKNlMpzuoUZHJ4kgZ5ClXje5nDpeMHcA89KV4jU62jQZmdfjvIq6r%2FoaCmJ9%2F0s8gWYALE9vHaUmz2If2Os2gcFkjb&X-Amz-Signature=4cecfa015ab90393253ea5bb23fb95a928eb60dc131c596f4399f04e8af94093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BFYVPAA%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCmykU%2F7HVDsVPJc6y3h34eCm1qpZwsGvy9qxp7IuRjaAIgacBaFO34%2Fq%2FCZeL%2BaqTxtGYM80dQQsHVuxcYlWuZERYqiAQIvP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI53OlEApBkVcevqdircA52v%2FezrP3Zrg5uRAAU6s5cS4nAolveNiHii2r7%2BordmpZQYt7VDN%2FEUZDoFb1MW9AMTzsFlPMG%2B0bBSEFCC3oITO2xLy1cLeOtz5OzSB1tXbq2v%2Bk7RSvqImeyomNJh1Gx%2FLjzVPn6ZsgOiu5jeZZZvebR7tbzHeEGbkv2VVyMIad%2F%2B5hQg47H3%2FmEO06kv6wl4hr4qMihk0kCkR0xa3HBCYFKu%2FtLeqjZRm1upAp0ZgksSVryqySb778nqYYgVOjQpy4k8wpvMym%2Blda1i%2FCAAe7%2FdpBWkhFPH5GGOqU0LvifNklpe%2BzD9RAi8SHRSwekcJYN%2BhGGVy%2FnMpkQKrZCo1Vv5S%2BlkOaBRQ5KamPOeDHuKnmNdoQLxNfyf%2BDb6U5F8LnpliEqjzMjcaNRz987mnr0ZEWovy3zGDg%2FtlUrdD%2B54hUHmq0a1JNh1KLJRW%2F2XBo3Eci2VFm1YsZZywdAWelV3TtAto87gkpJeBmqQpxu8NMijyEncbz20BNgT5wXawXQlMO4FZEdJQITar%2FTs3gJqDtipeLrsKGNVjAJW0Nn4JRwc5b8az7EE5SwUFAA4AevxbK9ZDdVr3IC9jPCOjsl%2B8g%2B%2FOQgLLP8CBC9LwMvRieh5SYLPh6npMJLlys4GOqUBm0ZNRJVzPrK5MTH%2FwoXaRj4tGULTtsa231UbBFy53Zfeex0Ulfea1tY5SoojK8FyZ0JJP5G%2F%2FNz78epJL%2By13G%2FVtqB970h9jdis8LvH1cokG7IDdzaj5eITJrtemtmF1ozH6IFwZIIsFGPwGN3wxrk0FAZbu6K%2FX2mTHL6owcOwy6M7UBRaWXr1axe1gZ6b1ayLeyu6NEysy5pYqAC4QZym4gtp&X-Amz-Signature=f0d82899248436559629178d9706bbacafbef3ee87ecbf6b289d1042fab25950&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632C5IWVA%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFuQY9QkPkg%2BFhh%2BwPoO5PrR8AicQGxIa3sc1t0xP1uzAiBgQecrC8pm84X1mvfkJ5XpG%2BnlolSg5B6FsyQpy0%2F12yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcyuqdMnxazfe72g2KtwDR0tJFpFj9mRX0IJF0lI4VCgAMjrCC6XMZIfKU0k2ry3NrvIge5KiG9th0E%2FzC7NYLaLE3Fr958sAfoARO1YNrocuLKEGIGfKt5OIoxw2XLQZ3lyRCJUKz8eHcyv%2FXQxFpEV%2FHI13BQ5hTBmFofbOAc3dCngblYj9DCxeybTf73oVaTKMdTKgpdF6qaLvKNnDQ74fKvBbtnRAB5MQ8nsHXqs8PAQhDofAt2kRs4vpj4e15RY6jOk9YTZRmk48zhdwl1nMHVErJse1CYS0sg2MHEm3ZQf50EczmlzbcHuzcC6ejpALjtLS%2Fx182sK8YQrikrR%2FrW25ueqEVB9oaYsf0GpmIDZx8XbC6LDnoPMVwZwzLff%2FFIf4qH62eebkuuK5JCNRvfKjkCc7roEmu2n5%2B%2BPOB%2Fzzv0%2BzpA1fOEk%2FFraNp%2FyAxL1%2BS6RMTF25CZ9vmdOeDbEQ8UAfOHH1IQ3cPRbvnELUXpDUUdNJgVNCb%2Fg%2Fxdrxd7hHh9M4Ap3cLNG5tu7fdI3pgHmzvr3BqBeiXT2RDxvOojC0iAfqUqMC3CaxoZUzSuChOEs21W15oVZdYPZYSfvqXYZLbrjyKYNUeGqEHUE8RX0GT0qTCrwQjD3xi3XPPXUwry%2Bhvvswu%2BXKzgY6pgH1heBu7hl2kF%2B1BDXOlIZ9XRLQFcWmlyulycdWPAqWDlUuYk7OYZZYREni3QJe9P0FpCUIDArfWOnixK49MQuMkqaMtIzdPlUzan%2BalQAcTRld3rSb7RoOCLU6Soq3c4jsWDVzfcmkdfMTGPJQmhikEiN5nUeZvri2S%2Fwi9h86XdPCOp8MxRtzsXzN5hijAxh6KdqZV6Gn8%2FrYofVfxxfoxdVEk%2Bye&X-Amz-Signature=576691d537c83ba2249779c2e82d18d52e3c3984bc68dc0c88c2501cde18e1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632C5IWVA%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFuQY9QkPkg%2BFhh%2BwPoO5PrR8AicQGxIa3sc1t0xP1uzAiBgQecrC8pm84X1mvfkJ5XpG%2BnlolSg5B6FsyQpy0%2F12yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcyuqdMnxazfe72g2KtwDR0tJFpFj9mRX0IJF0lI4VCgAMjrCC6XMZIfKU0k2ry3NrvIge5KiG9th0E%2FzC7NYLaLE3Fr958sAfoARO1YNrocuLKEGIGfKt5OIoxw2XLQZ3lyRCJUKz8eHcyv%2FXQxFpEV%2FHI13BQ5hTBmFofbOAc3dCngblYj9DCxeybTf73oVaTKMdTKgpdF6qaLvKNnDQ74fKvBbtnRAB5MQ8nsHXqs8PAQhDofAt2kRs4vpj4e15RY6jOk9YTZRmk48zhdwl1nMHVErJse1CYS0sg2MHEm3ZQf50EczmlzbcHuzcC6ejpALjtLS%2Fx182sK8YQrikrR%2FrW25ueqEVB9oaYsf0GpmIDZx8XbC6LDnoPMVwZwzLff%2FFIf4qH62eebkuuK5JCNRvfKjkCc7roEmu2n5%2B%2BPOB%2Fzzv0%2BzpA1fOEk%2FFraNp%2FyAxL1%2BS6RMTF25CZ9vmdOeDbEQ8UAfOHH1IQ3cPRbvnELUXpDUUdNJgVNCb%2Fg%2Fxdrxd7hHh9M4Ap3cLNG5tu7fdI3pgHmzvr3BqBeiXT2RDxvOojC0iAfqUqMC3CaxoZUzSuChOEs21W15oVZdYPZYSfvqXYZLbrjyKYNUeGqEHUE8RX0GT0qTCrwQjD3xi3XPPXUwry%2Bhvvswu%2BXKzgY6pgH1heBu7hl2kF%2B1BDXOlIZ9XRLQFcWmlyulycdWPAqWDlUuYk7OYZZYREni3QJe9P0FpCUIDArfWOnixK49MQuMkqaMtIzdPlUzan%2BalQAcTRld3rSb7RoOCLU6Soq3c4jsWDVzfcmkdfMTGPJQmhikEiN5nUeZvri2S%2Fwi9h86XdPCOp8MxRtzsXzN5hijAxh6KdqZV6Gn8%2FrYofVfxxfoxdVEk%2Bye&X-Amz-Signature=aa50bfcb868cdb0c1dd62e6c32dcba272ad2414d4f22b1b631d45039f221a6ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVIMATBS%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBtaqkmBlNLlWVuo4MTTpnw7z%2FvETawRFYyLjPE3u7uEAiBaldGDxprsXT%2FB00aQkjOxbCNv7ICwCWi%2BfY1gH7Bm2yqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMEEVXBCyuHYkBdrBmKtwDyZcg%2BJhCTiTxNnKgaGKkax0Vd7MhggMtyofslDSaaNKe7AXp37LLL0KmTjjLyzkmPGqtHFP%2FQnrvghHX7KmrG9BZjMRJciK542z%2BQ2ExG111xCWZ1IekqMUPG2LbPXrV1jcUUpX1J4XiDRcYCl5lT7WqyDFYyW4hwgDip36HGMrRIZgk9WjzKDM%2BG%2BoXlS5vJsfTphTAKZGuqzJFfgVm1xDxJ9iHkIrR7F0Gtsy0KA9oTPEcpPMM2ao8%2Fx6l6DgOr3lSYVTcnLa9oA%2Bb%2Bin2STQDLQEEZF%2B5ujjkQJjcpRJiweDXKDITRWFZf8MhKMGrlqk9Noth8UYxXQK%2BgCRlM6S9lSpyrzBLn5JGP%2BVy4MGMKdrYoi15t%2Fm9NvC%2B4sMPCs%2BEdPasYvEgZGzBhAdk0Ba%2F6L9Pk%2FT5nMJfSc9wfVG69JFVyv3kyVdrrxkjznYTOp25jiQ%2FDhksjBFnyJZcau6ZOHd0Pvyg0ZBK7cgzijqF%2FYBrlkZ5oKOxK70VoZs2xwQZ4CwTro1AaSpWFjJGcp7R5mHefVCWVetTgwjgskQQjYH9MovymM2isJwtOMD%2FKa2Bz131e4xaW70y9Hvr%2FWbmL71um2hD9gtgBs1oy9MCcmUvBfyMnOmpmWcw%2FeXKzgY6pgE1TPIaAaYVd54sP64BiDxIVox66GwrjRTaoT6HzvAd1ILu89ZfEq6%2FeRAokWDSK7GtX%2F4jJSrvulYbWT8H92lbSTJG8f6ts1MiFR67KVfL0IoGoRNn9g2CT2CgRs7Z1r5%2BH3nBS%2BE4fyAbzkLX1EWYpbDxfAFD%2BeepvRnRQTJRVF9CttYrisKfF0HlXX80VCc22sQXKP53EBUXRMtQOCrj%2BjvYtqSb&X-Amz-Signature=0c028e4fe9bf5f512dd91240b7f7033dce32f16333a512a56ae7caad7507c42b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZPZGXNQ%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH7ta26YcRj8OZx5mWD%2BGH26KkhLeGGpLlmRszBsmhqBAiBnVs3Unqd8oC%2FG63A4xPt%2BDGT5fu%2FZN93Mu5aGzI1ZkCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7dOsiaMUWbh5WPgiKtwDn6XQ9Zoeh6x%2BK08aGhl6qOmDNiMbnHoUzxCTu6J5y32QLjqlEgU0PkaO25fKexMPs4n6yUKB03sQb0nHjWL%2F56i9kYNwyhpbdkO71j4VW8XASv%2FcVJBMvi49VvHOq6fDDyjdg%2FsxsRF6gnyGpXIkzMJ28ycJ2rW6OkVT1NQk0VC4Vz4I8sMDKOEFWs001xHeVfsSH4fu8Mm7ey9Gw%2FAJyR2slzaGuJXqrlIxBYhFNnpYR%2BcDwD5cLNSLRwmowR15lMH9zhCWlDLHJ81V9mCCURpozlU%2BfWUPeR%2F1Gd%2BN3a1s%2BHrncKQD%2BPEAhAxOkV%2BI4Qyra2g6P13FeNr5OYqbcb2pMAYRH%2BNyM0MkzfiPbGcpF%2F%2FUMmx8oDcKsNEWoVd8aEtfcn2LDO%2FyJ%2B8gfCDxYloClA2oJ81J1wRXqAfyZYPRErsHS42NjWLnJKxk5TXbsL8U%2BzgCmxhBjCZ3RnDRWmP5Kk7xP0as073pzOe68t2pQKuMtiNAMSrUnvDLCFySRRCBDvR6smaOo%2FyCs2xpX3t%2BNLBI4ZRQsAnN2IUSa%2BO%2BJyv7S3FJkhRFQXd%2BfNswx7rlAcnEMV4XxlHfapfRMli63UUlFf4FSWrqQqT1Wr3raI5L6zoqU%2BL6p%2FQwhefKzgY6pgEOwPB%2F3NnftLvPXxfZWV4q%2BRbcYcSDsPyXcue1U9InS0jFQsjO9z42lZagOait6pHLPJYgHHGDZi4pL%2Bc7m0mbECO63E3yZrv%2BdUgFRyyP6YC9kWo24AQrU11YeU%2BBzoBJpQPZUmwWikzijncjGSn9qzzHsJyyPqXD7zmDyAfh5N0dPeXprIS%2BdnTL1fBiuPPqJvo2L%2BEnfVMqPzQWSPSbI0oqHf5L&X-Amz-Signature=022669cefb286cd05e872f0f3d38fdf123e8bb7c543608a459a9909e6eb0189d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFQ73XCW%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDx3JPwC%2FlfvZjll5BZ9j7m%2BCxoNgSm3IA0XFg4z8IxkQIhAOTjNXkDc4NsUDhF62MH9sFSDl1LqYpPr4KNA23qErFGKogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw88AEQ8zP6KE0%2Bg0sq3ANsmkuCyCHk8EEuiZbgm6870vMSkM%2FWxiPCciTebZC73%2B9DJKTo5U1%2BvBgbvBiGs6i3YKIOCTuBHfSKCM4Q28tYQcFri6FbqiAwidJpKcWuZPPtOfmMahDB5nD5PQIMIIyGklDZhS6Bnosk4hi%2FTm36fS4U1P1umj4EovzsGXUAygN1nCX9Tnyfy1tGkSsAH3dH9Gt1jaJQyDh84pCCckGnV1KCOq%2BXIIg%2Bn8rJDKeSScsQHMzjnaOAx09HFSwAVffsNxoTIyDNHYS802GkuGu9RkknWovDo63w6z%2FSGPCzDjk%2B2CWL9he%2FL6b%2BKCD3Nlx%2BG3SDU6ndPElMIL2BNvXVnxLHaECGA%2BbbraGwgxMvf25J6jtX6%2FcXauuDb%2BJgn87FSyK83wOJ9FJnlD1sNF3vlQA%2B8cIwCgIaWOg%2B0AVl2CMFBqsrTsehaOEDtK8bAXLrFajqd5TL5wc%2BOtcF14d8vIQMM21u%2BvWdfR%2FGwIFPKi6zr7U3pJ6jbG9K2bHytfZWxEQUhjt%2BVOaEG85T3WVh0kdPsVrggjLuFZiy%2B3JvMIgmGiaqWIRh3HQcgZ%2F672DQqdIRXIeDf26NBg%2FKnKY9Ooop6Uhefwz%2BD%2FjlQ6WW2s1wuByFgPrl%2B8Ut6zCz5MrOBjqkAReVERyjVN6%2F7aBwLkONwg9mjFk%2BmZSVL484D%2B69SLLSkg6J1gZFlX%2FDPJsbfT%2BvpdSgY5vhxxhzx8zCdxgyzekFD6cez47hMMYhaub0gB5Cj4NVXrJj%2FRmYnWNnhIVpky74ic%2FZ70DB2jVfVSbiouyn%2FYACTBojOXeLRyfhosnrCFxHIXL4YytkXBIPKl77USJI4pawAGDGz8a7UYH8qdQ6yzkL&X-Amz-Signature=342146aea06846191762cd2c7155a6a955798420edaee3565db2008ed2bd3bc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UR3UOM7%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH5ME6ikEqh17fWgovrnaAgrvXoUtY4m8WfpYLvpB1zoAiAjiI9kKkKo1nujTTa7AttNC4g%2FQqIzg2ntEsb97dxVGCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhxCMIarOuweuCbmgKtwDll%2BwYPO3n0yLlL0eTRGZD8%2BkY5t2LvshsFUNAnNURkfBrn3BcUrgyv5YT8x2DV5Gob2514ZRL%2FhmQOsUghXMr75xd4KuZ5ZSdyRWHCbwRL0ou9ZTxxrtXNqzJPQ1k8u9RQ2NQpv9AQi56IFOJl9Rr41OHiGgtE0ffPvkp%2FqkX88AmTnSe0rVo6hfj1g5AzsKZGIB95cyRO2yaN544nVCr%2BkNprZ6EjT91qXN1%2FZzvrKxyB3H199jJn4WlPDWNHbJwg6uPZtRDVPRFjNqKZML3iSSn1y1oESwi0pIT8cceGpq3jTZKJDelAQuVNAyTIxrBFr%2FUow33hA75j9s0gATRkASf%2FftprRJPKxqNhlQnE1suYWrJyP5MmAdCwH5vwG3t54R4%2FOk2dChJtFasGp2zcz2xyfNtRA5PKJf9%2FK8qx6%2FDIZp%2Fj6aDCVKBc%2BlQgWHlPTwQoPk348wMgcvJuiH6CFhkZuoQ1VKxr9LSw6YfTde1UGwuVhR6S9uYHfhk0J4YylOyayzOHEyvBJUNRALsKnkeAiwBwYsNUfrrCuRBF1jkJcRW3pYTP%2FL%2FH0S9YudGCful04U6mdIT949HncJTs1e%2BINUYqKB553KTH3%2B0eZiKL8vFBLspw%2BY3WEwpubKzgY6pgHRQjbbtTnVDkf1DH3rweZ1b3d4QWg%2Bccq%2F3lykxux3IwFr1eb%2F46q90WbxYAk50ZclRDl2X%2Bj6ARiHckr9vngvEEXbmLJTXtyjBpP7O0AXNfKPj%2BgodToh%2FXYYCmxFIwnkCt2IrqSsMPVT16P%2BfzK0RrSvZTSksvU7AUxLTwVm17gKlXI02kIfbozRNhsApFrvYeltUq%2F6PNIg8A80%2BqPtxOBatxYb&X-Amz-Signature=b31da06b94a72fc81c8625dd1cd30534e81655c8876e11525141657d2667f281&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UR3UOM7%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH5ME6ikEqh17fWgovrnaAgrvXoUtY4m8WfpYLvpB1zoAiAjiI9kKkKo1nujTTa7AttNC4g%2FQqIzg2ntEsb97dxVGCqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhxCMIarOuweuCbmgKtwDll%2BwYPO3n0yLlL0eTRGZD8%2BkY5t2LvshsFUNAnNURkfBrn3BcUrgyv5YT8x2DV5Gob2514ZRL%2FhmQOsUghXMr75xd4KuZ5ZSdyRWHCbwRL0ou9ZTxxrtXNqzJPQ1k8u9RQ2NQpv9AQi56IFOJl9Rr41OHiGgtE0ffPvkp%2FqkX88AmTnSe0rVo6hfj1g5AzsKZGIB95cyRO2yaN544nVCr%2BkNprZ6EjT91qXN1%2FZzvrKxyB3H199jJn4WlPDWNHbJwg6uPZtRDVPRFjNqKZML3iSSn1y1oESwi0pIT8cceGpq3jTZKJDelAQuVNAyTIxrBFr%2FUow33hA75j9s0gATRkASf%2FftprRJPKxqNhlQnE1suYWrJyP5MmAdCwH5vwG3t54R4%2FOk2dChJtFasGp2zcz2xyfNtRA5PKJf9%2FK8qx6%2FDIZp%2Fj6aDCVKBc%2BlQgWHlPTwQoPk348wMgcvJuiH6CFhkZuoQ1VKxr9LSw6YfTde1UGwuVhR6S9uYHfhk0J4YylOyayzOHEyvBJUNRALsKnkeAiwBwYsNUfrrCuRBF1jkJcRW3pYTP%2FL%2FH0S9YudGCful04U6mdIT949HncJTs1e%2BINUYqKB553KTH3%2B0eZiKL8vFBLspw%2BY3WEwpubKzgY6pgHRQjbbtTnVDkf1DH3rweZ1b3d4QWg%2Bccq%2F3lykxux3IwFr1eb%2F46q90WbxYAk50ZclRDl2X%2Bj6ARiHckr9vngvEEXbmLJTXtyjBpP7O0AXNfKPj%2BgodToh%2FXYYCmxFIwnkCt2IrqSsMPVT16P%2BfzK0RrSvZTSksvU7AUxLTwVm17gKlXI02kIfbozRNhsApFrvYeltUq%2F6PNIg8A80%2BqPtxOBatxYb&X-Amz-Signature=5d4e1b4912e0c321162666f872a31b1fe96f5d5bee31ce60c727292d348ccc51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663C45KFR%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCmGjYwiuqCuEBhcetftt2Nw0uBKEVtpSW9lv3KFI6e6QIhAJHWIr51DQQEB6SGVj9tkQh0pMoX1EVBVPbfUB3uE540KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyltyrlNbTH%2B8eghTAq3ANV5Y5uvxeII8Rw5MCquYit8lUujSFo75qp495NSiEbfCUnVabNtJNY4ASkQbMUGmZ6XkEx1lq1EHH5xeQg4zqY612giHRDmnnSL9CgwylfITqSOrb%2BuTt%2BNzt0PX1VqbYo01nQYE%2B%2F8dsLr31z0iqV6MLKqeeNuixLYe4vGFB9xAqslZBlGJAMZkINr039RE9t4Bj5xsBJwH9uE4wWCjsMSwkoMKwsap9VKhQZNLXkAXYbQx90I%2BPV6j6JLup5KGF2Uiq4HiNivIHe%2Fc8hbcUgjkQJFn2o9l4rhPBmYPLhwPXwGGu%2FZnTySxZ9xH7BpMfOdV0SHXZd4TdaT9j9m77H%2BDnEg3epi2Y%2FoYE0UdEbJ%2FsIMa%2BLqMtLitqlXeK5wo1wSzL8MvIs%2FdaeYq4W%2Bj%2FAO7EdO7pmaBIMZ6PGXi%2Fm4Nz5tOrdC6gvkvSSSfBRSyZhBBDvZFBkCEBTbrLN9xFFDXWw%2BBzmYaSh0SghyCS40aSNcikIiR48nODsqpEXsPMRw1JCEL8E0Q0ptwrv4XTa5NsU4zyf5W1cJQ606bKCmbl%2FJoxHen3QW8CETaEx1S2RH51UXIl2xGBMOVDmVna12bjON4WuoGsX4Iqg4EsXlKRuRvff%2FWTYOcopLzCm5MrOBjqkAWZIPSeuDlJnfVpuYwniBcWRxt1PaOb2Z%2FXBmSmINaHRSLkIiHKRjZkoaVMhNuzgF3hhpApmH80IkJpGsCARTF9IM%2BLEssE24Y%2B5lTLKF6m9SRVzKTB%2FjRUahow1NwkN5kHKWvQBFd5MWHyRoXyuhTjhlQNkX%2BS3YNpYrA5vEA8EqN62Pzll%2BK5QyVOKiQWov4qCL6F9lZiJTarJJw3kPtIhcz%2FA&X-Amz-Signature=3cc8e0bae497effe4677932b65145cc47dd01e86edaea4b1ac01f5fef6f7320f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAXDSN5H%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHo2l3%2FUUNJKcDB6ZcgtTykvs7B%2FWsBh5C2ScfmOfSNyAiBejsSeo5sWUr%2FSppCvpn1oeW56pLKGbrVAFqGVTGi5HiqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhOEVongHdo2KvlLKtwDqvMWE2YpSLpV16p8FRPznvBljWFE58DQbtrtZUqRru811WVEHXyZadAKSY4clB4SpZ9gdqdJr8W0dshNj97AtHp7gGaYf1ShmgUluLeC6%2Bz8fUStT3cHKry0Lu7gskLjUBy%2FeSjx7wDYHZ7bTS%2BHN8IfLlZ%2BuddwoY6diCeWdQLxD%2FmYT0EQvE1bsqE77d3nfV0IhDcYxfe74qV%2BXLqwmbw07JQRbV4YZ7V6OQCkdMzFtdfw%2BjxD15SNbKGDsJwbi60O40CZNW8fh1jxGL%2BsSBpL9rhM4gbuCRhHtr%2FZgC4AdxFDKmeuVLQwZxmZOiPoskDOF8l0EXs6lE2yGh8uanjHpcmxGJZFIbi4D23k%2FCltcU8nqiI7OK03J3cbCV4ba0IGGNo6tqLUrOamI%2FPx8AVPvsVIdi%2FhayByqnEENRMKPrlHhLTBISS4wa%2FtvCwvKkw%2BasQfkkh3G1bhReDeGhgdECWaD93nP0DfWSGj59x2hdxtnFyGyt6W5dVpIUADsMti9rsZDab3oWMJliGijjkUV9fyH7IfNqtTNiwhcgS1L7DpeZQzf%2BwtYnWyReZfpXqHtqjF9OntxRfuJ0kALps4eDHLyJQNRMxGEBK86oqqlzxq9%2F9SjP9EyNMw%2FOPKzgY6pgEVO7c2Qko9aZHtpMDMdWRWcXSIEPKWTrwPMtjpO1Clanf1qEQKE446Bj1%2FTl9CJrTCZtBndFPOFtq1ID8xJGctb9dC1eF2puavxxPjPWS%2BD53TxhmvKVrzyJLCIIbcGZTIU8n66%2BE50z3frnteQqBY08sCOHhsKeDtGqkgIpQGPv5fsgjxIh%2B%2Bmhg9mNPB1YPj3jkPKpaUEGPbHzeq1LSRdVScbssS&X-Amz-Signature=fa30ccc97653847fadcab2a6a4b5878bc211c0ccda6a6467c4b3f2c06295b96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAXDSN5H%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHo2l3%2FUUNJKcDB6ZcgtTykvs7B%2FWsBh5C2ScfmOfSNyAiBejsSeo5sWUr%2FSppCvpn1oeW56pLKGbrVAFqGVTGi5HiqIBAi8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqhOEVongHdo2KvlLKtwDqvMWE2YpSLpV16p8FRPznvBljWFE58DQbtrtZUqRru811WVEHXyZadAKSY4clB4SpZ9gdqdJr8W0dshNj97AtHp7gGaYf1ShmgUluLeC6%2Bz8fUStT3cHKry0Lu7gskLjUBy%2FeSjx7wDYHZ7bTS%2BHN8IfLlZ%2BuddwoY6diCeWdQLxD%2FmYT0EQvE1bsqE77d3nfV0IhDcYxfe74qV%2BXLqwmbw07JQRbV4YZ7V6OQCkdMzFtdfw%2BjxD15SNbKGDsJwbi60O40CZNW8fh1jxGL%2BsSBpL9rhM4gbuCRhHtr%2FZgC4AdxFDKmeuVLQwZxmZOiPoskDOF8l0EXs6lE2yGh8uanjHpcmxGJZFIbi4D23k%2FCltcU8nqiI7OK03J3cbCV4ba0IGGNo6tqLUrOamI%2FPx8AVPvsVIdi%2FhayByqnEENRMKPrlHhLTBISS4wa%2FtvCwvKkw%2BasQfkkh3G1bhReDeGhgdECWaD93nP0DfWSGj59x2hdxtnFyGyt6W5dVpIUADsMti9rsZDab3oWMJliGijjkUV9fyH7IfNqtTNiwhcgS1L7DpeZQzf%2BwtYnWyReZfpXqHtqjF9OntxRfuJ0kALps4eDHLyJQNRMxGEBK86oqqlzxq9%2F9SjP9EyNMw%2FOPKzgY6pgEVO7c2Qko9aZHtpMDMdWRWcXSIEPKWTrwPMtjpO1Clanf1qEQKE446Bj1%2FTl9CJrTCZtBndFPOFtq1ID8xJGctb9dC1eF2puavxxPjPWS%2BD53TxhmvKVrzyJLCIIbcGZTIU8n66%2BE50z3frnteQqBY08sCOHhsKeDtGqkgIpQGPv5fsgjxIh%2B%2Bmhg9mNPB1YPj3jkPKpaUEGPbHzeq1LSRdVScbssS&X-Amz-Signature=fa30ccc97653847fadcab2a6a4b5878bc211c0ccda6a6467c4b3f2c06295b96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XERDU5B%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T192508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJI%2BQSvYSnA68ym2Pp2fR7jUXeChW6UAzriCCf0%2FcEWgIhAIDrYl7dafo5wX0DjNLPGEc9tRG9QLmKcuaZALA%2Fmwy1KogECLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzOgyL0ehFKLvO%2BeGQq3AOdm9qLdp9NPFVMhVL8%2B%2BkDcNIKyO%2FzSLxtCxuTHk%2Fr65qZ0kDY%2BzhWs6NBmKQSWrsP5GW8rCoZq6LeDGx%2BoWfyDqf12OKlUoXeHfL82pVvaBpzs5nlGh6LrVRF9f5Z8ElrJFqLai18iGhx04aXAaQrZFr0XoLJRcMqsBaLKa%2BS38DdjON6bdvnRlpSWgWtq%2F%2FMvOK%2FDtkazrrTdk5EOpHMm8JIVML6tAG8iHzW9FekWMssns709p9axm02uFDN7JExQ9QN9lsx9Q3hoCfqYF5OnF5DQdmEKOhRZI1S%2FMoxkqF4QXEgWM8r2CAAvudfJd18iaNj9X4alPQVXljImhn3edWnOPBsvKchnIamzSP7PfO%2FCRv0f2hakpdJ9HYmqQrWwiCC14ehOIuJFf1mVWFi3DjWP%2FMBFv1wqMrAfA%2FRJrAsjJJQKjr1NkVQ9%2F1XY5vDz4T4%2BkG587lksKMxcZffgLoWSD%2BI6h2QOYRSRvD48G8nS8XS15oyk4K2q5YypUTlXKBz86MiHEKqPBJhNsdDjNQjsUNfSxM7wAhBj0mrIyB71edbfg6oRXvyDQi46OG4V%2B0DIsjD0PJkZp6eLD4HhaJRoyIJC%2B0jMx3PO2FW6lc9FgKwJBR1oc5OeDD848rOBjqkAaGKn7oWw1Jr%2Bnzj%2FBp6iSUqvn8l0QG9cViOCrT6Ie1FPT8dxzV2SCvsdfEslOXCCuzIXehG48xFGaDTnI%2FBCmBDmH%2BI6NL56nwY%2F1FleLvTs0Pdnx0wjOApHoVuAexsqgSbKVmgfN3jDRyDvFrypGUMXsOcee%2FWQREmIaWhT8MbwCXWmS%2FxLjHOz4msTbxwdl0ATJnNtMNZYvaXwuw%2FTJkpfTGR&X-Amz-Signature=b72ac9b44bae116c7fa1a1fbbb0a460d8fc631e6a3f03716110df30006330920&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

