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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMLVTFGU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDUIewxjmjdJhMjr3pUK35gDnKDsF8dgCUk4wgH2AuvBQIhAOSMPVEBPCAT15fyjhG62mtApl4s0pNmQOOQZcYUN7Y0Kv8DCDcQABoMNjM3NDIzMTgzODA1Igzs8ATMN%2FkJpi7oj1Uq3AMyZtN7ryjoYLCAZZBje3WLQRcez4lR7ArVSq96fLUelvuowsu50n2s20uUNme8660WSZNB8hHOeISqSrYngHPXoHXrVbORtZTr2UU4csxNUGHzyZjVz6f7CSEWP17h7KUgkzDzebXjcDJk2LWZsGwY82f45epCmABMzZKTjF1QdD74K03%2B3t61yL0MalDTnv3ArWGNSCuEIHGCSQzfdjYTfrS1rIjpWHDV8p5C%2BKe1bhq47SRzNfGRoMlup0Peh1%2FG3Pt3evWQKLuwNHpfxLO%2Bcl5Mxxx6ZQy%2Bn%2Bg58Ih1qQav%2FLm9GXjNZUef7fcMSvL6l7zyxYUjPBBZ1fHJ2iZyZ3WPgZXQ1TSFQohpMteNGTVzb91RqQuJOwgjHc31EXeFV94eJCS8kJkmbWBQF%2FEvFMu7LmXsMoxivP151Nd9oHgwv46E%2BypUIbpQnzKRTAhgAulNE3M7fE430atKjSN2ViUntpIakWMCjMFS8w96X3xzPn0j8cukcVycH7Hmx280kyCeCfOxUhCDsS4Boxki0VvD8jxXspe%2Fz1phYL6dSadnC7m2xLCCQSrEhlBXUz46tZY888T%2F1FdYGYyei8MXUCWAo77mJyyeGbeMWlT%2BFAEYcxlCfL66%2FNnJKDDDjp7PBjqkAVjBPExgPrC5Bhlsu4vjLBPHlHI1x%2FageXth48U%2BJpQZ3REirjOawyMB00s8QvPrmW71bFXdzvpi4Gyy3SmKvPRKMTfcafGx2Nyol9ZcBb%2BeBSg31LtNnsKPti8uZWx9rbjzJPWsKYz%2B%2FBiI%2FXaKdJmwKVDdewV1TtRS6TL9b4XAFmnPnUHajKwBbdaGhsU%2FgoSPZgyXxM0DSB9ZGjr7gyYlsxPm&X-Amz-Signature=2e8d70dfad153c9671e20d7c17e7340d28acc34e64b43a81a346ff91d915cb92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMLVTFGU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDUIewxjmjdJhMjr3pUK35gDnKDsF8dgCUk4wgH2AuvBQIhAOSMPVEBPCAT15fyjhG62mtApl4s0pNmQOOQZcYUN7Y0Kv8DCDcQABoMNjM3NDIzMTgzODA1Igzs8ATMN%2FkJpi7oj1Uq3AMyZtN7ryjoYLCAZZBje3WLQRcez4lR7ArVSq96fLUelvuowsu50n2s20uUNme8660WSZNB8hHOeISqSrYngHPXoHXrVbORtZTr2UU4csxNUGHzyZjVz6f7CSEWP17h7KUgkzDzebXjcDJk2LWZsGwY82f45epCmABMzZKTjF1QdD74K03%2B3t61yL0MalDTnv3ArWGNSCuEIHGCSQzfdjYTfrS1rIjpWHDV8p5C%2BKe1bhq47SRzNfGRoMlup0Peh1%2FG3Pt3evWQKLuwNHpfxLO%2Bcl5Mxxx6ZQy%2Bn%2Bg58Ih1qQav%2FLm9GXjNZUef7fcMSvL6l7zyxYUjPBBZ1fHJ2iZyZ3WPgZXQ1TSFQohpMteNGTVzb91RqQuJOwgjHc31EXeFV94eJCS8kJkmbWBQF%2FEvFMu7LmXsMoxivP151Nd9oHgwv46E%2BypUIbpQnzKRTAhgAulNE3M7fE430atKjSN2ViUntpIakWMCjMFS8w96X3xzPn0j8cukcVycH7Hmx280kyCeCfOxUhCDsS4Boxki0VvD8jxXspe%2Fz1phYL6dSadnC7m2xLCCQSrEhlBXUz46tZY888T%2F1FdYGYyei8MXUCWAo77mJyyeGbeMWlT%2BFAEYcxlCfL66%2FNnJKDDDjp7PBjqkAVjBPExgPrC5Bhlsu4vjLBPHlHI1x%2FageXth48U%2BJpQZ3REirjOawyMB00s8QvPrmW71bFXdzvpi4Gyy3SmKvPRKMTfcafGx2Nyol9ZcBb%2BeBSg31LtNnsKPti8uZWx9rbjzJPWsKYz%2B%2FBiI%2FXaKdJmwKVDdewV1TtRS6TL9b4XAFmnPnUHajKwBbdaGhsU%2FgoSPZgyXxM0DSB9ZGjr7gyYlsxPm&X-Amz-Signature=2e8d70dfad153c9671e20d7c17e7340d28acc34e64b43a81a346ff91d915cb92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BDBVBVB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCwlE37%2FjqkxQtuu6wmhhqcS17wVLUNmzYdi8iRrUXyewIhAOxoUSi7Qpo%2BbsgXJG%2BQ09udt0HnxqkUz2JhdsXKkIFTKv8DCDcQABoMNjM3NDIzMTgzODA1Igy9eNtJHnAy%2FFI9jEEq3AML2iJUxCmWff2R6urqhbeB7SxQdyKgzyYvSSDjvoVk2W2TuSxoFYC6rl9jjHOmhF4EVc6LTT1BOjBP20%2FseJVZiGxKC1Rdw23ObTdxErCRVLqMSn%2FA0e%2FexvvLq%2Bd9gkjX%2BToPcQesu7SCxg2Cq4gzSdcs88pY1Bqo6LjdmFfD0TP2AIT3Lg03BuY%2FAaY7Wqo%2FRFbY1t9AuDuj3F45p%2FbPOTmjXCS4ZpxH9%2B3%2B9A0zdeAzO8lSKJg7NgftmKyfUZKVYsWmBVcbQGHXk1X6gLSTsdtcdEoAhYI2KXN9c0sFUkePvvtfwfwOMHolH9nQ%2FFy6sV1CQ5dieWxIDCuFEeplFU8ZFND7x5jmhIG%2BRv56pmmUNPCRxhe2%2BXuCmXmHSRYh%2F4iZOcj5UGuNLKpRPiqE5g7NOLVij7LNYRRw1%2BaQpUj5UdB0jKqpbBjWldilEvcedrp3Uayfhwnx7JJJV3Ts%2FU1vm%2FnlTnh7EfZZhQ7IThDXrVa6twvD6QNZ1dT7mBlalf1hA46BZxzlwNVgUpwKwnDibF3VtZMJRkeRY4y%2BmXkfYqop8QqPY29QMzIHMOh2gvwrZ8oYtoVyxCLP1SazLYK8ihFfra0NRtT%2BHdOUnuLY6G2voS2muvDdEDDhi57PBjqkAbtlUu2ITHEoIkhhSp%2Beo6bnjdME2%2BQP5zO68lPahCZCyYDyOzlOcQmf32BfpB%2Bkk1oZ8pfT9oAT6IqNiykD0rfzddzD9wF%2BsHLEJYfomlIFWtOf7afetFzclt7YJmL7ZaBG4f2JcQC9kbwOec%2B45R5FqZkphNzOHeZuzPNtoCdnA3dhIgPSRa4bjwpa70dt2LAAQGskTMrZYIx%2BL8JRprv4qm3S&X-Amz-Signature=5d49290351572c2ce082c3c41f3d60ac9db837d7eb18a5a4e9c145cb8dc632fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRNK4DLG%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIENMVgW7%2B9ju7Ig5kg%2FME74rhhCphulXfeP7VITwCMVdAiBDQad6NodS67GB0cY0mIlS3a2ElAJiVAYGodFZrRHV8Sr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMeTtAi8kVwdup4U6OKtwDgceQf65xln7eEtJbRzqEgxSF5t425wniQUOqzVjzzrRenzaeRg0dd7Tc7AkljSKMe%2FE5WiwH4K9a6CrYSxUMOVjcZYY66zWVrFo%2BnO39dNnIvnlozalm0VBRdz5zqqSwXWJ9492hGM8KR4G1PODILs2cL%2FOWpaY6HvfQPoc3%2F3906OCmdtgRXux8EzKFMTK8FZpJm6CS8QJAMwd%2FfjMClknC%2BhLS4nRmr3EQPf9zcV9otiDg9M2%2FrqY%2BW7Pl1sIaxV9fCypSyXywbk%2BbyVQi1D44aVMh%2Fz5c4KFL633IVGbgFUq9qb3IoL9E5zcsfxoik6gyZe4GyxTyfxRThYJzWmWyL3ruwP2b21xGocBqtpt2osk3SPkqYvQO2I2p53QY0TKILgRfpi35eqT71M10kASio7Z39PLTdGB4%2BiN8z%2BwRMi2psdnoWIRd72or5Dc2q57Lpbi3s8wqueGPycgBIpZM%2Fz43rGni8jGugMmVxUidzAgFKjQ4g66%2FicQzlPZgqB4TpgKW7saeBQg0GSbm5Tt3pe0g7du8jHYy3u8qJkNs93m0iOGXEIrgp2%2FZH%2FsNhB0g7pCP2koZNhep55%2FsfaGeLCjLEycm1h%2F6l2ULWCIC%2BpyYlBmUTQw5vj8wroyezwY6pgGVmjmWMelr06BB9GrMpRvJsq0UwqvYy7MmL2XdLywkI%2BVqJoG1N5th2xrUTbrmJ6%2BQr2TXZOfwXgpX7epoU72iZIz8vQoxkFQcHE1lObY2YuXk6E4d37ckRzadBSQkrqK7bFv9RldB9Ss99%2F8FpZn1sh0%2Bhd%2BlXfIeM8X6dJe4x1CE7TAdKmG%2Ba21GAy%2FSzNmuhU9ZUbZ5rshqFQ1ifVelJ9bOnGjI&X-Amz-Signature=bdd7db7bd1c3b22deb79771c791d6d784ba6c89d919b4b7bc6e796b446e8e7f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRNK4DLG%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIENMVgW7%2B9ju7Ig5kg%2FME74rhhCphulXfeP7VITwCMVdAiBDQad6NodS67GB0cY0mIlS3a2ElAJiVAYGodFZrRHV8Sr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMeTtAi8kVwdup4U6OKtwDgceQf65xln7eEtJbRzqEgxSF5t425wniQUOqzVjzzrRenzaeRg0dd7Tc7AkljSKMe%2FE5WiwH4K9a6CrYSxUMOVjcZYY66zWVrFo%2BnO39dNnIvnlozalm0VBRdz5zqqSwXWJ9492hGM8KR4G1PODILs2cL%2FOWpaY6HvfQPoc3%2F3906OCmdtgRXux8EzKFMTK8FZpJm6CS8QJAMwd%2FfjMClknC%2BhLS4nRmr3EQPf9zcV9otiDg9M2%2FrqY%2BW7Pl1sIaxV9fCypSyXywbk%2BbyVQi1D44aVMh%2Fz5c4KFL633IVGbgFUq9qb3IoL9E5zcsfxoik6gyZe4GyxTyfxRThYJzWmWyL3ruwP2b21xGocBqtpt2osk3SPkqYvQO2I2p53QY0TKILgRfpi35eqT71M10kASio7Z39PLTdGB4%2BiN8z%2BwRMi2psdnoWIRd72or5Dc2q57Lpbi3s8wqueGPycgBIpZM%2Fz43rGni8jGugMmVxUidzAgFKjQ4g66%2FicQzlPZgqB4TpgKW7saeBQg0GSbm5Tt3pe0g7du8jHYy3u8qJkNs93m0iOGXEIrgp2%2FZH%2FsNhB0g7pCP2koZNhep55%2FsfaGeLCjLEycm1h%2F6l2ULWCIC%2BpyYlBmUTQw5vj8wroyezwY6pgGVmjmWMelr06BB9GrMpRvJsq0UwqvYy7MmL2XdLywkI%2BVqJoG1N5th2xrUTbrmJ6%2BQr2TXZOfwXgpX7epoU72iZIz8vQoxkFQcHE1lObY2YuXk6E4d37ckRzadBSQkrqK7bFv9RldB9Ss99%2F8FpZn1sh0%2Bhd%2BlXfIeM8X6dJe4x1CE7TAdKmG%2Ba21GAy%2FSzNmuhU9ZUbZ5rshqFQ1ifVelJ9bOnGjI&X-Amz-Signature=6fcfe32027f0990639aadd80d014a08456ca92f43df529cff9170bc129c40004&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVDXB5XU%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDdWnogRAn1arlRzJzC5I13XZd64FRMpb4982WumRwF2gIgJu0QH4KNN3ElqNgPtktWAu5wBwQOQ0Y6mGbRQCFKy5Qq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDCRbu6Xhihv76xu9xSrcA6wW7lrn%2BnmFxaZkYPdCSOHcTwTcld9MU4nHWsuxDtr2FQ%2B4fuJZwG9ikcrnT5wlznyFkm7py76hYGMqRACjPNBNHxls%2FAsYqQmFwUKbgoQVsl0LOsAordlYMTuvbJHPnrETe5x4QcsJNGQU7oLgMW%2B7zPy7Sqa1B2TQUfFfWisYc7OlZyo5T0fzM1SoHwYSixRAzQ3C45dOsTfMBsTMe7hEW2S%2BEXcWFuZIg1bzsDTynWoGYIIHTVDYY%2FtcbcWvFAMyuPyPx9G5AgMO6LroqJtIqdKY0TLFazY0bL3EGZMxTpa5FT9ozVcbZUEzU5nfa0Ch8aAXXzytf0kQXN2uAyQvkLe9FKTegHEyUN52MFuGdk%2FT9AufvCeX6S7X0tbAUDf3fD2LXqS%2BWrllwxK6zMam6EQe%2FZ4XcojGY%2BXEDvintJhPfRy0HR7nCqxQ5LgfOv6NaQkNRWBei2ug1gjr%2B2RmzRbqmRedGzJV1eaNfR%2B82z%2FFtDhqPpNmv4e10tob5oQsct%2BtivBeRTctEGdpLLQOIZL2avqzmQMS5kBiMX9TKG%2FBKUEcmMIj0MvL5AhGdt91JVFCIyIDyB876TIKjvUh1Gxfda7gjouccvOSIWI0GMRzu9awjYz4vuyKMOCLns8GOqUB%2FlL7j2xCSsbAfthnXL9gAsRh0bGpRneqn1m38O%2BiKdmVGO1O6MKUSq8yIR6UVPb84dztDaJi4UjR%2BoZpJpwMTm%2BbmXJ1iqvm1d%2B2UQbaS6fkCLgOCqz16tOaBrKgfN4wL%2BUmTKtA6rPFwh6BNQplVOx3DB8DnYxNcmChzUqpY%2BFwQ6nX1Wq9VkP2GIhATMsMqY0%2B5Ay7VNHSed%2B67VhpFT46%2Bz7F&X-Amz-Signature=1e1f178361bb001a4860be6e34f1bdb1aa86ddb405deffc86841153410e2319e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3ZOKZUV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIBAa%2FzaBvtarPYLm37r1tfc2AdbTXjAP14eit1V2UBSQAiBZ%2BPUrziq6h3EBxBo3rX9YjS%2BA0dS7ktYEUG6NIXKfHir%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMvViRP0bANZADR%2FWoKtwDRUX2mY6qaNwkkSHoLy71Mz8R%2B7Z0RO6WQUn6itxwqXKRWWaR7d1KRnmB%2FTFM8szsZqrVVZEd57ih1kjxFhsS7SfKHsIVR74hfKy5SgtVi9iCdj%2FtDb25s80AyIYYAkdvBPwFfbcLBewKABg6ux5T8I4JwhtN7YBkIcYuKbCg4TDUAnqrREFQ8FsgvufR2jzd6ObtxoRdbTFW1ey1yB7uBfFDrOMrlk3gVNV7nXTPK%2BveuYGHoUXgdMIm%2BcSFjvFEBGZmZa6wOE2Waq%2B%2Bu68xoZl6CB2llQ5EZXNRVIJBNMk8GbYqyQ%2Farud%2BOtbuQBYqYY7RjdK6eQdHItaKiMcy7ItCPplcSyFkvab9HuE%2FE465%2FUsKTRjSFKpEpbqKuTrO8YxNV%2FccIhIRChRK4oUPSReW7nAuO%2BYVWUyzqwYHz9IVSAbSgutssA2g7H6%2Bn6xM1%2FVAlLg7y%2FqT2Nzg4Jq9RlII4OKZsM%2FajEDTLfVILiklM4A4mWC0ZZvbBkHZIHEQ24C1RpVNcST%2FD6GFtGu9aorxmLcGn1O791XSsLkQMgyvZWtr7D4AXz4kbo0KYF5U8AItS7YZyXgV4hd9Jm%2FMJMwWAeWmUo%2BYe1u7xljXJIwu1%2Bw9e0%2Fn7PuZLEAwqo2ezwY6pgEqa3bRSGc2fZ8kTR7LwE%2BMHK1L1uOMWc0rh1jqwAXvL45pLUaguO8lygYcLpsdHL8ZRpvX1RwCztdEth6SMhSeCloJpKspb3wzNB%2FrbR5xlCqzzUBstb3jn1wSqQvUmGTEAPn8JGEdQad5b6F91AhFi%2Bs%2FWqA9KpGBHtDj4CFsTNcoodhFzyN0Ur6C%2FsDEtO4R%2BVhBPuWEWvE4nEyUBTOx0O0STOL1&X-Amz-Signature=ab56a8a4564edb03af9e6fa9487449267048bc5c23f1907b816b8b0256e39d68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NZWMTMB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDVXNw3WbDjPsizLMP0xNXD9k02XYiMhL%2Fa%2FiD%2FK6aXFwIgEPyT%2BW0Bn4i3UDFUaSgB3Mv4gUSCfNzQ1%2Bd%2FZaj3Sssq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDHhSVl5OmD6ULjB4ryrcA0X6xyWkMvLZM3vpv65Gdvjy2OiHaFhIHeyIF2GEiyXmvcvDmGUxikbSy7eyxwBx6v0iDRIecXB8vHChOyqC0XZBe9x35XuVx0ua8da59RA0SJnpLlwDWItR6B4jbqWAv97PJnyetnAQcagAcmjnXQWOAHZurlS30BhKm1zOn3uJ2RWzOx9EfTA6IEcjTfzlPeNPYfpxKGnZr8hRZe%2BrVSEnOn5BHLvFRopCfnUs3q6kqP0JTiJ8j4ZsMhtHGBMP12RPYJaoN3Pqwqf%2B8KL1vNOwtIfA4Ul8rXytPjUICWqYob6Zp03gkTNU009SRJopm3jTvkLMAgXRk%2Bmbjk5iMArYLfXRZCcvBAt4j0yg96vQZ6lcgcNbHIKXzupt%2B7FJsq8Y30i1ZeXjJNYvufOuIoVGGwMuOMWKmkXgYUtthcZByCFCdwPJ3ybdhiWuCbBtnnJg0jp3gvT8Fn4Y3cYPTzywtvHtKKjusb6OKDjS2num%2F2Y8Bobn7Lf4fEpcg7LHq8EIV3xBVWJdwVgoZdOvcDgtn8qifEkv%2F5bj56cLJuXj9%2FJ6A0uImV3i3RiANWiuDNA6FKW9OrNCrB8drVJLN5X6d5fdFQzYrBRSLQSAL%2FK2nZEPYwYbioMqtkozMLeMns8GOqUBYn4XGDigwKbxVxF07iqboej%2FX2aT0OuzJO3k6nvaiiXl2RPay2HCg6Yg19ihXYYJwzrYpCh9qBaq%2FWGWvMj1n2Zeor76LuyBpHoV%2BXLZ1I6B%2Fg77%2BV7FS%2Fn4qJzPXBfrFJhazVGsUIix%2BgdhLHVJq64PGJflIf9DFCc4GXxiNnLYUXQunPRoY2CLqOdfezCyP%2Bw5Jwvn%2Bcx0IBXmfx7JRnWdBq1h&X-Amz-Signature=392c362d2101d9f7f06c966531db04a0a699a697009bd2018d210548a3393cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNBPMUKK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDf5hC7CGyIYjCWlqd3aJ1PD8ilLCrj4bneyl5rrfFlyAIgQVQMNh9s73zwR%2BYCnQfW%2Fx3r0ye9e9FsvdcDdvpop8Mq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLZhEiXtlN8Pa3%2FjjircAx%2BOm8Hc2zmKQGwMDlH4svD%2F%2BcQyoLX2jOdBkhJvFKUIgKQBHH1Dz2ieWjHoi%2Bk8tFHzLJyvvciocEmY0wB0tTJ7RF%2BNojfpdIB8UnOXwKQsprkDabNz5CdLmpuK3wNNEBGrcwT1YDVyWCXpUmMb26toMB3CYRe1FY3zPPtmqKWQZLsBggx4%2FZpWAjseuyslhZJzLGarA6sDFaRYoERFJ6UtAK1kGWiA9zabtpHtJOrVb9SUCFEzC2OjRMmbRpt3ohtA%2BLJJaSvCJzpa%2FdJxV8pgTYBNp%2FB0n9gtUyIw1iWS7V1iSdvf%2FEDGOdyicigQNed1uhHLVt5TESsvQStRT2ZG3H8pn2Sp5zs3lt6Jad77GxiGA%2BN%2BHfMzUQIbHTMXOo44OEOiwvpRXtZKVNl97xlYop8k7WK%2BAEKTGFTC5oF4dU3uoIQSHQOj8Die0OORAb81RB%2Fi1XpEalvZGuk9yRemTt2DeJS2GDBv81gCflJ2xJ3kaWAMvvVTlqwA4d38ayZTVT52B1YK%2BP5tjLxdrwoOb0oodMGBS65Q9HBwaaS8BS49JqekZoIjgmlNZttV8V9QOyEKpbkON1oZRFopcJefqfXXVG%2BW9ZtgRm9wsMhzFHKl86I7fW3Qt3lMMKmMns8GOqUB1yStnh2Sr7vunbV%2FpjkwYRyzIq%2BKCMVuutyBb9CEleT0LMdQ5TJNQpZOoMkY5T4qKCA0vzH1vTfhcq6gB6mlpeITMK613uPjo4CN%2FSj4NiEtEBZKkiXamToyAUYBGo0NNdniaPuoWWE0sHFWT5gCHkppOzZL5ZUhZ8ZXyKhOz3xgQDNZ0uwtmkp%2FWOZpynCZVL6nKoVan8jWMIzKDWbhv4dTalgW&X-Amz-Signature=544732f8c270b8f679dbd7a4c41cd2789228a73c67b39d16f79d439b5f6556c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNBPMUKK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDf5hC7CGyIYjCWlqd3aJ1PD8ilLCrj4bneyl5rrfFlyAIgQVQMNh9s73zwR%2BYCnQfW%2Fx3r0ye9e9FsvdcDdvpop8Mq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDLZhEiXtlN8Pa3%2FjjircAx%2BOm8Hc2zmKQGwMDlH4svD%2F%2BcQyoLX2jOdBkhJvFKUIgKQBHH1Dz2ieWjHoi%2Bk8tFHzLJyvvciocEmY0wB0tTJ7RF%2BNojfpdIB8UnOXwKQsprkDabNz5CdLmpuK3wNNEBGrcwT1YDVyWCXpUmMb26toMB3CYRe1FY3zPPtmqKWQZLsBggx4%2FZpWAjseuyslhZJzLGarA6sDFaRYoERFJ6UtAK1kGWiA9zabtpHtJOrVb9SUCFEzC2OjRMmbRpt3ohtA%2BLJJaSvCJzpa%2FdJxV8pgTYBNp%2FB0n9gtUyIw1iWS7V1iSdvf%2FEDGOdyicigQNed1uhHLVt5TESsvQStRT2ZG3H8pn2Sp5zs3lt6Jad77GxiGA%2BN%2BHfMzUQIbHTMXOo44OEOiwvpRXtZKVNl97xlYop8k7WK%2BAEKTGFTC5oF4dU3uoIQSHQOj8Die0OORAb81RB%2Fi1XpEalvZGuk9yRemTt2DeJS2GDBv81gCflJ2xJ3kaWAMvvVTlqwA4d38ayZTVT52B1YK%2BP5tjLxdrwoOb0oodMGBS65Q9HBwaaS8BS49JqekZoIjgmlNZttV8V9QOyEKpbkON1oZRFopcJefqfXXVG%2BW9ZtgRm9wsMhzFHKl86I7fW3Qt3lMMKmMns8GOqUB1yStnh2Sr7vunbV%2FpjkwYRyzIq%2BKCMVuutyBb9CEleT0LMdQ5TJNQpZOoMkY5T4qKCA0vzH1vTfhcq6gB6mlpeITMK613uPjo4CN%2FSj4NiEtEBZKkiXamToyAUYBGo0NNdniaPuoWWE0sHFWT5gCHkppOzZL5ZUhZ8ZXyKhOz3xgQDNZ0uwtmkp%2FWOZpynCZVL6nKoVan8jWMIzKDWbhv4dTalgW&X-Amz-Signature=d1501beb2b89cfca7ddacf0d548ea14bb52fd7b880d053c2fdc6083762cf32bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ANEZBXS%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCUoZAosXl2FW8GXSPAdQQhKrNk4OHqjgjnDNg3zfXqtAIgFD4duyD%2FwzGx1iRpDW%2Fve%2FmqCmgxvT9oZueGphMg43wq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDOPImmGAHl%2FcoOeDXircA6biyvCOFiUXnOlGrIA0OiPZyna5O0gGbQXld9IXPMsfwKiJJQM0CF38FFekaOqbzIScMMmUa%2Fv6krFPHiHU87ElFKu7m1O4PLSMGS5rgLfPTIpbAI1%2F0m5qpLwSHRE1XmovqC8VGQ4Vf8SJjFsgNP63anZTWZxJVs6ixMPNJGbRmdU0WuXcaET9M0Mp39NIVY4d26%2Fgm0p3jGAHXr%2B2mzc%2BiU75IWvwd6lbtrUdHTQKHuIVqcgyPy%2BvWjNeavLpABiB%2BHEOGt4OdwI%2Fl2jUOg%2FnWzI5Q6rNIzZoZ4W%2B32tteh8ftxduxxWWfemIE14y%2BsvfIo5WNdE9kj4Xhy576X9nAYfR8%2F8mHAWS8ZAKztg0ydA%2F%2FIwbYPwOmIpNTm4mTtfHDKFWLiIXj8FpteBJ4P4DHnzXqw0gPuXi1J8IMwV6Bvfqw8YrvcqzU98J3EYpw1XjZN2MMboh%2BQk%2Bgbmt8d2LqB%2BQGXdlIWNi6G5lAY4kYyuoxxT5z%2FLBM9uDK%2BLWZpzPB3bZShX%2BzXBppDYnFcnzu7Z%2BPLEmwWSk5%2B2783yGAk2JjxaBsLiaTmkwcuIqX6n%2BvRXbDR%2ByZOaDyeAeT0Cm7MBI%2FxSOPUNbsE5yBJlnco6RlxJAzMQWwbpuMPiLns8GOqUB8veuF4x2gB5HuDDAEta7jFjT%2BlU7xi9W4IeqSNzUoofMAVMyICQ4Z97dFDhKsC7H9OB3FlPX8V8RgxZU6NmfCKrJCfiWihn60UzXMC5u4LYMOwdTur2QT%2BkXE5AqSXFdubjg%2F%2BkYeL%2FsJ4BJuqt2u1gSNDrl0mIm1ic0r7GCLTrpgtMWGQcPW5qOFsEROjrenvQjJzCyYVBBF8pDbCbGXGwfYhaM&X-Amz-Signature=cae346d2446dcd35cba29b592ab154315e8d2b5ae0af55b6b08a73d4ccdeebdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBQHGCTB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDvQBRwD9FM%2BnA0%2FXFojYahsT2MTt%2FSX%2FOhRIZO5MYKXQIhALvrt1HHiHF%2BEZC%2BlabdNmMmgTiwcYtTMoUf%2BqHbsh1HKv8DCDcQABoMNjM3NDIzMTgzODA1Igw%2BDGYhZMsU8dghMPIq3ANgLBGqcbO5BLVWK020wO3M7QZeV1mVcWQAgzmxsU2Vu8PvoLj5XSEg6KiELBmuPm9UFUqTQ4LiWiMiRCoul3F8enpg5qRTwFUc5Q8bKrGhXLrdsRlZ0xajeRpas3onpS9YrluLNogH%2FQAhUFPse9oc9LfhRIqZs22t95ws6rQaHACrV4mBLswbR5zVLAPDqxoqCaepptaXCz7%2BBXq7C2ZQfzXQAo4T8b0PROFj9FEcTBGC3z%2FA64VMXWEn%2BTodyjFlikiXKshzV1Jqd5GqNMqgMWxN5XS4De0TX4zn6tyhEs2iCPzmcBQIYpJAveGZuslP9tl4IwRdwN2WGTt6heCIDO9imT3fpCOOR9GXLvh8uULiqSHWmcoSZpkkOL%2BvAgSP01n593TE6gruQBV8esfpx%2FCUfTQcgB3LT%2F8l%2BKmggVqXcCgsELuBe7Ds3a3vzc5mLc3w3WueMceo6IvDlu2hlWAwOKV2CvdPi35JOhKbXlvbi1h5Sl0NEWL%2F2FiwuOYceMwe62MaObhcjmz9f%2FK1BBeBPNPpsX46JULbpHtm1dprUtFxyPYIbb73y0DCxn6QDUYJbyzYGk7W2LvkSWk66oMlowVjCuO41n7gEVSbNBbfR%2F1WjxvgwNc5zTDGjp7PBjqkAQmS%2FikItdw1QUTGsjdMZnBLDRclSLgvdlEOIgE%2BqGFsmGcN9wYm1nqNJS%2BzQxoruxqKSkEaZSyjK%2FN6%2By4A2%2BLywLDN7J9laPfA08HltQ45JQp33%2BfbyLp8rtDdLa8BjKN%2F7UCMADZFLE9HQNOKukJrZwQZ3GRE9mt0TPMHPmrIy2OTftgOF6gnHcFhJoIBJ5mdJVJu1Dv8ZrP5BYY4b12z3%2Bu1&X-Amz-Signature=08ffa7956bdfcd5138d7bf4f3dc8f5d93d95a1d286030ad15835b0747eec4eb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBQHGCTB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDvQBRwD9FM%2BnA0%2FXFojYahsT2MTt%2FSX%2FOhRIZO5MYKXQIhALvrt1HHiHF%2BEZC%2BlabdNmMmgTiwcYtTMoUf%2BqHbsh1HKv8DCDcQABoMNjM3NDIzMTgzODA1Igw%2BDGYhZMsU8dghMPIq3ANgLBGqcbO5BLVWK020wO3M7QZeV1mVcWQAgzmxsU2Vu8PvoLj5XSEg6KiELBmuPm9UFUqTQ4LiWiMiRCoul3F8enpg5qRTwFUc5Q8bKrGhXLrdsRlZ0xajeRpas3onpS9YrluLNogH%2FQAhUFPse9oc9LfhRIqZs22t95ws6rQaHACrV4mBLswbR5zVLAPDqxoqCaepptaXCz7%2BBXq7C2ZQfzXQAo4T8b0PROFj9FEcTBGC3z%2FA64VMXWEn%2BTodyjFlikiXKshzV1Jqd5GqNMqgMWxN5XS4De0TX4zn6tyhEs2iCPzmcBQIYpJAveGZuslP9tl4IwRdwN2WGTt6heCIDO9imT3fpCOOR9GXLvh8uULiqSHWmcoSZpkkOL%2BvAgSP01n593TE6gruQBV8esfpx%2FCUfTQcgB3LT%2F8l%2BKmggVqXcCgsELuBe7Ds3a3vzc5mLc3w3WueMceo6IvDlu2hlWAwOKV2CvdPi35JOhKbXlvbi1h5Sl0NEWL%2F2FiwuOYceMwe62MaObhcjmz9f%2FK1BBeBPNPpsX46JULbpHtm1dprUtFxyPYIbb73y0DCxn6QDUYJbyzYGk7W2LvkSWk66oMlowVjCuO41n7gEVSbNBbfR%2F1WjxvgwNc5zTDGjp7PBjqkAQmS%2FikItdw1QUTGsjdMZnBLDRclSLgvdlEOIgE%2BqGFsmGcN9wYm1nqNJS%2BzQxoruxqKSkEaZSyjK%2FN6%2By4A2%2BLywLDN7J9laPfA08HltQ45JQp33%2BfbyLp8rtDdLa8BjKN%2F7UCMADZFLE9HQNOKukJrZwQZ3GRE9mt0TPMHPmrIy2OTftgOF6gnHcFhJoIBJ5mdJVJu1Dv8ZrP5BYY4b12z3%2Bu1&X-Amz-Signature=08ffa7956bdfcd5138d7bf4f3dc8f5d93d95a1d286030ad15835b0747eec4eb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632CDKA26%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T142621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCiBg9ecUl8xT0bqy0GcYxF9wjzh67CoUzHkjaFoOUt1QIgRcGtdwkz5aSigytNqd9RbW0FbS2RKPJ1yyAl4%2B5uKTgq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDKn0o%2BepjPD2aVfZxyrcA4ZjeeKhykVlctpHoaXz4j1EEbIwWWqnw8ZF%2FrXA%2FK0g8kyoYdyXHJshNtEYQ%2B41ydt%2BndetvkGdrwlAxLJmLEGjMDRuxPHARehFbcMe3eZ990hvl6jcmV%2BbC6LOOrU0489LF2OVGEqTRi1parRE1TYi4vSLlwNlXVp63GvDs4HjRnyggiWNcFQEuO4icZbokOIzbHD8TCH00hgLBMQcKMfUQry%2FjkdeiNC%2F6H2ntMuigWJ4eihNZOMrlS4gONssuf76SDdFkADzhmHTWQ8lSKvjzeL5%2Baw3wkVO2WnfLIlvKXmyraPt4ZGFXynw1nTxYgMZt64RXpyhKN6fJkew9kSbHiXXZ%2BhqdDjrUaPJ0dtPbQkrGj3lvT2pYzLINuqvIggFK8PmWqaN7xphUDeWv23USv7UiIaA6mH1NjwkoTR2ogef6CiW7iWQooneiko%2B7sjcz85t6qNtlUXKAecX4aFzPGtpS1aO0r3ra5f7F1ekwAY47C1ct7qBNeTFlcz7S7VgPEqX12NUJ6mMVAH10lt23I6Pz%2FykDY88GHGFFZqmRFLrQsL2LXHKie2wI9%2B%2Fn6%2FXK8aScvvCZv16%2BXd0%2BfKkCsQYi8CHi5sMvaf%2BQFwkFE2pNwaNPHrsrWmXMNKNns8GOqUBNC0dhHmTmKvksXXVY8Un4E%2BqiEEPvk6idKr1WHxnA8uhu9vL3NR2qwf%2FUAdN0xX0MPJ6AfdRt17otWbViySraYYptot3HuP4LemjWzvwfxQ5k%2FFJb9QZhGHITXgOwZ4XPmjQnTRX8MSGdIEpQA7aLSRhbUpdPARCjIZOPY13L8P141v6FIlgyFmx1S%2F4qo%2FaT06F8kzi2v4eYGpKZcS75qhb8Ksg&X-Amz-Signature=8cc9db9ff91853671557661e52894741bbb52996df5bf798b6922b411fdf014f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

