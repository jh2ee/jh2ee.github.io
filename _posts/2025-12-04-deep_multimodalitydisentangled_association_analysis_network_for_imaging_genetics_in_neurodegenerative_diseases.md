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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FBGCKEL%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDeehoFSN4Amq%2B3toiBByBvjCnmSn0MQBOrkZ%2BctyO13gIhAKZEFpzBRoa5F2vYQTNwFsinuA7FaPkTbty4lFFNuVpIKv8DCBEQABoMNjM3NDIzMTgzODA1IgxN58kJw8l3XSvHCOQq3AOERDH6C3KD2VDzrNzCT8uTeQCzZieuR0N8ytg5le%2B3Ud%2F8e1HUTenOK0wt7RG3Tg4QeD%2FmuLKF11dsDAbv81HkJ7IyB%2BiY01w4ETJmSuw3Ptqsvwi6LWNoPaeilqnQWG8ro1%2BKCC1TYZbW92s3jm4w7Ni3CAoj0f2QVRoD570TyAvqZrQjEV70H13eEulY4pU0l%2FIrfCWrNn8hvCnBQ2QiEsGaQQaweCq5bzK4xgSY0IoavVpKB9qFnbn8uoXTxEAt6jT%2FAPbRivqKNPPOnpICJg4QHKwN1mzR5pAyZAZvdp7Gu%2BjhNOfRm6JLpl9J%2BAunZS3N%2FAEMvdgiiHkG5396cr5AAd5Aw7ONcHWev0L3xmjOgyC2k1NB2D7Cq9gut55UsZ%2B%2FjvYScOQKTHJGyahzKqhZMgjsr6dg0HnV0kdD5zcP%2BQd9kSklihp7jI1bRuZNyu6y9rj%2FNLho7LDXz3psBk6TxdnG9iScPMRhNALhjckeEExqay6wfSQZxQwZuy5dQQ06Am3Tnv2n5zFSam5a1gFB2QpC7ohf7uCokT2HwCYjQ9w%2FoMQCQGIjnlCZPtLEDTFpLydSF30ykJsrQNSzyBXVlYHFJe8JuAy89gD3k0IwgZ4oPc3FJrXlJjDC8uzNBjqkAYpQtaeL6fSlnV%2Bupzjq07X8pBJpDSclUUskXGzY72bHTPuwPKpG90WX5Se2TyNzRcAyy4gp779Iky3Up147JkA6mDYjqjsElCRyUCpZCHZrZgmd6pTDYIkHRRVKwsf71rEPCjD0vkxQIMp5IYw2OcTkYPxPak%2BBRMeVF0chci97p9BK%2FJme5j6Jm8neoi7UH9%2FQTFuXniF%2BsR4FMLUZLAfF63R0&X-Amz-Signature=5b10a1e19a16269696400fa38454fa277da94f79d16c9c9647827b9e027271d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FBGCKEL%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDeehoFSN4Amq%2B3toiBByBvjCnmSn0MQBOrkZ%2BctyO13gIhAKZEFpzBRoa5F2vYQTNwFsinuA7FaPkTbty4lFFNuVpIKv8DCBEQABoMNjM3NDIzMTgzODA1IgxN58kJw8l3XSvHCOQq3AOERDH6C3KD2VDzrNzCT8uTeQCzZieuR0N8ytg5le%2B3Ud%2F8e1HUTenOK0wt7RG3Tg4QeD%2FmuLKF11dsDAbv81HkJ7IyB%2BiY01w4ETJmSuw3Ptqsvwi6LWNoPaeilqnQWG8ro1%2BKCC1TYZbW92s3jm4w7Ni3CAoj0f2QVRoD570TyAvqZrQjEV70H13eEulY4pU0l%2FIrfCWrNn8hvCnBQ2QiEsGaQQaweCq5bzK4xgSY0IoavVpKB9qFnbn8uoXTxEAt6jT%2FAPbRivqKNPPOnpICJg4QHKwN1mzR5pAyZAZvdp7Gu%2BjhNOfRm6JLpl9J%2BAunZS3N%2FAEMvdgiiHkG5396cr5AAd5Aw7ONcHWev0L3xmjOgyC2k1NB2D7Cq9gut55UsZ%2B%2FjvYScOQKTHJGyahzKqhZMgjsr6dg0HnV0kdD5zcP%2BQd9kSklihp7jI1bRuZNyu6y9rj%2FNLho7LDXz3psBk6TxdnG9iScPMRhNALhjckeEExqay6wfSQZxQwZuy5dQQ06Am3Tnv2n5zFSam5a1gFB2QpC7ohf7uCokT2HwCYjQ9w%2FoMQCQGIjnlCZPtLEDTFpLydSF30ykJsrQNSzyBXVlYHFJe8JuAy89gD3k0IwgZ4oPc3FJrXlJjDC8uzNBjqkAYpQtaeL6fSlnV%2Bupzjq07X8pBJpDSclUUskXGzY72bHTPuwPKpG90WX5Se2TyNzRcAyy4gp779Iky3Up147JkA6mDYjqjsElCRyUCpZCHZrZgmd6pTDYIkHRRVKwsf71rEPCjD0vkxQIMp5IYw2OcTkYPxPak%2BBRMeVF0chci97p9BK%2FJme5j6Jm8neoi7UH9%2FQTFuXniF%2BsR4FMLUZLAfF63R0&X-Amz-Signature=5b10a1e19a16269696400fa38454fa277da94f79d16c9c9647827b9e027271d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBO5HJBN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIC3Ouv%2BhstQ87rV%2FU%2F1hg%2BjJ%2B%2BM1dX5bDYbNbU7Sn0lOAiAI3czZJBE21gkimEhOF8O5jed98y5IlJzGCvX%2BBvDkpCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM0qj7PFyTrm77O1OhKtwDRvsoGbNqjzK1ipMICv9FM35mRCdpAF8K1N7Zks0bXNbBF4UsWRnG%2BplHMN1oBjxT9N4cnXKo0tmU9%2FyHI7J4NLMGP%2FrbQiHPP6QCCmdzq9IPI4pn9Ro8JrXI8UEQRZRk8Hdgqh%2F0F0mdYAEBjhO3KKzztPgjpXGDsqZi7c%2FZUkvBn3gV0iyKg%2BatukZLhdoSzXH3Ys6m6aj8N5XOekXbbzkXobxBlBmkBdISwD9wp6iV%2BDFOZJ7gUF7C3cFqnXIXvqbTphB%2BOxG20I4qZryGpefVcKMDPbYpu2Tx%2BgbskaeqPcCyf9tXGiN6HINEX7zd%2BjpaAIi%2BgFjHogYpTSSpNigzPYLYnf2QUNIzqv7nGQjpauBABALaB7qoGzs6YCAGZftB5oKMO3zNVknl1Ydnu%2FPIPDd68F73xrX%2Faj4KPpwFTgpfi5FGBHkXsY6AKyir1OnTb76HBe5vAXoJ6A%2FUUM%2Bx0OYJGGZvl9DphfK4%2BkaHhpG7CeZjgqGXdwecnKMMFwNoHaBRWPR74NygJr4huoqAb5I5UbLIxpsqMQXOcwixsADMrNdYwAOqOJVJcmMXEftEb11A5Ijdd%2BKvXv2w30qk9cBjbX8D5JcT5huy5%2B3oOOMbNRMGrLNrPiIw2vLszQY6pgFi7g4PldDBh9sucugIPut%2BC8%2BIQN%2BBHBx12gi%2FefZYyVhV%2FvRZQXH1VzK47X0XeVvcuUBXlXwjgJYw%2BopZlZHTJUDPvkgj0OQ9xnhj8qvzUFhkND33Cz74ShhDoWjRNTvax%2BYo8MQ1IDbv7kHwC%2FMo29YFQsGi90RDWjIEGJyPDJewquP42ZrHwrMnZjBg84rD67VxwvqzHyZ7JHm%2BwdMXz1wPhGuT&X-Amz-Signature=349ce80eb1729bbf9041dedf2f280d6773229b11c559e344ac9cc2c7958b0158&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBXDZJ5W%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCaTX4QJ6qkAXTBgQjXdv%2BCxPWRgW8XuiBhfAPfkM5MpQIgAvTReHKQQRQZQjmvpNkRGWFDpt6kMIUjo3qE%2FZoKv2cq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDAiC9lQuQ60b5E%2FBdSrcA3yTp2oCRmVcrXO2atikRhFiELfIHHOugp0wJdawGlwnMAW1ivqzskHLmnfzscXnNfKML38k3o2IrLmRcYdMR7tJnaCGIHx1sSAYqwozHXr2KRg5bXMrz4XhwB%2BaAVWtNilzdh1a5YoF5Z%2Fo5I6OxBlJsET%2BhYyhUhI17j6vi%2FQsffFPGa6cLHEdzjDklvipRXLKpNfBMA%2BTFpVxCu%2BQnk%2Bedqva0QuoQnSoX0X%2FNq8o%2FauUpFPurUvvcpZjKgQtOR3MPeg%2FE44T2oHvZklWrjN8XqAA5h9Bs42HV5WNXTRdX44sRAwFhGbVOdht1r0XjR2eHMjbRTqB9pnT8UMRCD14UuyoTILh%2F2GqV%2BO3frhsALDerB3xF0eOBO5iLfcVm7oXXj6N2uABSwJdFG%2FGVkgUoVhHztvyoJ41LQqtLJ6%2BpXr4SFa2j40Yjdi4wxwjqIYuRpJNmH0VNjAMKy%2B0%2Fp4emZF5wmxs34MZls%2BgteEku6%2BzbbzEVy4fSeN78aIprGibF0q%2FndvkGx6s7INrziFNfQ7GoyJj%2BKz4wLHxUUiPyJs5O8vzGjT4s5CN%2B4EkWCjSTXTmynHC9cTR9%2BJuEx%2BttRSc%2FlQI4llm5UPDvnvsD1llZnhetBixrvIcMMDy7M0GOqUBClbbxeLKaZ6n3Y18GDcysV4qvmo1%2BoSSOZrIG49%2B5UArGFk0NHUY24j48Ecf0nN5R1Fgv1yhWGli1aO2UdOAMGQtl25Kg1rkcfBvjvBWcP%2FRJ9fwrRPYWKwZdSexAgYg045e6ES2%2Bz%2FSTjkj1uKbd5xQfyvReZkA%2BuD80hvwc0G%2BUHlcTUKtn6nNvKA2ZXFUvRTn%2BtRmPr%2FPGVzPFJT7sHg5Sv%2FC&X-Amz-Signature=1c5eaf3a80cb46dc48676696fa0081455d8cadf9fd4ffcd02edda0c128b1449c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBXDZJ5W%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCaTX4QJ6qkAXTBgQjXdv%2BCxPWRgW8XuiBhfAPfkM5MpQIgAvTReHKQQRQZQjmvpNkRGWFDpt6kMIUjo3qE%2FZoKv2cq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDAiC9lQuQ60b5E%2FBdSrcA3yTp2oCRmVcrXO2atikRhFiELfIHHOugp0wJdawGlwnMAW1ivqzskHLmnfzscXnNfKML38k3o2IrLmRcYdMR7tJnaCGIHx1sSAYqwozHXr2KRg5bXMrz4XhwB%2BaAVWtNilzdh1a5YoF5Z%2Fo5I6OxBlJsET%2BhYyhUhI17j6vi%2FQsffFPGa6cLHEdzjDklvipRXLKpNfBMA%2BTFpVxCu%2BQnk%2Bedqva0QuoQnSoX0X%2FNq8o%2FauUpFPurUvvcpZjKgQtOR3MPeg%2FE44T2oHvZklWrjN8XqAA5h9Bs42HV5WNXTRdX44sRAwFhGbVOdht1r0XjR2eHMjbRTqB9pnT8UMRCD14UuyoTILh%2F2GqV%2BO3frhsALDerB3xF0eOBO5iLfcVm7oXXj6N2uABSwJdFG%2FGVkgUoVhHztvyoJ41LQqtLJ6%2BpXr4SFa2j40Yjdi4wxwjqIYuRpJNmH0VNjAMKy%2B0%2Fp4emZF5wmxs34MZls%2BgteEku6%2BzbbzEVy4fSeN78aIprGibF0q%2FndvkGx6s7INrziFNfQ7GoyJj%2BKz4wLHxUUiPyJs5O8vzGjT4s5CN%2B4EkWCjSTXTmynHC9cTR9%2BJuEx%2BttRSc%2FlQI4llm5UPDvnvsD1llZnhetBixrvIcMMDy7M0GOqUBClbbxeLKaZ6n3Y18GDcysV4qvmo1%2BoSSOZrIG49%2B5UArGFk0NHUY24j48Ecf0nN5R1Fgv1yhWGli1aO2UdOAMGQtl25Kg1rkcfBvjvBWcP%2FRJ9fwrRPYWKwZdSexAgYg045e6ES2%2Bz%2FSTjkj1uKbd5xQfyvReZkA%2BuD80hvwc0G%2BUHlcTUKtn6nNvKA2ZXFUvRTn%2BtRmPr%2FPGVzPFJT7sHg5Sv%2FC&X-Amz-Signature=85895ed37c1f6b3e4e8094b9976d99595c58ff4a1aafe623103a2eafad79995d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RHP4A2I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHAACAWanSKFo%2FgdzPVxT35VNLO4E6o427HZGQsE7glyAiEAv%2BuWypjRdBrE1WckPydNGHfD610gP6J90WfycrrD4sAq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDAZ5%2FA85nVQURn78jircA%2B%2BLkPwRYK8IJFj0RrjCBXPZSsaOMGDIndJO%2B1OaxdJKzKAKQHfwqdojbBeH%2B7GvtcDwpq%2FLkVzwhCC6KkaPofK6CX6tHONZngS2Fo6RW8fcPoNEB1AY6AGCdm%2Fx3bZF7mIEXj0BhEW%2BGcpAYuqjAu9N2SVphq5ZiY67EmUTyC8e3R6WaSDK5GYuZ%2BjsOMQIpr3S7pqaBN3pYCkzeICmq5IBE2CAJ4m1mTucwsv5nDBjZ6mljBnm16Xme5aewn8BOnxBxctDWrk%2Bash8X%2FLWhjU0ilZc12NGgs%2BIoRshvvz7pYIDZeMLV7l222ZkUBEAkgT4gtqTBwEtMaAd6T%2FuQQJ2tNSFtLCy07mvb4ToFJ7fAQgTJvmnjcddz2DKsz0icNmo2p%2ByPT6KKIp1a1OqB2CZO0ER2q9Gilun08eb4rXFyUDdxVtsMwYf28s%2FQQFas2iwSsm1Stz5yoPgD1B8ELkC2CpOOx8yY25r41ohtF8RsNojPnAodKArB2oFYxLwI8ToHN3z184JwWJcjUARhggMO2I3REHpfhnEzZKb0n2kVEbR9k9vDt%2BbwbomHqIAO%2F5OLg%2FvjxhwnSi8%2F7rircB61owk9b9b1KVUE9ySGbDOoinksvhi7DxG1IwrMJny7M0GOqUB0G7IzsPnAm%2FTMyvZ0QeUt0wooWIOwpSzSJBN%2BhZSePFFXV5lDPXbuI0Z4cnWnhWkwNoy0pfrylAc4ywIuPIbaFdSXrus9bNMzq1T788w%2FteVG%2BEUzCviBmmXzAk64ZfpsDI9YgVRJCMdC9gKQEzxgCL%2Bwi6t8uUu3KmniXW5yO%2BXUif4gyei9xSvxgx1%2FVe3RAHk%2BA3MPtnUrBRMy%2BZoP4%2BwuEvk&X-Amz-Signature=c12eff4e7cddc128da484fc9e41221165965ce5f4b54df7b0481728220c9cdcc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QC7AAO4A%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIBZ0IM2dfel2bEWSNTLOjk68PkOTMkro92gygCbFTCyJAiEAijdtoM3W1zhcSJk7x9uqBBafvoZS8ayHJjLhRw1vRToq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDHQDw%2BBy0fuReJ8oZircA%2FUMqr5b6narhzrWmYAlqtk0n1VUg45tVvKh0%2BY3Z%2BVHhFNmpcIRri0GhW5wEB55EG0kVXDvivuiNb5hqA6gi7lAEhvW69lgMi201PKZIFeODn6j%2BhgF9W04aDf7XBycSKAFCI6d5MkQi4M0ET0OGCzXwt9Z%2FL9g2SSq4%2Fdgi2tQOp9F9AfiIdljEZicAowUqHpki9PShGX7BMEifFzJt5IXeEBuMeDj%2FGkne%2BtI4xurlVLvssUJvnvFLMaMd4TpVt896avH1tNEokK21yd9jNHGVDeIUvTCDCxhxFfYvTWi2DVBZgi3O8askRgEfA19U3yc2inaGnTOl8cOppnjnjSPexb43hRh5DONcI1zL5%2F1%2FywelSSr3%2FiawXlAnI%2BQYH78B9PFJ7zUIy2UOCI08Q5S6gICJRByUMeYjVHBSWr09ZEWrUUj8VVgBG7Twx3EeXb4N7g0HrrcAV9Mm1SEv%2FFGNFNvgFhAlkRhfqHGegg1%2BwYaCOSzusOIivi%2F3%2Bv0ZBQoAWKujzA5awjvipbxeFiVYTfb2CxLpwW7%2Fuyedtr3oASqGBhPRPDheEShPLKlMH6jp2D88B5PUV9CRn7gmMJE7D5Fc%2FNcCpSiQhPUlustHmSLKShoVsr4qlfaMIDy7M0GOqUBJCpJ18C6M%2FNv1RdwV8NDvMFK1hEGZb%2BAexgyWFkBjqcoqudl3mh%2FtRiW8hVBvXbhLxpdODgV7Rgh29R8TgLh8Mrkjvu7ONSAWSgy2AhEQmaA%2FQN%2B%2FlT6q4MFuoLS1cRhQzTEQnfPZR5HN2LXWG%2Bl17LaiuNFHnHv5EAiOTu4LGbwdOHo5TWu4NWgjUuSQlujZiOQJ%2FmPEM1kT3d82vni0kJ4C34q&X-Amz-Signature=a78599316d80a3e07517577c71e704587f5adcc5875ba3b833b4b67f8c84ac44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDKODT6B%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIALSfRFdqQRe6QEaej1evXv5h%2FMCpxtE%2FoTe6Zny%2BFgsAiBtRvqVl91hT%2Bs3sp3ax5HC61tf9c%2FSBS5Vna%2FyJYhm7yr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMsO2nUpXiHRfri1d7KtwD15MZWDc9se2vb3mIFgbxRvAFjdORg1u9AtmQpMDZ7iFLOYyQ4Vcp56AQ5sJBryFzig0lVCwptqyK2Y%2FTiwNEBvlNuvJE06hVPCJ0tFrCDVCyeg8sJvvkCVQqvHHYMwRapgjlRjt7IBs4aXagfl3MGlxcAozOUshV1z4vrCPnxWgyPp8PA7edl%2BhagVlApTe6AfzwepPrqMbbowPzpBCjU1SZ3iEmf87G0OmIVqGGzvmEIefOI3nWGjLwx5JNzIfEQ8iPQF0Z0%2BNrP%2FKKzB%2B8L0iH71GzsGF%2BCwDV8V5catj7XJhWP5ZE%2BpV7plTNTTjS2YABWRYeeWDbEu8ASKrjKhrryAz70JmfKf8Ft%2FoIoS3XiXksgqXO2VJ8H89nJQhz%2BCeCeJgvYpfMMJyKAIXvJmbKSpQU%2BP9R%2FdvRu5ly30bJ%2FhaOvnVKtAEXilpJ4AyLkbmZNlzbtVviNWkA1CdQWj8lv7wNAkLbA0owSsdioUHK3VVb9a416p2s7Rq0OLW3%2BXyzj5eVFxRZA%2Bh5n%2BwtFsTzRuyh7okl1WA1tjBX5AbagcO3yeYOtOglDQzAFIU62oJdcVkPlOcuzR2HRj0KcW7xOtBeUnD1kd%2FQtIJAY0BK5mF7HLdIrMBzlvAwjvPszQY6pgGIhARpE6wdDVO77YuqrLVJ2JwjnDLEAeBGoA3fEGzhiDbypMtcCGHKa5Zke9NtSFf1YJg%2FbEitwIESqteTADkQR%2BambLoSlDx9%2B5Nj0B%2FwDf%2FeKDGAGHtG54YcN3sdsCVvo69cJlK24Vh%2FPT4as%2FgcLigQxyVm5b3G3tDryBSB0OtAKUTaa%2BNT10rLSsMspjLPf66Nr%2Br95SbmA0lvpav4BzisESZv&X-Amz-Signature=f4895085906cd8cb8ce6645cbde083e1416d0758945d97216148904df06f78a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EB4O2Z3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T010000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIGp64ZQE1U%2FWYs5kkEjskkKGSAI%2BMxzuy%2BMtigwwXuMJAiAWQeoKL%2FQMOxOqXSwqAgN0bX%2FOS755%2FPM1YyuZGhp%2BYir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMbvqTyUtBHGeNiwd5KtwDeCoEDitT1Ru9o%2BMomr4Os%2FL668TbZhfrNdmCRA6gh4wza9UhZLlEhVwqQCcEUDqsXckvg4EUWZ7RLRkjVElgQou%2BxPAVIcdInFiiFkbg8IkGpHEnjIqCKxtrbgmA26h0gqCn%2FI73Yh3wIt7u7uWFfYOd8BEWRwbfuXgLagP0%2Bo5oZjZ9pKFliTdQ8ES81dLJzFZydWoyFYwQsAhvUsLYHsh7YEdnN3gPKB1q7PNqiKaQbg%2FyXpdqLF0RsZXUrXFVwKyQ8KMiHlw9QwQT%2B8jzQt1uRbiBepQNvo5tc9%2FV2Mv1BVmJu2w94qNmF0PZl%2Bb%2FsxuqJbNhvhUKjG9cHCme9IaqGGiycV7UcIlXfP7FPVVZn0C2yVqO9mNvtCMuKcYaV4Q1Fhj0wmshTbi8PHlfBwn3fYcGLe%2FL43ec4xHBn6zVOl9oGK948yOgBVNFRhLrc%2FUf%2FGGgVTVDAeHaB%2BCwm6v0PJ3i%2BWAIG07Bfx%2BvqqWQQ9aC0t5X6fjLqj2FNIs3OtTBowQTpzdo6dofAV%2BNOH%2B409t7FuXfvLzKqrbOxYVUOtR12UHU811R%2FYFkX7rc5HmWF9x72SlV6gDJm15GRQCPRoVqNHIIyvmK%2B5lCr%2Bh%2FlydL7Wkn%2BPDZqn4wt%2FLszQY6pgGccMnK08UlV%2FM1g2L22fKI9aH3U%2BmhN%2Bw%2BxYegQRLGrWASea9XOQXK9v2V15BhHtclb2fv%2B47HGmi1njci3EhM6fXd6uGJOb%2FmuGCtT5RVek93bycTcn%2Fm9JB%2Bb5TWM01VwQ6J4yImRX7ucFHtKH6tJ6Ki8auoWFUIh5sJO%2FepeDKl4q9kJCplRtuCwNCvAGwt2%2FfxLt66WLCW%2FKafGKuj7Oq63Gew&X-Amz-Signature=bbd2c209e9a25a1bad3f775671a625d26b671445872c43417a2c8500172bc464&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EB4O2Z3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T010000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIGp64ZQE1U%2FWYs5kkEjskkKGSAI%2BMxzuy%2BMtigwwXuMJAiAWQeoKL%2FQMOxOqXSwqAgN0bX%2FOS755%2FPM1YyuZGhp%2BYir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMbvqTyUtBHGeNiwd5KtwDeCoEDitT1Ru9o%2BMomr4Os%2FL668TbZhfrNdmCRA6gh4wza9UhZLlEhVwqQCcEUDqsXckvg4EUWZ7RLRkjVElgQou%2BxPAVIcdInFiiFkbg8IkGpHEnjIqCKxtrbgmA26h0gqCn%2FI73Yh3wIt7u7uWFfYOd8BEWRwbfuXgLagP0%2Bo5oZjZ9pKFliTdQ8ES81dLJzFZydWoyFYwQsAhvUsLYHsh7YEdnN3gPKB1q7PNqiKaQbg%2FyXpdqLF0RsZXUrXFVwKyQ8KMiHlw9QwQT%2B8jzQt1uRbiBepQNvo5tc9%2FV2Mv1BVmJu2w94qNmF0PZl%2Bb%2FsxuqJbNhvhUKjG9cHCme9IaqGGiycV7UcIlXfP7FPVVZn0C2yVqO9mNvtCMuKcYaV4Q1Fhj0wmshTbi8PHlfBwn3fYcGLe%2FL43ec4xHBn6zVOl9oGK948yOgBVNFRhLrc%2FUf%2FGGgVTVDAeHaB%2BCwm6v0PJ3i%2BWAIG07Bfx%2BvqqWQQ9aC0t5X6fjLqj2FNIs3OtTBowQTpzdo6dofAV%2BNOH%2B409t7FuXfvLzKqrbOxYVUOtR12UHU811R%2FYFkX7rc5HmWF9x72SlV6gDJm15GRQCPRoVqNHIIyvmK%2B5lCr%2Bh%2FlydL7Wkn%2BPDZqn4wt%2FLszQY6pgGccMnK08UlV%2FM1g2L22fKI9aH3U%2BmhN%2Bw%2BxYegQRLGrWASea9XOQXK9v2V15BhHtclb2fv%2B47HGmi1njci3EhM6fXd6uGJOb%2FmuGCtT5RVek93bycTcn%2Fm9JB%2Bb5TWM01VwQ6J4yImRX7ucFHtKH6tJ6Ki8auoWFUIh5sJO%2FepeDKl4q9kJCplRtuCwNCvAGwt2%2FfxLt66WLCW%2FKafGKuj7Oq63Gew&X-Amz-Signature=58ff9e0b82d0b882b026ddb2358a4ca5a88bd9207731df4e0c06d1e5804e5938&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6MXA3FR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T005953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDAtUAOaimqr3rDpRyKNN4CPJlR%2BXrA7FhIr8jipCI9WAIgE4WqGZZYjUX5a9PkUuNYmqbeHK6hVuHcb9bnMddnjIQq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDGDTJ91GcBIDJRSDByrcA5naNO07qR4iLOxh34rvbdfZGcQbCoYrQEVB3SihHO4pzttmWtKLtW4rtDHMtsQz1gCF6GlLQQx4w30G%2BwAS%2BVsDyavarJxdBiTq%2FinM3SjE%2FhLF%2FYnVByuUx5VR3gqIraaDZZB2f6PegjRkIJkVBRZkBL4kmEcvqOeoRhSamGASglp68fYpm0%2FPKeM7n6hY6z9EJ4Op4kcrafVbzxulo%2FsNNKyDMAf7oX4pGQqPPMXu84d327RHFI9f6E6lMbFZL%2FUjfxopR07J7YrF8iLnl3nLZdtjyPV7VK%2BtY35oHMsgOxvquo8OIgsMyFzpdl32TPNafkYZCG6aB8Mc603ApwIVxH8nArhMTthSEkD%2BfWKXCZAKbmSJGWiQKW8%2BUs2X125QjixxrZlD7WbT2bdE16Z1PfxwETEAS6Arse%2F2qsXLqE%2BLbJXlaPeFOLW1C0B%2BB10SnbHbg5MpnNz3dHuJX7EFPoveHCISpGH3eK9uM5ozlpZ2uczbnZ5STkxADSUAkSmZ79l9kczyG69O4%2BHBh7uOcW0rn5NqHFJy%2BU4hh0l41rhYUldylbLdzVttyYE3kDkGpB%2F9JesUsRlWlIztRKrc1AlE1Qdnq3VlhyYpTheSDU4oXMYKZ%2BIolTN9MIDy7M0GOqUBO%2FGsrHg5lCP%2F8crr4r8w3%2FjPOet8%2Br67OXG62iKZIpt8vISFlNFELmum8lKjWHl9qnSZa%2FA4AwmkSgfqOOCg1ZygQipDMUZCJpfT9bwShahNqFg4jzWFb06S00WJtVhVpL5EdGFvAYB8wrDNKLox%2Bx3qrE6bHq7mfTmROaiTOrg4qmHWykZxQk5w5LXXsXnnNcVhlZU%2FlyxrQP8NkBX5cTADdPSw&X-Amz-Signature=199c6444bc22ccabe76ea340b0097c17f39cfc56d25a12ac8c3d8975c8c78078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NXJZNZU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T010005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCqTWZegWjeuDJkZt0KAuUJMdKMzGD21EOk%2F29wVN3wIAIhAO2fvCUtIAkU9wa%2FLbRRkXn3lpvxUmXYRbJ7dW0pIEImKv8DCBEQABoMNjM3NDIzMTgzODA1Igxl%2BWBf7lfGXfmvY8sq3APLpRc2n96Y%2FWcKC7Ba1ckRZtJeI5jwZWwUAn5VtCaIky8dfL%2BWIR2hK2X3VhxJAZZ%2Bmqo%2F76X%2Fk9zgYCFw8C6AxGxGiTw6QhhvFtksll88zUSauUtgw9Xrusx773G6CfwUdB3zkrOhQNE%2BQ9%2Bj6wGKEtUVZPyhj60foyI9FwpdnPQhsaf8IlH2lYzqsDVXvRYdvu1Gbr7SDvTu%2FemiZBLFL74VvDJ8KXas2DHHrTqnJKK%2B7LJNdOkrIkFzDue1Ke%2F%2FO7%2BfD7QBCBPkP8yyxwU4RA7tu5juS5rwGiTm0VwDU967Cg5k154EcyBGZM3W0TifNLKaGBMzfgC7hQi4Om%2FlCsFFuaBn%2FLoekkjup9TlCgjZ7ML1HVNvAjf%2BwPKnulLBedgMyM5cJB%2Fd5fA%2F%2BUcV4XzGpngo4aHNf9zNanhUtZegKHRyjK3j%2Bc45H6ps2R%2B0jR0WRSWGLq9XQd1nuQhSMZ3l%2FymLu7Sd54zuZndNrg8CeJ4M9Dx3or0ykkbez1oft1i9MP3VbkvyS7plaGT9Nbsy0C0V0KWhIi9tLA10FvfvLK1RZG9ghv8pRPvcy4eu6hUKNIfiO731ZK%2FY1I%2BSraVyz2jPWZzvnyl%2FGLn7ZCvqtIinsAp0yNsjLzD2%2B%2BzNBjqkAVExf%2BuPKS64vy8WgHAoBA4ir%2FTSCMYc0QUMvutv0QPt1wenCZ4Sz%2BKZeqYDocUKwGYJ48kR52bKb1hGv55ecCOc8tvfCGbvgL2yPfcgbbKho5LrcuP3xDdx%2F29JVYDLemmCBaJAYx%2FHKVGjGRj3T%2F7kCSqX1V0oP%2FBfS7ycR2C%2BvNcS0aYzmjQW7SGwMkHnqIJRMIYwa7vjOmnd26lu2yOxW111&X-Amz-Signature=3b9e76eee42212216017c60f6521126e8eca5b783a808a3dc7bc265ba1b0c744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NXJZNZU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T010005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCqTWZegWjeuDJkZt0KAuUJMdKMzGD21EOk%2F29wVN3wIAIhAO2fvCUtIAkU9wa%2FLbRRkXn3lpvxUmXYRbJ7dW0pIEImKv8DCBEQABoMNjM3NDIzMTgzODA1Igxl%2BWBf7lfGXfmvY8sq3APLpRc2n96Y%2FWcKC7Ba1ckRZtJeI5jwZWwUAn5VtCaIky8dfL%2BWIR2hK2X3VhxJAZZ%2Bmqo%2F76X%2Fk9zgYCFw8C6AxGxGiTw6QhhvFtksll88zUSauUtgw9Xrusx773G6CfwUdB3zkrOhQNE%2BQ9%2Bj6wGKEtUVZPyhj60foyI9FwpdnPQhsaf8IlH2lYzqsDVXvRYdvu1Gbr7SDvTu%2FemiZBLFL74VvDJ8KXas2DHHrTqnJKK%2B7LJNdOkrIkFzDue1Ke%2F%2FO7%2BfD7QBCBPkP8yyxwU4RA7tu5juS5rwGiTm0VwDU967Cg5k154EcyBGZM3W0TifNLKaGBMzfgC7hQi4Om%2FlCsFFuaBn%2FLoekkjup9TlCgjZ7ML1HVNvAjf%2BwPKnulLBedgMyM5cJB%2Fd5fA%2F%2BUcV4XzGpngo4aHNf9zNanhUtZegKHRyjK3j%2Bc45H6ps2R%2B0jR0WRSWGLq9XQd1nuQhSMZ3l%2FymLu7Sd54zuZndNrg8CeJ4M9Dx3or0ykkbez1oft1i9MP3VbkvyS7plaGT9Nbsy0C0V0KWhIi9tLA10FvfvLK1RZG9ghv8pRPvcy4eu6hUKNIfiO731ZK%2FY1I%2BSraVyz2jPWZzvnyl%2FGLn7ZCvqtIinsAp0yNsjLzD2%2B%2BzNBjqkAVExf%2BuPKS64vy8WgHAoBA4ir%2FTSCMYc0QUMvutv0QPt1wenCZ4Sz%2BKZeqYDocUKwGYJ48kR52bKb1hGv55ecCOc8tvfCGbvgL2yPfcgbbKho5LrcuP3xDdx%2F29JVYDLemmCBaJAYx%2FHKVGjGRj3T%2F7kCSqX1V0oP%2FBfS7ycR2C%2BvNcS0aYzmjQW7SGwMkHnqIJRMIYwa7vjOmnd26lu2yOxW111&X-Amz-Signature=3b9e76eee42212216017c60f6521126e8eca5b783a808a3dc7bc265ba1b0c744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XX4F3KSE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T010005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCICzvVWY19qcgcAErPAs%2B9MJlEVoI%2FYSXruniOW8RuXv6AiBkIwasi0deHs1wfED4om873U%2BbnsmZLyHr14NEKqT2ICr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMvMYTmLLK0NPIga6LKtwDiBMUY7BMSKuplJAKBa8uJRt9R4nHW94chqH0gJqK%2B60cIHAvIi%2FyuuHxSS14hM9IeTaYE06X4IiXje%2BGOIvfhKWrpqDgGx%2BME%2Bfl%2FQ1URwlo5qiAq0K2gi6SYtzVCCk4J2peJzP0zacJvkzj%2BqGiu1wagDJhcD84Zym50eHyJ75IfvVo02qQ499JEba5r7zN3moiEDEAllDHdmhZNOu5fyk%2Bbc3U4DHeBVduo6Yz8vQu8aV4aiPNPPD5pRM67qDyG101kbrVas%2FPVkYey%2FpMdEcp50CEd9jhDQH%2FvxSOw7PKKCrcqJg3lSAbkiRuIxiwnpldxkE3Q3qdyqtHsDZsA8kahFDvPPH14mb4uXjuK65dVKciWu6mO9yElIe6ByS6glwUpENtFTLikyfbOXlsMqh%2FxNme3wT9FXDBPh04M62zIJhVb%2Be7eFLz3s8foC8HhA%2BDsSi1Z8auAEbs7p2v10h%2FsxwlT4VqwO7BmGDzf8osGzBkb76ImlU0VmrxCdq9YbjuyDo%2FPOcUhO3QXNxrDLmLRoDOeTo7HggNjzh0HeBNUEb1ripeOM4OWLRZxGc3dERnvu9JSPzqp3eYOOLCgdQdXI22CHaA%2Fnono8As9pb39nwz%2BvwX7A5eeOIwwvLszQY6pgHAAzScFHgRtIkVCrwsUn0aMUoGslDCN4sHAFMc9wY50XX%2B1k3VN1gwovuA5YRUyTs57rKOmGgIiV5kmkZezf6bQaexkJTwRi9DcWoUEtmxz%2FKtT44SKyAb2egMhCQQc4tL2oq%2FXP%2FwoI5sJXM%2FltbaWs70YA4r2mrxJqsSKLpnXHGez70BfgTMQtqN8RMI8c7stX03BzfYQJ%2FbZtMHL%2BKXtQMq0dvU&X-Amz-Signature=675354e5805d4abde758fa1ed425d9b91184b6e46592176d6c164ec9c75a786c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

