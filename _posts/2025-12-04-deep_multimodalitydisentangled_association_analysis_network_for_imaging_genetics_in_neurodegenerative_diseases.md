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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRFD5EGG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCAjSXUHBfRibJEm8E5qGNypSLCpO7B%2BHNQKEfYkQ5K0QIhAK4Z7BJkgsS6GDW6Ute6wE1AZFGD%2B2TNd8MV2QEOycQ%2FKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyu3DlAXtSKhxRLVQEq3AP1kihltHofL5tErqGHRP34K1c2pf7dSa1VaOLPqyIJBnc%2BbOt85Z0c67YOrowsi%2FmSZGVdSMgLz%2B%2FrZj4GKU510yVDtfjgEIMnhSsPakHOzb%2F26KLArZ6rH61WTAgQ6CWdNDDBqtXPUSJtyFBE9BPd60jX7Zgyzp8Afa5ZANyBLndk2mUqLZBSIjVzvX13VCDa5jnV6sQRWj%2FBZYTaAoezQHLYtB%2B6viFcj7JcncpVBPBMJ%2FkrdR2xZ%2BJKYmDxp9tRmszXu786ex4iKcAJWz40mClHEfSU0fcSYhrh4lqTKUxsdqO%2F5MrNW7YdC6p%2BN3T2ZmS07odKm4i10PBDoF%2BYySnZoIBOcgRtI8udqP4ls3GyqXsqSrPzMETq7VJyFeHoiWr0WLohzK7yyGrfaTb4vyq2A6mfUzA6zeObc2EO0t%2FWMQUV0EKVq4zgbXDLrz4BzsIE0ek7dXk40O%2FRutpfnyQYLYDILvZiViKipqhufgOgCVG57lqVFE%2BHGswG7OBD9xVEbnCsi%2Bm5ssS%2BN3L0RKSU7auKpvhV4wZ3CcVzh0H4GNzJRvQlncq6iD4QsNTwLXerSci2CEo3966A9%2Fqgn5GFc481ms5ONOMwyDAj4USIIggSnAuSTh5ScTCZj5nOBjqkAa8SP0sf9T6MBliBBz98Q%2FMtLuuozHQt3yeEQexC1wNpiFUak7OCOzPOrhB%2Bcq0UKHWaWaEZr3xyzPML%2FIChA4XD1Klt0TQjziA9NxfwEGGbvh5oDgrdkluXeUNNRDEeyeGI2RWWZZOPEM75topzu%2B1W%2BuLJltC8SdgJYQruwpOc9mTvhf26EyaPmXS6GSP5mmyvvSY%2B0bLIFekbXbgD%2FLB2hL43&X-Amz-Signature=59bdf10d13de7c95e8d00c81816a5dc5b799c4a528ec7fcc4780476156595181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRFD5EGG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQCAjSXUHBfRibJEm8E5qGNypSLCpO7B%2BHNQKEfYkQ5K0QIhAK4Z7BJkgsS6GDW6Ute6wE1AZFGD%2B2TNd8MV2QEOycQ%2FKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyu3DlAXtSKhxRLVQEq3AP1kihltHofL5tErqGHRP34K1c2pf7dSa1VaOLPqyIJBnc%2BbOt85Z0c67YOrowsi%2FmSZGVdSMgLz%2B%2FrZj4GKU510yVDtfjgEIMnhSsPakHOzb%2F26KLArZ6rH61WTAgQ6CWdNDDBqtXPUSJtyFBE9BPd60jX7Zgyzp8Afa5ZANyBLndk2mUqLZBSIjVzvX13VCDa5jnV6sQRWj%2FBZYTaAoezQHLYtB%2B6viFcj7JcncpVBPBMJ%2FkrdR2xZ%2BJKYmDxp9tRmszXu786ex4iKcAJWz40mClHEfSU0fcSYhrh4lqTKUxsdqO%2F5MrNW7YdC6p%2BN3T2ZmS07odKm4i10PBDoF%2BYySnZoIBOcgRtI8udqP4ls3GyqXsqSrPzMETq7VJyFeHoiWr0WLohzK7yyGrfaTb4vyq2A6mfUzA6zeObc2EO0t%2FWMQUV0EKVq4zgbXDLrz4BzsIE0ek7dXk40O%2FRutpfnyQYLYDILvZiViKipqhufgOgCVG57lqVFE%2BHGswG7OBD9xVEbnCsi%2Bm5ssS%2BN3L0RKSU7auKpvhV4wZ3CcVzh0H4GNzJRvQlncq6iD4QsNTwLXerSci2CEo3966A9%2Fqgn5GFc481ms5ONOMwyDAj4USIIggSnAuSTh5ScTCZj5nOBjqkAa8SP0sf9T6MBliBBz98Q%2FMtLuuozHQt3yeEQexC1wNpiFUak7OCOzPOrhB%2Bcq0UKHWaWaEZr3xyzPML%2FIChA4XD1Klt0TQjziA9NxfwEGGbvh5oDgrdkluXeUNNRDEeyeGI2RWWZZOPEM75topzu%2B1W%2BuLJltC8SdgJYQruwpOc9mTvhf26EyaPmXS6GSP5mmyvvSY%2B0bLIFekbXbgD%2FLB2hL43&X-Amz-Signature=59bdf10d13de7c95e8d00c81816a5dc5b799c4a528ec7fcc4780476156595181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THZO7GTW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDnKoRg8B5RYbIry9q5g2TfWC8l3XPJSHfZgXLceJaGvwIhAPKm6hZIzESXN6T2x5CkEneM%2F7if9jDW%2F%2FDt7dOzGZNTKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgweV2BzjE0pEZRleKoq3AOHi37IhEYDRnMkD4q69kUGsTdrIvTvhY%2FfaUh6nJltWf%2FhvHbypFP9gz9f7PhwA4J%2BuG%2BUdRPOHqPsEcZkQnomL1h4x2C7c9eZwQoG6yGW5BDePiWf58MJRYiQ8Nf%2Fc%2BZp9PZnp8uxm%2F3w4v65wx5bw5XG8mweZuKDhh9Xq9yRxt7x%2BMSkiWEJnuoV6FHnJCSBgcsy0Wq3mUqBLLHZIDbFW3axjbIduMIT2HLhhkgTweE5z1eCCWgAM8Q7K2snjSfgIrBSRSkx8yoLN8NcA8bZ8myr99zbEk%2BCB237atQRiARWGqvr21jyk79aThXKRwls7HPaNlEdFUULc0YDT4L46b0sSpnqFgoRGwclWswye8xMInclpmcmKuYt5gVEGCaDu10WcG3FU8bqF0hp1RIeGJVIDZbBvnFlMwDb9FmJ5ZymI%2Bu9xg02tolVvcGjRa%2BLFlRQn28%2BoDfhwgL8BMTFBJPsfGmtvK9VMH4HTNkYW2baspHd7qXK0hDqTqvFZP9XVDYZyDGmJfY7xt7DV6oM9KMk9DWDDBLLolnHoZ%2BCqE5VZB%2BHO5LdYBFEIzdfb7YoPrIWSgIJVboEiy9%2BRMaGkeTI0Yz5JwvH1oOBSz1ai8SsRP6Nj7bPF0jBcDDqjpnOBjqkAXgMui%2Bk4TonutGMUEzcPONE4JnnZKXZR8%2F9pY1tblndqMoOZvXXQwy91xkQfcuQPm56TBgjdbKTT9v2GYSYuyHok5ePkydKBjyX%2FdARuKVKzfvHalvc2Wy4jpKllXL1x9CbvSKfOOGVEbDyd0TX5ldVLgjixjSV9QzN54efjxmhUnTwDrHmqi8ARYOZKRoQ64MlCpOy50A6kmBFfiZuxYdpPnZD&X-Amz-Signature=2d057d1d71d56686c7f7dad180643ceb1e21f338faaaac71576d82e3a87666f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMO3CLNP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICUms%2Fl%2FS%2BIDNXGVO%2BiR%2BlUvf0IRrfSaJGqA2xzhhmHgAiBybiUxX02OOX6gsovMVDthfX19aH9NyGcPx%2Bb4pbCkPiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfoD55xiJh%2BxScvTFKtwDI4DsZHvuvpJCwJZ83tQ%2Br3SAa3biAhC19SXfDXlznheQcM%2FYUcP4CuwJ1TvdLV17iDscl1pkO6zPcCeEQWzzalcybf60IiVp7D%2F9eBmThwYw57Khbex6ow2goUXEd0ZsOcPCmCRJEzW6kTVfXVw0h70aHQyTb5rP%2F6ESku%2Bd59dYYL1CiorGKjU1QPvcGp2ikU31BoM%2Fw4%2BSBzDl8tw7YHLUYh9DUpExoN4NS64aI2JAvy4PloNkhsA0MuTHrqrCPCOCqhoQqCQQkAUHonvsFJxCkAzy%2B9LlpiPOXkE1Q1ZUA8pUU94MpQtqfRcXYPqXpMpGe68%2BQRTQoz%2B%2BuZtF%2FU0g9J4Nf%2B0LnFfRkZCrE%2BZvplduSNUNWYuLXb0sv19qiz%2FOCLkbFje6YfnRRixYqVXcJfwlBvGm3zRpRoI9IEsD8x7cCV7otpgy1MxMllPy1YBqPLlYGiURjsR32rSK9nVVndd14tROoItXQgnisyiaFdxpaLPnCDGgtNvyiAYkpWWi3xjqnSr2PqD%2ByOwUlnlwzXDY4c97bF0EeD4b17AQ%2Fvip3VF9z6vnvSNV8%2Bm5GRbqJLqUfcOWeW3DdkilKZvk0WjCxor%2FJi2pgNJVbKrdkBjdLVCOncv%2Fn%2F0w3Y%2BZzgY6pgG5Gejsq%2FL6n03Qvt648AdmQQRWTYULGA5w63xfi2UdHi%2BRynX7UY7erekhtPcpytrzBCwMZFgPz2btkFWCN1%2F%2BiNYE1COzjmJvfGRzwy18quzq4ES%2FOoxhk5X40DRpkFOQnR4jo0zY6Tej7j%2BG4br78sSjFU0y3oOsUJyHoDDe5HIi%2Fhn7KVR0QFCoUR5U2eLLMYWNXiuFhTksuVenR%2F5yNDl0%2FqVH&X-Amz-Signature=c4152112826bc94bbc4e08f3b0db3b5ab82a3f25a22b96e228aaeff0a093ff4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMO3CLNP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCICUms%2Fl%2FS%2BIDNXGVO%2BiR%2BlUvf0IRrfSaJGqA2xzhhmHgAiBybiUxX02OOX6gsovMVDthfX19aH9NyGcPx%2Bb4pbCkPiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfoD55xiJh%2BxScvTFKtwDI4DsZHvuvpJCwJZ83tQ%2Br3SAa3biAhC19SXfDXlznheQcM%2FYUcP4CuwJ1TvdLV17iDscl1pkO6zPcCeEQWzzalcybf60IiVp7D%2F9eBmThwYw57Khbex6ow2goUXEd0ZsOcPCmCRJEzW6kTVfXVw0h70aHQyTb5rP%2F6ESku%2Bd59dYYL1CiorGKjU1QPvcGp2ikU31BoM%2Fw4%2BSBzDl8tw7YHLUYh9DUpExoN4NS64aI2JAvy4PloNkhsA0MuTHrqrCPCOCqhoQqCQQkAUHonvsFJxCkAzy%2B9LlpiPOXkE1Q1ZUA8pUU94MpQtqfRcXYPqXpMpGe68%2BQRTQoz%2B%2BuZtF%2FU0g9J4Nf%2B0LnFfRkZCrE%2BZvplduSNUNWYuLXb0sv19qiz%2FOCLkbFje6YfnRRixYqVXcJfwlBvGm3zRpRoI9IEsD8x7cCV7otpgy1MxMllPy1YBqPLlYGiURjsR32rSK9nVVndd14tROoItXQgnisyiaFdxpaLPnCDGgtNvyiAYkpWWi3xjqnSr2PqD%2ByOwUlnlwzXDY4c97bF0EeD4b17AQ%2Fvip3VF9z6vnvSNV8%2Bm5GRbqJLqUfcOWeW3DdkilKZvk0WjCxor%2FJi2pgNJVbKrdkBjdLVCOncv%2Fn%2F0w3Y%2BZzgY6pgG5Gejsq%2FL6n03Qvt648AdmQQRWTYULGA5w63xfi2UdHi%2BRynX7UY7erekhtPcpytrzBCwMZFgPz2btkFWCN1%2F%2BiNYE1COzjmJvfGRzwy18quzq4ES%2FOoxhk5X40DRpkFOQnR4jo0zY6Tej7j%2BG4br78sSjFU0y3oOsUJyHoDDe5HIi%2Fhn7KVR0QFCoUR5U2eLLMYWNXiuFhTksuVenR%2F5yNDl0%2FqVH&X-Amz-Signature=ee39215d341450423fabd3878aab4c551672567033d5b9c2e6cbfa53fa4568e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZ4YYZJK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIC%2FSyQ5C2Tgb3K7cfQove87aTXcyA9qq9pwX6XUDwyqcAiEArcG453%2B1xjD2FpBR3sbXRBNQTmUAOj6csMxKMOkRzuQqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjLxbfeaUXGXC0dvircA%2BHtOIoQIUsneYFyNRuCNGY%2F7j7DK2QihdQATjMKzadvYi6WZl0dKmSLFmMUttgkDaKGylIVmJtJezhkkGUqFOjCi0BqHbSjN8eeK7%2BVgKZ2BkE2jHpklSiTH8u%2BV28F8n%2FD%2FXf0IE6sfGRbvXPOnnFuseNjb0KxBCIz1pT7bQGRn38D25jQAZ0WqvgzenRuYsNJiMG%2B2i%2FdtHe3%2F5iBv5AllvsB%2B%2B66H3SV9VY1FcRRTlCHHt7QJ8wOoSQnWMNGjesTYWabBZHYqJyhT5jX95zCMMb5C5jd6HPuNmOOCEpWbHsNdpj3Kvu%2Bbr57V1NaWG1Xf7%2Fg3SFPLIayFRaTIj2Uaz8zsTEcWKVmlbR%2Bneui7AqPXPgAxQS3saR7GcoXuMaOEO9W41BdSTqkMELzSTza1jK4YBA9BbS517LTdr5hJ499BD92%2BZjPhss4XyfQb%2BJP54JMwNXaXAhZSM8Y1owhe6JfXs%2Bh0Vs0Zh0diZ6zo0xdqqRO37av8pDc6%2FLnC%2Bd2f3Xyf8E9CL1Y2AxmWnrC0PC269XTdfwcqG%2FTllxCfFrWpqutt21Bu%2FXhdL75EtuGC%2BsgZXUB0o%2BM4%2BFBhx5a6jZfZeOr69mnXnMkaLJ84n1BtHW0zWCyJo3UMJeQmc4GOqUBcYFn55vo%2BsmUKmCbFRSmrRbx9UOtnquQ%2BJwCO2aT7htT9QGHmh4eWDdEa5MnuGD1OQKXp%2FPejXl6HYsn32y5Tt51ATgZCinVENGdetM9hfaKIwkWTJ5MsW675f7hMsERvDYlE0v%2FHDn4hcXXvW%2BelzEqDQyhO6%2FTH4zmK2RPU0157aRNnCsBM2WtbxAiSe0NMV%2Fqwp9ullXuZumzq3wbeFbD8Qsb&X-Amz-Signature=dcff961f92755004d4ebd6bf158523c4ba9e001fc1df4efe677cb3adf9230cec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOT6FQYK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQC8Z2ztgf2rkrAoGwKbiDwnshxBswMiIIoAciRz25cyZwIhAKDHUWq%2FSRBCOIL0KrT%2BB%2BMqnyueo5UYnI2idxo8ZiyQKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwd%2BSFoigi64xY%2F9HEq3AORBHywshrSRHpl8UyQ0Lj1KVspE7V2jsJts%2BwHWJq0z0qhK5yi6lC9UnCcBCTRLy4LLjLLI7MhGkp8ZX2iLZs5luAEnYZJwqEcSz73pBLKkar30g1d2vg6DchscGNrINUoi2Mcj%2BMWdpryGETRSOhPH6XpkOBxyI08PzrQXaQ41K%2BlJQnrphIW0vUInJb5y52VTmxEy4rhVmn7AUdu3zR7BpPZc84jvdgkH6I0G5GnMrJ2CGoFDRjWT9WoS%2FjN9wCZPvAw%2Fnq29VeOgRvJ9RfZosCx6jtKpJ5043JPk1MZBsJxgdmwzSALrWpS3RKEDMKTTc8VTBVLBZ%2BtAM6cNrkH6q9Hvy%2BqG7rAbP5OZ49IeGDt0fzD0tNbRaB1BhMVpsGksMMEPfjd8wRfK7YnvD%2F1qS68KKydCbAZGxJhNYgkbpeJJIoII4HM7NakreRQVo2Qt6nNLIv29x2zQovTcNoClBILVs%2B9bDDpatWyvgtbPLluZGMFDbiEegrf2%2FnWFmNxp4lu9eRoGNfvufFZ0MRA07o685wSVRls%2BF2OZDSqX4n%2FX2qTZDF0cN%2BqeY4bk8tkSdxPgVKZi4mZwnCftvQsoCxfCl7OGcbQh%2B9i9yMyqZVvJrkpSmlXKOlj%2FzDvjpnOBjqkAWKfeqZHR5fHWP1MApyrZitC9NopjgumctziuAGu%2Fszk66RwxsxE29Th4enW1Pth4F06mwlPsXhhHWgnhN6JG9mExfV4Oq5hsxw%2BsEVGtHFoJJb7auSuTZx%2BhoIZhlq232dUKgPps52awyER0DImntkX6lbuaVEdHRWVWb%2FtEWbb2C2jNT0HZml1fJRwWTDIbPlm%2BpxKR54WtEHWms3AFmc%2FpT9z&X-Amz-Signature=14b6a2af4950cbf61a2a8032f0eb3321236180964946d863e747c877d2cd9cea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW5M2A6A%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDJIcN0AFwsJw3GpdIztb2lAlkvSa6cNP7%2FVDTaw4q4OgIgIIzzttppFSdyj3quk040qmDEe3%2BBTRvEtBTcP1tKq9IqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJAW4VabQVCGkjfRSrcA%2BkRZfGSX1zMCRyj4PNuygNUmoi2Fuk0zeXTuZAkk1AuLbwcWBtInOmNKe%2FwWdy%2B74rFIFGLaJudhVdZRqo%2FyUyXU6SbteLJl%2FQ3DahzmWo7UnSfsHOdN0sa6JOzL52dpE7%2FN%2F7rgYIToZyi3zMgxZHvyDIX%2BA4zyCz8pF7o0x5pYMPCXtkWwgPtZKCxPfv8uS5WXyqD9jD2Jn9dtkxJXt%2FHfN47tRvdl3LNWDGeQQbIvmjDpLPu9psTX%2BdkKRe%2BYV3i05RebOKqwcJR%2FcrC%2BYLFXAetkn8WmUDyhWBQI6NHJYG684h0E0Nb5mVNIY4Og5vJEgSNjTay3FsQ6vIo0Rb%2FhXanbfuBMQ2ZntMM49wdvc4DTiyV%2FRTmVgnbrSkMW3lfI%2BlSzuNocUNwoO8quaNDJ%2Br8Ca3q4meErmwqvnygLCZf8%2FagfARCWRIqVPZPYi3jS5gcN1YDk0M6DNlj%2BHY4pLz8eSUUeFG1yt0R7aMecVTnmxH5WDaJZryvjeGdJ6XwoIhBXAYGQUBR29uWrw7xauCZvfiGeRcZ%2BAsuNnsn9%2B9ZNBLYdvttROoLblAw8Bar6mmxESsOqy7l07UZKCyf62w5hg5nEsWI0h95z1kuAV34EWTooQNnRmVFMJuRmc4GOqUBUD5mMuTnmfCKnjrqEZjgWQu2h0lHl41fIBTNPnhbjLUuO3530LygA3%2Fz6%2FAAfYnpsXqsmsSVh4bd8yDL8sv2Fq8%2BgwMGnw6aKRLCc08BAeyGi4PabhL9KIIgrr9LIXQ3Og045fVAbvADSHv%2FtyPklyyTfRr6l84OdDu0l6toqR%2FKf0VjTbjyBrV%2FQaG94AWvfRm%2BZtLtL%2BDlFkX1HctTiJNHolxg&X-Amz-Signature=fd80373346e13fb8ea7cf1f531c2fe757e3bd8e682f1f14daa1434ce3408f1a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WACDJHT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIGVOco1rrOJdTjV3eYPvx68VY8PC4UderzEiK7o82bS6AiAQfyWGTsqsAFpQiCIoMoHSPFYz1KTJzmV5cuEMPIBcpiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPuSzGZVfbqoTdt0WKtwDfkoz60sjJQFJF3nFKoOjFe1POWPEktnCm6feiQCqf7CZCAy5Y82DH1b%2FGqIJCXVNwI8OMPHIbOX6K23vD8ha0%2Bn8vScT6Sugy1xj1urMZs3%2FaYhVzqP2fJ8m4PmDzd2XDlEeT17lj9pAVf%2B3M3miHibYQTx4MDeyz0PBetXV2DgSBYTIG3ET50v2ABmVBOhG3%2BbUhvyGbBtVj8Y8y0YGfp7Y7%2FgmrZYdWL%2BPwie5TRZBAhdMwa9V00VbhMVu55ulXw0Kim78Qqibv6gvTiVGMmPRAOWSHSVzZr9bYQLut9e%2BEDsfawFg9pzbwMvzei%2BsCiyqYlWbi8XYJloE7eO8LJjWGmdB03LUPmZ0mLI3L%2BFs4Fwb9mq8kmEHNC5lBKCikJxPfZftaaDkB7to1OZCj3oYQrr2Z%2FtHsytWA6EqQHTYyDSSfGegOETmRnZe1oFkSH5uOOqKdfHED4eiofW3EN9wxY6Cv%2Fz2%2FllwbDmm0SA3uk1XoFb9Fntw1d3lsXODTBwxgTIEHDpI8kErN0GaYji345sU8K4k5kBImxirIW8FAT9cerm91q2SJxXPNi51c7SSkjbz1k1LsStvAIRi%2FBhgQ6id9updPj2hYLQMHN9lboito1BvwoJzVEowxY6ZzgY6pgHpxFRoPc1KYlcm%2FLNfBgzFRBlniyTHoWFlL1y2f2c89Vp3wIi6fP8hYZ6efhZ1Zlxx72v6Hq9O79x1SwXGo8bihIb0JE3uISg%2BsGECeErMyPJdqOuX1QYY3yzFbZreVqZEpIt1WdbIUT8MnYaQwsPitRB7yYT337gISvG6mLXO4FQslG6x6GUxpOylYIpmG%2BElRi9urLt%2BfhDESjV%2ByI0Ko3ANtoxZ&X-Amz-Signature=cbcb318cf123be40d63bcdfcd56b81a63d5fb73ed479006eb79f191c8d694d2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WACDJHT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIGVOco1rrOJdTjV3eYPvx68VY8PC4UderzEiK7o82bS6AiAQfyWGTsqsAFpQiCIoMoHSPFYz1KTJzmV5cuEMPIBcpiqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPuSzGZVfbqoTdt0WKtwDfkoz60sjJQFJF3nFKoOjFe1POWPEktnCm6feiQCqf7CZCAy5Y82DH1b%2FGqIJCXVNwI8OMPHIbOX6K23vD8ha0%2Bn8vScT6Sugy1xj1urMZs3%2FaYhVzqP2fJ8m4PmDzd2XDlEeT17lj9pAVf%2B3M3miHibYQTx4MDeyz0PBetXV2DgSBYTIG3ET50v2ABmVBOhG3%2BbUhvyGbBtVj8Y8y0YGfp7Y7%2FgmrZYdWL%2BPwie5TRZBAhdMwa9V00VbhMVu55ulXw0Kim78Qqibv6gvTiVGMmPRAOWSHSVzZr9bYQLut9e%2BEDsfawFg9pzbwMvzei%2BsCiyqYlWbi8XYJloE7eO8LJjWGmdB03LUPmZ0mLI3L%2BFs4Fwb9mq8kmEHNC5lBKCikJxPfZftaaDkB7to1OZCj3oYQrr2Z%2FtHsytWA6EqQHTYyDSSfGegOETmRnZe1oFkSH5uOOqKdfHED4eiofW3EN9wxY6Cv%2Fz2%2FllwbDmm0SA3uk1XoFb9Fntw1d3lsXODTBwxgTIEHDpI8kErN0GaYji345sU8K4k5kBImxirIW8FAT9cerm91q2SJxXPNi51c7SSkjbz1k1LsStvAIRi%2FBhgQ6id9updPj2hYLQMHN9lboito1BvwoJzVEowxY6ZzgY6pgHpxFRoPc1KYlcm%2FLNfBgzFRBlniyTHoWFlL1y2f2c89Vp3wIi6fP8hYZ6efhZ1Zlxx72v6Hq9O79x1SwXGo8bihIb0JE3uISg%2BsGECeErMyPJdqOuX1QYY3yzFbZreVqZEpIt1WdbIUT8MnYaQwsPitRB7yYT337gISvG6mLXO4FQslG6x6GUxpOylYIpmG%2BElRi9urLt%2BfhDESjV%2ByI0Ko3ANtoxZ&X-Amz-Signature=53b668c409378f7e1102ea8dd79db3a92890581ba1999218281d0da53c4294e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFI6APNO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIGI6mRZzuq3%2F7r3elwPt6zkktbgovKQgRWjRBc%2FV6AZ3AiEAso6CSjzge6aAnA%2FyWzOcyqomLk5KKmUe8kaQyLZn2OcqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBFjdHXBUK8Kf%2BJXNyrcA6aZWA5a3ztthP9hePUZQDQOTieMzhP%2F0uy0HjvgOtyT5%2FxMpDzkc0KNolG0NrNgkvfdvgQxPZB15ROTHiLjqInaA8hhmKmqVeksNOw4gfWAMioVS1BUBfOPzLgXuCGCfnmVHTnKlwNI%2BbiGVySBU%2FsGje8nu3V3yg6q8TWFFyr8%2F7wxyUv4bmuhHw2uZHrGQ3Rkf6EE5zCXJc9WvwVa6T4cVi7QYSuMdS%2FQvBPpwQRopTOZb5RbGZ%2FdewPusjND%2FLFb%2B0j9Pybk47leeO%2FpIrKQ3XVTdqxQ5RahSURv5vIcMC5DhbTuLNRyfw2hbPvCFDgj%2FgTzorbLPHBXh5lfC76GtHw%2FD2vAp2GLOiP%2FpzFltvPEVcDjfVdY3KVYk8KEODoo65YX3xU3BaqjWzqsVFDwYJ0627REvA4X5ll%2FZtNRTu7Se7Eb6OqXAmY2ahib2p5gnSwodog2YcdTBcX7uLobX1vKeuzZ7mlg3BvXMP7sXhgkxrCAkT0XaS4CERMEpFRSO%2BKtDY%2F0QN0FfwsoOQ3QtoBCf0At0d8sM7yVj6XxwQDGx%2FP68CYwwD3OidaxhzcOkbIFrhBKM%2Fdk%2Ft5PgasS%2B0CdJVwgIp8BbhrFk6Cwkao4ow8%2BeKHI%2BEqAMMWOmc4GOqUB4QQfeCRDjsdBrhPbjuEKdSbPZ5%2FXrFW7OLx%2F%2FRVkXw4qXmybD2t9600zb2ATLHLeUyKH4ONQZ1%2FR%2BK58nVGfSpxLLWLpzjVkDQOn1rIkmmmvmeQdISAFjsGKAGbm43SXSFLyRyhYlab77rflCL6LZcIwotderLc9Vx%2Ffx5%2FVHhf%2FPEY6RXdwrJK8GjpBy4w8twipD2rBeFppmGUDBSZX3lUeuX5M&X-Amz-Signature=0c273bbe0fc2ddb1a7b4d6bf318cd338b50367008c5c34fae1debae6cb8bcde4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHKJEL4W%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDaNWUGysgGKWhzelKrnVycHEr%2B13r8ZsYO5kSG%2B6DHgwIgCNDayn4Pc1Gi2K8qBX3EIhZfb0iVqGuQiyvsz%2BjsSb0qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL7C0dEW8k%2Flusr5aircA2Sy1PJdLD7m7I3bodQZS9kz2mSZEO99Kt5ulAF8j0UdK%2FKxJTy1BppCGjQZWdnijVNX9ei8Hgy5xeR8CIdHHe36y%2BGKRiP1hy4yOf6BfpMaf4V91mYC0B3qp0OR1AA8QhynDnr1Zq3JsLuoK%2Fpo%2B8t4INfiUUmxKMC7%2BqD3B4PLQtgPEz5k2rbaHO0cIIZVUjoj8P7y%2FiP2PdTq1kacWZhmOzI4FitciA%2BFRZO9u5UxIaJFe9CyXDMp4KjfC8dkdOA%2FdRK0Bp38W%2BX9B%2BuNZvD7YsjcaYkp5DYNcz4b35azfzHLZVZEVFlPS7myZO99qfBLiNjzKPX9CMtpo7ZdcSaDzEZ4cUdBPpE%2BfQdIuXoryxxcxsmXod%2Bng0JHoIZymebNGd6wv1%2BnuT%2FdG6p3VBARrNBAvJYTv%2FCvqOqF%2B%2FMtkBTuNFWYY%2BZY7mJeDSmB0pH%2Bt2UEBYE4s4d3f3x5BuEKL0b%2F1iD0rG9NbglqoirOon8%2BLlxhEWwrM9FNcTteZDW%2Bpxy%2FZGC8oHZdAvhf6RLEb1Qt91ZtuAVCKdBCWGObYX57ABURBSncfbo7jyr0AbHAoO16a%2FmPh%2Bfvhmc8XOjOoeBtD1LJVSz8Y1Td%2BqdSF4oyThv4bfimR80FMO2Omc4GOqUBxYkwhKx16UNpdJ84BcqS0a0MWZEEAiGJZrStXSRVtc%2BOlDBA7c97LfXPk%2BYjvIyc6%2FoyBhid0Tq5BHR4gVN%2FoMUD38GsflfuPGFRhQ61psRJZ6ikQewpSZbl26jCPgZ0BmdVzBxQ6N0wfPmry2NZ1IvOg5RetA9pugU7CYAG%2FwITMuUdeKcbufMsz%2BoDGjNxPYHBIiCbZmqIddkj8fJUJaUnoyjH&X-Amz-Signature=090bdb37d9eb00be3af8e4252f63772e236d3ba5398fd76dd22ee733321d9abb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHKJEL4W%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDaNWUGysgGKWhzelKrnVycHEr%2B13r8ZsYO5kSG%2B6DHgwIgCNDayn4Pc1Gi2K8qBX3EIhZfb0iVqGuQiyvsz%2BjsSb0qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL7C0dEW8k%2Flusr5aircA2Sy1PJdLD7m7I3bodQZS9kz2mSZEO99Kt5ulAF8j0UdK%2FKxJTy1BppCGjQZWdnijVNX9ei8Hgy5xeR8CIdHHe36y%2BGKRiP1hy4yOf6BfpMaf4V91mYC0B3qp0OR1AA8QhynDnr1Zq3JsLuoK%2Fpo%2B8t4INfiUUmxKMC7%2BqD3B4PLQtgPEz5k2rbaHO0cIIZVUjoj8P7y%2FiP2PdTq1kacWZhmOzI4FitciA%2BFRZO9u5UxIaJFe9CyXDMp4KjfC8dkdOA%2FdRK0Bp38W%2BX9B%2BuNZvD7YsjcaYkp5DYNcz4b35azfzHLZVZEVFlPS7myZO99qfBLiNjzKPX9CMtpo7ZdcSaDzEZ4cUdBPpE%2BfQdIuXoryxxcxsmXod%2Bng0JHoIZymebNGd6wv1%2BnuT%2FdG6p3VBARrNBAvJYTv%2FCvqOqF%2B%2FMtkBTuNFWYY%2BZY7mJeDSmB0pH%2Bt2UEBYE4s4d3f3x5BuEKL0b%2F1iD0rG9NbglqoirOon8%2BLlxhEWwrM9FNcTteZDW%2Bpxy%2FZGC8oHZdAvhf6RLEb1Qt91ZtuAVCKdBCWGObYX57ABURBSncfbo7jyr0AbHAoO16a%2FmPh%2Bfvhmc8XOjOoeBtD1LJVSz8Y1Td%2BqdSF4oyThv4bfimR80FMO2Omc4GOqUBxYkwhKx16UNpdJ84BcqS0a0MWZEEAiGJZrStXSRVtc%2BOlDBA7c97LfXPk%2BYjvIyc6%2FoyBhid0Tq5BHR4gVN%2FoMUD38GsflfuPGFRhQ61psRJZ6ikQewpSZbl26jCPgZ0BmdVzBxQ6N0wfPmry2NZ1IvOg5RetA9pugU7CYAG%2FwITMuUdeKcbufMsz%2BoDGjNxPYHBIiCbZmqIddkj8fJUJaUnoyjH&X-Amz-Signature=090bdb37d9eb00be3af8e4252f63772e236d3ba5398fd76dd22ee733321d9abb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UU6RJEAA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T094045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIH4O8zqcagzWF8tIFl4LCVWFJwpEB6i97T6M1M9bqWUBAiEAt34y%2BaXUkP8lBSckQefk%2FM69Yhr1CKuS3i0i0PeF50EqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNGqMoeRjPO6OaC0SyrcA3vaqGZrJLAC2eFMzSN25BGA%2BKmDJNZYbh04vUoBYqBhsqsB7AUbjQ27DGzDI8dLPU7OJwKe5Cm3UL6w2dzHjqsYbuVVnaursiSPemlUjtiu3futhrHIrMKhNuMEMrTsmupvJEldkWX7n936SWN8oRO9NQgTpswYtTjm362AvfrzroYsDHSZuDR4gF2P2OhWKJdtJFZUkaSmlmm6cxle9YDgDrgQRN%2B%2FdF4D%2F1YC2hPMumUW1UYSjfWMXSS%2F0MEeAteSFDbUaLcRlVq%2BfmVqVi64n0MVxeUCSYzoZttHp0929jCrOc%2FESg9DdByQrTZ4lJT3xFL%2B4VPTypW3CCDC9Ujynp1otA4D42%2BPP2k%2BgBRRSM0FvvgbM0p71tmtiioUMgFx%2BSTKQRznlC94XcCEQx5dV8L%2FeUSIjTpC8Qc%2Bqic2qbup42BrgPDy%2FeBArVr0o5myxjnd5IB3sycYIQlgxzUUctY0LCzqVpbS27hhqgHYB3f5fzQaa2iLtpmKvVpNhbEbpWRk1PMr3zGXL7zJeSnk2Hwj7ELQAmNNS8pHkdw9Ho95Jkgy80WfmUf9ymh3j%2FUUCw6Rj8yhEfllhklFpUGodugTG2PK0R%2FhcYVpFq6Tmp60ADvKRD3f7wXCMJaPmc4GOqUBr5Qcs%2BYn1QFGvprA46fUKJorI8Gx%2FECzt93%2FNYzONihqGgims1BE2%2FG%2BNr8O3BUv7jkMm7pQGokaecPh7PejkpvawP0VX32IbuZt2dV15BEmYdabnFpOqp%2BpTQGlzCyY4eJbgLP5EZkmaEtcvqKyRa0gVZqRIr%2B%2BW3vDsbvHSCT7td7efJnzETkFHczPyk4LobKBbGdYOTfUrPgORq3mnVofRHnd&X-Amz-Signature=14f6869b981b48eac310c172b7ee8f259df94b2e563f44df295ea3ca5afc318b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

