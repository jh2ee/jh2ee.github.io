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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672HOATJ6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCLntue91f7Suk0gRAvg2kOcwQNAUdHF7pJ3IVDMD0TrQIhAIXOLmHbcFfb9PJgYdSg1UYFt2u4OhaRqp8JZXVQ5nonKv8DCAwQABoMNjM3NDIzMTgzODA1IgxD6H1ojVEyq5URYGIq3APzSi8ONrP4TgmHP%2FBKRixSykoAt%2BG3m1BD1tRTUsgJlFfOnweBagn7BkC2KhG3rVI82JSeBDXWw%2B%2BU2ONxv7DQW0R5DuzWJSTMu7gdWqtHj%2BCFzkE0aq6SZ9UhIFbvnIWRqG0dRiLd54ghUjRCCQFOFyyov7yTIOSFhY79f%2FuqSXYxoFvndYNes70%2FMLJlFaZCljhH8QBSbWXeJ%2FEuvlkVhFixnsahPr%2FkyxVYPB9st43quyjHLPGVmwnwV%2B%2BOrWc5ub%2FVdnGUGiKMIziz4KKq49zbSkaztJDuJvbDvfQeeXb2%2FeYQHvfnh88mt6nJpc0y3fPAGdenGMBnCBC8MrNCyHQvWfL%2B0rFdA4WABUAF4pyOUhZjbr%2BEUc7xKxSRkSNbT0i%2FT5x7Piy%2F%2FGWZGQApHd2RtwW9X3FYw%2Fu7RA9w3BOJ78o2jH6S9S2bNFlGDdP5U5khCP5mPIeu8RaGZDnGgUbNoM94VkO3uFebLs9AYoNSWQxbg%2Bb2wbGZYEMOZnKmZK1My5VINAa9NgzyRPxLRk2nYFVxSmb6NEVCBkIBfdclsc3I9Gurns4wcSHDFG0X9udAGvFFUEudM0zpF2pHahHed4fAy4uKDotvNfOAe6MJCfU5sWQDFeJa9TC2oZrLBjqkASpxWpCtn68HX5cXEM2wlSo9OpYCbsQlhBJb%2Fo49L7AtzU%2FjkL8dskiTz8xuBTrC7HNYucLNzSTWFEnMo%2B97IMS8Q816r4d384ext%2Fb8msTgpAh%2FGFObqhuQv2VX39YXfCOpQMxtyihYI783gYDrjjPKbGIyOvjUfL4v4h9QF3ho9CuYkSx1hy%2FhKyAl638I9t3CnZCqzQU%2B%2FIVTJGa5sSeKacdr&X-Amz-Signature=5a76d7ca078f0f48be11b28f855daa99706ebc54b65ac6a143d7a4cb3716fcf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672HOATJ6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCLntue91f7Suk0gRAvg2kOcwQNAUdHF7pJ3IVDMD0TrQIhAIXOLmHbcFfb9PJgYdSg1UYFt2u4OhaRqp8JZXVQ5nonKv8DCAwQABoMNjM3NDIzMTgzODA1IgxD6H1ojVEyq5URYGIq3APzSi8ONrP4TgmHP%2FBKRixSykoAt%2BG3m1BD1tRTUsgJlFfOnweBagn7BkC2KhG3rVI82JSeBDXWw%2B%2BU2ONxv7DQW0R5DuzWJSTMu7gdWqtHj%2BCFzkE0aq6SZ9UhIFbvnIWRqG0dRiLd54ghUjRCCQFOFyyov7yTIOSFhY79f%2FuqSXYxoFvndYNes70%2FMLJlFaZCljhH8QBSbWXeJ%2FEuvlkVhFixnsahPr%2FkyxVYPB9st43quyjHLPGVmwnwV%2B%2BOrWc5ub%2FVdnGUGiKMIziz4KKq49zbSkaztJDuJvbDvfQeeXb2%2FeYQHvfnh88mt6nJpc0y3fPAGdenGMBnCBC8MrNCyHQvWfL%2B0rFdA4WABUAF4pyOUhZjbr%2BEUc7xKxSRkSNbT0i%2FT5x7Piy%2F%2FGWZGQApHd2RtwW9X3FYw%2Fu7RA9w3BOJ78o2jH6S9S2bNFlGDdP5U5khCP5mPIeu8RaGZDnGgUbNoM94VkO3uFebLs9AYoNSWQxbg%2Bb2wbGZYEMOZnKmZK1My5VINAa9NgzyRPxLRk2nYFVxSmb6NEVCBkIBfdclsc3I9Gurns4wcSHDFG0X9udAGvFFUEudM0zpF2pHahHed4fAy4uKDotvNfOAe6MJCfU5sWQDFeJa9TC2oZrLBjqkASpxWpCtn68HX5cXEM2wlSo9OpYCbsQlhBJb%2Fo49L7AtzU%2FjkL8dskiTz8xuBTrC7HNYucLNzSTWFEnMo%2B97IMS8Q816r4d384ext%2Fb8msTgpAh%2FGFObqhuQv2VX39YXfCOpQMxtyihYI783gYDrjjPKbGIyOvjUfL4v4h9QF3ho9CuYkSx1hy%2FhKyAl638I9t3CnZCqzQU%2B%2FIVTJGa5sSeKacdr&X-Amz-Signature=5a76d7ca078f0f48be11b28f855daa99706ebc54b65ac6a143d7a4cb3716fcf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZW4BMP6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIHJjoyq6P1G%2BUz%2FVbcdf9hpEgodko2LC05y2unHQzQggAiEAk7yUHvtWaEAakNjiUffj4i5cpUSP%2BspiiiRS93q8WnAq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBb0aZn664PTwgHVYircA%2FOzxuofAaY5kft%2BjFCu5Wy9HVxCMQDOhJowF4hxR%2BDYZzsvjJIKvpNX9vXDomLcBjEutloss0gkMKOE0Xt2aEYmDCUWR0wehxnKHyJYuFtc61JH6MYAlNsQ10tPlF3dXjfoQaueYDMTbQad0JiVhZ5AjzaUNemf%2BmXRGcuKKIx1yyNcmA%2F1tdV9kPdvx4tbg8Asrw3nkhTNsJSBSEmoiuT1kQG6%2BmDvV4cqK9nCBIGMTLX0dChDAfJNyqQjcTLktGCArGF%2BATE9i1kjU8xJiBVBVhZYTf%2BLRaZzAxorGPpECkLKHiZ0XknMnJkPiO%2B9F7NW6Nyn26U3m3rmPCDlX83JzC7iIunYVZv53bWW5LuHJQue7lzw5ndI%2FruReHUIaq98EQBN%2F5LTS5kE4ZoUpXnfiJ1qG4O%2FAWsurEQbKfayyLKSleyGRQVjl3J1BNdeEZKaUWEZB0%2FZWd4OWPC3p3gxe4GsAbu7snfzyhDPaHIBIJVn7toMPviQE6MargmaakuEhioQjVgh7OC8qQD95C%2F%2FzAGsyE4B3VB3uOt0MGq82M%2BwHRpx%2BzvcDPH08wnjk0iAyZBkzAVvmRl4BIH5vGTew73f1UvJRADLu5rca%2FazR24uy%2BH9W4kQKfuhMNmhmssGOqUBQ43mfBZPpcpkAPBvCcXLWnkCRbhO5klhqhsZxUjwHBOuJ1WRwCpieP5UUbL0yilzzqSYvfWEsTguOk%2BXEqemQdFrwNhfU94YcLPSknQrqqPljL4mWCBE8%2BUWEoBTu2r8M9h4o9uQ0qsto4iOkJUFrnoG7ocfrFdWR1%2B48NZxLfnh9kS%2B3HY0gD%2BxwRC7VTS7HOKhA%2BAEX5qMGyubgxXLn5Sk7FD4&X-Amz-Signature=8df024a09bbd373565c7213e4fddb8eac54e55eb7a30a813d47ae026832eebfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVIPFOYI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCUhXbr7pJNQ1G2Eu4nSHjUQYYCA7fp%2FmDN4XcM2fNDJQIhANZnXw5M9u0bM1tLiuHrm4uNqpiDnqjJvuoiLK1j9uNfKv8DCAwQABoMNjM3NDIzMTgzODA1Igymra5yqVdmdb6Y5xIq3ANCptd%2BE46SN6nx6OVkOvOONr8YAOtrNTR27N%2FIAM3ilYcsIwmf8LGSA1NDFRR7XG2rQHKfXLmL3HibcJZtf%2FIe%2FpfNQXoh%2FNY5FOwamW2cD%2B%2Brs9nm3Sr3OhFQptu4xo1VWCSh%2FGbOYZF3RGuqHPfgA767QGQ6ix7gEkRBqElBLD%2FyLJreyCPr76%2FeowHfPik4Ef99RiuZbhqNG4TzYuAKwR9%2BsDNwWQbcP4fas%2Bzc8tO2yscab2D6inD2RezustPbMg67%2BydF5OxXCFcjAm6AW0t%2B%2FiKhb%2FvWVQN7Aq8v7R7Pkt06WYeAVh2Hv79YTdsW%2FBt9NLc5PJyxqXwC%2F1ce0Ro686UcTC%2FXXVgfoB7oylrexLBVrXLzNULM1jyQ%2Bm7H41ek6sq5V2WeAxAIxmfG7zTPn6zg7NozhwTy5MOo7Ly1lIpFnt2wHXGI%2Fr58uvLKhIoJP3Tax6jAEr4scA9mK36910KAMHAcVVg7tuleIKW%2FtujSp%2FSzRUCgzzILf2KQwiKAvaJqKhi0c4n5Q1IQGhmPiPvtbwsGcBxZlTQs%2FBljIIww7ghDVy%2Fs%2BC04RcPPVaGdF%2FlX2KS4kL8lHBAGFbmizO7uKddY%2FzGBI9fDC%2F3rAZTgWNOHzCemoTC3oZrLBjqkAey4B%2FGI3f3HcuMFOGhd2xQNRLinV%2B%2BbT3s4WY0nACvlSvLmaagvj3%2F3LaAyq%2FZfnmi3Rb8dn3ONc7KhVAvLmJxbpc%2FBFs%2BqyCcRpz0rq30T15SbXe2EB4MBbUpiMdsnch2nwEV%2Fe7xnwlPX2brS586q6q9i4aAuFFGjM%2FXP%2Fd%2FFUhqbeBUBf7hcOm%2B585edq%2BJm5Ts1FCkyA4PDJQX9TRjUo23d&X-Amz-Signature=7d0fbd66b156fab7edeb9f01607f26fd85763973d2dc40072e1934b75da3a36b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVIPFOYI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCUhXbr7pJNQ1G2Eu4nSHjUQYYCA7fp%2FmDN4XcM2fNDJQIhANZnXw5M9u0bM1tLiuHrm4uNqpiDnqjJvuoiLK1j9uNfKv8DCAwQABoMNjM3NDIzMTgzODA1Igymra5yqVdmdb6Y5xIq3ANCptd%2BE46SN6nx6OVkOvOONr8YAOtrNTR27N%2FIAM3ilYcsIwmf8LGSA1NDFRR7XG2rQHKfXLmL3HibcJZtf%2FIe%2FpfNQXoh%2FNY5FOwamW2cD%2B%2Brs9nm3Sr3OhFQptu4xo1VWCSh%2FGbOYZF3RGuqHPfgA767QGQ6ix7gEkRBqElBLD%2FyLJreyCPr76%2FeowHfPik4Ef99RiuZbhqNG4TzYuAKwR9%2BsDNwWQbcP4fas%2Bzc8tO2yscab2D6inD2RezustPbMg67%2BydF5OxXCFcjAm6AW0t%2B%2FiKhb%2FvWVQN7Aq8v7R7Pkt06WYeAVh2Hv79YTdsW%2FBt9NLc5PJyxqXwC%2F1ce0Ro686UcTC%2FXXVgfoB7oylrexLBVrXLzNULM1jyQ%2Bm7H41ek6sq5V2WeAxAIxmfG7zTPn6zg7NozhwTy5MOo7Ly1lIpFnt2wHXGI%2Fr58uvLKhIoJP3Tax6jAEr4scA9mK36910KAMHAcVVg7tuleIKW%2FtujSp%2FSzRUCgzzILf2KQwiKAvaJqKhi0c4n5Q1IQGhmPiPvtbwsGcBxZlTQs%2FBljIIww7ghDVy%2Fs%2BC04RcPPVaGdF%2FlX2KS4kL8lHBAGFbmizO7uKddY%2FzGBI9fDC%2F3rAZTgWNOHzCemoTC3oZrLBjqkAey4B%2FGI3f3HcuMFOGhd2xQNRLinV%2B%2BbT3s4WY0nACvlSvLmaagvj3%2F3LaAyq%2FZfnmi3Rb8dn3ONc7KhVAvLmJxbpc%2FBFs%2BqyCcRpz0rq30T15SbXe2EB4MBbUpiMdsnch2nwEV%2Fe7xnwlPX2brS586q6q9i4aAuFFGjM%2FXP%2Fd%2FFUhqbeBUBf7hcOm%2B585edq%2BJm5Ts1FCkyA4PDJQX9TRjUo23d&X-Amz-Signature=bb87914b4b10e7d6ba36532e5c4efe25559ff7ba00aad5acb4bd5cb713066aa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NT5HGI6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCR9WrH5uIYcvJa2B1KLGhT0U1Pfp1R17ypmu2GHY2cVAIgGfmG0DD4x2AkkV0%2Bs9vA8NS4m9EbnqiD0jWB%2BPWmtF0q%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDBk4E2x35EUwzariWircAx6Cd3gO3AZ6Ix0ez%2Fgqr0zEJ%2BTDHRojKGqpV2QSKOJwD5tHaUxVlH82MM1%2B2Hx5Cq5C%2B47NpKfEJjFkQVBMO%2FhRszHQX2C1%2BYfQV7R80u2XPjtaTHXbTIGZ02syDSAvF%2FDNubtmsi4QZkHnvkAb6Op5QKEmKI5ixsz%2FOXZ7A1oyecDiOQTKCN68AUDaQoKAXW8e0o%2BwhzbiNYt0nhm8i2VzsdeiTV%2FKQeo5tihVnLCPpD2hugg1zv1ReAm0h1ZHWP9qwCaSwACwf7vIXw%2Bl53Jjm6JPuvVoC4npwKdOs533WL8eHh%2B%2F0PGUulqG0Igfv7FcjTOBbW4Mm7oUfGcqqBliT6BpcBJhlhok5Gik9e3tSS1oxvwQvjsaXiy%2Fkkqph9i5B63auItw8Ev3rAalgc9WPj7ghIonHVhdX%2BYNvPM8o2JM7JvI8nI8kIEcstpLNZLGUyw5y6clIeYxJa6pPQY4exxMV6bvsbXZgAYLvCrehvRs0y5UP5OTtZxwPETKIN%2ByQ304EpKx5vgRecHoHh4Fjdfzh4ELcJNi1IS0bkAdllQ9honj02RTDUSb0k%2FgW7%2BWkPyKdjnOo37N3hi71fB21ZMgu9IDKxRQvO1uIE9yrcFhyocnlcSOr6n7MPGhmssGOqUBp%2Bh%2B8%2BJnfU%2FCSVKtNe0GH8LUzOoDJJ6dbCHZxOlxYkYPmoowv7tb1w4X8FQHb4SL%2B930WqOa3LKGN8sy9%2FCREnl%2FDaoB2l27t2eqFd86jfSmf5dLVB%2BFqMoOEtX2C5KX3XWcFeODlMw6rX27AQe7QKNxpeL7sefpeWYkI4Y577j0flB8iHdAfedUa9nCznWMXy8Z64HMFepDCAHZeCGo7yUNhtG9&X-Amz-Signature=94fcf70814360c7d2d6c7b6d935a67697b1581bb5da07f109d36da4746540102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUJF3WXT%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDb1M8nSVO7R8q5PeH2U%2FRPoVQaDvuhH12SOWfUMDU%2BhAIhAICGD86f8AuwfPdy9nDJ4SN7jCu8kC%2BPcTZtgfem%2FlN8Kv8DCAwQABoMNjM3NDIzMTgzODA1IgwzJIgTNGssIqFMOi0q3AMmCie4oYmYRj2kx47zhM6tnq6hp1EG095SSaiqx8Gw5zgYXPO6Exy7u5zcH8%2Bbh1RHqxBPHId1vl%2BSKXwIZNmVFj9hZqM2pbmTWntf3mP%2Bc9jxQFSGE3JPMrEvl3ZJafp5OWZs1%2FyvT4y9W%2BkAeFhbdwJzBDlpL9f8F8DlOzxRhtwMTMEC7DS3NFwLrkNVETdXd%2BusODlLUtAMZKT5RORLor2P19vgkUXhWkloNulEqqH6T2P6tzwjHuj7%2FMuWr6HEpxpvIt08YUXqWGA2t0Y%2FFKuvMzoWIjY8En%2FAKFDOvracRV%2BuFbgMLtJO89C75v0h9juSCpqsdsMMsatJ%2BulvLG7ZY9jY9eZ3ZTnrXfIAO4RCQGwatqM%2BtsDNPx5FC0Dd1eRyyGY%2Bq0yRW2qa91ANSNd3J4rnI4prQ%2FplS5XGcAUhx6lPkWLFkZjkC8c1sq8xAekqbb6HvOYIOaqSwGHTrOCADpiDJo0xU%2BoiVg2POGRWz3vXjNIgxZm3fXkl25%2FMb6utjt6dL3C1iT1dNbBxzsUoSzqDi72gqmQGcdPMSNtnqxAbrTAXMZ5KeV7jUuwW6Hjc7wYEJr401qqxasw0%2BNICwjxyI08ryFxSAmGWZ23yDyQs1Na9Li1hiTDAoZrLBjqkAaDqmZP%2FbVebBSH8hLwQlto6tPcFIGlgYMO6fNCka7VvG%2FQ%2BjIBgcFb%2FVj0NLJmXEnEc57gJQgCF%2F3jnalQNEf%2F8pEIdl%2BnfcWKrGdirlDt4TaUwPTMZdyQVpin46rim47salXTaWCilMUqPV%2FWGRurlZTp9EKhaKE7yl2W%2FJ9lpYzaXUFvMGW3XU3hZzNfe1q2BXtAoBPHtAt8zEo3lAAsUl8ft&X-Amz-Signature=38773b0cd507667234c2db3d6151fe918cb159ce3b21822e5c7438eb74bcd898&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663O4YS3OX%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCID34hNNe%2B9sg%2BtnJxCNrPp4l9YcYv9cf9AT%2B%2BaOe6q3RAiAnSpeUDXRS83gsfaGm6tj8IbMHtB%2BS7Mq%2FS2CJO7NHwyr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMM98G2aiGH2UUdG6%2FKtwDrrukDtZilLyKl3XEQPB9muICkSwKhfsOe6iZHJd39ibqx0IDo6TRZ9BajGDFHipmISVUboVHtlSewx8%2BpLOYBDE9321Z8rfAJuJ2rznjJf7iJtm9c%2FO%2F6JO4wF9lDjdv%2BwWUV3HTeAdshRQ%2FNFLPZTPevY5HDE9lJcldC55dSpqRRjeuMXHzswgZRahPASP4PLa7lLx3hjTZvQ4QmPBuk4D3cZ6ZysyXxGy9s%2BrPt7rnpAcuVo5iq8mu6XRSSCDWkxEbJnLLbphh701R3dH%2Bcyw84w0JABk9T3OBkA2RrhsZ2qej2rZ1c2kDgjol3xkW0117PrdcszMp0iw%2F4SuQ4EETExmXXfD9PMYUNojDBOonQ214wbq%2F9hc2Tb%2BP0%2F4bDqgER5ffAmOK7AdeslsfUh3b%2FXNRBlVVD6EUQD0g1ZCm8TNbu2w%2Fyq2OpTcxdKrfnLSkG0yFYcvgaJh6VRtHPL4Sv%2BPqH1lyxCeYhcLgu%2FEatlPjXmz5axBXt%2FBcq0GTRmfIMlaHd%2BkVThHZ4XKXBQOyKFzQb9zfje4tdv%2BpV9JVooPPYY%2F5QbbbxQPdBV0a1hB0zpq65f4RoAktHs93P120xhPcknDwOV6%2BBkczWrU5BQvxmxkb9RbbKXww06KaywY6pgFsILyLKE3b9d8RqnM4WeaJztRvfxzdofYq10dlg3ZuM3bd72N35I2wyxApBZ194VhBl%2B55%2F7lZnlybpf4hGRn7mnILQ1TWCdxrjTzVVbI21W8XxT6DpreppW%2F3rUlvlK%2BcC8kythjj0dF8GZjVtnEKqKhxa3uekbpiwo2nY4d98tSqWOzLKJ4w2%2Bqi0%2FHZto9oWvTGpZR4iAKZ3FiGk68fxWel5oTU&X-Amz-Signature=c7945c300aa15a86b4c78115f1a424c7c7a914c88ae32e3096e8f7dbf5944047&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIEETDZI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCrIJ4r37Kv%2Fn1PQGKwaWucjAIL48V7Htd6NJ13XS6PgQIhAJdQXoAdwwR67Y6OkNQYKI2UCFSJFqd12e93jTjrUp5IKv8DCAwQABoMNjM3NDIzMTgzODA1IgwDi%2BIbUOwUu9%2FmXOEq3AOglzp79LtSdQp0XY6c0qOpEaJgmSMLmbTYibGfB5034DT3MURlZODHfTl2bHV9ptLd6MbDmCaccTC5wW7FHrLTleAXFFhbEEkB%2B1rzCnEL4V2X3qWSU7a13w6J4phieqluea46fMAAYkMTzsDrIFAGTH7cNpYwzxFNlJ06Zi9XJiwgl3tS1XH3QLg3aqNlIEkvB3%2BIGOYlGmM8fTBePQq8dQsT6CAOUHGQLmr3A92Szxrv7n5Sh33lspVmH7fQ4FW3LIJSVXzpuCG9WA%2FMe%2FIOJmEHsoiltIU19gWF7Spj2Da9XHdKxrEnXCg54%2FEh1vhJBdXlzUAoz9IG2M2YYCgAg%2BI4xRp7AI2yo%2F5u4boNVfGM8YXlsdPhMg7WkbVFPFSvuA2CaS4Hw6K52CZGMAtiCCCjpRg4QASJY5K8MyJ5yzNZolNe5dpGwyGEpueKdqTgCuCQPbTG1GGRsA0t1jHZ1%2F92qtd%2BA%2Fkp6PujAlCBbQlzJsCKp3eEYcGF3n5NG1g4R574OdBo%2FrLUFp8zrU5HtoG%2FrRpbUekuZX42fZowvmTfeGW%2Fcp1R33QCu9iMjS9%2FRJgFk5gEcxUTgjQHru%2BSDmqsdqo2jjO1wf%2F13F%2BsNzKHZZEYsG3Al9P3BTDSoprLBjqkAQStUqtT0zjNnRe9Mh%2BwwuR81WtaSggf%2FSjNNCAhbBSdY3qI1OH6lXBw7sL%2Bvqq2UzqnWaoBUKUM%2BGMxrZK8PiALiAukIQdrmCNR9YrVjU9o9UYCtgu2urdlTgnGvykRzRcjxSXt8VMYk36Ocf5%2Be6XxLD9j0aAmF%2BPSNIeF3CynJd7etkaLE17h8GOI74MXwLuheyjLwrxe%2FRPh57%2FVh4%2Fc34xi&X-Amz-Signature=0782f184ac1c503500871ae631dd5be9e4fa7e708514951e1c38c389475c0a1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIEETDZI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCrIJ4r37Kv%2Fn1PQGKwaWucjAIL48V7Htd6NJ13XS6PgQIhAJdQXoAdwwR67Y6OkNQYKI2UCFSJFqd12e93jTjrUp5IKv8DCAwQABoMNjM3NDIzMTgzODA1IgwDi%2BIbUOwUu9%2FmXOEq3AOglzp79LtSdQp0XY6c0qOpEaJgmSMLmbTYibGfB5034DT3MURlZODHfTl2bHV9ptLd6MbDmCaccTC5wW7FHrLTleAXFFhbEEkB%2B1rzCnEL4V2X3qWSU7a13w6J4phieqluea46fMAAYkMTzsDrIFAGTH7cNpYwzxFNlJ06Zi9XJiwgl3tS1XH3QLg3aqNlIEkvB3%2BIGOYlGmM8fTBePQq8dQsT6CAOUHGQLmr3A92Szxrv7n5Sh33lspVmH7fQ4FW3LIJSVXzpuCG9WA%2FMe%2FIOJmEHsoiltIU19gWF7Spj2Da9XHdKxrEnXCg54%2FEh1vhJBdXlzUAoz9IG2M2YYCgAg%2BI4xRp7AI2yo%2F5u4boNVfGM8YXlsdPhMg7WkbVFPFSvuA2CaS4Hw6K52CZGMAtiCCCjpRg4QASJY5K8MyJ5yzNZolNe5dpGwyGEpueKdqTgCuCQPbTG1GGRsA0t1jHZ1%2F92qtd%2BA%2Fkp6PujAlCBbQlzJsCKp3eEYcGF3n5NG1g4R574OdBo%2FrLUFp8zrU5HtoG%2FrRpbUekuZX42fZowvmTfeGW%2Fcp1R33QCu9iMjS9%2FRJgFk5gEcxUTgjQHru%2BSDmqsdqo2jjO1wf%2F13F%2BsNzKHZZEYsG3Al9P3BTDSoprLBjqkAQStUqtT0zjNnRe9Mh%2BwwuR81WtaSggf%2FSjNNCAhbBSdY3qI1OH6lXBw7sL%2Bvqq2UzqnWaoBUKUM%2BGMxrZK8PiALiAukIQdrmCNR9YrVjU9o9UYCtgu2urdlTgnGvykRzRcjxSXt8VMYk36Ocf5%2Be6XxLD9j0aAmF%2BPSNIeF3CynJd7etkaLE17h8GOI74MXwLuheyjLwrxe%2FRPh57%2FVh4%2Fc34xi&X-Amz-Signature=905a563525cad066e5a386f1a36ebeaddb55802b2c76643c81e47d31f3597eaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKNXPAH7%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCaiPYms%2BomvM6dUkGnuWH00%2BDx0MU4N8pd3r1UYxSqeAIhALIx4Zlg3fyCOkJJ3QSumX%2BM5B%2BxwQmyOvbxjUr2SW7pKv8DCAwQABoMNjM3NDIzMTgzODA1IgwRvY0RizpoG2XqUEYq3AMx%2FcVwxJ7shpaVeFNptiG8vW4dtiVSIBTifhN4fZAbyIII5o6bDuAACjxVS1TALhonl4jeM%2F8Pa7EEXfnqLraNkQGv3mZ1oPY837RcXMY7QbGkTBPmiQ%2FdiN%2BQCogk6AmVJQKF5TS6E%2FhpsJ8Rh8jpZzG7R%2FbrUaBQEwQFavPPByAS8yEKtHy4EtglXYHivcYs%2FCczIBgRR9le9bklFef7zHwkv9TUkZMuCQ5cFSfobp9ZTStOI44auMEvgNHZwZ4jSo4lP40NqMi2kaopcFUujDQzUpQDvAqYzAcYynR7OJSHudygOqRmolvwR0PwyRh0tjaypXSfciMor5NbxXr%2BnETxOMF3KC7YEwymb7%2Fll1VfsRGqEUadAJYwfTAwWYgUSwzGRB0wx4uuxk%2FyNtsr4tGX4NgHc1HhndBngzwandN1PLWVXzx%2BqS9UVVf%2BHnK5u99fgt4yNAryx2Schb9DiAB3VTxbBwXU%2FdkZjs%2FQpiD7APf7TTxh5%2FGk9Y6Z8EJ4u7Zqa9Ys58A2wDxDIbo2mrFeh3xyY7rBwE2xS5drinBEjqAhgvI1u6OioJBhsap%2Be7rBUdR6uHaKOC%2BxqhT50HHGnSoYgWgAWei4sH6EReirff%2FC0Ptb1kF6jDCVoZrLBjqkAQygyYqCxMiTTybGgXPO1DMtRmEy6z6YTZ741ngwMJpuv13HVdkCQ0xpMkjTKhV3NGDLg7tlcX%2BeNoOuNzebcqJdvHFT3CTmBkFg6qfypiL6hR60fC%2FCOVJPaM4vLmZdQcYUfrWsovcpxwQ6NAfEpUf74671Ecrl60esTth2%2B2WyDRjvhCbo40bNsI%2FPcGHOl5SojRM2AJzyg9GTP7dJhUO3uRhH&X-Amz-Signature=9a5bbb07f4bc802ab784df596962201ed508c7b1dab1b2554a235154864f0f5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSSALIDI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCfgYjNBSDiFZpcUKenDWQy48FzDUXfNVLkgtgnqdBq9AIhAJrRN1xbrO4J1WzGL1ty9RhSSKOOTpxUeJfwIFecOjpoKv8DCAwQABoMNjM3NDIzMTgzODA1IgxwRsiNZi8mlMkvz6Eq3APNSzk%2Fa5fwGqWrHdFxgcABwN8ZAXJosX0NDKoMH%2BAhEpX6mV9Mx0rx9xKvKAPbMhmXSrGavMKqVUN3sSbtrpt%2FNopBbTsOo0jaexI6KYPdyaSKTozETUvrGe5skRm6oK3B48ybaD6w2WDcAYUxZMRB6VMLYfJSSK05Ymk2UkWLVT4lRmj5coqWou6hzi2FXda%2BknhXpozIkiJvpBpkvS%2BxLOSVsXJ5hO4dHRMsC560%2FEzcStEMTZi%2FSXVhkXrPRRqO7UPBQoeCNeRXZUQZB1dZGoQ8ry7t4IVoA%2FvC9PY66neLKDJXD5Oy6DANfl2k%2BmSd1OcMPGiHwR8VBrfYHngH8oQSdYHrV%2FOKfDwvvtUTnRh6BTI65n2BrG%2B%2FKdU5YrCyzWPJj%2FYzidFi%2Ff11Fs1qnj231sGAy3XyWKxVuQ5%2Bv3J0Wb1leR%2FBQEWQwC1v1dNxAA8k%2Bo4gPZqZ9ZfZEyy%2FFNeabh3NCmmydtaMnNm4UmgPDLISElRC%2Fdfa93HWvKFdlbU54vKWxOycPEAE7xBxdVUGw28ceQ35v1ttwKRfHXiUexdIaq7%2FffkTl6YAGiIyoAmWldzl2LNXcsHwoGaTbp7LZzguroAEd836jt%2FcJjIC14cHwgVeKdfVNjDDoprLBjqkAbpiKwE5aWfOPTwEwNy%2B%2BH6OjjZKsS1beU8%2F7MQpOMF7hm10GjdQ84AaZrCbnsae8o2%2FvMEG2JDzA7wFM4i4zm7SL8ZOHj4S2cdb5wnsw25%2F1FCjInNTn6kfNlvByZQEa6aaNua%2FAp8whXqsx53UleOYLR1pp%2FjMtzntM58SxbDmMttEnuAxbfidJ%2FgvMTyweNfxtGdPaOVXXOcnttQU35nWAobr&X-Amz-Signature=d08250a3b3efdded6957e5d355fc71583db983d5f8ef226dea50d12b8911dc8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSSALIDI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCfgYjNBSDiFZpcUKenDWQy48FzDUXfNVLkgtgnqdBq9AIhAJrRN1xbrO4J1WzGL1ty9RhSSKOOTpxUeJfwIFecOjpoKv8DCAwQABoMNjM3NDIzMTgzODA1IgxwRsiNZi8mlMkvz6Eq3APNSzk%2Fa5fwGqWrHdFxgcABwN8ZAXJosX0NDKoMH%2BAhEpX6mV9Mx0rx9xKvKAPbMhmXSrGavMKqVUN3sSbtrpt%2FNopBbTsOo0jaexI6KYPdyaSKTozETUvrGe5skRm6oK3B48ybaD6w2WDcAYUxZMRB6VMLYfJSSK05Ymk2UkWLVT4lRmj5coqWou6hzi2FXda%2BknhXpozIkiJvpBpkvS%2BxLOSVsXJ5hO4dHRMsC560%2FEzcStEMTZi%2FSXVhkXrPRRqO7UPBQoeCNeRXZUQZB1dZGoQ8ry7t4IVoA%2FvC9PY66neLKDJXD5Oy6DANfl2k%2BmSd1OcMPGiHwR8VBrfYHngH8oQSdYHrV%2FOKfDwvvtUTnRh6BTI65n2BrG%2B%2FKdU5YrCyzWPJj%2FYzidFi%2Ff11Fs1qnj231sGAy3XyWKxVuQ5%2Bv3J0Wb1leR%2FBQEWQwC1v1dNxAA8k%2Bo4gPZqZ9ZfZEyy%2FFNeabh3NCmmydtaMnNm4UmgPDLISElRC%2Fdfa93HWvKFdlbU54vKWxOycPEAE7xBxdVUGw28ceQ35v1ttwKRfHXiUexdIaq7%2FffkTl6YAGiIyoAmWldzl2LNXcsHwoGaTbp7LZzguroAEd836jt%2FcJjIC14cHwgVeKdfVNjDDoprLBjqkAbpiKwE5aWfOPTwEwNy%2B%2BH6OjjZKsS1beU8%2F7MQpOMF7hm10GjdQ84AaZrCbnsae8o2%2FvMEG2JDzA7wFM4i4zm7SL8ZOHj4S2cdb5wnsw25%2F1FCjInNTn6kfNlvByZQEa6aaNua%2FAp8whXqsx53UleOYLR1pp%2FjMtzntM58SxbDmMttEnuAxbfidJ%2FgvMTyweNfxtGdPaOVXXOcnttQU35nWAobr&X-Amz-Signature=d08250a3b3efdded6957e5d355fc71583db983d5f8ef226dea50d12b8911dc8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EZLACBC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T191108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDahRk862eNpPOnW00hww8Oag%2FlJwH17FAf6SNwQkzjKAIgeWM9dwh7PNSvd9L3W1qp49%2FsviKpgihYRtQ1%2FvTEVmQq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDFXtQBJ1PvW9F%2B3i0SrcA9NmWt0QoSx1K1aC%2BdyudYklEDC%2BqijJg5LjGXkvdTE11MS90aQ9T0m7ttekAC0zgBFdAIppVfcsbUMx9QFLSSY8URONV3wie35JBRFmweKhaJDHFKs6yPKCgGsrDiBQnYzaO4%2Fnah1aSMxPht5mIeIUkUC6zrYaNjrUSb5gFnUogyieGrw9cP%2FWj76HSMSN3ca13Fclx1BLgqBgJR5Fl8KM0g%2FCqg%2FZo0fcY3BSCbggyhRKrpeeip7flD9qkWE8KRkR7AhQGQma%2FypIhS329S1WWyh1zwTCSvhjshM68IcBRRirkAsfrriWoLxIg81SglulVaUMkt7R87smUVqx8fXzbUgvJcqRyEBAJtO4xDB7fT8yhdr6pUQrLiwnygZ9%2BRd0LUN6KRcErA8NXQ0wlt%2FmSfWAO6lZ%2Biyz799lhlrxg77jnL24BVBqgyonFDzB6nY4lmuyyTxFhzwIfsZbP0c9yzLZKSOoLPhc%2FKTvaP0yNRBq1H%2FpcoSBDCakByvHFdrDSD1lGQSoPf5soiVtRmELQOPA9qy2gzMa%2FeMZrLM9VmU2jISDZHHRjGlxT7pAScYFKw1Uvb9fm4C%2ByTLQinR3LjAFOiTe2vCGqtNyoeNRK0EgVSATXpiqptfQMLmhmssGOqUBzHhg5xzhfV%2Fs%2FGAOBx9wjvr93Z%2BPpZ3BGnmfpPPWtzLtcsVs3LssdDlQDn0Bc%2B1m7%2FUcMxqonJclnONPE58j4T9fJCpryIXXG30J4bYrhBojJYpWkwkouIW6f5d59EYxQszSSPRbIXZZb8wJMxTCz%2FyUkHV1PcZGO0uaELTE98T9wXeDkO%2B3ArUQJnC%2FEzpjLJgoGBo%2FAVKkt8RgTlLc5EOfsejG&X-Amz-Signature=bccce7cc66188dca6ad25eca70e01508594370ca25189bf4f5299cdd5c603a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

