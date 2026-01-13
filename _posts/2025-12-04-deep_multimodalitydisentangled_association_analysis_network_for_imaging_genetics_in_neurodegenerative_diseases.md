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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SUS3XO6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHCzZISZyj0rA3bzORWhIv2WI%2FY4Mx4rfUZY3BSWWKocAiAYrJozPeljUt%2FyKvuCW98%2BZFWRdnTsX11ZcvdlEYM6eSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM2fBHe%2FYDXWHDPTDRKtwDVUJtmxMs4%2BOJVMmw6AkaLCWlxWd2vhaTJ%2B1Ime6RJUoCcb0H%2ByxQyZmxnVOYMaGlOe7yFrt3uHolsQuuFrjrJjpIR%2B8yybz9%2B0XHgHMk6AvaJndoRBgazIPd0fixUhZMaZdLtUIXsfgmIFH68G3v64chSPtzM%2Bkh9cxQgQ2NqkPKopPXPdj6x6fNIw0tusQcnsv6gTb%2FXm9Oa9k5egyLftSv0x87XaZi6QPMS5%2FP4ZKy9uCjxEX5rTDGbYWcu0FRwSiLDUObnr8G8PfjyEOaZFO9H8HT3%2B8XQ79qqFvPmvRLbFXuZxrX%2BhW54qL3SS%2F8Uz5CkGBkuAbAb93GgWO%2BoJWFzfFZfRvwT6YvmTRcxzu1fzpUUI74b7g4Kk9CSq9HHB1QdOMs0etgqTWzU7ELQDWa4udLhY4Kgx463iLYEw1mj3JOkiREfXyy5QiQu9U6eCK5j%2FrrPcYopCiTd%2B09l0vlwYos%2FjAJyLlKUi6Vta4iYV6PyEEg8Tcdc6UNBY9fG%2BF4NPHym%2B5OCINdqlBROPnAIGRjXZqHaFDEJiAK%2F9SsmVfGlunzvov46T%2BTiK4GUDp7pro6KkPGOIKkPaC%2BSvoyN%2FscZNau6Tmxllj3DnB85fYKeKRTUjtRzVgwrP6XywY6pgGupLmhsgeZb%2BoXXgBH5v1L8vHTI9rjk7nEXJgf%2FrwSptSeCTiJ7HnRIyRUkvx8qYUkxIc5sPMWifSBxBMDCpSBxcZBe4XzaHkKHn7WZ08Yb8Pc9IfNFYI7z82JnlzfB%2FkZkTUL5Zyc9iMZNEV1HtvDUtwXIxFZXA1sFRpjPhp8iurmwWVcYdrkjR0F8TJVVSACa4H5hhPTrHtTzxbFv6Rz5RngkANH&X-Amz-Signature=280d28b803f404783db5def491a8fbcdad3b932bef4d29fafd92cdca2c7ca28b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SUS3XO6%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHCzZISZyj0rA3bzORWhIv2WI%2FY4Mx4rfUZY3BSWWKocAiAYrJozPeljUt%2FyKvuCW98%2BZFWRdnTsX11ZcvdlEYM6eSr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM2fBHe%2FYDXWHDPTDRKtwDVUJtmxMs4%2BOJVMmw6AkaLCWlxWd2vhaTJ%2B1Ime6RJUoCcb0H%2ByxQyZmxnVOYMaGlOe7yFrt3uHolsQuuFrjrJjpIR%2B8yybz9%2B0XHgHMk6AvaJndoRBgazIPd0fixUhZMaZdLtUIXsfgmIFH68G3v64chSPtzM%2Bkh9cxQgQ2NqkPKopPXPdj6x6fNIw0tusQcnsv6gTb%2FXm9Oa9k5egyLftSv0x87XaZi6QPMS5%2FP4ZKy9uCjxEX5rTDGbYWcu0FRwSiLDUObnr8G8PfjyEOaZFO9H8HT3%2B8XQ79qqFvPmvRLbFXuZxrX%2BhW54qL3SS%2F8Uz5CkGBkuAbAb93GgWO%2BoJWFzfFZfRvwT6YvmTRcxzu1fzpUUI74b7g4Kk9CSq9HHB1QdOMs0etgqTWzU7ELQDWa4udLhY4Kgx463iLYEw1mj3JOkiREfXyy5QiQu9U6eCK5j%2FrrPcYopCiTd%2B09l0vlwYos%2FjAJyLlKUi6Vta4iYV6PyEEg8Tcdc6UNBY9fG%2BF4NPHym%2B5OCINdqlBROPnAIGRjXZqHaFDEJiAK%2F9SsmVfGlunzvov46T%2BTiK4GUDp7pro6KkPGOIKkPaC%2BSvoyN%2FscZNau6Tmxllj3DnB85fYKeKRTUjtRzVgwrP6XywY6pgGupLmhsgeZb%2BoXXgBH5v1L8vHTI9rjk7nEXJgf%2FrwSptSeCTiJ7HnRIyRUkvx8qYUkxIc5sPMWifSBxBMDCpSBxcZBe4XzaHkKHn7WZ08Yb8Pc9IfNFYI7z82JnlzfB%2FkZkTUL5Zyc9iMZNEV1HtvDUtwXIxFZXA1sFRpjPhp8iurmwWVcYdrkjR0F8TJVVSACa4H5hhPTrHtTzxbFv6Rz5RngkANH&X-Amz-Signature=280d28b803f404783db5def491a8fbcdad3b932bef4d29fafd92cdca2c7ca28b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QP2ZSTM%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQD1WFJ3%2FkXUY4w4y5qoLSW2hwI32DBVfwzxHMV62dcFIwIhAKIYofxzLAciTa6Zx1dbrnW5Anc%2BOe6O8EMJX7NTKVZlKv8DCAEQABoMNjM3NDIzMTgzODA1IgwXkq9oDCj10FjU%2B5kq3AMoLPoKaXh8gopojOmtJxu33QF94oobQ6Ju4bQgUKFZalML43hjdwMSLg3e0IqkC1oGAi0mjQOhM3yPJnnNO%2FA9ZAdis2kxiUluVqaC2nDgDH0iRAEfn%2F3UQWdsjjNYFM5xvCvjW7Tapr9oyBbnQJvgLBdaRbLDiNBaiI13bgFmPLK9EXGHM88BYDDq9yUxbigHrg%2Bog%2F4B9ljrU329kU8cu%2B7nGZPHRwX3%2BAfJ9uOZrZezomr7%2Bp2FMDHUrVFpGV6AwEgTM20GMonB%2FJ7dKLrl54mnLHNpUdooka7LOSRiihEUqwyu1e8axlHFtPWt2wYyS8vk%2BRAoneq3ASjo%2BJVibuTm05kQn1BW2nIJPeXHyCzX2JMLTJnBypH8VPPtkKxLtXLG1671EXKnYv5vKQg5%2F9tL8hGiubSxX6RzX5WdBhlG83ZANDvZ2oHNGW73jPJ%2BDwpfk5HizUk5KEx0xvLYgytbL2gkgcZnwqWoIRj9DbfKGg9I0d9VCQwbFcHMzBiXTP2qWaQmPfXc1jIZOK9to9sAsYqb9QJ0U%2BKvuY%2FsCVXiMh0cDInl2gGikrCC3NlnSYWlY%2BjRgn3Za3ZCxzrwAJozfV21Nm5siE3kbXW9QrLd0IEvVH1i6h9qwjDK%2FZfLBjqkAUAJuLBfX3mpFkSL1YdRc6h9zXFyzlBPv82FUePUoSQI64ov62RJjWQ7xjHnmCHLR5SqrQWYngCTfuFtn4e%2Fofzc8lJc5aZpBfJtIU9c29fSzha8ucYrNLsRQl3AMNlo5NvWLoT7Hds%2FpIjxpn%2BSaaPcQvCRtj5hYA4Y5cOI4S4EIJzSalTUHD7m3Ms0spYushDkds%2FxVXZ%2F%2FuzF5nBugq7Suo%2Br&X-Amz-Signature=4a2bfc02c9a269e37be225e4abeb42576245e327c2aee7e4e050934c55c2498a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQHAE7YG%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHXj2347uuzy5vVq8XOcs%2BIXo4OmD2dDUDwyDmcDHbz5AiAHCYwXI%2FNCvCu0Zkwm%2B%2BxZ6%2Fg%2FVybKn5NXhyX%2BogFU2Cr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMhHzssXiMR6kk3aFmKtwDs5RiSsywhOfX2MsA4HzAvuNpAEmBjXYk4fDyRxFRTH497M9AObBb%2FackgXWN3%2BEeBOxup0fLwmY%2FjLbl38cwSJqkcNhvR9EKhPH1ZLz3b3D9XtDarR1ws4%2F%2FhPZ7ym1BnthAxdGWTfiJgKZY9PcqjC6mwLtMb9wNbr%2BIivaUJqS5wlPzYXLJndP30d9l0JVY2RXiAA8JxX63DRv1nrLw188U5XTjGswHF9NbNWp2KmGIcL%2FiqwRDpcxIxXi8o6uo9eDkrRNhfuZp9HC292tiDz%2FgFRAwghGW5Y1eeirNFvg7zmDcxkoDnxIx4NIEQuCSbepJfhGCcdymP24KO4Qgt6oB4%2FAXO5Hn3N6EhKrafYX5%2FZvhWXa7ru2UaHDh5QmogWwg9XVIJiVJfnQixCs54uByBZvr3%2Fj2a%2FeKA7DOgqbny6Yes8QnmY3CDaxdSFThwvRLpPOi%2FQKW16vKEO3vONQlvYx8Bw6%2BccQ9p8v8L3F5DAHMz15k9UML%2BgnhNLZMVVpeHqINcf7U%2F6Pem%2BpLrKWqsblOyVKol2%2BYNqyr1O5PFzmjnR2GVIzQRc%2FGuhpp2y3FXLm8tssC6G%2F61igG8vqQW7cS8wjN9jdMYgQ1RVFj7nWbGyv8Xm3SkjAwnP2XywY6pgHf4cOKZcRv8l%2BV9ueahpmMfZRi85RhgLKLOL5HEevQFmFYKGGkMiBgifSQGxsh%2Bs88LhiHNYDN9hfH%2FI8nvQ35FQAfJ%2FaKynlvMM50DD%2FH%2FDQnDyfwJukQku0hIM0keAo2B9OW1N75GUX4Kd2Vz3NouV48AxkXmL32gnDEkqXz0raeUpMHBFSCjUzmIXEEwLGZXRl98XLfqmV4ZhuNjEkXRMSRy3jA&X-Amz-Signature=f0f81915ef0811134b067da3ae21031ebb8c746850ff1976aa1ade1624780120&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQHAE7YG%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHXj2347uuzy5vVq8XOcs%2BIXo4OmD2dDUDwyDmcDHbz5AiAHCYwXI%2FNCvCu0Zkwm%2B%2BxZ6%2Fg%2FVybKn5NXhyX%2BogFU2Cr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMhHzssXiMR6kk3aFmKtwDs5RiSsywhOfX2MsA4HzAvuNpAEmBjXYk4fDyRxFRTH497M9AObBb%2FackgXWN3%2BEeBOxup0fLwmY%2FjLbl38cwSJqkcNhvR9EKhPH1ZLz3b3D9XtDarR1ws4%2F%2FhPZ7ym1BnthAxdGWTfiJgKZY9PcqjC6mwLtMb9wNbr%2BIivaUJqS5wlPzYXLJndP30d9l0JVY2RXiAA8JxX63DRv1nrLw188U5XTjGswHF9NbNWp2KmGIcL%2FiqwRDpcxIxXi8o6uo9eDkrRNhfuZp9HC292tiDz%2FgFRAwghGW5Y1eeirNFvg7zmDcxkoDnxIx4NIEQuCSbepJfhGCcdymP24KO4Qgt6oB4%2FAXO5Hn3N6EhKrafYX5%2FZvhWXa7ru2UaHDh5QmogWwg9XVIJiVJfnQixCs54uByBZvr3%2Fj2a%2FeKA7DOgqbny6Yes8QnmY3CDaxdSFThwvRLpPOi%2FQKW16vKEO3vONQlvYx8Bw6%2BccQ9p8v8L3F5DAHMz15k9UML%2BgnhNLZMVVpeHqINcf7U%2F6Pem%2BpLrKWqsblOyVKol2%2BYNqyr1O5PFzmjnR2GVIzQRc%2FGuhpp2y3FXLm8tssC6G%2F61igG8vqQW7cS8wjN9jdMYgQ1RVFj7nWbGyv8Xm3SkjAwnP2XywY6pgHf4cOKZcRv8l%2BV9ueahpmMfZRi85RhgLKLOL5HEevQFmFYKGGkMiBgifSQGxsh%2Bs88LhiHNYDN9hfH%2FI8nvQ35FQAfJ%2FaKynlvMM50DD%2FH%2FDQnDyfwJukQku0hIM0keAo2B9OW1N75GUX4Kd2Vz3NouV48AxkXmL32gnDEkqXz0raeUpMHBFSCjUzmIXEEwLGZXRl98XLfqmV4ZhuNjEkXRMSRy3jA&X-Amz-Signature=283234c7049d4edbd4f6f9eeb9df35aac5369f277b62ec8674dbf9eb265ccd0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666C6YJ56M%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHLv3Se3X2yLjWEBEtKa8Tc%2BnEVPP3op61lvWKfrJEJUAiBdIDcRd4WlY%2Bl%2BEW%2BITKetS5Y7PQT%2FMYYS533wELc09ir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMHz47MUchnCzE3MbnKtwDEg1cluWp6CNRYdi45FQh7T9NI92xPnMzIvZIHeqW3nSygoIZqtmSZtXrIgZPj3%2B5AlJjAm7jYaGX3YH%2BDEdV5AfrZkpET5XlALCuuP%2F80gOvK4MfjfZ%2BLEgyEWufGwB6sdhc%2FB%2FSBBM3TD9JEyQfV7q%2BGKb%2F328QPCNFnZ5kVqtVAfw3TxDzqHF%2FIJPmoQ8acnwuV3Bn%2F4%2Fv0eNFbJU5kBmrEBMBy5SKZ8XJuHvaHjy7FRE1i0WgI996RTprqYI3EMb0O34qPCUcPxgrYnHT%2BGKZy4HgSMnxzFPGJEOhAxfTwrpemrV3DCtIQdsgippM7%2BgdalQUoHoJiwvXT5Pa%2B%2F2gzy73Ml%2FI1vRTpCGVTDKy2hnJkqW1CfWabroRLo1k8eDYWjH61JlK1C6bmJm8neBvQWYuSgVITHTlc%2BY1ISPNE7loBJqQhGGEEgeW0taIt%2Fz5n1rgclgUIlN5MgCS8Goy7oyYXjZx1tjMSoqIgvzUTu2jKlhcTdxuqsD5xwEyHhPc7R3fpO%2FGUfMjeJJpXKnUadvwzH1UFt4G%2BEBjsZPsn62g725kKoKjXF4%2Fnc1cA0ni1DlkmsL8JkVbtlPW5jv0vq0Bi%2BqPG1lG9Q9YyFrQZhu6f1asG%2FY6WkUwpf2XywY6pgF5VdHLE%2BPo9LVbzXg%2BaIuSFDHc%2Fcauz5EEl7GHACoi9Kz7CJL9lurg%2FlmE5ZjRBW4XaE9cgpRhrTreTP2Iz2J99Md5gilnjH3jBwX8Kdfyy8IR6BVQvHpqRrXDwPgD%2F1oxV9IvXW5S1DmnZxgdIw83J8aB5cWAgGotH6g2F98BgkZqMdJHFwqL4rmyEkKXTgQbu4cvahBrYss5nTWgWO2ECacd4vEL&X-Amz-Signature=4c4c9a808c8457b282e1dfad1f14a9ae3db3c1ef689e4b41d3561139184385d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGS2GLUS%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIDboby8Ypqf5ne6IqblIQLrk7aBOpQ%2BbzFC%2FS%2FNJtBsFAiEAxcorIMLsb5mMh13NlxwRzDS5iK2%2BBTvaV23E1A6Xc80q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDNXjMMzkVAyfoR5HNyrcAxWZSSqxsw5EjhCLDEaMLqo79I%2BjewwLAfUfxm%2BwKKBWRifO4Ho7E01dO1Pyguvxiwn7QiEPZfFUWB8RsRd9fkqSafbrQATjawSw2YCyqg8shN%2Fj%2F2B0orAvkFuP%2BHv7oGj8lxw%2BsFFY0F4clbBTajWK0mW7yqyHS2DxuOwVC2VZKhHDnTAmdc0dEJ4znKzspSC3ckTd4GOswKTrW9BGqBWFmxo7W6Nb0b15Cv0Z7y2o%2BPGGm%2Fr1kOfBooZ5GzRCoC2Q4kPovO%2Fz2xySSKoa01q1QcM8oAhzRSNqQwn0iSjzhQioswZSNgLVL1S1%2BuJAowY38AY%2BBLqoX7lElLJGHOlfGNpwG9ffe2QxL6wa7CwFM0VOozMaZaMH1D1bqKs7vRLPw8TWNQkwSIIfiKdNeHHA0WTLgT3zoYIx8KrhwSTV7Dn86cH27VkR6JTgQo%2BQIAYML3jIkQ58UEsKGN5kDRbFXB1zKiEmm8hARLjTRxzaE6e%2FAoO%2BIMTsyF77CbWKYJmA%2FYysQc%2FnKKf0I%2BhqtL99Fgt7XrBtDTC8TAmyCw3PrsahYpfSycp%2FQfpj03Ru1sIO83iOHEx%2Fmz%2F4lxfWLmPMx2wJVab15C0949JK7vAeTcfTV7qr%2BJ42gcHOMLL9l8sGOqUBIDDqIkhGjhz6CRGIfxuaBJDowK4WaP%2BXeUrxSTQVsFgAzvH2kapt0j4R9EtN51B%2BQMf8PUEHsEobOJozQAkI5C6V%2BlZgbW1DSySFp7U4N97TJKvscSk1E%2FeB2m1HnLQYl4r9PEtSJFtqGZy%2FzNVb3qWbyjWWD%2ByB1ikZq8Ge%2FrNrsyzMlmlLEuSOWDAG1LQiv9HSssFbUeIXNX5NY9GHyfANoZYQ&X-Amz-Signature=d63765d83f8686a8644cfe5e5a1f860c3ed3fa63c366c5c4a0b51b48e824811a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY5Z6Y3T%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCIvjXi8aEsFx3crc4MdFFs17pjLVR6gCsHgHe%2BkO0%2B9wIgWKllauw%2B0gplIjVTh4kIRO18azVZnK%2BEIZTEbGK%2Bs40q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDFPVI7%2FFbz3zDmU5TyrcA0udgAZCPXo5Bhyn2XJiCrRhgcOco3clzYLG%2FTNUy6erA%2FGYSkWaL7mA11xc3RnePYetkWy5D5DnWVDEoRONWCBZt2H1Vp3bcmDoHDxxxvXrwa%2F1Y%2FPOr%2FP8pYAyhFd9m24nj8nHgHrV4l%2BcIB1tZKeUtMBKiAmhqs72VaQGRHKHsX%2FWwbBzp9495DDzHluI7WxacAic%2B420wnfdY7EEp55sdBkP3tI4sf%2BhZygcwR35RuImA114DP%2BoGdv9y8AkB6E7ra959jmuWMC%2FHPA8hKBATHhYS5aVm%2BUwKTqNM36ycl%2FTIAkbOG7UPwcfGFg6y4UV4okiA9c31L2M%2BFhm3aTRHwOtvvMW4KwgT2R5wVPReHpcDxH%2BsZI7788bYGeJ%2BmlYsnYFK588MwrVbGfRYQ6f89iYzdtKvqnC2aBWAjWc0cYHjmSubP719GNtsRxLsa0Dl4Aa5W8%2FLBhxhj%2B7k1GJoyJUPf%2Bk6bM7YbzAvkKIRFlZio4IqQF2G0qVS%2FukhA%2Bk2M%2BQnrJ9p4WaC%2BTeD%2FkPmfyKUIncu90PlBuuHaz8Txl4NKbmVvx1%2BvmwrY30qce5EixALUvEHsMu%2BIWYL06BNJ3oRxPg5To5m1oZqmWH6n%2FbL3%2FsCAwfsrSqMNX%2Bl8sGOqUBfJQ43920xg12PoGtBMK2YNTHhP%2Bkd9bW4BO4AgIMzfNczT1iF5BSdcqPgTfyvl5uCDdtRrFZPmd%2Fn9y%2FVRX5EmpbqlIykYIv4HVkE6RBVAM6SBwVNHbTFnTBewhiACphyg18L%2FMnYEZU%2FV1cEEXcBL2kU%2FewaokeO5JzsnBJK98ZOdRJtlUoriVrWwDrdqqyHLf0LrRjoa4MyJ9a2V%2FalFnYqjt7&X-Amz-Signature=dd30e29974527d5214d754b25c90a9e3dfd2956b172b0196d5ecbcefedb2d96b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DMQJWY3%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIFHY2lJAbwzbQXc0M1h1tP4tsVLFD0sMH2TOga1oa%2BZ2AiEA5lCcnFmVWLlGKQvnaZ5FY8PV9utPHRBCJHVsyYttGQYq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDCcex%2BsViembl05FnyrcA6p5qb1UftBAv7AYZfoZIM%2BfUsc5ss%2FyQduSwHvSy6rdKQvEdWX4bNT9uSQbZWlqz%2FXrpqoUv25cPmswiKC%2BiEFbdwP06r%2B9CgShy5PlsZi9tXgImB4wWeBvePsWX%2FCahye7MkUqe%2BzU9vdoWqzlBDWgSB%2FFbfZb6ZExxkRUOLVZwpXURoRoLpIf1Os%2FDu%2F%2B6%2FG5jl0XYQlYHn736fGBU70zoyPZF40FVRsVyfgPULhRo4HSzzFqabcPzyjfNjFvcHfHd0JZSAwn3unNRmv4dBO8n9XsrcFdgLvTMUAwArAbjeEHILzh%2FGFWEkoONE1TkNxehKASIm%2Fu3lYPMtL0O8%2FEbwoSHfCy700IR3tNNrSVy4VZ19lL%2Bs3HUNffjpT9C%2BCtiqJS10wYXEKWs61CiTlSNDw%2B8XsL2YB%2B5IsvFED6nYuMB2d9z%2B17dWriuO%2FSYdoMWv1RiiXu5kcFihNnp1jXkvJXXFIqRI3kzN6PbAKsJLPSNt3sb3%2FpADKdj7JZRRGQ0ePgFN3iADQnB0Kbs0KIyNj9JVCx3MRBd0z%2FKGezMCs5gS%2FUpJmF%2FuCRCneqCGCfFKdFASeLlJu36nzd8pwxOvTtaUDkQcTqFV3FSi2WHFH7BqMlZFrpZxbfMLP9l8sGOqUBiN9JfE3ZAAa6Qx8hJe8x2mQWleu1ixnzef8k1DjXeA5kcY5PYH7izvN7oZ%2FDfGl%2FRuXKixJxtjPQHnMQ%2B1%2B%2Bn0CJ134uN3AnnIZflsFg5TskVg3k351TCD%2Bg3BJPBIPqApKk2mId%2FVOE72B%2FT%2BoViDafZPRQ9fBJQIP1HdbN1E66%2FK7GnjIB1KkLXFrFJFhydcM5x%2Fomzas08AGNHCxYgKf%2Fy6e7&X-Amz-Signature=75413c3404ec0e1f2edfbf3004dc354ad1d0fa5c65cf6b93fa70731f1b53fa29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DMQJWY3%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIFHY2lJAbwzbQXc0M1h1tP4tsVLFD0sMH2TOga1oa%2BZ2AiEA5lCcnFmVWLlGKQvnaZ5FY8PV9utPHRBCJHVsyYttGQYq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDCcex%2BsViembl05FnyrcA6p5qb1UftBAv7AYZfoZIM%2BfUsc5ss%2FyQduSwHvSy6rdKQvEdWX4bNT9uSQbZWlqz%2FXrpqoUv25cPmswiKC%2BiEFbdwP06r%2B9CgShy5PlsZi9tXgImB4wWeBvePsWX%2FCahye7MkUqe%2BzU9vdoWqzlBDWgSB%2FFbfZb6ZExxkRUOLVZwpXURoRoLpIf1Os%2FDu%2F%2B6%2FG5jl0XYQlYHn736fGBU70zoyPZF40FVRsVyfgPULhRo4HSzzFqabcPzyjfNjFvcHfHd0JZSAwn3unNRmv4dBO8n9XsrcFdgLvTMUAwArAbjeEHILzh%2FGFWEkoONE1TkNxehKASIm%2Fu3lYPMtL0O8%2FEbwoSHfCy700IR3tNNrSVy4VZ19lL%2Bs3HUNffjpT9C%2BCtiqJS10wYXEKWs61CiTlSNDw%2B8XsL2YB%2B5IsvFED6nYuMB2d9z%2B17dWriuO%2FSYdoMWv1RiiXu5kcFihNnp1jXkvJXXFIqRI3kzN6PbAKsJLPSNt3sb3%2FpADKdj7JZRRGQ0ePgFN3iADQnB0Kbs0KIyNj9JVCx3MRBd0z%2FKGezMCs5gS%2FUpJmF%2FuCRCneqCGCfFKdFASeLlJu36nzd8pwxOvTtaUDkQcTqFV3FSi2WHFH7BqMlZFrpZxbfMLP9l8sGOqUBiN9JfE3ZAAa6Qx8hJe8x2mQWleu1ixnzef8k1DjXeA5kcY5PYH7izvN7oZ%2FDfGl%2FRuXKixJxtjPQHnMQ%2B1%2B%2Bn0CJ134uN3AnnIZflsFg5TskVg3k351TCD%2Bg3BJPBIPqApKk2mId%2FVOE72B%2FT%2BoViDafZPRQ9fBJQIP1HdbN1E66%2FK7GnjIB1KkLXFrFJFhydcM5x%2Fomzas08AGNHCxYgKf%2Fy6e7&X-Amz-Signature=d148e3eb7510af0084cefef9d3fd428e4022efa5398d6b83383eb190b6278805&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN3FOYUM%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDspigWUHRHUuLRHiLVtaujrvlw4zLx8fYkWyHwDXwX%2BQIhAOYUe7pG5R8apcrU9jdI5yf2ClWIWVbwt7lrU%2FWHalW1Kv8DCAEQABoMNjM3NDIzMTgzODA1IgyXLZAc0xdb7kA%2Bgswq3APnzTGNr%2BQRL6zNfSSMAHnwH%2BAD9WXJilTKm8ztqQCDr5wvSFcVW1d6ZxaSNdHReguVObvdFxfXuLJ14ZqRU0OzjLqDHkyhZM7bc2gERBABLRJGEZmKNR6TW%2BPFT3zhFs3Iy1iwWpBvN2acKglIqB8Z0dG%2FBhMspN7JV7bVqRvw6GQeNwlBBhuVYVqIVyNeRqBhJickiHlJZGUVF9gg06wqEddQAgWy20neQb%2FqJygRnsfCXUCNMCzFkzZiCa51cfQGdKGcsW5aqF2MTyVNLRqojgROl1Ecj%2BwjNs%2FrT7OQfCzv5ykmsekIQcYJqadRAXRbx0uAqSWPuodCwsfomon2Yy1FkUUxrmhRWeQ1pv7Krfbc7LUSpr7Ac8KFp1H6Nbzbsr78rU7BvaOvb0VG7szpuUdgso%2FfiN7PxirVZMpbJPzCKXfcMrsfNURc0t5OuZS64NjbGTn73XLSV7QQseRXcSgGeIohXYuldg2XKyTZoL2427fbVUu3Dq1faAlI0qPGf8vMrIm9JQzBg0FdsgI6qCB4AuvRI8gTZEeyyfqAsoBXM9SqfSDSlZUxWDGMayAXW%2Faa%2FJp7f8YmUiFVg4ZVrZwawYzGuJA%2FX8LZtzjBD8MK6ZGD%2Fsc7Mfs2xDCo%2FZfLBjqkATrTrjdTBSaDt5iAMzIW6PTDGk3YS6gF6yLMF1cFXBHndTwARheTv%2FdGgcgkrA8gwTUSRytjoPsd2nJrwCCt3lvuczqu10fGbWqzSUeuKbfBDrJXbJBoFnPXCKu44bBfThIGVs8dMIWth1rYSJ0RwhhRDWKyGyAjR4h11YhsO%2B0F8KuatkUlV88sMZ1Bv%2BhBrX0ZhdegnFBiW8gFjNTj9yX%2BKflV&X-Amz-Signature=9d2a056526e04923ba77583ec25fd8391ff1e4db7ad8af846d1264465e7ee113&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUF64A4Y%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDqyq2qROKmJ1R1j9q3y6XlSoeVv3zGcDezn2%2F6k5SFugIhAMpRW0269q%2F5jyDU5H6N5pb7lGY2MMfFcfbcrqgvRyohKv8DCAEQABoMNjM3NDIzMTgzODA1IgxAI6cTepLBn1pf7QAq3ANPNGPWu2KEPzeXeXirDfbqPYjUiFQvm%2FeOaeuVUewYjXO1FkKYlY1IYn%2F17t8lQ4nmJAbnp%2BuGuwDU7l%2BBV4oarfBlNmGVjvNFvDqVcpUsm3ow3noSGrJj72TmbUBRP5AmxhQmRUX4RJki7WdVPcmdU%2FQ9RwGj9S7hwDIkYe%2FjkUgxphCv5f7EqBws%2B0JjwJ7raU9W8q5CtqyUKZ8isxPIAm1Acayj4W2hHk9FQX9GFA5wMwaVvxuD780ijbSIldO5LBaPAfzlXfenSR4FFGI5lFgWgHtN1LlAEMQzhC1sBfCZ8bubcwNU5J0YVyLcqNeQnUiayjtcL9JRPh8rT1bheWeYo4KCTZ%2FLsnUcD%2FtmkShbbmmHc9pTGdbtD%2B%2FpQVggeF76jrfUfWXbB0%2FRh5RE4gGgrSa5WBIfpXRnfbApMia3fKsn6TJMPzWUSjfx%2B1hd1zWnHEFvsjnOrL3RUWJM78wKhwXBOndlpGkMgSfijM1rYeMRDchYFBXXoo7pfCsvJVbAQxLJV49Zkn3s78uZ3ULT%2F0Pvf08IV4Y4jTTLG6H%2BMbSSoG55ogMINXSwyfWH7N3m1kQ4%2BVA4cmSqruK8VdEc5dy0Z5S2SZOeDwBBv%2FPDdaUscB%2Bkqs2fPjCw%2FZfLBjqkAfmq8LjGEH58WNTkTOhyZpFVPsT61KxE5pj6oyovHu83vD%2BfuD8bhHNMesqgQ%2B5bxTc9NylqxnXVegKi2TuaywpZF%2Bq8NfP3K8eNuVUiWjcoG2VP29ja5gtKMVOlkKGEbEF7iHL3MrRViirjOIDkyaWLJ6zRNjebbHcZVBmT6wuKvkSq12cevygZcQN5TkkN9Iva6ihc5y7Vjpr8GbHrvzkHcGcF&X-Amz-Signature=7e98f5f8e0cb347a964096d128bca3755d6dfe0ffe4003bcdd0f246f26588d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUF64A4Y%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDqyq2qROKmJ1R1j9q3y6XlSoeVv3zGcDezn2%2F6k5SFugIhAMpRW0269q%2F5jyDU5H6N5pb7lGY2MMfFcfbcrqgvRyohKv8DCAEQABoMNjM3NDIzMTgzODA1IgxAI6cTepLBn1pf7QAq3ANPNGPWu2KEPzeXeXirDfbqPYjUiFQvm%2FeOaeuVUewYjXO1FkKYlY1IYn%2F17t8lQ4nmJAbnp%2BuGuwDU7l%2BBV4oarfBlNmGVjvNFvDqVcpUsm3ow3noSGrJj72TmbUBRP5AmxhQmRUX4RJki7WdVPcmdU%2FQ9RwGj9S7hwDIkYe%2FjkUgxphCv5f7EqBws%2B0JjwJ7raU9W8q5CtqyUKZ8isxPIAm1Acayj4W2hHk9FQX9GFA5wMwaVvxuD780ijbSIldO5LBaPAfzlXfenSR4FFGI5lFgWgHtN1LlAEMQzhC1sBfCZ8bubcwNU5J0YVyLcqNeQnUiayjtcL9JRPh8rT1bheWeYo4KCTZ%2FLsnUcD%2FtmkShbbmmHc9pTGdbtD%2B%2FpQVggeF76jrfUfWXbB0%2FRh5RE4gGgrSa5WBIfpXRnfbApMia3fKsn6TJMPzWUSjfx%2B1hd1zWnHEFvsjnOrL3RUWJM78wKhwXBOndlpGkMgSfijM1rYeMRDchYFBXXoo7pfCsvJVbAQxLJV49Zkn3s78uZ3ULT%2F0Pvf08IV4Y4jTTLG6H%2BMbSSoG55ogMINXSwyfWH7N3m1kQ4%2BVA4cmSqruK8VdEc5dy0Z5S2SZOeDwBBv%2FPDdaUscB%2Bkqs2fPjCw%2FZfLBjqkAfmq8LjGEH58WNTkTOhyZpFVPsT61KxE5pj6oyovHu83vD%2BfuD8bhHNMesqgQ%2B5bxTc9NylqxnXVegKi2TuaywpZF%2Bq8NfP3K8eNuVUiWjcoG2VP29ja5gtKMVOlkKGEbEF7iHL3MrRViirjOIDkyaWLJ6zRNjebbHcZVBmT6wuKvkSq12cevygZcQN5TkkN9Iva6ihc5y7Vjpr8GbHrvzkHcGcF&X-Amz-Signature=7e98f5f8e0cb347a964096d128bca3755d6dfe0ffe4003bcdd0f246f26588d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIFIUDGC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T091625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQD7r7kKdlI%2F1I8%2Frx9Rob7pO8PinrNw%2B3sC5MceAAKWEQIhAMtq8Yk%2BJo%2FbK0lv6w8mc%2Fkb6Ai5bB6fB6omq5yu6s2jKv8DCAEQABoMNjM3NDIzMTgzODA1IgzRLxQl67AXcWp1H2wq3APxgqPHcv2xRCyZHKO3bAS3cWeU7R%2FRVUejwQpsZf%2BLfJyEa94odUTBriXsejqUdx4Y8NMeegJzaYAKhV2dx8JlD5ndt3vcKlaGWK7CjmPVp275LeL7UCAiDPxJxG1%2BfF6WggU0sAODR4X19U%2FQGT3nF89SieMITky1jGZMxd2VdFgkgV5JIDSqTje6Qz84xz6c2q7lC3Y5Sf9ZVm3jXwL0Vo303TQiK92Os9zyOVHgLRrMecm7Kn6s1ymoiZ71XV2yjzqlL%2BYRCXqarb0nY1SiJOU3W0TI7AT5yuvOJ9SBYJDrPwiASO2221y%2B4gplGxD1P2cyCT6KLzH3Id%2Ff0DkdRJZyh0w0Qw2hjqoe%2BOMGfajaaOs%2F9r%2FB%2BDQ%2BcTkbK5NwZhImje2vTLgA1%2BDG7fLUo0El6EqtCe8uS5lemjX4c3WWR1xqZomcSjGmaJ6%2BuuDiWHV561rxiwOL%2FBAL4H90Lmf91dHLDroJ79OsjCj27EAwOA9YvQAg8faS7xsbAPrbpvMLbS3e%2BYehKlJ5NEWSEC8X47nLqBu9Nu8VyEFl95d31trZtxnDP3meS%2BEk%2FMvTlud51WmHGlymxz9xqLz1ovG1Kf%2FAI4eVk9QkuT%2BNdNxajuBFWTJZWpKjYjDt%2FZfLBjqkAQMxZuTX9naPd7WI6HbAl8vG3QVYoONqlxAvkB%2Fa0r%2F5YPbLOtbVUMf1ykM2AYpLmUtp%2BmfsdtwJOP3TrU4mtZqL8OK8onBR3gSZL5ahLBDnM7HcHcBJgmTR8rONtYpAHgbpRVq24f1pimqL9fiRWn3YeuJSptRm1pz9JR9Sya7VfW%2FT0WRWCZWLYws7K82NUvhRsIRQ8xyuSND8zpC4Q4W427hV&X-Amz-Signature=d7d970d4f68b9ee229f3e789e43b05354058322a901fdc19c21255323ec2728a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

