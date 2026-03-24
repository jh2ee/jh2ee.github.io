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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626XOD2SJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXMjVtBP3n07wtfD8dfIoFAt2rGNyulfGzP%2BZP9ObD2gIhAJWqAqLpvGYJuPNWbGNbp9wrqlovdfM3368rETNLH3tOKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQIbd%2FfCj04iT9uCgq3AM4ePFcObSeXdsyuoxATDtc6LLpFOTrAZm9jHrCwDjIHCSpfvKmvwE6itJWQ3lHPJx%2FNAqh2fPqFgvTXHR34a7bdH7JyLggyoCCHbgmjXm1CZfrLurwOZVi6NPNdru9xnFOKTc5E2GU8LZkc6BTEvlc329p%2BbBJA5fMV0bIQWMpaz80wsO%2Bh5pikmb64s5nPyzo3%2B8kPoHJALEZ%2FG3TAf8Z%2FV%2FpbIJ0c%2FL90LBGimIlBqjAkL7C7P82DdypjyYvWp3LvttAB%2FqGP45OALDX0YRx4%2BNbuYG17qoc4BuMWBwgfhG85jRq8%2BVL%2FbSLEpdrlN2hAHHp%2Ftff%2FjAR2gQUNd%2BE1HhLEZQErH%2BxXqLGc5Z9SWa%2BL8FoKV9825UwLDaGLSc0%2FuC7BuVlgkcHJslc6gZ6kbNXWB6O2jSNYlJHnp3rHNiTB3vN2Vic7VczFR5pHfAicLL1rXQnyL7T%2F%2Fvc09czgbT%2BF0vzJt6xrwZNprC6M53zaffUa5gcdYc5y1t1Ymx1Q8q0g1zGqS8%2B4RHCCw85WhITlznwL2zynLYqcQJYJcPE3jnQM3vZkeXsYXNy8KwuRieLnuK3G%2BWSTuWoUunFCeJKQP5eNY%2B92ikfpVwETCCbUHqY36h1IY4G1TCHrYjOBjqkAUFhTO5IvLvuRrYO2o1%2Fzu817fUA%2BEDeqsbb17zBJIRrG%2BsNtnMpXWxMul4r%2BUTf0%2BchANGCaqo7%2FCwJICzPJe6K8WJsdbKEFTBVZ2xc9MTbFfXR%2FWSW3YQDZAojneuO4WsGdmnSdr7w%2BLDBjNL%2FhWS6G9gzlHgcvh%2FGPEtsNQwnwO1DyXADYmu5jFFM1TpLeb2Ow7N8SeZEVJt01h4vyN9d50UQ&X-Amz-Signature=b612725f49e7d32190ad8896fc4f076f275074ddffeb3664b3d7b81f77309c6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626XOD2SJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXMjVtBP3n07wtfD8dfIoFAt2rGNyulfGzP%2BZP9ObD2gIhAJWqAqLpvGYJuPNWbGNbp9wrqlovdfM3368rETNLH3tOKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQIbd%2FfCj04iT9uCgq3AM4ePFcObSeXdsyuoxATDtc6LLpFOTrAZm9jHrCwDjIHCSpfvKmvwE6itJWQ3lHPJx%2FNAqh2fPqFgvTXHR34a7bdH7JyLggyoCCHbgmjXm1CZfrLurwOZVi6NPNdru9xnFOKTc5E2GU8LZkc6BTEvlc329p%2BbBJA5fMV0bIQWMpaz80wsO%2Bh5pikmb64s5nPyzo3%2B8kPoHJALEZ%2FG3TAf8Z%2FV%2FpbIJ0c%2FL90LBGimIlBqjAkL7C7P82DdypjyYvWp3LvttAB%2FqGP45OALDX0YRx4%2BNbuYG17qoc4BuMWBwgfhG85jRq8%2BVL%2FbSLEpdrlN2hAHHp%2Ftff%2FjAR2gQUNd%2BE1HhLEZQErH%2BxXqLGc5Z9SWa%2BL8FoKV9825UwLDaGLSc0%2FuC7BuVlgkcHJslc6gZ6kbNXWB6O2jSNYlJHnp3rHNiTB3vN2Vic7VczFR5pHfAicLL1rXQnyL7T%2F%2Fvc09czgbT%2BF0vzJt6xrwZNprC6M53zaffUa5gcdYc5y1t1Ymx1Q8q0g1zGqS8%2B4RHCCw85WhITlznwL2zynLYqcQJYJcPE3jnQM3vZkeXsYXNy8KwuRieLnuK3G%2BWSTuWoUunFCeJKQP5eNY%2B92ikfpVwETCCbUHqY36h1IY4G1TCHrYjOBjqkAUFhTO5IvLvuRrYO2o1%2Fzu817fUA%2BEDeqsbb17zBJIRrG%2BsNtnMpXWxMul4r%2BUTf0%2BchANGCaqo7%2FCwJICzPJe6K8WJsdbKEFTBVZ2xc9MTbFfXR%2FWSW3YQDZAojneuO4WsGdmnSdr7w%2BLDBjNL%2FhWS6G9gzlHgcvh%2FGPEtsNQwnwO1DyXADYmu5jFFM1TpLeb2Ow7N8SeZEVJt01h4vyN9d50UQ&X-Amz-Signature=b612725f49e7d32190ad8896fc4f076f275074ddffeb3664b3d7b81f77309c6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGLU5IH7%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFS0cutGJqNawAnfrLQlTTf7lQIdtJh2X5sX4EMJoKHQAiBzYvw0R0tFee5DaQYsO3t3y83bwfQF9uO%2Fb4LWGZeOiSqIBAiO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQVMDIwAyaUMwhk35KtwDuZqiBuHiflN56uelihVJHbxRO%2BwR%2FA6d5TjXcWSYVTl%2BHKWx5S599IBKycfDJlAoByVvwf3mdL2kufqbumgbo1gvR4s6ULPPwg2uLNe4nyuACgwqEXjwQKuHztRIoF3igS8AWlZz2lU0nK0GYg9bHaA5vvvn1wiEBwwC5mfATvzcxK7ULTQD%2B0h0B8hoB22qM5dqU%2Bbl3%2BEb98VJkRqiNz%2BASgZQSGWRQj9Z1xt9TtXC96Gz36f77YIcUdrFdi%2FlWT2wKUzqeg8e70bQlbh2mSYTc3TMv8EDfnJHrm6QWRASZ32iatedNT7FzTEa%2BKqX4AvdNYtURlYZrihR%2BRmI2s8w6PpGp69u0G44XTBYmUWe945VyJoeji6giOUv2Bwd49tFp7xIhOlqU0FcvYU8btYpUEF5T8HrwJmU1n44xAhojyivDz3QBo38q6sQaLcVmcSeUMzBkQ2l0jjVToNTkfkfnwcY%2FIb2PzOH%2BcRkMXZv20KTacZT6zbzxWfxTPlxObUiHBs02DPwyd6nNRTBHNyo6o7y7khJ4ButMs6QcQLNK%2BbSCIkZ9koz75B70pjpVikkhGeyDVSUPNPJxMQoe04hmRoNahcILGAN2iI9A2EuJQrNgI8wCaEb2Dww7ayIzgY6pgHohahh%2BU946yDSPnK4JZH27TIgVV13uKrrPjN9lWD8jv0VJBbGpAuwuZ48Ozf3zxo7k7TZMivdj5YZIzvsNLeVSw8v3P9wryd3B6SyQbCJX2F%2BjPgkj8lhs5GVYWxLP0HjIryVpbDagKkwZ4U2akrRgb7xPKbEkEnTOmzjbMflSZ%2FmfpZ%2BlfwaLSXZwd3Ke2QowmuNQDyRX64f4JpA0e8Ji26KbLPY&X-Amz-Signature=d8dd52105ac4232b0cf48cba3d497dc6a6d24f7e2e9dd87e779ad4959ef293ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKKRXFGT%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaBKaAAj6uLZpsQ6QutvfLAO1Sv3acAcgmufJYNyFzEAIhAMycQqz2YLmFxXEZx%2FMNFejg0xEtZWiOStVEbU2tSQyxKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwgv1OkjQiP6BLk%2FU8q3ANMPpNoQNjHT%2FxMj%2BSkAZjd2v2k8x9Hx9eWNVbxnOcIPVWPnKjSEQrsgwoEKB%2BKaulUUCNMrUowV6d90nbmq1%2B6EBLQYSneJJj842Ssow%2BzYtO1hWUvbOkZnytkoaerXuCjZvgEL4%2FXJKZHDvmnvSgMHLtpoEVUU3Wec43ewH21RojuS6wXCOvVhYgheKzUblWW1Rm8u3K8SfcwQIn7iZ%2BFPa3quy5AqJINx7eel5BGtJjT80gWNg0WtO6lFOJG4xA9M%2FiHHBNoo7XxnX0eRcN8rBpat482IyZcyyZAlxDNsO9P7ACS5s6T0yQfRAm5jKL7BI4AGSjKk2GTllJWeJsRK6Q%2F8jntKtgUH4EoKIR08x17cm3W0ELba3%2B%2FI%2FOqKt8XmGPrfCwsLZn%2FDu%2FqSZmxr0f%2F2LyB8JabZcXVBWcCeJy4udGk9nR0UFt3QnX4z5QORF3BHZWXurJTfVuu0j0cJZVNMfxCJnMOM0p6LSPAtEVbE7IscJqf9GkLlaz5Zwaq39ttTzjJzK0rPj0jhxwS%2BruFdEfor5%2FA0C70AeTr3nmO%2FQHJVZDbTFFD2cr1DIYVtUMzce1%2BFeyNok%2F007vFMH7PvtOuPNWAu1J8WFS9%2BDGTzPDsjUwgoLSfezCCrojOBjqkAcjqKKhijFI%2BhcTaDEwNZA%2FbTsSNIfqXfE3ftKnrqSEwDkr3BwLWnjjkV6SHLGNLCCxoB7NwbjHzmVU8hEhzkPJqR%2BSMeXdve5TghfqZKdWa0dzFPkr1CEOt1DKEsfTW%2BLmx78an7PEKpjmx5yrXij3We9x76jNNqaogJ58ZRPVax4R9Y09wzegHlO7fX4Ny5MyCY3JVvZAmZPM1DnDpAsIvj8R8&X-Amz-Signature=f0d48afbeab85d6ca1f8f7cfc84d66efbc9306259c4e132e9dabfa0c141975fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKKRXFGT%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaBKaAAj6uLZpsQ6QutvfLAO1Sv3acAcgmufJYNyFzEAIhAMycQqz2YLmFxXEZx%2FMNFejg0xEtZWiOStVEbU2tSQyxKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwgv1OkjQiP6BLk%2FU8q3ANMPpNoQNjHT%2FxMj%2BSkAZjd2v2k8x9Hx9eWNVbxnOcIPVWPnKjSEQrsgwoEKB%2BKaulUUCNMrUowV6d90nbmq1%2B6EBLQYSneJJj842Ssow%2BzYtO1hWUvbOkZnytkoaerXuCjZvgEL4%2FXJKZHDvmnvSgMHLtpoEVUU3Wec43ewH21RojuS6wXCOvVhYgheKzUblWW1Rm8u3K8SfcwQIn7iZ%2BFPa3quy5AqJINx7eel5BGtJjT80gWNg0WtO6lFOJG4xA9M%2FiHHBNoo7XxnX0eRcN8rBpat482IyZcyyZAlxDNsO9P7ACS5s6T0yQfRAm5jKL7BI4AGSjKk2GTllJWeJsRK6Q%2F8jntKtgUH4EoKIR08x17cm3W0ELba3%2B%2FI%2FOqKt8XmGPrfCwsLZn%2FDu%2FqSZmxr0f%2F2LyB8JabZcXVBWcCeJy4udGk9nR0UFt3QnX4z5QORF3BHZWXurJTfVuu0j0cJZVNMfxCJnMOM0p6LSPAtEVbE7IscJqf9GkLlaz5Zwaq39ttTzjJzK0rPj0jhxwS%2BruFdEfor5%2FA0C70AeTr3nmO%2FQHJVZDbTFFD2cr1DIYVtUMzce1%2BFeyNok%2F007vFMH7PvtOuPNWAu1J8WFS9%2BDGTzPDsjUwgoLSfezCCrojOBjqkAcjqKKhijFI%2BhcTaDEwNZA%2FbTsSNIfqXfE3ftKnrqSEwDkr3BwLWnjjkV6SHLGNLCCxoB7NwbjHzmVU8hEhzkPJqR%2BSMeXdve5TghfqZKdWa0dzFPkr1CEOt1DKEsfTW%2BLmx78an7PEKpjmx5yrXij3We9x76jNNqaogJ58ZRPVax4R9Y09wzegHlO7fX4Ny5MyCY3JVvZAmZPM1DnDpAsIvj8R8&X-Amz-Signature=2556166f3800384fb6ce43b7cfc3026bfc225b95118df1d4b64f97872e408f14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOFFNFEY%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGvv5u2AoNCiEnOlDplJlSswDNM64sJ90mgplXSIxj2DAiBdVeO1YUBLE4Txu9HSE2RdMbyZVH%2B0NHefLaRSN3NVkCqIBAiO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT%2BkRVrr%2BPWY%2BmWTsKtwDJdo4aUywOguqBwWJST%2FtbdsXJkJ4xAPbjjCNpG6HIl0EGPeEftUlQvKWUO0KaE44dEK%2ByywKbVnDogTKurXZA2XgvYYwh5FbalrvBfcZXjLNAtdbtGJ7hQTs%2BeMQO9GVN0VERCzKdSYvUBUTZi636s6xWReHJUpFo%2FnYIVFxwSL4N5VcYDcZoOxPaLwxqan5bD0nJg0otSzKyQiPNymwyWD%2FVAdJOAhTPOEdvXsc7tDRZCBDMlwXZD6kKVt01IEauD5GPDxj%2BGksHw3OXAppF5uc1CfyJsjIHDF7Xt5s2GUpP8c9EqKb5Scm2AV%2F%2FqI1wIQq5pprP2YRec8%2FmijraKm1m1H%2B700OdT4RO%2BrlxMES4xBMZnEtFH1oUGFvDKbdLUVsbfXTplwXuMoYFLjz7nc6NReHRDbnR4BLvOtY4OYJ7GGyrDFJIhA4wZqOz4pT9YGK8mYk4LzYTLW3l%2BwJUUiQcFtOFrjlMAt0JU2VyGuE0pDmgRYLkW%2BgkfjbURTVnJMsTcLY%2BW3gNCzyu%2B5TN1Exbh3NwjBUBWS86vIu0TFDewKOAcH9op6cafnV0%2FyG7jgCaOn7kRyVeOIJtANg8%2F7qtQ5n7WyJw7LQ4uQy8p018QE4hquw2guvWdUwq62IzgY6pgELT9jeynuNr1EWwqNaqvWF2%2FdPpyh3mlqP%2BRMmWqYR2jZj4NPcEfWf3JmnnxMXCHP28q%2Br5eQPEfAG48B%2Fsnmu1ilZMs0C%2FXFN42W3fW8oEFgeb7AtYJzxcKsBXtjnCxl3Cilv3hZ2ftOmXNItElgEW3sM32XbwOm9mC2nJA1raSxFoqKmKLz5Y8XG0r4FMySOLJ%2FdWyeyTwH6yVoTY7S1eGvLGaRQ&X-Amz-Signature=6439d9b65de8aef1403ca6741c634035166e60705e25d8201fd82f2d844e07d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZ4JUBRO%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHTJy3iwCpBe6n4cMKt03SEDoqNsnxo73EbCDM%2FTNjg%2FAiEAr4oJKFDpJlFZwWGcpnUJIvRnzWnYdIIw5Pkbglsvq7EqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIMd6qm4%2BLPY4D1MISrcAzeHtTaOKsTcAhDmKy3tAR1gI9mzucjmi1XGHzvfHMvbajpNSeyU9r788sXYh%2BlyvknW%2F3yiCcajT6RIfpu3cj1EYE%2BLsjL6S8Cz8hsyqc19mXya49GKbAUIZDSbYmzLzdJVd9qGFjELhQNU4IibZcMiOajlq3CU%2Foa76UvWOq35zjpKHWIrsr1fO1f3Xc%2BXdVStXP%2FyeFVxnPPl1aWDX25ViGnaVyPIhFQPoOUAPYMKbsgkZKDT0%2BlHUeOreL32g0CsBfzc286dMuuWGLIb0PRRNyvPIByFhachM%2FRYEDtu7CfzCInkmx3qn5FdXfrK9UWshV%2BmPZRSWcGzNOKv2eUmyhcvn8Qaxlt3pH7EhXP1j5mUyLyKoaE7s4qRS81vq2xmWC6UZuFBw6jucvh6K1wKxdOhWPsmG67djbqNOwpKNZxuy0PN8zxwTa3fE%2FBqLlRTT1ZNOS3yJ0XVqcQ5ClS1%2BV7J4RPKZ5wZc%2FbBHBvgOomwjKeta0y4NAPJqrSeGF%2FZx6VLSKBTfn8nkOGDg1KQHS8Pp7yUo8s8U2fnspR%2FR5lT5mw5yZH6A%2Bb5fgANRq3KXCUx1zXxfiiOYN60YsyvaVigI9U58ZuXnVm%2FlKQaWAPLZVWoz2nfAaR6MPStiM4GOqUBVfzUY2%2BhqTsRxc58meGNFick%2Fu2zn8RdyW659suYkA9IcdGDLL66HBQEqCpwqL5ziWbgjEoJaGq7gDjzWwZ2L3OS%2F1s4ZNPzLAwWgEbXZUM6%2BuBYg3K8wM5x9Dyuenf4K2QyM3yvkzS%2B7omMXgcN0xN6M6iSf%2FovefT335puNqBZKeXIIaZyaJpLpX6bupUsD57b2nud0Jm3mrQ36Iud28%2BPmuam&X-Amz-Signature=399dc1c3fbd9aa198a49f4691930c26444a1e0e774472f1db1ddaeeb8dde7030&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS6YQHTD%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB3RXj2NtTJHdAllfkfpunJnjJFs9EjIRTug1%2FfxailYAiEA%2B3Ehy0UjlDsIjHbhXckPVA%2BPRytOnhRH0pw1zqN%2Fb0wqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLRMmBxBkUi0RU3nlircAxJXVVk2Oy%2F%2Fp43aOPXi33RZuyiRvGnBbFxd8A0eMIjC53ZJgkHv8yZZI4v6M27651iY5RHzZeiUN8TBDfGQCmkXCiUW7e63jltEFSAVkoL6Bkk0BylFy2j%2BvAhqb9jdily7EFyhGqSwLTx6HqjpRch2lxNy%2BxXb1YViZJOdnri5OwCljseYgu8yEIc2Im6ziDp0cj%2FfihL6PrViqi9%2FUDzA3Dw5ZZw5sUJqKNWjkCWbNGX2mZ5P%2FgiOMw59Mm7n8rfT7MPUoOgGvHEUDNh%2FstIr9jbmy9z5NgIXv%2Buk%2BDoM5eTiUxR1nQ8CSP1gkaFlBQ6IucE5hvA%2FIO6s4AMtAWiq8qd4darM3gmzj7RCjJfLhQloiXOeNhUbwC%2B3I4ZiTMcskCme708i62%2F2V%2FRSxbLf18rL6UH4xkBhBx%2FgAXApxkpMtnHMGOqZSAswG1GSL6lKCjR8Q%2Bhvx9w3MtNhwzce0UDS%2F8JYEzZ1QCIgrg1frFp9%2FIpB%2FXY2x%2BjCn%2BAt6BwK%2FgTjKKQBruDoz6MYiqTSHGB1fZsbHo26Ko2UmYbH43euPJ8YKDOZ4PtCmw1JKNhWLQZUg4hjuhO68zGDPqBxf%2F7QYUdiw2ckEER38f3itP4K5Nbxc8LtgGqEMK2tiM4GOqUB2U4sG0pSjTLHVJfwvgjn6AwkAJszWaE%2F1aYzP%2ByErz%2FZYkX919WOlkWzZjKJsYMa6DR8oAwJ5kQ0q50p1XR0QNaFMUWFjRtfdnThHUIo9t7LSBvxJfBAg17Vgp0qWQQ7y1TaTO%2F1nQNrhBSHcfYaP4Yx44d%2Bn8zKSQXgxPanRnSxTY2nDLR5geYY8ijQdRZq4GTiVtOkDexk%2BGUtTnl%2BO4Ve0%2BDX&X-Amz-Signature=4501d083327e5b20ae3c919786ffe898f59f5a6304197bc14096979a54027bff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNAGTWBR%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAZdcraV3tEjMy2C9XmfuKIocm9ThVwH6r7dJ%2FVjlfbDAiA05Zm8jpatzQWU%2FeuZsGTBJgN2cSW1VNdd0%2BP9%2F4yMJCqIBAiO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMB4Gx5dtQdqHSMR1FKtwDpT%2BzOLKaNxVg7zQ%2B8xl1tdwY3Ge5YTcbEcWRlZY0Y8TLh3s22fN73EAa%2FYVX7%2BrFd6VdgsSDPZ1yOWP%2BjFjoXk94aDckj2fO0H4kylKb7BiEvj386ciq%2BJlbJrlDZTho7Luggdpx5j%2FOz9mNBcn1TimqzSl1nIXJvKcSkdynqo58fj%2BqJ0Z5W6Q56AR4ntRFXTGp2uOo5Mi1Q3pslzRI%2BPmXB2XsHiLEUmP129L7UiE6Q0QlO7xGPoxKxkNrbbgEjJZ3bgQcB4lgdI8KF1HhI2%2B32V6aHAON%2FozGPbOtlSHJvVAQmOIt6Hm%2BiB8JjJsN2mR76dB%2FwF2cerib50BDLhY5%2BqVmOlYsCCXDIuDjimiqVndRqwVmnfBJjCOK0LjQ9TPfPPuQjOAebpaGgzVckB70aLtxDU8MUIwU5CvEBtT9pqTLBYNkGNweKZHhhP75rtJzlAj1Qhfs2zoL0cJdU08w%2FirpMghTIdaSyktFDJ6rYSWgJCkKS9T%2FLlV%2F3QDKJs%2BfeQAyYQRPQyf7HvZP0DdXh5qnrroNSVMF1YaPrCzJQcSHLwe80mgztGxswQlf%2BvJPWPfFnXZ3PvHS7jY%2BsPqF338g2hmUKVJUZrSA6MKXrG9U2ffIpHeHz2Uw2KyIzgY6pgHRm2Ia0oE%2B9f8nt0gqiYHqFGj7ae%2FLVLyPafyIeiSH1vU9JjiUwEFeQn71XOun9DVy%2FmuLcD7ddMkb6GWo4nVr3EHM8MsVzewLpK9NjW06y2BjLK7zy6sGMR%2FoFQcX9TQvLJ1xXrLyyhKUhC%2Fpk7aUpOPSjv%2F2uoQZ0PX0IabjxpstiKOdzUmi88pwWVYkrItLM0FWAL6NJRrnpqo6ajFaoQZsM7jh&X-Amz-Signature=fd0a9df8ca7a7aa04fd92f5d5162cd32b180c77433ad1a165dcb5a050ec021cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNAGTWBR%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAZdcraV3tEjMy2C9XmfuKIocm9ThVwH6r7dJ%2FVjlfbDAiA05Zm8jpatzQWU%2FeuZsGTBJgN2cSW1VNdd0%2BP9%2F4yMJCqIBAiO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMB4Gx5dtQdqHSMR1FKtwDpT%2BzOLKaNxVg7zQ%2B8xl1tdwY3Ge5YTcbEcWRlZY0Y8TLh3s22fN73EAa%2FYVX7%2BrFd6VdgsSDPZ1yOWP%2BjFjoXk94aDckj2fO0H4kylKb7BiEvj386ciq%2BJlbJrlDZTho7Luggdpx5j%2FOz9mNBcn1TimqzSl1nIXJvKcSkdynqo58fj%2BqJ0Z5W6Q56AR4ntRFXTGp2uOo5Mi1Q3pslzRI%2BPmXB2XsHiLEUmP129L7UiE6Q0QlO7xGPoxKxkNrbbgEjJZ3bgQcB4lgdI8KF1HhI2%2B32V6aHAON%2FozGPbOtlSHJvVAQmOIt6Hm%2BiB8JjJsN2mR76dB%2FwF2cerib50BDLhY5%2BqVmOlYsCCXDIuDjimiqVndRqwVmnfBJjCOK0LjQ9TPfPPuQjOAebpaGgzVckB70aLtxDU8MUIwU5CvEBtT9pqTLBYNkGNweKZHhhP75rtJzlAj1Qhfs2zoL0cJdU08w%2FirpMghTIdaSyktFDJ6rYSWgJCkKS9T%2FLlV%2F3QDKJs%2BfeQAyYQRPQyf7HvZP0DdXh5qnrroNSVMF1YaPrCzJQcSHLwe80mgztGxswQlf%2BvJPWPfFnXZ3PvHS7jY%2BsPqF338g2hmUKVJUZrSA6MKXrG9U2ffIpHeHz2Uw2KyIzgY6pgHRm2Ia0oE%2B9f8nt0gqiYHqFGj7ae%2FLVLyPafyIeiSH1vU9JjiUwEFeQn71XOun9DVy%2FmuLcD7ddMkb6GWo4nVr3EHM8MsVzewLpK9NjW06y2BjLK7zy6sGMR%2FoFQcX9TQvLJ1xXrLyyhKUhC%2Fpk7aUpOPSjv%2F2uoQZ0PX0IabjxpstiKOdzUmi88pwWVYkrItLM0FWAL6NJRrnpqo6ajFaoQZsM7jh&X-Amz-Signature=32eeceedf22568973c9fc855d6fc4f27f92f283a385aff0c8070ef6a9fb528db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663ZL5NBI%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjBHAqCTraF0xp%2F3W0CvM4JWWNFXcQxjqMBUjkcVja2QIhAI5FfiXlq2akY%2FbkETASc5XenlRnNK8%2BJBVs%2B16Wg1EtKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwbd%2B7IdVGwrTeOcMkq3AOP%2BVs%2BfXF4dE0iRA0KXUikuvSxueMFEzCkY1fFnXlAccrzwCyl524S2XwUFpirpyjIUXy5svoZTIYGmDMTe0qvkMmzNGykYCisqRA8NqqkKxLlQ2Gbias%2F5OH3ADXAS1xzToklgeRTlOtJlt%2BpRlfQ6Kx7eCowi8%2BhuV3dRVhZxqKjJ3Snmh8ED4oAWVQrs3ritPNRFyeFMnkMrIHAR6W%2FQaTJh9zMLrkYGQI88WJ4Pv8%2BdICch%2FQT73x5EITO%2F690AachQ2DUNcA7%2FgrUM2dHLB7aqOH6UKm0GlXH8AMoUfCAGDNqkty5%2Bm9n6x3F66V35J2wqQSiyNz4NqknUsYaO5DZTFRlbYrP5fqEU1Wz8iVKT%2FRTaWp%2BnesPNpBQvSTPCVBlXkDxQaWAoVzSskpUgXLefmW%2B5%2BpW8Pkdcs1risr4WJr%2Ft0oOGNvEXW%2BNgnS%2BIK9Pri%2BIysuY%2FLDeViXc7Mv1AAwQj3cdnYToej072IBUdkbp7SBGBtah%2Bs3gFCR8rkfL%2Bk7MEcE5B4G5kUJKicuhbY9SrbYUE263PP%2FF%2BT5M3QJcmHa3%2B5rHCC9z6HsOtSSRQxCBjUj6c6YMx8x2GkQPto3%2F1o%2BSOl23Pb1tkPUHtSCGzqKNBQhP7DDorIjOBjqkAb1vphlpvEViy1STpWmP5gdkeKf7iLGKoS%2FKsC8rMrjna%2BxKC6JIrkfDuQsVKMaRS19sXIRlqF0BkoL%2BqRR55ia2Xt7FLuC74t4MAyk0SBqKTkWJ15WPbHWBbaY3OML0ByU0O81qZREmwtjqaO2dIYNqP88U4rm3NYQzUTzpdN1jQXlIcU7eCTwKzCcfGjGThyG7wnw4ApaHxLP4HnZWLvOgmLEC&X-Amz-Signature=20c174da018a3a831101fd1615e14473d33de966374c2a8eca8c3d2c58e3d057&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFOKC56D%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDf41FR8%2FiMprR2pp2n7L2s8AoCkLVcL9xV6g5Ay8X2CgIgMO0OatDW%2F%2BQJvuVEv%2BY6iO1hx%2FHHI69%2FtxrUczI5DjAqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZ5BkdwbaDyPRl99ircAypzrOKBgRJ6pnUc1ZkMhJC90wP9CG9K2OjE0L5lMBekd66p7kdnHFAROzbfJZQnZS42cezvZfeDReMZgXa2aJEBo07ckj4ln1FfxjqmpHPPShgATzsJEXKah5vsM33IPEji4Mbut5NL8SKUJZdWYWS3rckqrGfiF9QL8Zq3VTyOXLsBoS1efPRnbZTQvAw0862qdwYHOM7pQEqMeQ8sswEqKeIi5c2PaUdmlwP%2BW7p006uxh8yJTvE0TgdguLvOuusvCR9fmU%2FrQiPwD%2BJzvFqIExnbE1xMMOBU2xY4PBZdK9E0iDYPx6jKsek70bbxGGK8kiWEYnk8GpklUBjPIHuxrCvhSWWA6JuoMdcj75gSPUF5YE%2F19hRrtyKATcZlmylKE3G7rP70baXdJ7knSClSdy3LisRLNbni7cBrf5ycuDcjQ8HDqL3hVkm9%2BJ4sneuklT4e4s%2BAsQ%2FHoVCCXkEF%2BsMJ%2Fiy6Va5NHGgjjlKV2HHuA7MvKizCvRjQE5EI7m%2B6GPDQ%2FRSYNqsHiWoWctF5pidfZz14ph0Fv0yJOCFscgfL03EIZ0vtpRJx7h8oX%2BKg3875jm1IwNmfYNNrtxJEU4MsSpd%2FgoM8NDwXJIfHK7ofGdfk6jo0j39jMMOsiM4GOqUBEOnAW41G9ibQLdHE6XxW3iLWn%2F88NeU0GktJvCgAeZbedz9q1XTfiu8G%2FT1Ec9umJN%2BFzqQ6%2BsIOMG0agGPu18iYEU95VPNYfRCjyMGf5zS0bRgrVq%2BzlEdivwvCYDjNzt%2BOBCWi4Kja3AYQHL9dEQRalE12LO4LSMPC4AUxOZVnfgDzi34TBhTeyiHQQM5N9JhNM8BMsJn8MjvnhLMZDvGCYG5e&X-Amz-Signature=69e59cba62603a9e387a9e3ff4b97432a76058be2500d1a74745b7e5953eda3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFOKC56D%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDf41FR8%2FiMprR2pp2n7L2s8AoCkLVcL9xV6g5Ay8X2CgIgMO0OatDW%2F%2BQJvuVEv%2BY6iO1hx%2FHHI69%2FtxrUczI5DjAqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZ5BkdwbaDyPRl99ircAypzrOKBgRJ6pnUc1ZkMhJC90wP9CG9K2OjE0L5lMBekd66p7kdnHFAROzbfJZQnZS42cezvZfeDReMZgXa2aJEBo07ckj4ln1FfxjqmpHPPShgATzsJEXKah5vsM33IPEji4Mbut5NL8SKUJZdWYWS3rckqrGfiF9QL8Zq3VTyOXLsBoS1efPRnbZTQvAw0862qdwYHOM7pQEqMeQ8sswEqKeIi5c2PaUdmlwP%2BW7p006uxh8yJTvE0TgdguLvOuusvCR9fmU%2FrQiPwD%2BJzvFqIExnbE1xMMOBU2xY4PBZdK9E0iDYPx6jKsek70bbxGGK8kiWEYnk8GpklUBjPIHuxrCvhSWWA6JuoMdcj75gSPUF5YE%2F19hRrtyKATcZlmylKE3G7rP70baXdJ7knSClSdy3LisRLNbni7cBrf5ycuDcjQ8HDqL3hVkm9%2BJ4sneuklT4e4s%2BAsQ%2FHoVCCXkEF%2BsMJ%2Fiy6Va5NHGgjjlKV2HHuA7MvKizCvRjQE5EI7m%2B6GPDQ%2FRSYNqsHiWoWctF5pidfZz14ph0Fv0yJOCFscgfL03EIZ0vtpRJx7h8oX%2BKg3875jm1IwNmfYNNrtxJEU4MsSpd%2FgoM8NDwXJIfHK7ofGdfk6jo0j39jMMOsiM4GOqUBEOnAW41G9ibQLdHE6XxW3iLWn%2F88NeU0GktJvCgAeZbedz9q1XTfiu8G%2FT1Ec9umJN%2BFzqQ6%2BsIOMG0agGPu18iYEU95VPNYfRCjyMGf5zS0bRgrVq%2BzlEdivwvCYDjNzt%2BOBCWi4Kja3AYQHL9dEQRalE12LO4LSMPC4AUxOZVnfgDzi34TBhTeyiHQQM5N9JhNM8BMsJn8MjvnhLMZDvGCYG5e&X-Amz-Signature=69e59cba62603a9e387a9e3ff4b97432a76058be2500d1a74745b7e5953eda3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FGMNR7V%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T051719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY6pO1V9mTLEvF1rUzcfi7wiECyvntNfW7RjKhZsmOBQIgfEsqH8lbEpsbxkpKQuPAf4V5Kph5pW0KZ8brHVBnTEQqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMgmqPqcjQBxk%2FHgGyrcA9lMAeT4fp3p2Y7x3BOJwvJ5jJfQtZBlAWAdhBSfpoBQe1Vd2S%2Fsvf0fK6lTWXi0HQGSTjjhM77zw%2Fahn4r61gkfeZbIv3KqHGdXCz1MMHVty%2FrPj0gS0sHVii3suPNg9m%2BWxD5wIxOEg0e7SlMJysFn%2Br%2FjuCLiIoVne%2Fhbd0BCKaXr%2F8D1PqnFQvvAL6KIbJ5Z313UCpXiCQCgXHLkH2wXIG8%2FqNO06aP4zEwNzI0CX%2FuRPTu19N23sCwxldRfqVuFAZSAHHTHfH74rImxQ7%2FwUVfG6C2L9xPFoUxv6vDHb%2B81osU3xtAivWFg5PYH%2FBQFvvlRysEXA43L%2FjvQmahXvcY7A87ecljrFW%2BntRt80rsTSe0tryJCSfADOL6YjBpFDUz2KR%2F5Tq0IJfVeyG7Cnxd80YDgtKns9cszn60Qjqu%2FcWn73Mfw1CLo5Lj9%2Bl%2FMqvbG8yk%2BbmOuysOG50WWFYtPTQyIl4352ToU%2FQZYanA4KMQwfejKxk7m%2BeU0Ldw8e8Dz1Ns%2BLbeyAmyLhf2PjwGVH7688KFToojMRktGCbFPfAxjfUW82YkL8iz8zYTCt9nezNQqwr%2Ft8YEvtIUopD0aJsR6v1gmeLjSE4pECUZlt%2FuAyu2x1GyaMNKsiM4GOqUB0UDb05reNa1Seblad8lIO0O%2FIHvu37XcOwLMu7eC6jxOMsxCglXBhpaXNgCaCsaRzB6gamDDKz9rc1AH6h4Blk1x4cTTlbUhr8li8PZdyaGmqLkWNmrsw8Dfj453pIh1CrfUBZa9rxEjkcgzUJXmoXTstteMOed%2BvETbWWO26Q48PUz0pJKpXsFbxUQKMtmmtn2%2BSMd4CUrCqy64jeIbUbfLKdwL&X-Amz-Signature=518ac5d7e66c16bdb78fd63c2ca42c81b7d2beb6aa5ca75fb7feb71e8a9264b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

