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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UH6VHW7V%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCH2rM90jSoEmg7tNBgsgdoxJE5ePay2S8FZe7TGHtzC8CIQCZ%2FPb5lACDvR30xw4f2C%2F%2FOy2dAUPGztCquN6%2FczAMXSr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMsoDg4vFFY2r1SDtvKtwDzpxT%2B6cI52dRHxX080s2vHelHZuMMFMbum%2B7lCfFeq2vDq0oNA6TRhpjTjEIOHUjLyA778eAo6bAZOK3t65pHX03fRCHkYhdIdSEuG5zg6vkyHbgiWxgglwFqZU1Y2fnA4Z00KqVav7%2Be0FjWnn5cb0cq254bBBe6VWsWBA1sAtadtMSQ8eiVd4QHhu%2BFsCUomNHMgU2yZGOQOR6xRilVusH4E3fdkcfrUJeXUEk%2BAPvJwLFcaysXsZDeZoIavU%2Fve66Gx7o5WSMQslo%2Bh7p8Oa0tKIwkp0NMGLPMv6jLLGGUjPJD27XOSKWqVLr%2B1qDsSxnNbL%2BbcJg%2FslQNfjiDorU%2BBPXi2Mrjfn9oXGZDnnFuqVse9baT0%2BLLyYYu5cdzYdW%2FavQXz2VDZzX1xXBOxBBAH3MPeBm49%2BftIDuhdfL8RfVZPx7lQ%2FKJafc6giqSnwPscnmb6KEiF7QRkI%2BkHQ90j4Ypw2Sa0A3sjCBiUbzYsRDCznj5N4OoE6LQ7qivSPYBlk004YsZkoRGexJPJZikmdUWVfOk0yBQT1OYFCyLjkmYOxF3nZnMdzxw8Obt5T%2BdzOGcZNpic9Wazvg%2BtXYcxqp174RMrlQmGGEY8P%2BaQ3DJTmbUGnPirAwr77uzQY6pgGi1wysUeNxVATo8YAV%2FcfXDQg2UUeeJNRSSWSZQ0VCEFZ53dVhiEbbkreTXWQnDFFUaHz30asYYuxc9AGFljRmUz9csxcETKFZMzD4YIw9PHMfrpZMSfuwwWqBVbkV9yAHx3XeHB8%2F1JADdBgoDu67edylKYTaM%2FxQZiFXvMpbMQcRdBW%2Fbz1ZhXTNcJVnzdBGplhfEmbKq5a6tAVnWgNuiq4CF9Qj&X-Amz-Signature=bbb56d268ca112157446f30a3e85479fd5f3c83e5458b896554f9431d9fe9de4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UH6VHW7V%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCH2rM90jSoEmg7tNBgsgdoxJE5ePay2S8FZe7TGHtzC8CIQCZ%2FPb5lACDvR30xw4f2C%2F%2FOy2dAUPGztCquN6%2FczAMXSr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMsoDg4vFFY2r1SDtvKtwDzpxT%2B6cI52dRHxX080s2vHelHZuMMFMbum%2B7lCfFeq2vDq0oNA6TRhpjTjEIOHUjLyA778eAo6bAZOK3t65pHX03fRCHkYhdIdSEuG5zg6vkyHbgiWxgglwFqZU1Y2fnA4Z00KqVav7%2Be0FjWnn5cb0cq254bBBe6VWsWBA1sAtadtMSQ8eiVd4QHhu%2BFsCUomNHMgU2yZGOQOR6xRilVusH4E3fdkcfrUJeXUEk%2BAPvJwLFcaysXsZDeZoIavU%2Fve66Gx7o5WSMQslo%2Bh7p8Oa0tKIwkp0NMGLPMv6jLLGGUjPJD27XOSKWqVLr%2B1qDsSxnNbL%2BbcJg%2FslQNfjiDorU%2BBPXi2Mrjfn9oXGZDnnFuqVse9baT0%2BLLyYYu5cdzYdW%2FavQXz2VDZzX1xXBOxBBAH3MPeBm49%2BftIDuhdfL8RfVZPx7lQ%2FKJafc6giqSnwPscnmb6KEiF7QRkI%2BkHQ90j4Ypw2Sa0A3sjCBiUbzYsRDCznj5N4OoE6LQ7qivSPYBlk004YsZkoRGexJPJZikmdUWVfOk0yBQT1OYFCyLjkmYOxF3nZnMdzxw8Obt5T%2BdzOGcZNpic9Wazvg%2BtXYcxqp174RMrlQmGGEY8P%2BaQ3DJTmbUGnPirAwr77uzQY6pgGi1wysUeNxVATo8YAV%2FcfXDQg2UUeeJNRSSWSZQ0VCEFZ53dVhiEbbkreTXWQnDFFUaHz30asYYuxc9AGFljRmUz9csxcETKFZMzD4YIw9PHMfrpZMSfuwwWqBVbkV9yAHx3XeHB8%2F1JADdBgoDu67edylKYTaM%2FxQZiFXvMpbMQcRdBW%2Fbz1ZhXTNcJVnzdBGplhfEmbKq5a6tAVnWgNuiq4CF9Qj&X-Amz-Signature=bbb56d268ca112157446f30a3e85479fd5f3c83e5458b896554f9431d9fe9de4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X47CA4QS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCKU6Iu4QpzsQ2tkRUQBOxFfiOZ4HfQkLEgTKfy%2FJWHoAIgPyga683FjSbPQ2GsppWTNVeSFB4ssAGCCzeS8CLQaMQq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDOj2R60cHgGnBqhLcyrcA1pBK91%2FC7sxxYBr6Wlx6GzaRwJFbRV6CdRh0IvpOOkR64ATl3S0ydVCC0tFBxdKj8IqC7gm2rDoEBsRqWjFBHumSXbND9n5u2iSwJxpHgltOp1oPaZBPaKvcGSk8fKNNiJfDShAK0I5pcFcnSu9XFGDuC4qD2plWYVGwRX5updAe3Ik70Nt6Zw3JnmMdjva5%2FmliVY3ddR5m9%2B%2BkxZ9E1u8oqcsZsazmwIiyyrIyH1peO5bIophiHoBcUUOQh0B904T0GdwsoOpC2t9azffF12oIMB4EUJLntX%2BbfCgC%2FagZ8%2FYocGXhyIuBQrih2PPYz4snhS%2BdGu9Tq6QCdHV0pEZh3aTD5UWYIwl9QJWuhpeQXFFlIfNT88e8bgM71LnExaJ0XuNbI8d9rY6a0ok93CV5m%2BDEFLO847dOF7xFerJfXJUgl915TPZhkTguqcH2mc0okDbS3bm3ZFZ16zS0Fdy%2FkINyFv%2FMT27RyZfw2gh2U4ZJVOyofMeoJFj1ZtAXGDatgXRWqmCBuJ%2BHIbbb34I7SN3INyNPwNKxN3BMHWv5RB9Lz8gUUlRlQs06ji9ftTwyN%2BqYbgc25C0mFwYYRYLpT3RvjS4oVywFZ7i4pRn6cHwD3axgT6YsZs%2FMLe%2B7s0GOqUBxHzCa69PV%2BECGw59UfrQfLPXebPFMilfk4LXejsM%2FjExDGVpQwuSFdRQLfRuhkIzNmri9OkFS1tU92R6XjdAoQKZmqR%2Ftkovwr0NYyr%2BpecdISq63hJNOdN6HrK%2BUAVo%2FOktZRT882GA1mvZy73vJiu5pz6fIgMwcoM%2BobZPHmN70C0Gr9ahS9nU5lKzBlqp1qLa3WIfgQUEmrUN5K9J31dPUk2O&X-Amz-Signature=6b5cd612ff35cdf1e920e2f934437f9bdca5fcc73c562e8d0a0e4810620aebbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R44HDLCV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCID21BgZvfRV0zP35qR9x6FYUsQA%2FBn7p75rWywYFUDR8AiArQX2Hzl8w3iMDPoko33MaDlUkgjm2T2wYHrvtAD1Y8ir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM2HTA%2BTD9RfI7OQhXKtwDKhtYxK5KMyEt9fAEfgisgTzSAi7I1Q6o5h6QRJBYqMTMwGNh%2B3diXOVGLMw5Eh2PjpjGC3X5gVkSnukO6mBBrmOZqNy7kLAlqGBkvyMReZkynpqaZaTYVKrk1%2BECDjkFuPFnR%2B6scS%2FfLLL9ZxamuJgKE8HK1cVkRinLHORfM2wD3QrVhsetivJf1ApXctil7YLTjx1zozgrn69HsfHPoRy1BF0v1g2AxsxmSuaaYZ6LDHtkDTNu9CF02XwtvK3yD%2BzJPuE4jChMJoNUIX04vxZImWL0EeMOwillvX%2BdZYTSSFQ8Xxr1EXo%2FEvGKQaLnnwjLyoyvlZ3wF0al8sDo7d4250HDA%2FWcMj6s9GseD8%2FZQifYm1Suv2TE2810wMnoufW1bkV%2Bt8o1YS0PqP4avb62ajYBRSuynO5di2XaT%2BUgUXp8izrgqkKBzzAPCNd2ln9fdTryMfDK8UgrxiNpLDl2kfF1wYhrGU%2FkuEEZgMg%2BQdFZR2sH5FAJ6PwBnjw8SN2dHPa4uT4PFJPTr01Fplx1dkLvWp4NqIC0ExulJswVtWz57KcLpRXaIOZKaqHBy9Tkc7MXpt7G7N9k%2B3Irf4A4JHjbBpUp5oVRxk16P6LOEn2wn%2BY9cQenRx0w4L7uzQY6pgGHUOuh9TpojPLNDaAR63ywb3SlmzWdzbopx8g93gyWjsI9adGnxsUxmNT%2FBkoxRbw5PKhFiPiJwrdD1sJveYbi%2BEgcSm2ZXKsYZ51C00RNli4rNsP9y1jCuB9jkGOe2Wd5%2BvN%2B9EhU%2Fq6ZIwo42GMqcaF3X5npCZbOVLp1oLlHLHnoYN%2Be2U1xB%2FliOjIMpjV7x7qZWlay0Y%2FgKvy8aSqGAsODOgYP&X-Amz-Signature=c45ca61698fe23b712b29ee56aa43ed9b1ef60c11385f0301f52194c9cf6dd06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R44HDLCV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCID21BgZvfRV0zP35qR9x6FYUsQA%2FBn7p75rWywYFUDR8AiArQX2Hzl8w3iMDPoko33MaDlUkgjm2T2wYHrvtAD1Y8ir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM2HTA%2BTD9RfI7OQhXKtwDKhtYxK5KMyEt9fAEfgisgTzSAi7I1Q6o5h6QRJBYqMTMwGNh%2B3diXOVGLMw5Eh2PjpjGC3X5gVkSnukO6mBBrmOZqNy7kLAlqGBkvyMReZkynpqaZaTYVKrk1%2BECDjkFuPFnR%2B6scS%2FfLLL9ZxamuJgKE8HK1cVkRinLHORfM2wD3QrVhsetivJf1ApXctil7YLTjx1zozgrn69HsfHPoRy1BF0v1g2AxsxmSuaaYZ6LDHtkDTNu9CF02XwtvK3yD%2BzJPuE4jChMJoNUIX04vxZImWL0EeMOwillvX%2BdZYTSSFQ8Xxr1EXo%2FEvGKQaLnnwjLyoyvlZ3wF0al8sDo7d4250HDA%2FWcMj6s9GseD8%2FZQifYm1Suv2TE2810wMnoufW1bkV%2Bt8o1YS0PqP4avb62ajYBRSuynO5di2XaT%2BUgUXp8izrgqkKBzzAPCNd2ln9fdTryMfDK8UgrxiNpLDl2kfF1wYhrGU%2FkuEEZgMg%2BQdFZR2sH5FAJ6PwBnjw8SN2dHPa4uT4PFJPTr01Fplx1dkLvWp4NqIC0ExulJswVtWz57KcLpRXaIOZKaqHBy9Tkc7MXpt7G7N9k%2B3Irf4A4JHjbBpUp5oVRxk16P6LOEn2wn%2BY9cQenRx0w4L7uzQY6pgGHUOuh9TpojPLNDaAR63ywb3SlmzWdzbopx8g93gyWjsI9adGnxsUxmNT%2FBkoxRbw5PKhFiPiJwrdD1sJveYbi%2BEgcSm2ZXKsYZ51C00RNli4rNsP9y1jCuB9jkGOe2Wd5%2BvN%2B9EhU%2Fq6ZIwo42GMqcaF3X5npCZbOVLp1oLlHLHnoYN%2Be2U1xB%2FliOjIMpjV7x7qZWlay0Y%2FgKvy8aSqGAsODOgYP&X-Amz-Signature=8e0a2a9566cbfe3bd507ea960ad51574d76e5e9a19a7fbe94affd1bd3a05158e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUJ5GIZZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCkYAjQFLwoQJfLL2RGN785Wkp3dcQTU2h6ToylFXAisQIgGvUwCME0sN8a2Y4YENhZpyUBFOA6Xpui4tDZPykpf5kq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDNfKfQdWZOtbWQKB0yrcA4awdoQfGGKJWR8htX56OI3yQRRFQ5%2FOnifeYbBUGUsVOw0dQabmiMVbbdiFEvjDqqYTMm4jU5Ti%2B54LY9S1Pf21VpcRyVT5%2FQp3OnN9ywWkNaOKmohURp0RdRDSooL9xRABu4TIOSkzttH1Ce8mqmPrBOlW0y4E3CYkgrjaYj0rkFsyYNZIZNz%2F4Nf%2FbOKW9%2FnLVGCB2zVbS5RXV7XCRPqtN1psYWDX7XlYANHPkLPWkJH5Yf5I8hTRuGE2QXCn5yupEaccyhk78rllpQf3mYCLUQ2ZxSw5BTYYBRGomomd%2FxMC4eUQymp%2BLG7j1DMadaF5HQnJBJcYw9Pd1YZ%2BJ96PiLHWGPFATQAXlu6L9HUn%2FPLXuaFZNplj%2FIMi7xIbOwlpozu8q3yFSmf4qbRuTpXCcIhP6di%2BlnInD0yVAfNEr%2BjMMX1u%2BivrsenVSk2OSVc0iiVkOd0vNyMYnINrLZqU0LE08HldImYewXuSTKPMuv7MjYX3jJEQFl5EqcOna5Vx7j5BCmLoWmdJPMq%2BOr4yqd12xmysAkT4uOg4%2F4AnRjg3LzI76MQcn5rZg20a5yEGPr7eqZqmjnrlEcA%2FJwYKZX3vjySqqy9HYl2VDbUaIA2Qkckwf249khqdMNq%2F7s0GOqUBb41MCmqk7BoKF43qbddvEL5xSUzd%2F3gESTQXgQud64lmT1e%2Bwxoe%2FyIlYgPjNHjcBy1oUbmyZDHoL%2BtG3N%2BCbIBaRCxrRehU7DWHfgZApVbhZYHVY1IbkwRdAuxwMiSYE3SnvQZMoPjXNcqNOTmD3pYPcCHGfZBr1uXMExwDBkAXIeRo0%2F%2Bfa9dEWiFu9axtnfBZti1LGNl89SwoKPsNPYjd9ait&X-Amz-Signature=2f89654fa0c8e66af06d8536b4e5b0be82bbc970eb66e3855b8e921798c5c063&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJI3DZFS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIGw7AEC60svrXReyZHMvVjHcludBmLsdmmsKXBTgCauhAiEAllFl3AT%2FwPn5O5pAzSDfafwOsS1rWh3s7ypXlf0%2Bx0cq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDEI9cOxxPxKauRjB%2BSrcA44nAPuNIv45p4Mt3%2B0acNcpXSq9BZTSQHy0jc5z1f2wfzSgWlsqSprn1xMpEzxgGNgr%2Bxt9yocmKgALyllD%2BhnKX2h4K75fYC4yWcIyYSTWL9n2nG4maaDcBllyWAdxb7Arz4NudgwmQj%2B0z7Qvvf85FKUZFieYfbgujr2RQ1mYjBi7DISMM8saLVFzeAjn6rH4urJ%2BDMxv1489EAis5AVM7SmATSVjxMDJIsPUJ3FshKLH2W3TEeDi659FtB2TUT3BHbYB2DoS7lE8fU8cHQkI5cb6mG6feoFWj8csT5R1rznXXA64TpyPdIM2oXbqy3gwiqu%2B1GE%2Bx8bRJEH1H3oP1D9TreFP0Ol2Ygn9giD1L5fSCRX7oRW%2BBqARy6BGS7FYZoT%2BO6Qmw0ylU45NIc7UGFsKB2p0Kgr%2F%2BNmb0hsNs9CehoIqWqoJUwchUZh21pJFVjjXoT9pmJX%2BGpZU0PZdEEo8xv1tSrzVNXW8rTQtJGWhcBwY7NcRNvgBf575eTiqbBxCzU9fer%2BMFi8mN1LmK%2BHDOOpAuxLbbJlt%2B8CDnFud5kdpW%2BcqCd7vGn2eBHZayQEKy7HQBFSWG4Revq6IR8kDK0HNZQfQ4ax0uobIXoP1ifXuy88DAX3mMIi%2F7s0GOqUBqav8RYe8zUesHlie9gLuzE5%2BSA0%2F11pQaUU8EXuyULl94Y6CkbdmldzWTvz55igAQNsNhQXTkZMH25KFVKxAI6eSWpPDBC4yMBejOmCvfpWP5chyv9p6FSdBvGZFU3nWGIDMBgJYLJNTHomTwl2B6014%2Bc4EpDF1IJzcln3zhQ6CDRpZsKOTaCb0yYTWEeKS99ff4MXzof%2FDnGAwdhZ4wniaKoSq&X-Amz-Signature=193481575c8b0f6a9b49bb49c04834d91aa810904fce546231aa0919e553c449&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHZWJOCJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIAL8u35ar1Y6gHoexEpXletUnoZA2WGqxtgUzIe%2BoA%2BDAiAfcaodsToRGN7pb05AXCatibJKFkQjb43Qn9Egng6qcCr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM1JBFBCiaTiw%2B2akZKtwDhPAG1ugy3npaR4cRE0LAalapX2mGlb01JikzyMusZ2SIs%2BzriOqatcVJDBW0LWH1FXB2tlnsjnXEwKlEpIm%2B9JSdKcIDBSXHYhIpyLf2co8iW6T5fqHpAMi85SUXE0Ly5BO%2F9UX5USfrTY0ScBy8gNYM95EMCZsh3JMa3gPeYDYrIUEnlGtgYFp6o0RqSW1p6hTuAa70vRMZqEOA6exH3ejmDwKVAQQuCXlqdBLHFcNZvyp%2FwavHD%2FSpLwhDO1DY%2BwlZ6iUrjFT5sk1NTSa7VD%2F6YYx6YrPGuiGAqjiPkOqEd2ha0QcKif2y8Orm3Cjlp1paIREV1kuHrdbxSQYRtqPES62BztLje8gDzdD9CKwt3V00mHRSeIJuDqNYUa%2Fip9a8nvOMDpGkD5tq46O%2BGWBKw4n6w3aV%2BpUtyxdHoldmFYNIlpF6E8VGWwzJKe1R2hsoyP0ylUDv63xntaHOk%2FDAsBHm8Om1BcgTSdblqCDO5DaRo1UnadVvdc27bdXreuCMRMfBztV400caZrE7Mdl%2BCWGiUMZZzCInneIalEk%2FaQwOxBMgRi7fkTeU%2FMURJmuh4Tl33BbaFhRJjoavQTmPWCAv2V8t%2FriTburVqpQE25EtIESVCz2Dx9ww177uzQY6pgHeLbH51PwP8qC1mzEWVCjWq%2FrV%2FyfotQ75siClWrVJSXLw343XXS22TgrsaeDE8%2FBDdWKQbaCNHdpYWSP21DqnQ10MQuoeIdz08WGa9NqN2NMoqXCGCxnCcgL%2B9dWsRrxWQsXqj0K2RjJWp3vLRstFj1VYw1k4spra2occ99XNuzJ962Myr3RfzwIbsSr7wh7wsI9O9Gw4rOMjt1ZLSnss1RKZ69yF&X-Amz-Signature=cab4055a24958a1ddfa35efd98034308fe2c45cd491ed6fed0f12ded3cd090dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466544WBGIS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIBFpWrFS5calu74aH%2FfxK5rj7wLtvyQaWPrzXWgZNwQFAiEAg2ORRIL%2BYk1HRou0gydHb5uNl4c97Q%2BqPyM0STcedy8q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDHw9xg9DX7d1Qz4fuyrcA4ZYhX%2FQPfCmYIfudlmXSm%2F1sT4l7GnKXyV9HNfZ1DRblVQR%2FdvdRejwI6R1oPVfgxFRSmiKbvVfb4VXvDHlK1z5BgD0XDKVaSw3QfHI7rzSBhZV3jbYm6RL6fnCEk0kWqOoJuHSjV%2BXj6unSC%2FBsqFgT4uwwrvrhyZ1nehLTvnX5JJvfT4%2F4TWB5AGF4TM5NGSl80pvXGO%2FQ6vbMQ270nZZjXBmcQQSx48EjDk11RgiFqPNANbCmW4QDxIfTHmjI0wAtT0qSzNzkK%2BBvx5vauCNJx4foKLDMsFFW3lGs9%2BkkhD8BeaND0j5K%2BFfPgkogYacBSADTnlYTNJzdyALglatdv%2FiJfmKSYq6pmPYZpvCfIvcoT0unGTCv%2FjdVvoQ28cBmxE9%2FG5ebutkZMUynVYSlHzjh1JAJjNcPds1S1iEWO%2Fq3wPbbWEiDie6njk39QF3SKQ6HGkXEEFFWZh5CFdpkljubdS%2F1oIg3r8Q3HFlkvLwFvtlKdmzljdrJtfvHf112o5PhWD8cdWZk9hqsqmvjKIfS7Ybft9InKN1QJi8m193wYkOkuUrLEb3yVKtGcNp6rkOLcH0swq2KFdovjdf1%2B0NNbAixE3SzdkqRG3wZxYNbMfkicskmDzHMPy%2F7s0GOqUBEUVe7mkr1dDLfwsU8E9LbAwkvhkvkHTg1JcFlAaQFUodCLL3%2FcKh6c8YMYavqZcHsVQr84V78TjcspADyObGt8oS3j6phzuzUVAXxOQPpGVX5M3pkHGCcKynUv4R1KP0bmrOziBcKUlHjBco2rEhi368CguAt6htYkbB7TXsbhQh0zIMP3lO%2BE%2FUSbWpqrf1nKG%2BbmplFmZwCGrnJ8eZJBvLktJu&X-Amz-Signature=5badc9cb8a3b6773319f5a11c5a9f1bb7ffc32b2735933fd323e6a4d8d5b223a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466544WBGIS%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIBFpWrFS5calu74aH%2FfxK5rj7wLtvyQaWPrzXWgZNwQFAiEAg2ORRIL%2BYk1HRou0gydHb5uNl4c97Q%2BqPyM0STcedy8q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDHw9xg9DX7d1Qz4fuyrcA4ZYhX%2FQPfCmYIfudlmXSm%2F1sT4l7GnKXyV9HNfZ1DRblVQR%2FdvdRejwI6R1oPVfgxFRSmiKbvVfb4VXvDHlK1z5BgD0XDKVaSw3QfHI7rzSBhZV3jbYm6RL6fnCEk0kWqOoJuHSjV%2BXj6unSC%2FBsqFgT4uwwrvrhyZ1nehLTvnX5JJvfT4%2F4TWB5AGF4TM5NGSl80pvXGO%2FQ6vbMQ270nZZjXBmcQQSx48EjDk11RgiFqPNANbCmW4QDxIfTHmjI0wAtT0qSzNzkK%2BBvx5vauCNJx4foKLDMsFFW3lGs9%2BkkhD8BeaND0j5K%2BFfPgkogYacBSADTnlYTNJzdyALglatdv%2FiJfmKSYq6pmPYZpvCfIvcoT0unGTCv%2FjdVvoQ28cBmxE9%2FG5ebutkZMUynVYSlHzjh1JAJjNcPds1S1iEWO%2Fq3wPbbWEiDie6njk39QF3SKQ6HGkXEEFFWZh5CFdpkljubdS%2F1oIg3r8Q3HFlkvLwFvtlKdmzljdrJtfvHf112o5PhWD8cdWZk9hqsqmvjKIfS7Ybft9InKN1QJi8m193wYkOkuUrLEb3yVKtGcNp6rkOLcH0swq2KFdovjdf1%2B0NNbAixE3SzdkqRG3wZxYNbMfkicskmDzHMPy%2F7s0GOqUBEUVe7mkr1dDLfwsU8E9LbAwkvhkvkHTg1JcFlAaQFUodCLL3%2FcKh6c8YMYavqZcHsVQr84V78TjcspADyObGt8oS3j6phzuzUVAXxOQPpGVX5M3pkHGCcKynUv4R1KP0bmrOziBcKUlHjBco2rEhi368CguAt6htYkbB7TXsbhQh0zIMP3lO%2BE%2FUSbWpqrf1nKG%2BbmplFmZwCGrnJ8eZJBvLktJu&X-Amz-Signature=59e110ce102b9128613304be4b6f8e6a1cb4f3918c7f57de4170e1a81a64af0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LEB5Y73%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQD5%2Bk3f9hjcRcdx52cx8ACaImPME1YxkqBjB14mw9jEiAIhAPEwx36mnOVOg1JEasyA74Iyg45qz4%2FWQd0sRptkBBmOKv8DCBgQABoMNjM3NDIzMTgzODA1Igwl0%2Bd0t3dKfNh1Mzwq3APxkFJPbjy6eTop%2BWiGqPeFQgwhgbkEYDys9e1cHpb2o4VDSwFrJVKaUp%2BRdn3%2FVlIAmDdbnEETxhJg2su94nub%2F9Mm5f4776hPMzw0JirblnMexn6XtD8oO5bgyOZooBYhEgzUUjWtqMe5rwDO2pbLisXusvWOKb2tHD0pKqHephMAuZkMK8QYnDiRpITL%2F2GFvmIiu3tXcvRfapSeFqZQyenBDK%2B1lFPnSJ5vt4qLCJ76WDq8IEfVSDL55zTuf%2FAEKtWiWAC2otFskLFBe1w3CU6biYEUqon2VWKih0dzcQioKuVjeJ6dN2Ulgp5sAC2M6ibsSrBtXSVJj8FU8qvkCl7sJKKbgT3446RrrpDhw%2BhVZ8%2BW7bYAkcO4oP%2BsOpXzLm%2B3EN8sKsM5Y462UgLbt7uU584H1uNOXezyJbczIWbX4GGfFBB0HB7kmi%2BC472wR69kbhh5Tp8%2B0tXMaTeQSbwIYRCXwZ2iW6sS%2BkLrEjbjKWgGmORFWXaY7912x1hrLP7uaCmejW63fWl7iIXOIe6335%2FRhZmfd9DeBaybLVPv42M7Q8K%2FcAFuw162HdYVVKO%2BpoqMEBbfuF2ACRt4f0svTntXmvsm3608Dqmtjb1yQ6O0uv%2Fn3bmMjjCIvu7NBjqkAXMmeb7iCMJfuGUdw7%2BkrtDFIAJ6ozFm6hnK4M%2Bt9%2FmFpRgV5OOVtvyFF6Jmj%2FQo2ULIWt3o%2BdjKEWD6pf9ZdD2rpWWri1BfNTIEyZ3UiWT0FHwKoLP%2B5ZGEgZKbC6EX1ZeaZt2qFRUkwGfDSW7h%2FmcS9c9wZi5wCsuiT%2FQfuM8gahtdMrc3p%2FUB5z1ghKFjVtll0L2putdUNG5KSDJVdFUmYBxs&X-Amz-Signature=71755be905754309c841d9eb1af1ca4edb2c3d15222204868ca70b91f878f81c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCGYXNAE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHPUl25CVFnXkyIK03tcmhQcNOPl4gvtBAOqEHx3qBRzAiEAlvC1DK8sBoxjsXnVQuQwWPGIDFMwDDRnXj7EMaX2kJgq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFsj1Xz%2B2IK8cGDkHSrcA0nWgAMkgt2B4KAhZDIiYTeZ4JWGjky%2BuolAfsbDoBTygkc0r2Gy65Cq9m5jLCM2HZgZAHxOwn2kfonDq%2FuTRRiAD9j%2BTZZE%2FBYro5fLnELHTdWEuHyREt%2FIly3bu8m4lRc7pgrYGtLLnX%2Fz3GapFJuBpXIw6ng7HsscixRx%2B%2BzC6BtiCZoN%2BbBGMaQunfXavj1JmCflRtq%2B%2FjrC2SvMWonQ64XgIFA4T%2FyvyYyAke8Fio5jatgxkm3pH8H5B3aYiQvJOhHfNqqxHBLLXX5%2BnACKYPKi6hJwuapgWoaTaPx37Ua%2FMUYDl6w0Dp8FRkZimawCOMe7x5D%2B9YylAFsXKWh5XykO3%2B7OGNi63dOqWVd4TosO873rWzOtWPRmwVHXjp%2Fg6HTzoxIEawO3idWlwrtBEb28FQ9bSrlIlKuLafkSctjcO0OWBpkUHWfzpjcf8S0gV0jzyDOzMlRJuk%2BlfE92d2r3tzwE9AobXOH7amogrSwyWjS%2FeIOhziQcThs206TH8GwRLpGJQrFg%2F%2FvdKdgzXhaMK5ZXnv1iY9ZhDoYq51JdpODHP1VONa%2Fv4puJ3RACE8tIzJWpNJYdBY7cyzAwdbTewynUbrPmVDDpN3FNBUIQH9zg2EGQG3LhMKO%2F7s0GOqUBzWg5f%2B7YoBD%2BtyuahoQhtAEFFJESBfoxzLi6i20pvLcrqan%2BYfD0LrMfVDoT64LoRL50aah%2B93fTfDxpkJTQWFL3g7JmFfVCPPj19PNmSWCpCs0h%2B%2BdO0zNlfCwP15Xj7%2B%2F7nxu2U8RuSRhqwKhDS9SPUlhHMgBboS0HhuslzacJUj3w073NSysH7APEVM1QEXV4ugh0NvouqvBe6c9M9HQmV%2BK2&X-Amz-Signature=177a087df2bd777163782ed4459daf93f3849b0319a3e996f6ff93c78c7e5f59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCGYXNAE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIHPUl25CVFnXkyIK03tcmhQcNOPl4gvtBAOqEHx3qBRzAiEAlvC1DK8sBoxjsXnVQuQwWPGIDFMwDDRnXj7EMaX2kJgq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFsj1Xz%2B2IK8cGDkHSrcA0nWgAMkgt2B4KAhZDIiYTeZ4JWGjky%2BuolAfsbDoBTygkc0r2Gy65Cq9m5jLCM2HZgZAHxOwn2kfonDq%2FuTRRiAD9j%2BTZZE%2FBYro5fLnELHTdWEuHyREt%2FIly3bu8m4lRc7pgrYGtLLnX%2Fz3GapFJuBpXIw6ng7HsscixRx%2B%2BzC6BtiCZoN%2BbBGMaQunfXavj1JmCflRtq%2B%2FjrC2SvMWonQ64XgIFA4T%2FyvyYyAke8Fio5jatgxkm3pH8H5B3aYiQvJOhHfNqqxHBLLXX5%2BnACKYPKi6hJwuapgWoaTaPx37Ua%2FMUYDl6w0Dp8FRkZimawCOMe7x5D%2B9YylAFsXKWh5XykO3%2B7OGNi63dOqWVd4TosO873rWzOtWPRmwVHXjp%2Fg6HTzoxIEawO3idWlwrtBEb28FQ9bSrlIlKuLafkSctjcO0OWBpkUHWfzpjcf8S0gV0jzyDOzMlRJuk%2BlfE92d2r3tzwE9AobXOH7amogrSwyWjS%2FeIOhziQcThs206TH8GwRLpGJQrFg%2F%2FvdKdgzXhaMK5ZXnv1iY9ZhDoYq51JdpODHP1VONa%2Fv4puJ3RACE8tIzJWpNJYdBY7cyzAwdbTewynUbrPmVDDpN3FNBUIQH9zg2EGQG3LhMKO%2F7s0GOqUBzWg5f%2B7YoBD%2BtyuahoQhtAEFFJESBfoxzLi6i20pvLcrqan%2BYfD0LrMfVDoT64LoRL50aah%2B93fTfDxpkJTQWFL3g7JmFfVCPPj19PNmSWCpCs0h%2B%2BdO0zNlfCwP15Xj7%2B%2F7nxu2U8RuSRhqwKhDS9SPUlhHMgBboS0HhuslzacJUj3w073NSysH7APEVM1QEXV4ugh0NvouqvBe6c9M9HQmV%2BK2&X-Amz-Signature=177a087df2bd777163782ed4459daf93f3849b0319a3e996f6ff93c78c7e5f59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MC6LZER%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T093049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQCkea3cud0ADePItaKuQ0C2wV3PqeqIxSlYBfHA8NefzwIgNgH3OQF%2BC77wNhsXV6FwAO4MFPmwvol8DpOwjR6sVoUq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDNa%2BGA4Av0Weh8nlqCrcA8s8Gr4ANVgbWlCFmlnUwabkWzSgcdX29LIQG988KfJpwAHOFR13naMbUgUB1fKiN5v2g8j1Sym2wdP7FR5OXW02kOer9SHxYOizygxKC4DYCSSv%2Fft6VBYuwywWj%2BAgFiDjpAdJCU5sNo4672UX9XoQ5uQMmPov1fudo2zePDchC7ef%2Baai5qn26fogqOa4CHFk%2BZkwGufDnsXGSGETUql5VU8HK91XLvD5QOiFiCS93pOeEsyIdn2KWM5ANVFQ%2BesOjjYbRJUC98t7W4ziKUjNz5YRgvPb58lxaMzS0Aq%2FfBqzcOYHjsCRzOcaQ0aIIQBzcCZ%2F92CQE7Q6ZeY3kCtRaoX9RcDzyD%2FToc3GLWhE26SD62ZjVieLjy%2BpbzDObqNcX1DDPT8qDTczJgDKXs77C6DA11r5%2FfI%2FmAmgKLMZDQNqyhNZUJMkjSjqrgTlFeQkGwA8af1hMa6rqBnAJB6d1aR3IP%2F8b4wHoHpXej7w8uVwbh5WjQNrsvmKZmIZEYaMwAnRLJwjoTDIm2PNEmuontKxP5jBFtej3HvbfDdTJ%2BtaaSOUfATXCyUYL6WELl5Upe9VeEr3TVKcYK9nGHaFJEAKB1UtwtV5K10K1XKZCJnioGABD2LAwb0AMKnQ7s0GOqUBdic7fiC1Txr6MVvb9HQDe8NguYtVpqVnPIouANvP03QiJp6fQVKsPYpXkoR1D5fqm0BIC0ODGxnGADHy%2FMwM30ZgmEgTAyXN5lQhaTbfZWamTojCx8eQ94U4xSq9oMwQWie3mqhW54dza7Q10puNzM9giEe2bOAhNf3iPA9pWVCuUg%2FdyKUFyESD%2FXy7XUD6PpqzkBsN%2Fj4tquj7f4jRFZ2F9cOU&X-Amz-Signature=b3a539406e5f0ea25ed713909757d418bad3fdf1ce6d8a3cea75eca3d4f18630&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

