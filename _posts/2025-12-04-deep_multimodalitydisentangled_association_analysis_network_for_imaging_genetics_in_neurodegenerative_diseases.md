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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MKJ4GVM%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHT%2FBW4qIXTigW9t0t5KmNC0VpShjEXNnzjq25kna3pWAiAR1yZ0eZou5h813cWIFGnBVa3AgBLxC%2FtGCFWwElkM%2Bir%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMBuMLPFy0AN3y9tmwKtwDsgac6yCOJIPz5%2BU%2Ftgd6hd73zF8fneIb6m87vP6pw4CuqGvUQjJYk10g3a5RnYCkbfpQydnM3S18StrGDb00hXmkMRo6zVHqSfr1UF9pLkrij%2B8j0OYUg02Ffid%2FepM8SDouqokiUqVgzq32tCHrHrHohGdwQWJxYjGg0se53YBbOJDLzxvHgParTyIIcCB7SZxOdYQTWQWx9y1foH1bqIPSROHCax9GVuJyFP58txjjMdI8YQXqGYnIVoiQjijECekFsp6jpHh51j9GdEGn8P0ddVQaDAImwDSQ7Va3hc84Qc81lXhjD7D13%2F7Sg5gSE4sBTMnkcls6%2BDm%2FzyGPP3UKr4KQC66brZYbYsE8u9Xn9WWCzvxwmOtr%2Bv3qXfC6HiZkY%2Bw4YoQ3EO3IBAw2dLwsAkQtrKLK%2Fr4F0WakCK%2Fpp%2BK%2F%2B9SE19eOD2ogYUVKa0iVhNg6kJQbtvtnps4NLWYiBMfO7aeN882IDd4MMtIh8RDAG8ErJFM7AB%2BsERqXGQLFZgLPg%2BQGMqK5fXWU8C9%2FHzk4PhYZlC3OyxqUvA%2FLBrQr0kaeuTWuUI0rdOjjkVhnuVHYyfyTy4pBEWWMGdIPf4vpHS4ekHkJIrnFp5Qya%2FxKl20rvvIZpfIw7KKSzQY6pgHE%2FXoqfbmsABfInYLtroBXWWQzH8%2FoANDyZkg050On3cXDSkjDPa8lYthLrsNoyAVNXEl66dkIlUG2YtUPjTYlaGMOj0415xr6r4d%2B6i%2FxcIeva6srFaYDp%2BcBLk71g%2FNLx%2FMYdlr4uA%2BfurgFBgiTWeug8CIzaulUea8AqLv%2F2oGpW5j2cZmMXscPwzlUk5i2hmhX%2BdOYfCaCj9XzL2hy6gngjmi6&X-Amz-Signature=a87e82af64011e1a73afa09ea952d931aa4ea3bd5872ec7985a74d6917176664&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MKJ4GVM%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHT%2FBW4qIXTigW9t0t5KmNC0VpShjEXNnzjq25kna3pWAiAR1yZ0eZou5h813cWIFGnBVa3AgBLxC%2FtGCFWwElkM%2Bir%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMBuMLPFy0AN3y9tmwKtwDsgac6yCOJIPz5%2BU%2Ftgd6hd73zF8fneIb6m87vP6pw4CuqGvUQjJYk10g3a5RnYCkbfpQydnM3S18StrGDb00hXmkMRo6zVHqSfr1UF9pLkrij%2B8j0OYUg02Ffid%2FepM8SDouqokiUqVgzq32tCHrHrHohGdwQWJxYjGg0se53YBbOJDLzxvHgParTyIIcCB7SZxOdYQTWQWx9y1foH1bqIPSROHCax9GVuJyFP58txjjMdI8YQXqGYnIVoiQjijECekFsp6jpHh51j9GdEGn8P0ddVQaDAImwDSQ7Va3hc84Qc81lXhjD7D13%2F7Sg5gSE4sBTMnkcls6%2BDm%2FzyGPP3UKr4KQC66brZYbYsE8u9Xn9WWCzvxwmOtr%2Bv3qXfC6HiZkY%2Bw4YoQ3EO3IBAw2dLwsAkQtrKLK%2Fr4F0WakCK%2Fpp%2BK%2F%2B9SE19eOD2ogYUVKa0iVhNg6kJQbtvtnps4NLWYiBMfO7aeN882IDd4MMtIh8RDAG8ErJFM7AB%2BsERqXGQLFZgLPg%2BQGMqK5fXWU8C9%2FHzk4PhYZlC3OyxqUvA%2FLBrQr0kaeuTWuUI0rdOjjkVhnuVHYyfyTy4pBEWWMGdIPf4vpHS4ekHkJIrnFp5Qya%2FxKl20rvvIZpfIw7KKSzQY6pgHE%2FXoqfbmsABfInYLtroBXWWQzH8%2FoANDyZkg050On3cXDSkjDPa8lYthLrsNoyAVNXEl66dkIlUG2YtUPjTYlaGMOj0415xr6r4d%2B6i%2FxcIeva6srFaYDp%2BcBLk71g%2FNLx%2FMYdlr4uA%2BfurgFBgiTWeug8CIzaulUea8AqLv%2F2oGpW5j2cZmMXscPwzlUk5i2hmhX%2BdOYfCaCj9XzL2hy6gngjmi6&X-Amz-Signature=a87e82af64011e1a73afa09ea952d931aa4ea3bd5872ec7985a74d6917176664&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NPAKEPG%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIALiYlW3tEuRdZCHwuYydbFyI6WZR2FXWglh4q%2B2%2FrgNAiB6OcG4%2F0xqvTxKmdZ4dGy%2FdM4NcUPdLGWY4vRmZDJ0cyr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMwWX9GKgc0sn9DZIeKtwD3X7q9hFrmwHkpnxCP2WLGn9vcojfR3plj5Qz6Qe3pBwUOEn9hKlk7WtcDaj7YvHVfZ2PN%2FtdAx1dKvwXzyr0WP1FQNgdGZAhhLlGJAkbScE3ulzlYvNy19hjLUhn1tRBbUj1zcwR%2BOd4d2f1iKR6lZXiI%2Fck01oFtGnziUmkSKFHpiVF4W8A3VxD5ANtGw2rTk7ceThbgf6ZzPWALRsqnzQEPi94cIWTkk1rZSMW2Lt2q163pDJy4s1F8AhwKxIf1L%2Bw6yAqvPVVk8owzbIPmXF09yz6Q%2B1axjSg6UHzxmUx6K4OwUT8rXLxPwyAHVelW6qSU34VqfJDVPa2vR43xO%2BLBbx7FBxBiVvQZb0lPssv5uJh2w%2BphkTXZHgN22qBj%2FajEQkRhSUE%2Fo55GWagIivOin3vuqZb2cWTb0I2wW8zsI1GDJn0VNMy1%2FY9mr6pD257IU5Sg%2F%2FgtSC7mFNMgYXE80SO6Sydjnk6Z%2FBXWsgFWsiQ0cmnfl9la%2B8lpxKas2aqLHXbAZUgsAEI8vZc2MAUKRhjra8u3PnWElPl681pq%2BSR4czSGEjZPN1n50Wslofp6M%2Fvhld5VQskGlTIbXgnHEBOvDawOiMHl3%2FEZ0Kwz8csMPJXvpOF6%2FkwtqKSzQY6pgF9hoVsSGi9OZzq0ZNgptL66RoX8fxO%2F1ALGrzdaKk7Lpvfr8EKS0ZlwREb8j%2BnbASn0Ri1akoDdKGqmoAe5KJqfmavL1OvoG0JatWo5Av%2BtzM4fPU3bqKxZPwDKmH4v8ti3uXqoN7wJlE0XmoTWgv%2B0PXL0OGqDZJ5aNokW2XikJyWc%2BtciKLE7WKbPEZqicC%2B0RMXmbd910c%2B6MQSYf%2FZPKsdQDIF&X-Amz-Signature=396e3430b4d40169c5a721df442a945521fe5df1930d7cbeaf3a5417b7a43ccf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTVQYCTN%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAyfNVvDiUdJLuWiSS1wkibhdi6TKp9aj6YpmE61LLY%2FAiB4VTOno%2BJdZxUs%2Bi%2FAOyQ4zJMMpme1BdONNZlHmIqDeSr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMf5JdkmGfyBwaabHhKtwDvQHBt94r8t%2B6D1ci2aPvzH4vA1SMxltPnXKNZLJB8oPV6%2B5Wl8Rcsh8czfpNMIpqGYWw4brqL%2FTIryFT7hHyXrSbrxGs4%2FfgtscALfSdPSM9dbMCOI9GfmgWFKIAkBRr%2BsX%2BSPIKPe7tyyFPJ3aCCaYNe4qUmXHwQblPuyjDuYMuytepK8dy0plkOBiNoBolv7evUOVxdCmtGTAxJC9Eq6Udh6Uztd11TFqK7BqMGyq08G2e%2Bb%2BklEiGrFQm2EUFOt8exnXOIPLpEJmXLIF89H1CqDwVGjCxCuZ%2B%2BWvKGJZODFy0sE94uYF6iEnw3k2UDrFGgo0nlp%2BJVLZmtP0gLQkDy297AST84o5%2BMmyAmKzkcjQl7QlrWZ2RSP9XmwmmR76icrpr1od%2BNqK9XHjSakP1hsqmRcgaUTkdVMjtsnnFqS0w6OLQGBge3VFDIVg6aovfywgSOFjlLuCS469%2BHNfqf%2BQG%2FWDjv1hjtUnawEmMyY%2B%2BKykL8%2B2l5ixmRshuEv3qxxq66LoFzoAl6WCdDNo4naehp4ekSsBXuSVWD53Zc2MKmYEDPy7vFpvnGgW2Mof%2FVuwdUzFicr4YPNdWzz4zdFii2MliLZK4T3oxZCk8IpY6xEUjcnU9S78w%2F6KSzQY6pgGGz4c5d3f3Jx05AcKEI1RDtrmCnm0wYqCMsspewl%2FIWIU3ytvGmdGqK8sssuWmUUcoMl430rJW2E6cyWWH8hv2Lxyl%2BeY2pB%2BwxP9wNX%2B2fVtuSrZ7PmuXJItIZZEPEwkrrZ%2Fq3R6y3B7mH%2BSt13jAtTuGrmRD7PFC9Sp8zUf%2B3q5tnWFtdVzJl9Jwp%2FxPyfFhNp9BoYF1l%2B78TcGn6oyjfirC4snS&X-Amz-Signature=35474d112bfd4be06c6fdc781250f7cf06a089861f77d830463a62cb5fee1656&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTVQYCTN%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAyfNVvDiUdJLuWiSS1wkibhdi6TKp9aj6YpmE61LLY%2FAiB4VTOno%2BJdZxUs%2Bi%2FAOyQ4zJMMpme1BdONNZlHmIqDeSr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMf5JdkmGfyBwaabHhKtwDvQHBt94r8t%2B6D1ci2aPvzH4vA1SMxltPnXKNZLJB8oPV6%2B5Wl8Rcsh8czfpNMIpqGYWw4brqL%2FTIryFT7hHyXrSbrxGs4%2FfgtscALfSdPSM9dbMCOI9GfmgWFKIAkBRr%2BsX%2BSPIKPe7tyyFPJ3aCCaYNe4qUmXHwQblPuyjDuYMuytepK8dy0plkOBiNoBolv7evUOVxdCmtGTAxJC9Eq6Udh6Uztd11TFqK7BqMGyq08G2e%2Bb%2BklEiGrFQm2EUFOt8exnXOIPLpEJmXLIF89H1CqDwVGjCxCuZ%2B%2BWvKGJZODFy0sE94uYF6iEnw3k2UDrFGgo0nlp%2BJVLZmtP0gLQkDy297AST84o5%2BMmyAmKzkcjQl7QlrWZ2RSP9XmwmmR76icrpr1od%2BNqK9XHjSakP1hsqmRcgaUTkdVMjtsnnFqS0w6OLQGBge3VFDIVg6aovfywgSOFjlLuCS469%2BHNfqf%2BQG%2FWDjv1hjtUnawEmMyY%2B%2BKykL8%2B2l5ixmRshuEv3qxxq66LoFzoAl6WCdDNo4naehp4ekSsBXuSVWD53Zc2MKmYEDPy7vFpvnGgW2Mof%2FVuwdUzFicr4YPNdWzz4zdFii2MliLZK4T3oxZCk8IpY6xEUjcnU9S78w%2F6KSzQY6pgGGz4c5d3f3Jx05AcKEI1RDtrmCnm0wYqCMsspewl%2FIWIU3ytvGmdGqK8sssuWmUUcoMl430rJW2E6cyWWH8hv2Lxyl%2BeY2pB%2BwxP9wNX%2B2fVtuSrZ7PmuXJItIZZEPEwkrrZ%2Fq3R6y3B7mH%2BSt13jAtTuGrmRD7PFC9Sp8zUf%2B3q5tnWFtdVzJl9Jwp%2FxPyfFhNp9BoYF1l%2B78TcGn6oyjfirC4snS&X-Amz-Signature=76afdc1f782c4c96b20e61fafdc67dab97131afdf3c133b9cd78156261a9f51c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZVQX6ST%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBpitOznGu1B5ZGSbOftLuS4kG1WbNSqJO%2BLxQyjU7IsAiATNFQ%2F5yMXQ%2BzC0jeQKWEF5Yexr25y%2B9aoS7AKxaYLiir%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMqWIZieczAPGs5tITKtwDWWstBABNtTH5dmDm4nT9e4JcUaHte5tNVyv8UoPq5QxHeAmxftSfUkZnjAhynQkasXQyeY0611axGgMkPHPqVqjYQ7rsThUUO%2FdEzUE5wHZ7pVZCXG3wnrGy1UHV%2Fx%2FdiuQJqKPBVPNSBnw7lC0yDN4J11qqDshWUhMLNTJ8URd6idgbHmHzhXnf4UusvW8PDvSQ7i0cRrDqYt1mL5zbO6kPe8%2FeYSRnxrivdZ84V2XmO7zjlftdyRnNVfCsYEXDDGbudh4xhRDKncd8kUKaHk3H0Z8Dq3IAJRvbT8fYS8FOU%2B%2FoFiS%2Bo7x%2B39MUPThbDGkNG6zm1leH55Y0it2mP%2FyiTMwRWTf4ScvOKKU944NK8ylXFfpYhS03r38hRaUbTjWEk6B7ci1R9jUi8nohrba9QC5%2BXSoNEPPDJwEClEtjOQWf4P%2Fei%2BC5s8TaDlYT4gHdFaV%2BkzSj%2BHsc97LvEaBhzn3gA5cjkHXb49LlyyXQGq8zNLhf6sgEDS4yUNkkXSblhJdo5VjOpDXjxdIAvnbd25%2BtZhoLziqMir4XFarLad4PRLkwpQRgaNjbN6j0LO32yCNddAfSyDmeWwT7QteNFHUdhLjeJQ6wl3KrvX7LUJITDJADWvxZNqkwuKKSzQY6pgGeqMEGyLMPWF%2FUjBaC2HKx%2BkSRhPFPl5ag%2BTnvOVLWQPsevSfzJT2eVgy2CTbAQRKm6OUFgKR49ekvDrkdPR4e8q0y8%2B3yKiy5Ok645p2xvQ07y63ddz%2FKRB74pGSDv%2BdRzre%2F5icEsMr588FgnaSDln2LYr01BZdjJBWrJseIUu9kKg6%2BX%2BgeASZyojqbNjZ1o3WDcTArnG7DN5v3kXCWtinzaYRE&X-Amz-Signature=b8d4f8d132df0f6706700662cb969d02632bf604d91bdf562de54e8b9d3333af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6QONPJ3%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD7B78T%2BThEK%2Bel1Y8mC8%2FBi7PchbbCLMVNIov5yK%2FEKgIhAPeYPDFNcZh7s9pF%2FUuZ1GQqLDTydSaTOWHYKb8iRq8fKv8DCHQQABoMNjM3NDIzMTgzODA1IgwdZh8wMLzSw1XzW1sq3AOGJLeH3c21aX935mJKftFFecqumLhP97XxRJKYXahdxoV%2FPsjI%2B9jg%2FRwpEB0pu%2BOGZ%2F4B5X34YUlfH%2FZlCCrPH5I7E%2BmaSBvRdSC5SkVcM4yxRc0kXLRp3ODA6RebGCxcv6fZVjhOIlok03GQFwX6u7lzCjD2uOa%2F9YU3dJOZY0KN8LsgsecjeYg%2FbLcpLZblVgJvixYuwKIwdkyfbR%2FdzL2qrR4SeQvNsLgsMEeE%2BfC16JbFDv%2FckNVZus4DOJwBWI0rtFE0hoBrHQFARrhRqSe4pQ15e7KKIMEQ%2Fz7AwpUlM0OFEvifkET6RB%2B3abX6J95PIkMBVHUfs3iqyPA6qBkY%2BRVbxMgUUZdUkEQoJRnfQ9n%2BYC1aEeBgiKQYv827QRJWGo0hwFHd5LAGHBfPnx1uHhfXzrdyiJjBgPGAW0umVlt%2BPvPcL1NipWIrBoEyKRb%2Bs2bjMAgmIs0C2FKtdTkgN%2Fm3QsaDg8ReidEQY4TXh19xRDRJxK5%2B4wmm01DF0522YzAaHhZYZ%2FpGgjdgEPPJDv94j7OhILb3HaqprIzEm88MfCe8eQB1QHwEbMqluRI4ZgqH3GZlKwYamT1axk2gU6DIFpMH8Oh6hoSxuVj6bKgAEzVw%2BZq6KDD2oZLNBjqkASwdRg9IDUizfsYoxBCgmyghx0xi%2BfMuUaWFfDV3XSLAyEacQpQfBZMxXJfJ3Mt2Rzmtpyd14rjIVO6oEUAP6Pgujt1FaHw%2BpnRGbQsu1D1ogPL%2BleagLI2Z%2FL8y4JwHR8n2c22%2BwHnUQ8p1%2BXTgzReePVQ2rBomcQvi8704W0OXXHFMm4UL0RsWG3TNK0Hz4b4Ff2Gbz9W6w7VmRQpcLdRuq%2BSB&X-Amz-Signature=c7a040701a2e1d399092022b50a42f0a6400cf124636fea759dc1b4f677004cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DZVYCK7%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFe1r5evVsyw6mPbtgb3IEkA%2FYjkMoVeU%2BRf558wULpvAiEA0yz9RQuctZ5GFRv7RConRMUbogSKS3fixtrEeHD6ROQq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDPzhYTsKtPJftXCyESrcAxNiPxUWf1y%2FyCO1sgJYh0m9nOvzkaPZc8iRMVsgKpQw9aivHs1wYgPrlJ49j0ayx8xw4C9MHs6YHXG06YuIGp0a7yHqnEhEcqgPkxnvdQSwvECTvGLNgAvElvgZijnX5XQL7kN5MsBZt4ayYj1I86YoV2DpRKyVFU2myl8dpnf28Iw9FlZRTEWrS9GYroKFEegkvPbTwiwKN38tpi0SzHFoZjZbKqmiowYreM2fvRgqv8J1Hlj3ACJQsydruKvXq0EKUh%2Fx1z5OsQzdXX1vXsrxoQbhtDmsMxxEtDUCblu5dOqJQcC76EBPxovQkVoH%2FS%2BpLUgxCpRL5SsIXw%2FcshdnsNE%2FNBsXNbuD%2FcQbN3gwWfV6tAvXf22eBnFjlXTvIJ9HhI%2Fr%2Fp74Vo20BUhhapFCU4ecI%2BkN%2FjTBTWT9%2B4uUCcC%2FrbeJuFaKboKgJ5rQHsregtfhRBphQKn2UYuJTJ4ZUOA5JHrKp3bXl6ikHdIY1VuBEOLSM8IapdkfN3eUMKIpI3Ydy2xfFzzHaBiuaudZC88E%2FoMVgr3oSP%2BuTS9r5YBKgpU1Pb6CH1EEDdnUWoRtg8vxf1kdv2Jl1XKeCJZBFtbn4nkurWW2WZi1gZ%2BJIB4eit6Ify9y9HdsMLeiks0GOqUBAelR3vRfCeyRbf79L8j%2FXFNV9aL%2FzJwL2RIrkqAgg%2Bd3nq%2FNd4OTOvnEVuj2v2BH6N%2FFpv74ze%2B6W%2BJAJ8cURhq1tePN7nDeelXmY0hlXhhhTKcv34eVPngoQAd3dY9cL8HIH1jzMce0cH%2Bd%2B8THlMtK04jNtKE8flsWVzZv44sU0j5KfEBfzL1p21O1uB549yWo%2BFoxTF0ziBOs0ORIb%2B3bzUaf&X-Amz-Signature=6dd610049f409df8537c1baaca443866a206c6e77d43fa763675625103b65d4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRGJ67S5%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGsua8G4X%2FvfrxG%2Bzn23pNnh%2BAleHKQxDhSIwHDctGg1AiAxNb9kDXpe0pqyO7GyzJmEezOqjYhNi4hmmHEnwdoEESr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMdXeWViDatrylMMGRKtwDhzFyhWeu4g%2FDrEjeu%2Bq%2FWlnq9q9%2BZonoBdALUXF9RCsDzCyZQhBTa6tRLPf0i9Ha4EDXZsE5SMnHoZk5RjyvMuFGSzizQ%2B2dpBeeNgGw41roj3H%2FScqszeN1xf17McuRdSPauygQwQdF5ZZ1TLFJ1gDCR4ST8Jnrz5mBtyeIH9qQVXaRJHu1hTYhGqNp9R7Q3EF%2FwSBZU9laReoqB6xshpoifBNlgozAl7comtiFmDUMt1LzW97qemXz%2B0xVM5NBczBnOD9VCYU9wm8741xBOB0BJqSkPAD2tw1g7A6%2B%2BbNooytTIFGwfidT9YgzsT74q7ZYgal%2BfenikwRuXMj3EMHlGo4%2BvHctk4hYfWHS71zXHvp4nw%2FzHDULmYKuxC9HHYU4fE91lMdtHEhE1fqK0mCqW%2FcJyctP1AbwhBm7040CEFzhZdmA5INHx73tFQJ%2FeaeAfppK%2F2j36q6SoFfl90wo%2BKM1h5HF8xJDKSOLIhA7F3rTSoq%2FbAiqqLXlo%2B9amApd%2BO5vGNY6%2B8SSA%2FA6mKPz6UlK%2FotwLx9hYaYkkw48mOHU3Yk284SFEPvtr43hCAFiy96h%2B%2FXgadZaS6ars5t5GFViaASF%2B8p2L9BI1YuS%2FVtQW3BInpcCZt8wiqKSzQY6pgGoN72guBcCP6khgMgl6cmT2j0wScquS76GP9ZCursN73zXADP9ElC7hxnAYTwctGmNeSche22JVJjXhyJ2Wbe0%2FTCemtJbwVnL3QRf%2FHeY57wzGykVMakcmyivRSbZCiTpI0K3bd92I2qq6ByXfv6qIo%2F%2FnrYNJiwXosWPOjMSMcxcsT4yXmBkS4kAWIGk8%2Fsd6e1kazrtTeHS4h4CYZOc%2BlT5mbv%2F&X-Amz-Signature=eba7eaef528cd300bde0d5a974ab90d7c2e649f7967c4fdd01e29825b73a8c61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRGJ67S5%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGsua8G4X%2FvfrxG%2Bzn23pNnh%2BAleHKQxDhSIwHDctGg1AiAxNb9kDXpe0pqyO7GyzJmEezOqjYhNi4hmmHEnwdoEESr%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMdXeWViDatrylMMGRKtwDhzFyhWeu4g%2FDrEjeu%2Bq%2FWlnq9q9%2BZonoBdALUXF9RCsDzCyZQhBTa6tRLPf0i9Ha4EDXZsE5SMnHoZk5RjyvMuFGSzizQ%2B2dpBeeNgGw41roj3H%2FScqszeN1xf17McuRdSPauygQwQdF5ZZ1TLFJ1gDCR4ST8Jnrz5mBtyeIH9qQVXaRJHu1hTYhGqNp9R7Q3EF%2FwSBZU9laReoqB6xshpoifBNlgozAl7comtiFmDUMt1LzW97qemXz%2B0xVM5NBczBnOD9VCYU9wm8741xBOB0BJqSkPAD2tw1g7A6%2B%2BbNooytTIFGwfidT9YgzsT74q7ZYgal%2BfenikwRuXMj3EMHlGo4%2BvHctk4hYfWHS71zXHvp4nw%2FzHDULmYKuxC9HHYU4fE91lMdtHEhE1fqK0mCqW%2FcJyctP1AbwhBm7040CEFzhZdmA5INHx73tFQJ%2FeaeAfppK%2F2j36q6SoFfl90wo%2BKM1h5HF8xJDKSOLIhA7F3rTSoq%2FbAiqqLXlo%2B9amApd%2BO5vGNY6%2B8SSA%2FA6mKPz6UlK%2FotwLx9hYaYkkw48mOHU3Yk284SFEPvtr43hCAFiy96h%2B%2FXgadZaS6ars5t5GFViaASF%2B8p2L9BI1YuS%2FVtQW3BInpcCZt8wiqKSzQY6pgGoN72guBcCP6khgMgl6cmT2j0wScquS76GP9ZCursN73zXADP9ElC7hxnAYTwctGmNeSche22JVJjXhyJ2Wbe0%2FTCemtJbwVnL3QRf%2FHeY57wzGykVMakcmyivRSbZCiTpI0K3bd92I2qq6ByXfv6qIo%2F%2FnrYNJiwXosWPOjMSMcxcsT4yXmBkS4kAWIGk8%2Fsd6e1kazrtTeHS4h4CYZOc%2BlT5mbv%2F&X-Amz-Signature=b17289e1d51638020f4244c3310f86ba67d18385b03ee6815a8727a4bdd49d28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CL2WVQ7%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRdgXfz2WF3iVWC1bwpunUerK5kpnYcVrK5ZwXn4eRLgIgH2%2F8G91Y%2BJGV7sdbsKqykyQdukdi65iOAN45PbS3Sy0q%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDEi0XvLIzXKcTdGsUyrcA3sbdkwPZ5T506gBW%2FHTKm5kKjenTv%2Fj8NfOtz5xYoUjTRDuux0POjhWy2L%2FaZjDSAPVh0F2SrEBx8%2FKXBPNsOpvqO69BHTmIeWBby45ZRPr5odnxFpXK%2BLPCmnBgDWvDqsh5udbg%2FYK9ZIhWPw%2FwDhHhFE0TveN7x7bob6%2Fn7dtfZFQBXQxLY6jUFJpjaLRphINjESaJ6iXZbZrydcTd4EdBTMGXzxFubZIbRfrPxWChVWfKMuciMRQuo0apwIu%2Frk06aT%2FfEAL6f0MT88s90ngw4zGjeGAiVQiEgi4%2FXJSU75rGSNsQt1VLk7nv4UMX2ofKXlagIrX5a2WoSBbr%2B4kJMC8vZZvSglv8XuKOhhWf0FMa%2BL2y5JcPcQGyAMA1U%2FjVfQg9y55VuK9YnK4Y%2BechR5AdweCwebW6bNp%2Fu%2FsqaGF%2B1tJ9%2Bd18TPvddTxc173dO%2BkvrX35ZQQq98CcsFOCT4DaEHLLjqHT%2BDwXcXtTG9xQPwk0znNEDGwQuPk8tBznQxsC1u%2B46s9c1d1%2FnnrDqOiIyGnZNYIg3MfeOf93uYudQF0JQyN5q%2B4SAAJno3ZHJGvzU2XyUqFEi8eMa6qGpeaLPAFcq1lTCwMHDoJqGDDAuq5MV4CUShsMMaiks0GOqUBWmo7vkAmGmObDUiGVoPDjlfeSrubWY8Q74nnjWTyCvk2c3uCyI3J%2F3NKZvdYguRzdpbU%2Br7pfWQCteX%2F65ZYn5gbkFN2nj0EzBfaixwrjF%2BTMNG1tWsaBps8wKUWE8ynYnLc%2FueqZ4AgkSzwrtMTCpwtWSgYps94tolLsuPqmxPWS%2FuWdL6pEf9h4NUuow%2BlEn5%2FzHTL6kNrDujzCUMzk5N%2BY3lM&X-Amz-Signature=4be4d83f15a941051671e40348df09fa4fff37ecd6cb61713f120d86dba809b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXZZOP4F%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC00jOIfUJnwSQGAJKfpVYdasL7DBQBrkE23asdGEJ5GAIgLInHa7ACzkBW%2FFrAMcHJaY8Ne%2BRJQSSi4sOqtyW4YZwq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDE9wjFZZiJ8idryVlCrcA%2B8ngcDWjfFI6%2FX7w6dGo3ZnJ%2B4x%2F2HxBVP7ZCCIX%2FRK4Al2CTjKABcIuyCLbJG1DZBNyGqBH%2FMqzs3aUoIXcyjoHsNxFHyntoS4A1J1z9jCvRx2Z453NaV0mGreQdjSbVjvYDNtFzeq1QVu8RMckbTXVebpq6qtaXjt0llwEKXUOhK%2BqaxvSYmR1lBSe9o7I0kesQReiYSBBQQSRgZW0B336ekTdVfRa02Yvn2N9o%2ByAJ3HsQEQJ9A7jzvTkh5K9d1lvc6FQM7qTEq10t4pIXTz3Nc1Ga3%2BpTRN06yICuCOU%2B6ZHoL7wAaFI4ek6d4An%2F%2Fzanb1wcEwAF%2Bdc1FeLvIgXGQsFjP5tsV1bJiQCkRIWG1gXx8FA4KoxtXYfUf55q%2BF%2B4LsDA%2B19mAtOcfk5yopqYB9yWVM388eqBwCvD95Q23Gu4mlxpPRrtk7mqog1Txx8vgPQV2YzbYPGw18NyALCNM2oMlH40YcntzZAsc6%2FP4zB2LRyOTx%2Bz6KkFzeoEECynBuknTTjODcKYMAbVuSFGKaMgpKdjcmccSoT%2F4LQqLtJvAPmM2D72TsbEleuQf6s3fyar4YuMwrO0ZqL0xTxXOhsgKWGXHy0G3WrIMWo5bCGF98DkF0Vp3CMPWhks0GOqUBsaxQEz6NRPFLH4%2BQh4dfpwbuW4UC1CTGpNwQhWEP2eIp2Gz%2Bz0pW23K5mnN2Sso5gzMvPxE2EZjNTsbcLtP153LB7rSGMOLWfPXM1N7d2pBW0CQgIFojxpuQE%2BbG3eZmZccm8epJnTzSEnxjdKTOb55QAK9F1EcIo5BgrmUWUu07LQx%2B0XmPPVTMvbXJmlgGY5qA79ajj%2Bcf8V7dkKy3Aj4NS4Aq&X-Amz-Signature=7c2850baa233b3fc69d4f3a2a141a14be41402a301367913c7da58a988b28a70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXZZOP4F%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC00jOIfUJnwSQGAJKfpVYdasL7DBQBrkE23asdGEJ5GAIgLInHa7ACzkBW%2FFrAMcHJaY8Ne%2BRJQSSi4sOqtyW4YZwq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDE9wjFZZiJ8idryVlCrcA%2B8ngcDWjfFI6%2FX7w6dGo3ZnJ%2B4x%2F2HxBVP7ZCCIX%2FRK4Al2CTjKABcIuyCLbJG1DZBNyGqBH%2FMqzs3aUoIXcyjoHsNxFHyntoS4A1J1z9jCvRx2Z453NaV0mGreQdjSbVjvYDNtFzeq1QVu8RMckbTXVebpq6qtaXjt0llwEKXUOhK%2BqaxvSYmR1lBSe9o7I0kesQReiYSBBQQSRgZW0B336ekTdVfRa02Yvn2N9o%2ByAJ3HsQEQJ9A7jzvTkh5K9d1lvc6FQM7qTEq10t4pIXTz3Nc1Ga3%2BpTRN06yICuCOU%2B6ZHoL7wAaFI4ek6d4An%2F%2Fzanb1wcEwAF%2Bdc1FeLvIgXGQsFjP5tsV1bJiQCkRIWG1gXx8FA4KoxtXYfUf55q%2BF%2B4LsDA%2B19mAtOcfk5yopqYB9yWVM388eqBwCvD95Q23Gu4mlxpPRrtk7mqog1Txx8vgPQV2YzbYPGw18NyALCNM2oMlH40YcntzZAsc6%2FP4zB2LRyOTx%2Bz6KkFzeoEECynBuknTTjODcKYMAbVuSFGKaMgpKdjcmccSoT%2F4LQqLtJvAPmM2D72TsbEleuQf6s3fyar4YuMwrO0ZqL0xTxXOhsgKWGXHy0G3WrIMWo5bCGF98DkF0Vp3CMPWhks0GOqUBsaxQEz6NRPFLH4%2BQh4dfpwbuW4UC1CTGpNwQhWEP2eIp2Gz%2Bz0pW23K5mnN2Sso5gzMvPxE2EZjNTsbcLtP153LB7rSGMOLWfPXM1N7d2pBW0CQgIFojxpuQE%2BbG3eZmZccm8epJnTzSEnxjdKTOb55QAK9F1EcIo5BgrmUWUu07LQx%2B0XmPPVTMvbXJmlgGY5qA79ajj%2Bcf8V7dkKy3Aj4NS4Aq&X-Amz-Signature=7c2850baa233b3fc69d4f3a2a141a14be41402a301367913c7da58a988b28a70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPF7F6JQ%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T200133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4rOUrPRt7IkRAUjPDz1LFjm39DYAQb3GqPs0TpakspQIgI4sOlSPGD9sxwKkTM7PLV67ffIkg3qG3d9I8zICHZoUq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDD5D5YADqpQOPnZd4CrcA0ME7gwNIgfnYHxIk0Ujsjs%2FB1V%2B6f4XM%2BqF%2Boxwaz1v5u4wMByDOoogO30wDtjHumVvMdWEtBoz5OvrJh3OMc9yVT5eOWO5Z9qjMWsAl1x8d%2B4MuSZC8lcaI1fMPjVfw%2FrPZn1XGbIzwWRt75yWuZbcEBp%2B3pgWnSw8e32iNml6bKfMbv%2FMTV84aPsk1GAKIn%2F80Ai%2FGkHj5py1CfM5cQy3PngpXOSM4vJ7PP68WIjIWE%2FCEW1rPsIJ12pg%2Fpi2HO1O3Tn3gY3rSpsMsPxtfHGY505Pe%2B1U2bA%2F9hZrCQjxX6LH%2F222%2FZiO5z4pEqlI4H8d5xfFWAp8tHLwOxRCJZD03eM9pR4cjP%2B6n0Mu4cZ%2FFWEBrNDEWZX9GBZQpvskRsI%2BQ%2FqfBth%2BhPgT%2FqIN5VyqLzezEwgDDa5bItg0Y%2FU6qhGhWhWo26BIMtkq1j4NNW0iSOoHUZqmwoLXL2Z0FlBLadQ0tl0MD3nXcLAK%2Bu%2Fkrc%2BEcXxnJB0yFmgowYCa7ig2OSw9V8VTtWziTdPYwavnYRCFccSJSl5ZBAVROHyE6r1ckbzMrGeQ%2FE34Az8wcbmXnGpBYjTjVZMOapFxplSC9okR9YIRGD2fsPNH1%2Fc37fBPDJLNSfz5Y0lDMJWiks0GOqUB49EqRgEAWH8QlCmqQuYWvi1TJNSEB%2Fi8aBlWhsUCLUZfUtaPG5GyC1r1zPL75eHl1CMicTr5pKsvbFDVMp2FEHg0E0Q5qhM6L2QWuNDl20iTApYxi5Y3BABJ%2F%2FqKKn11iSrVqtoGJUNZ9%2F2hpLljAqXdvDC4tXg%2BGPpL8PHaKOFp7kMo54aMf9pnoXYyVcYVAtNWRqG3Jn%2BtjV0O6gmR%2FNb%2F3XkA&X-Amz-Signature=c76fb5f89831c28da6b442d9542a0b934b1593f219d9917eb3acd9f6bebd0412&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

