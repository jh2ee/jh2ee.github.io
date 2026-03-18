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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFAGRHGZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIF0Sm5oB8YJYqxBgN8%2BFnrSd1z1tLgRAksGZsX7O36gMAiEArnkZtqIhwT7rKw1g2%2FnZmV%2FzmAXaq9U7aUfDaUPwLVgqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO0CW%2F5M405qodnjnyrcA6ZfHzyP%2Bxfm4OXfS%2BhL6yFVPfoyGy6ivFXmwPggW71qmu2%2FU9DtRZ40nHWmuLZ2%2BPqAlV6ZIKgaOlkqUg7brc%2Bi3Di%2FrRG25yaU01ftrzIbz4JoLDls0O1KV9IbMl3Wj2FJERd5aj558E%2FWY5DAQygAQVydgqAyy0wILu2xKMXBRjBz6aO3Z%2FM9m74xLk1Liy6EkMh3V3b43JERj%2BkRJawxtAX98%2FHUyJodLAvWO6dKSrTysr7ym%2FcCJKHjGrx97ZHL4U7wcbXPnwab5oMD4ygFp4GQjBJBc3oCSBYP%2BcaaHoHJc3Dwr%2Bozy6B%2BvwkoJ3wdqkcEJu69%2FKJZADEuzQCiSDdD5MMFndthHXGo7exL0Wq9hbx6KIBJZf2e%2Fb51%2BmU7%2FHQwCo0OwZqEUUxsfmDYYSBGHbaGz1%2B3bHZMleDQJkcM0xD69MFk93o4KKyja4cpxcK0uJost%2B0Ss7iipOTw91O5ItoDUJcXmV%2FkZqK7uKQazCOsDTwhg5X4L54jMqlHw2Si8Tlbs6mZjDRgRn9VH2Q0dl4dBOeu9Za9VDDMLCSpNmCW9mcbEyTayVS0oowV4Oct8Vqq3ZdZg7Ii3fZwAuLasROYKqazSquM2Sr8Qf3vhO0SZOJA3Zz4MJ7c6M0GOqUB%2BAB%2BEDAg5gxFVx9p037ECXWwYGH3HVI6nrOba02CthtEO%2BaEa0uFr3uhiWixpaEkW5n4sn1MQ7FYnncufAD15kCNNi7386a4GuuB50O5YBAxnu8MClz%2BE9W7uiYM%2FZojp4I4BAfp6tNVFnuGmvUdg0fkTYxtvzjHmOnrLKcJ5WqyPK3xKDYypx327Asqmhe7r%2FxJultjPveZmQp8aGLRJoExpbY0&X-Amz-Signature=7398828ad93795de56c3a3b0a149c4a3b17df0aca4e959ec2723e2e2e97a2e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFAGRHGZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIF0Sm5oB8YJYqxBgN8%2BFnrSd1z1tLgRAksGZsX7O36gMAiEArnkZtqIhwT7rKw1g2%2FnZmV%2FzmAXaq9U7aUfDaUPwLVgqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO0CW%2F5M405qodnjnyrcA6ZfHzyP%2Bxfm4OXfS%2BhL6yFVPfoyGy6ivFXmwPggW71qmu2%2FU9DtRZ40nHWmuLZ2%2BPqAlV6ZIKgaOlkqUg7brc%2Bi3Di%2FrRG25yaU01ftrzIbz4JoLDls0O1KV9IbMl3Wj2FJERd5aj558E%2FWY5DAQygAQVydgqAyy0wILu2xKMXBRjBz6aO3Z%2FM9m74xLk1Liy6EkMh3V3b43JERj%2BkRJawxtAX98%2FHUyJodLAvWO6dKSrTysr7ym%2FcCJKHjGrx97ZHL4U7wcbXPnwab5oMD4ygFp4GQjBJBc3oCSBYP%2BcaaHoHJc3Dwr%2Bozy6B%2BvwkoJ3wdqkcEJu69%2FKJZADEuzQCiSDdD5MMFndthHXGo7exL0Wq9hbx6KIBJZf2e%2Fb51%2BmU7%2FHQwCo0OwZqEUUxsfmDYYSBGHbaGz1%2B3bHZMleDQJkcM0xD69MFk93o4KKyja4cpxcK0uJost%2B0Ss7iipOTw91O5ItoDUJcXmV%2FkZqK7uKQazCOsDTwhg5X4L54jMqlHw2Si8Tlbs6mZjDRgRn9VH2Q0dl4dBOeu9Za9VDDMLCSpNmCW9mcbEyTayVS0oowV4Oct8Vqq3ZdZg7Ii3fZwAuLasROYKqazSquM2Sr8Qf3vhO0SZOJA3Zz4MJ7c6M0GOqUB%2BAB%2BEDAg5gxFVx9p037ECXWwYGH3HVI6nrOba02CthtEO%2BaEa0uFr3uhiWixpaEkW5n4sn1MQ7FYnncufAD15kCNNi7386a4GuuB50O5YBAxnu8MClz%2BE9W7uiYM%2FZojp4I4BAfp6tNVFnuGmvUdg0fkTYxtvzjHmOnrLKcJ5WqyPK3xKDYypx327Asqmhe7r%2FxJultjPveZmQp8aGLRJoExpbY0&X-Amz-Signature=7398828ad93795de56c3a3b0a149c4a3b17df0aca4e959ec2723e2e2e97a2e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VLR666Z%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQCGIR20ox4J3eQIEm0K49CGJB%2FovdrjNFpEZTkZpsZfXAIhAL0vHlv1Pax8AY3qlQyaWifn%2B7AQrFM2kH1JxBHzLkwRKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySs3aA1k27V9aeC7wq3APMp26Dca1PZBbzcxS7emoWFXavsES1AD7QFrxjvp%2FFZmU%2Bafxlmg%2FencAekHcPviiXTAjlTF%2BQ%2BOQbBu%2Fhvvtmy2UTB79uyjzlyyquTI00FifQCN6BDq0El1nnmzlV5Akh76OBbhhE98sjESP5FBmP3eKPsCB3kiRa8C%2BIsDkPDBRD6gYvar9h6KydKWc%2F6JbXUZdPmldDAdUsN0BbViIEkL835Kq8EaTenBHUNiyemf1F%2F%2F1PbawuE8b%2BZ5MwQDJu8qNRiAlxNGZP5doNxskO9pdC8XzUD%2FUy45DeTTBhOxDXhqNSm5y0g3wKcpsgWcrlCbKviDVs0Q%2FK6O8gf2d89q5p1T8KXjdrl4ZCj7SBQLTbO90R9p9u7hTC0OGM2j6kEZ%2FgYhPBIMR7loBaliPaz0NpemK6BPbE%2FS8mJvcvoUN%2FA3Zpg3WelEnlZ7alfa7DiXd4lKYfa6Z2D4GaseYzklMXjmmBVIJi8%2FOUFZEIvkWTrKhjqyFBEzej8alOeOTateVfXq2yHFgvKA%2F4YIo3RdzPmZQwZHaJF6LCe3311j0BPN1DUNpyKaea6y0arML3gKLp1hPUU%2F5jHc9ZEusTshMQec%2BWs29wQr0MafSu7DJa6J%2FrlmEEsTbB8DCT3ejNBjqkAVXMMFICzZjCV0HhrcDq%2BKqYzOQQazsEtJga8uBU7ATNhs4FW%2BlWJGc869TayoHIrLd2lKoGNxlwlO%2ByisFY%2BNFMA1mr7rQppfoAPT9IjGhNzmkjtbaFL2H9L9R7w1SBDtQynLzVOjMW2ZLUliMJ8JxbQpfaIu5RomeAQwZwRrxSCUxjnL1D0CCaZ1Dr07WXAL2FoV%2FeRCd3UuNv%2Fu%2BtTrE818Sp&X-Amz-Signature=769b7763d671e6025d90eae96b3f5c4c7c683def4bfe95fd1643272ebd3308c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PK3L4DK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIAijmMuYRKZ4e0A84xfMwssTg3h2qqNISLYdONCtIVKjAiEAnKdY0XkG%2FdA7G1oXOe%2FvbUtrpqW559hmQ4HZCLUIxawqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCpSW%2BMV0bm6LBROxircA1EDkcqVR9g8byoqZn0gXoSLM70A9i7twvJa0IGC6NHOaulOVMMf3nhw6HjDGYnxl0h1bIKulN9nrjVsUaujyG%2FjhTtXCIOyCOPTNiVUklBViydSdR9UGDgWcP6EK7UdF03QoKJb%2FaYQ5ukw%2BbG4xGwTDoUZRTwz5ugetHmFajbwQmD3hRhZDuSYHnnY6EPys11iYgUjEB2bt%2FLQvYF7bpEZq9ByHLTMcwqZbuFIa0DeahA0skwaop%2FVhV1oQSAPmnuARLuk2YgO7VMejdOhxA8%2Fp514bxUzavLuw9v0KRfU97gmZq4RQsYISPmFUOjoYyh1y%2FLhhxAl0Jnba4R%2FfGbCGIOd6%2FUKZYJTso2dRsQ16UDc8r1wtOODdKWuYuQYK9rAVQRzjSFEC7ZyfOjEAMIr7%2FJgsJDRyp6tjgp42CCkxiB27Ypgi7lNAUjoXqNdSKdtHMSJ2Qp1fE%2BDJi6a5qgwzDyKQf%2BvDudRI%2B9rg8SWqaiosQFRRIH0ZiqsonpyU1ysUHz2DYUpd4UmelXQEa7OFse2Qtv7KUTFGOw9m5Vwf62bN4QxMOxcUgRvZvDiI7vMVuROLII2vYdRGCfYYhuY%2BUwXBThvGyC58WkQ4gR56JfwrfLGIR7Zm3VpMOLc6M0GOqUB6Gbvyz0Qy1TI4wEmojrU7pEDvnMJ%2B91W9fAzonpQXVinDriRgybY2gkjj2NtpZXE64crLjV0lNm94keBNsZsWtwidFrQ9sqSn%2Fazo6sRrPHThO6YgfaDoRaCg8GFkOH4LWC0qaVMik012VIKUu7zuL8MiTRlagPhNnLI3KkqLIIge8CETDS0rqusxYPpXKZkyFMb2n4tO7bYTFBnzudY0YOzotlp&X-Amz-Signature=6f189c4b6bfd31b39a8da28bce55b90c4226a8964beea9eceac113dc0399f5f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PK3L4DK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIAijmMuYRKZ4e0A84xfMwssTg3h2qqNISLYdONCtIVKjAiEAnKdY0XkG%2FdA7G1oXOe%2FvbUtrpqW559hmQ4HZCLUIxawqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCpSW%2BMV0bm6LBROxircA1EDkcqVR9g8byoqZn0gXoSLM70A9i7twvJa0IGC6NHOaulOVMMf3nhw6HjDGYnxl0h1bIKulN9nrjVsUaujyG%2FjhTtXCIOyCOPTNiVUklBViydSdR9UGDgWcP6EK7UdF03QoKJb%2FaYQ5ukw%2BbG4xGwTDoUZRTwz5ugetHmFajbwQmD3hRhZDuSYHnnY6EPys11iYgUjEB2bt%2FLQvYF7bpEZq9ByHLTMcwqZbuFIa0DeahA0skwaop%2FVhV1oQSAPmnuARLuk2YgO7VMejdOhxA8%2Fp514bxUzavLuw9v0KRfU97gmZq4RQsYISPmFUOjoYyh1y%2FLhhxAl0Jnba4R%2FfGbCGIOd6%2FUKZYJTso2dRsQ16UDc8r1wtOODdKWuYuQYK9rAVQRzjSFEC7ZyfOjEAMIr7%2FJgsJDRyp6tjgp42CCkxiB27Ypgi7lNAUjoXqNdSKdtHMSJ2Qp1fE%2BDJi6a5qgwzDyKQf%2BvDudRI%2B9rg8SWqaiosQFRRIH0ZiqsonpyU1ysUHz2DYUpd4UmelXQEa7OFse2Qtv7KUTFGOw9m5Vwf62bN4QxMOxcUgRvZvDiI7vMVuROLII2vYdRGCfYYhuY%2BUwXBThvGyC58WkQ4gR56JfwrfLGIR7Zm3VpMOLc6M0GOqUB6Gbvyz0Qy1TI4wEmojrU7pEDvnMJ%2B91W9fAzonpQXVinDriRgybY2gkjj2NtpZXE64crLjV0lNm94keBNsZsWtwidFrQ9sqSn%2Fazo6sRrPHThO6YgfaDoRaCg8GFkOH4LWC0qaVMik012VIKUu7zuL8MiTRlagPhNnLI3KkqLIIge8CETDS0rqusxYPpXKZkyFMb2n4tO7bYTFBnzudY0YOzotlp&X-Amz-Signature=22e70e99064f40fd8ed3cd67086d4c6b989558921453ba8f93b1e9772cf12ad7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MRFIKG6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDaZMQI6VrmvXNPvwiA%2BzLKI2GmNXTh%2BmPN%2F5SAgvU%2BrQIhAOuq7d7W%2BO4SaFkZGIbet%2BoAVSkM3E6J60GFuWy6vC4NKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3xP9Zf1L4%2Fvzc9SIq3AP7fgFxLQruXPadf9ekM4chreofLiDkEWGa3y%2BxEJXu1%2FrZy7WZTbpOBVOBkNPMM5O3GdooWkthbZ4pFVyvieDxlj%2B1DnKQAYew2BCTbhhEX6DqCFVtKieowdW7%2F4lw0D9TwNbCqNIKiMsEUuxkKxIjiOByN%2BYtBvEC6OHZHaaqlEM6wieX9boSohmmd%2BY0W1iMrHhP8xR1%2FV%2BvX4VddlEka0t8bb2bxzuAdDDgPZx%2B4cLyrB3ZFkHD0%2F%2BsWnTFbFJvoR6Tk6U6dBhfPW2WqkrzOkTOWNE1B%2F%2F%2BKvl5jVambGWjO3wVp5lsyhGDdBKoE7YCF34WUDg8zC7lMYZbe8Tpwm%2FrWn5Jv44DughN%2FuOPSMIXxnSIQW1tkvzX%2FCdwfV4USvjCzZEmCyFKFkHgWINu48MGwDWUgb0QC6I5SLnBccqLx9o8wI8iDCOEa%2BgkydwCIA8ux8GBS19pBscQkaePkNYTYGJGKE72E%2F%2FkodFjY3jzjM5EvpCBS%2Btjq6UHbt6HY%2FPXx1PYVRYPOusKZadJIA90cgRjvRNOrCxODcL%2F3AT5uEhGO5rnO8XoWQOiY083Oq3B8rS7jhjix2czsSCG2e4HAKiMrOPS%2FpSOngN4jbrrLd76Dh5MzKahSTC13ejNBjqkAezRRRj%2BGAXm0R9CIx4oyrlNNe9ShaiYdf1fFq2POMVcjeCbCwkZta5VYHvOATzwBLLC%2FsgWA8U98bjZ6xlbUSlDThrxzTMLXo%2F6DEv5cgquc%2BGbXD9mIsRCdQwMYeDOvkArDR0ywhjkSC%2B1kS5Aoa9VFuk2%2B6hywDtw6ui06I4krTeFI4l6%2F5DpDjJ5vyukSCF9EQYpRqzgKG9c0WPelRhCQEp0&X-Amz-Signature=6d4f1c42a4346dde90bba94ac6027efce6f4dd301e025d686a0e33fdbefee7c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVK36ADW%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIBAx3jtP0bLunbfY%2FsSXPdvkeGZTUczs82VeYNKiv2%2FXAiAXmJ27AwoLqIiZ04Ek9hSdN1kICysGvFv%2BJJZCJZAOcSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsi3dI8jKMwce62%2BQKtwDc5FGP7i6jMuFMOJMoa4Ercd2dcjt061jybUodbDfGho8YZmCuJpuMvW0PbV%2BtguYd8pg0Qukrc8aEJBGPMi55AF21RKsGY8MkFj3tn5Cpjuk9Yl%2FEpzeDuvmLXkbMNAH%2B8%2F5kZypEOG%2BfQMQfQfSWv9hStUSrxG1BPdyaLfmz%2Bexk7jwl4Q9fPGb2rQEHQnEbrs%2FI9ncxQVGFh3WTnlwMjKfPCk6Po79GF%2FNB%2FKOrcTy%2Bhce0sS7JdY6LU2erAGXTkgfXhUmNMK48Kbn%2BCgqszrY5l8UDnEWkRtxHfcT%2BjaFJuLY%2BSHdxFJ6w%2B3c2LhlzR6pF9ykcmEansLd9Ss89ihqZjBVNAQWLcx5yc%2Fz47Yl%2Bv741FJ8jBQd84YqsK090MTuY1Y%2FwNEbkYxI4jbIaiAcgTLZyUNOD8Gxyk3l2o%2BBJfetPpG00zyWOand2Ngy2dhGRYQrBnfkMu%2FXmURze2z9kg7ffVgBAPPGusJeqWiCl6n%2BRhTe9hrAw0Pz1Sq%2Fy9oTrJb%2FgJQOvrF0xIt1cBa9uTNxaOHi%2FmZDju3Je3Rgm5DZgpu1YPDwWIbun2410eaECt4x269cLWIq1xMRtuBmjjh%2FLpIr8ajodN5evcEMM30%2FUpV2FRmM0iQw9tzozQY6pgEODZOQ1O4gf92XmQr3r88HQpucSoMKfAqy83HWYzwCNQ%2FgoyT9wscNYsQojBX%2FU3VNPJo0zV8OfHr%2Bc3%2B2Nbs7LyLzPmXexWI36thw8gKilm64GQ0cUmdJutB5fQfGTyYkkjztppkxynZApHcUD13K3ygfcvgXLFTm6CE7y3ePU4K9DF516hbOmoMAxkl7rXkmk1UL80VBad8EpgvKmwGN3ImRiC4V&X-Amz-Signature=4950f686489df880d8f8b1238466ce1b7b89cf1f7fb7ddd56414673cbc6930a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VUG66HY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIF0gZcOfPTxL3rYdXQcPEFfz7RS2roojMNeQUTwDr4T9AiEAyx2pCUygd9xFnzd%2B9ywO5GoL7Ho3LPItdSRhch5TrfIqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7K8MezRveVYkgtcircA05HGfUnF9lEaB58uNMknZg3dVEI6wLr8%2BeIV3nDqjUOEf84lYAihTeuBefPMClcWBmcX2wo8JDxSUbHNypueyv2Mq60107D3bJiDGGO%2F%2BGsJJbnVmsbtEb0si0AXxmCvgIEejf5ci9otI5HrSi3%2FAostwd6RJjVHXHdOjMlk4vNY0hmlpQt967mxPpnTIVhrj%2BpsuTb8y6u3GHjG%2BrsXvv2DD1IvNqLnCskGRlnpg%2BTRniAyR0bL121ToHKestBaF6wJj%2Fl1kHINbB%2FZlrdgfAFvQmLSLYIrFaRhAY3vOwQorzz8AcLTd8ftRjX%2BjLg5uoC0A7yJvxRE%2FMnQww4elRne9SzV0W%2FACaC9HrucC%2B1IfXLCVo9n%2Bh9wnHPGydayaahqzLePlMbMNBBSVRXsBPw1OkpmER0C247hS7ks6XKQK4i%2BInsOoylKiIY%2FfkvpcE4GzVYpzM%2BKpoLAdDQqvknr1kWS5tWyCpDgeDc3TSXK3u%2BOsWJyDhOHuU6kvVpTjxYeRul5YMXEickkZKr4YO%2Fb6dJp5TL1OBjaIrrN3bcDco6%2BUWFtktn1DFeS6mEjqk0Eeob4f8qkZaUU4UaZja49%2B%2BLcTLT7%2FDEBYo0f3MTqgS25lpAPjdVn26QMLjc6M0GOqUBLdqVtPhVbT3k8AkfG1HZQ37fI8OJrXof1X4EfAxKzXdgLDGzWgpJ3bBS%2Bn1tQJTSzlYG5EZfxoI%2BBYwNIGIbQpnQg1V1vSF1Or6FBoqUfe6GLlHGM30GFNSfHlxtVWRk%2FYQVuYK4ZY37Dl9kuVvyoheOlt4SpnGMPGzQsggLMiE6TLG6j3JCqRpKGVWIJpLD1v5EOK7%2Fv0M0bgvJCyOA0kdzND53&X-Amz-Signature=fc02cb212d38c5eb93eaa2da0dad32c777add1f9a138a5fabea2bb77e9095d1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X5ZZK7B%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIHitvd%2Bk7fjRqzcQ62heEG6yLDty0KP%2BNVLbsKOD8M%2BfAiEA5qxTatrnzeIep6bYcFzcasSSizqGdeuWixSj%2BuYkgvAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2B8TPN%2B6%2BzXOK2q4yrcA3X%2BwxSBGWYVLiryB14THQobSEk8VUCAjziVbphhxOPAr%2FhElmsl0euzcN6aOfI92rI4OtXgsUutjugg96Na5NgZunwmsWp%2Fdfn6%2F3BGicFQpG%2Bs%2FQbj6fYWUairFSelYWb7vPKA%2B1YZd06UNDLs95NlCwwx2GLOrVE9aqLIl43h4W22kSmbr2qSY2BQn0Bm2q4VNPFRIBMUPj5p9sigU429o8drZbytgrlOij1YTJpaFXiCW291zlRz7CpW0bZx%2BX3qpinJyvpR5MfDe5JbRhUGB6NpXhLAspnz7nBdA%2FsXO9a39iW88oqHl%2BJeCEprZyv231CwTrwy0w7XOpyK1cAagIyakkXp4O1JddhLKT%2FuskcY6SnGfFWAU7D485E%2BoMWsZMQvfqTzitN%2Frbsu903i9gAiLMBStjlQuGZD5QIyX4by9lbsp3gvLgvzm7u%2BbIfJerAg54C9CjJ%2B%2BSAu9l7FU4dXx6WRSLVfUrqBKgxltlNJbQt2VMiWkW%2FpZeBChAqY2Soge8XxSFK05xhMkaCF5DpTkrfWBSJEua2Z7fLCh5HcIa3eiFOkyWZgWNpsGwJ74IsPSWDrfRZRXK11W%2BDisqcDak2rG6XfvUhQmaQjNzfS3Wv9rbLS%2BioqMIbd6M0GOqUBFbLis8NSQH%2BwI1ylY%2FlyQGE5I8pu7g%2FWpJ%2FVv1EpXr6mlJoWk8Oq54AhLoAWcrz2QVdCd9bCPMJ9h%2BEODvhbyvv7QImklSD45kQfJsFWLnEOylbRizu9CLMyoWlmYXqREjcE1PyVdQO9XeN6daKXXAZHjLIhleadGPbmYZEyuO%2BKoKHTAB4mZqViXF38zghBW%2FQoHX%2BjcKoN7Z%2FgKPDkXPDxBs91&X-Amz-Signature=2a4e93fe10c1cba24e910de809f5738ea5c2254e9ec176a41fbf103755f93650&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X5ZZK7B%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIHitvd%2Bk7fjRqzcQ62heEG6yLDty0KP%2BNVLbsKOD8M%2BfAiEA5qxTatrnzeIep6bYcFzcasSSizqGdeuWixSj%2BuYkgvAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2B8TPN%2B6%2BzXOK2q4yrcA3X%2BwxSBGWYVLiryB14THQobSEk8VUCAjziVbphhxOPAr%2FhElmsl0euzcN6aOfI92rI4OtXgsUutjugg96Na5NgZunwmsWp%2Fdfn6%2F3BGicFQpG%2Bs%2FQbj6fYWUairFSelYWb7vPKA%2B1YZd06UNDLs95NlCwwx2GLOrVE9aqLIl43h4W22kSmbr2qSY2BQn0Bm2q4VNPFRIBMUPj5p9sigU429o8drZbytgrlOij1YTJpaFXiCW291zlRz7CpW0bZx%2BX3qpinJyvpR5MfDe5JbRhUGB6NpXhLAspnz7nBdA%2FsXO9a39iW88oqHl%2BJeCEprZyv231CwTrwy0w7XOpyK1cAagIyakkXp4O1JddhLKT%2FuskcY6SnGfFWAU7D485E%2BoMWsZMQvfqTzitN%2Frbsu903i9gAiLMBStjlQuGZD5QIyX4by9lbsp3gvLgvzm7u%2BbIfJerAg54C9CjJ%2B%2BSAu9l7FU4dXx6WRSLVfUrqBKgxltlNJbQt2VMiWkW%2FpZeBChAqY2Soge8XxSFK05xhMkaCF5DpTkrfWBSJEua2Z7fLCh5HcIa3eiFOkyWZgWNpsGwJ74IsPSWDrfRZRXK11W%2BDisqcDak2rG6XfvUhQmaQjNzfS3Wv9rbLS%2BioqMIbd6M0GOqUBFbLis8NSQH%2BwI1ylY%2FlyQGE5I8pu7g%2FWpJ%2FVv1EpXr6mlJoWk8Oq54AhLoAWcrz2QVdCd9bCPMJ9h%2BEODvhbyvv7QImklSD45kQfJsFWLnEOylbRizu9CLMyoWlmYXqREjcE1PyVdQO9XeN6daKXXAZHjLIhleadGPbmYZEyuO%2BKoKHTAB4mZqViXF38zghBW%2FQoHX%2BjcKoN7Z%2FgKPDkXPDxBs91&X-Amz-Signature=fe80f89f70d21e929ee8d9607be0604872709a26992527041d2fb4b311893d3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQJVIRRK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCJmiNwbPkk2sZvMV2WXltUlFapyuJhg1uWBWzd60xmYAIgdhI4ZtDeIGbr%2F5NbC%2FLyzX6OuOnMI3SaNprJ5LUJjNUqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ1GAaY%2Bg%2BB7m1bKYCrcA9IzmvAhx6a5QXmqoQdMcEmtKaigOYiEd4mTVKwLmeJZxx6yz8J8rQIjz3xr7f%2BeWowNxpjIgt1QFPtfnzwa7NlkDwtjYxM9O5skfZXDf2Um56gafe3RXVeI8Kwvm%2BbEJ7MW8pt71r%2BK%2BuyEjMEkOZvx%2ByJfQBqGwIiBXTr8806I4nYKaYoqzuvqAs9t8lpEwzcppcaZgbQxQV%2FtG3p660b1YRa%2BEIRlPSMbN8RAOQoev%2FkMY7c22hdJSKTvA38U4y%2FzOENhGOMC%2BUrlJHyrC1HA3Hf04NfP%2FfM2Qi%2BNBw4%2Fre8KT0Y%2BlzoKbsRIWDo4DVk6KOzm9FeF3F%2BcYzdOxZty0Fkv9nwrpmt%2F0qu1n82%2FYw1%2Fnlid%2FZq30HWpRHe2xkd%2FlYIp6e92OnVy27owiEm7aNDIuFAUosJnzNN1eBz5m38t8xcHQ7repF%2BzfZ139Xlpp4E8H8QPUKtHy0FQ6E%2BQIdsXfguo%2B3niUqv3M9wsNv6qow4c%2FUSFQVraINywbMVheYcFewTvHOKBqMmkwf592%2F50acGzU4Q1i9ZDeJ0oBXZF5nBmizXKx3adm%2BPtjF1Ptm1lpTckYcZqQvNI7K6d0hWWZLBtk06pEH%2Bj%2B6RIvBaHl%2BW5mRQiE%2B28MOjc6M0GOqUBpEBD10eNFo48Y8KN2Gz01%2Fbvbki0UQ8jkuZiuzNeCRaATEpG9SGp137VoOfNhkCn59%2BxPpuc%2B2T2Tu8SABVCz2NYOnmSZv4gJXoSYYSzZUVJBZDLOyGGP5up10f9crRrgjhY0FKjnRRLz7dbroEnZ3gDB0PXiPVCUIUcSafw5ElchThhS15DF5jHJ5huzUwynYrLXZ21A0Sf6hn2FKx8mmKjSk4d&X-Amz-Signature=e560c371b3aee680f4e0df6eeeb72df08ea1c4ad72ffe037e548f5e2149d1c90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ERI5QHU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIGWBORkAu6yOb1A8l0wCcZ4wQeY%2FfssQ15FOFPBkVzoAAiEA%2BJ2yCW8c8HDYvaibQoOV4HtYs581ZCHmU814YBLXOHYqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIKK3zzmCHLZTO%2FzLCrcA8cTC7EAFccYvoAe0IsXAORroj5nS6wQrT7cLaOxvSzyrrghb9iVULuL371Sf3URp%2FUerpQhPybeCnnphMmS37PrNn7xOB2WcqXnMH0hakSxCaTUDTHp3Pwj%2FzLvDAJ5234wNP7gWrJGFiCbkDJde6HoH%2FXbfLHD6J3M3WH8KBva34A0%2BvoVmK%2FeQX%2FZFj5CW8z5zGZ3qdvP6G4kB8gUHoAdm4Ir1E8tTh41ZePXQq8FATBxDTJBDwCZcSJH5o2jKMZJEj4Us5GNtrZF13qKSwT4s57nt5vYf5dXNQDryL8HIpSEaudijmqLRB63n9Yj8uYNejcT8zfUdceobAse4H8xJRogGagXNTQkQhkO5Fv2xxuS9gbbw1UBB8%2BIM2K2X8mfTzcbPlrcDdHAy75pUz4%2FSqJiNVmxxKGrhs024asAW0cQv3eOYdmFJwbb%2BmMfY1%2BpFCnSuxcFVYob1wY%2BHFAYn0pDKuYPcKcVYJw97Fn8bonEumC6%2FjLOw5YhN6vo8lbj%2BPsvBIF%2F%2B21sAN2BQlFtFB4h4sPK5q4YIIXVwlz3TKeBf5MZ4IJTp9RuDByLS1FIbQp3IBrjd9R0o0mMPpQxKbwlWT5w7itcDv8yAb0MmTC9QmnK69aXG53%2FMIbd6M0GOqUBbzhwt5Er7iX%2FShan%2FRVEv0LOO3AJ0D4wArbq6sjLdAHz6cP4aW9PE1nd8c60BtYqMtWEn8hf82qph2hO%2BDHQWP6jZ%2BLDzqFFptrUFl%2F2WLJQVwHkELJXjn%2Bb2KP2KsutrVpcsegw%2FFlRK%2Fko4oyXZCUIrcCMriUdR2nvhpZD%2B3bx2JIdwuv9FtD%2FMtUKX6Duyd3W5%2B8qDpkHrjzupwfamWM7sriW&X-Amz-Signature=145fe09521e5ca60d7a488ff0b668f2cb993c81c6ddecfc2d197112763a95ef4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ERI5QHU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIGWBORkAu6yOb1A8l0wCcZ4wQeY%2FfssQ15FOFPBkVzoAAiEA%2BJ2yCW8c8HDYvaibQoOV4HtYs581ZCHmU814YBLXOHYqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIKK3zzmCHLZTO%2FzLCrcA8cTC7EAFccYvoAe0IsXAORroj5nS6wQrT7cLaOxvSzyrrghb9iVULuL371Sf3URp%2FUerpQhPybeCnnphMmS37PrNn7xOB2WcqXnMH0hakSxCaTUDTHp3Pwj%2FzLvDAJ5234wNP7gWrJGFiCbkDJde6HoH%2FXbfLHD6J3M3WH8KBva34A0%2BvoVmK%2FeQX%2FZFj5CW8z5zGZ3qdvP6G4kB8gUHoAdm4Ir1E8tTh41ZePXQq8FATBxDTJBDwCZcSJH5o2jKMZJEj4Us5GNtrZF13qKSwT4s57nt5vYf5dXNQDryL8HIpSEaudijmqLRB63n9Yj8uYNejcT8zfUdceobAse4H8xJRogGagXNTQkQhkO5Fv2xxuS9gbbw1UBB8%2BIM2K2X8mfTzcbPlrcDdHAy75pUz4%2FSqJiNVmxxKGrhs024asAW0cQv3eOYdmFJwbb%2BmMfY1%2BpFCnSuxcFVYob1wY%2BHFAYn0pDKuYPcKcVYJw97Fn8bonEumC6%2FjLOw5YhN6vo8lbj%2BPsvBIF%2F%2B21sAN2BQlFtFB4h4sPK5q4YIIXVwlz3TKeBf5MZ4IJTp9RuDByLS1FIbQp3IBrjd9R0o0mMPpQxKbwlWT5w7itcDv8yAb0MmTC9QmnK69aXG53%2FMIbd6M0GOqUBbzhwt5Er7iX%2FShan%2FRVEv0LOO3AJ0D4wArbq6sjLdAHz6cP4aW9PE1nd8c60BtYqMtWEn8hf82qph2hO%2BDHQWP6jZ%2BLDzqFFptrUFl%2F2WLJQVwHkELJXjn%2Bb2KP2KsutrVpcsegw%2FFlRK%2Fko4oyXZCUIrcCMriUdR2nvhpZD%2B3bx2JIdwuv9FtD%2FMtUKX6Duyd3W5%2B8qDpkHrjzupwfamWM7sriW&X-Amz-Signature=145fe09521e5ca60d7a488ff0b668f2cb993c81c6ddecfc2d197112763a95ef4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQCUPHTK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T055428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQCwcpxKCjXq2JVE5DJO6y%2FjuW1ZcjHVJCqz7B0tzuL%2B5QIhAOdrqXZ6ytXK%2BUQVObRA0XN44k%2F%2FL31hwx1WiZ5X3Q9zKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNH56IQW%2BVR5gaFcMq3AOjWbttwQtoVPd%2FaPcgfUO10BEJTW4lfq6podsYB0LiWQbvJ4WqBtpWfzB51vKJnN7VEyBnQjSyquC%2Bn62dJvKRqxliAe4CU1zJbiMCTD48d4c4dduzeZWrxlAkADrGnBGipUnHIaMPYOS2rLTp7Ymu1UxsAMmRhb34kQBA%2FMtoJKx9qzROqvhDxM4iY7aHNflzxegsQCaz1j14SQZvHw9054FXS23JWab8ZTHFSCD3UKtZaI22P92Vpb9lBslYmtwCVir%2FlAOvBI9VRr30fAKYyWMEvjXhRTUdkRck66ss59DHhy5W9ClNsOE%2FV6JEUZdDmSH2EuxcIyA8Qc8Qm24tWHgDJlD4%2FZemPpSC3qpU%2Bp%2FYLGLWqCivxZAd4NBk2EJW6YccqapzzDP66krEuGih9ad2NCFUwLolJqkTLN9wQC%2BLnza1iQuJXP2aQlkatBeQBWXiZqo%2BFJMgFqEm1QyD4gK5pI1lWGyPR%2FYInsCfa0fKWe4mOiZnCc0lQypEiIlsF0GFxGklJLV9kFBSiylgx%2FxE%2FJTWOcM5P5Qqa2wMtZ%2BlkFrVYNLOJXEClqQ6tITcD03dfqjQGhQjhSYcQkFWX2Jo%2BqbPSAx74yUys4vhJz7Dm%2Bfx0NbDRwQZNTC03OjNBjqkAc1p0BHQMtaXre2JeM%2FYxlz8CcfTWul32X8aH%2B3eQP%2FP6mbDm%2BH5m9X%2FW1Ex%2B4cM%2FlkOYbeoOauMfTAE2RKvmcTcTLuwNx2FUXJG0Hp6y%2Bb3Gl1pmKBNmsG6HzlphCjske%2Bc0iJji8gQFzoAIQ0j0BTDkoXuacIqGTA0mW5zWUrsI2vWJfFQXQo4NaycCE4GRaF8D6w%2BIjRmBwS2ce7FE3R6VkFw&X-Amz-Signature=31d648550d7c66cc4f1a08ec908fdc4d2adff254b00449fb4b6e7e6f9e786ae4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

