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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNVIKWCW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIDbUGOizP6I78sOvhbkFlQM2sA6HwlcWtam4TciI8wBaAiBSYDEjF6x2RP5BnFzWCGdHw0sKzeJCqkLsW9Zvl4uEMyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIM8ojiBvY%2BZW1CnN0FKtwD3QagY2CLLNt5DmsHS7cV7qbkYIZfTTRc7DyMT7FwslkF71WVDSNP8J1etMuk3ho9pE7iGlyNRpF2FWX2lSgq%2Fr5vCmFFKrxxk7H%2FqCoJdAJBalzo%2FS5Rutgdpv6lxxIBAKICw2HeXoqAiQBPRLz6Gm6nlHZKqbXAApubTUCHWxSVsIqdpbV3xA8C3LK%2FfYTlkCDC48MM97GdVpy%2F3SftdE%2B0OlKE6pyWMFjIzjhL4jJIpLDS9feCXKS%2FQsnh2uQgyEgESRUOdylHY4FtJEbKIY14dAk14%2Bryb%2FL462s9SrFL%2BOJDE0dW4cD5tMnSm0KKX6QrYstqKxvfDgaE%2F8mWR%2BGWu22763FhdTrrT8SvHUgntX7eT0IZIned16%2FsGF0Yt6vzJo3060Qo4dPtoejwTiTjRNrPgW4FG57SiFLB1i4HeKNHbylQv7xbzuhf4%2BLVJlLicqQfeXtt0paPshrrZK%2F5u6aHJlXuHAVy38Rp%2FrhDUXyTO9Dt8txoHuPUVh2aTxjzQP6hPSK1MR3X19RgtJkaHtpIDBz01CBpAGatbn2SQpGcDOIaEkt%2FW1p52IQIWJ8RUlAhm7ZWLqQSbQKQE45OfKkdpMpI%2Fu%2F8mbWi5odZZ1Qtb8JBprcF6hEw66LFzAY6pgFZgRWr4Kt5022lHrNuqT3hUOfhL6wAIhqnPjyqA4DHe2QG712KbiJnjRfB97D3Qkb%2F3%2BresMfJmospwq7eUcTxVdhuj3wIA5r4BZXcvwPrjVSv03O3LBOToPgJUUBZQ3Ez3ZMFLhF0dTBQa%2B5V%2BX2oM%2FidpTD%2FAuShpQBVwgAiXrRLeL0LpWPHk%2Fe67MP6MJku3nylufKfT5WphSiAk9XYtQhTYpeU&X-Amz-Signature=a062a209c93c09a2ac54a21417df8af14455f782377b3f5a5613a592d55fce62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNVIKWCW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIDbUGOizP6I78sOvhbkFlQM2sA6HwlcWtam4TciI8wBaAiBSYDEjF6x2RP5BnFzWCGdHw0sKzeJCqkLsW9Zvl4uEMyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIM8ojiBvY%2BZW1CnN0FKtwD3QagY2CLLNt5DmsHS7cV7qbkYIZfTTRc7DyMT7FwslkF71WVDSNP8J1etMuk3ho9pE7iGlyNRpF2FWX2lSgq%2Fr5vCmFFKrxxk7H%2FqCoJdAJBalzo%2FS5Rutgdpv6lxxIBAKICw2HeXoqAiQBPRLz6Gm6nlHZKqbXAApubTUCHWxSVsIqdpbV3xA8C3LK%2FfYTlkCDC48MM97GdVpy%2F3SftdE%2B0OlKE6pyWMFjIzjhL4jJIpLDS9feCXKS%2FQsnh2uQgyEgESRUOdylHY4FtJEbKIY14dAk14%2Bryb%2FL462s9SrFL%2BOJDE0dW4cD5tMnSm0KKX6QrYstqKxvfDgaE%2F8mWR%2BGWu22763FhdTrrT8SvHUgntX7eT0IZIned16%2FsGF0Yt6vzJo3060Qo4dPtoejwTiTjRNrPgW4FG57SiFLB1i4HeKNHbylQv7xbzuhf4%2BLVJlLicqQfeXtt0paPshrrZK%2F5u6aHJlXuHAVy38Rp%2FrhDUXyTO9Dt8txoHuPUVh2aTxjzQP6hPSK1MR3X19RgtJkaHtpIDBz01CBpAGatbn2SQpGcDOIaEkt%2FW1p52IQIWJ8RUlAhm7ZWLqQSbQKQE45OfKkdpMpI%2Fu%2F8mbWi5odZZ1Qtb8JBprcF6hEw66LFzAY6pgFZgRWr4Kt5022lHrNuqT3hUOfhL6wAIhqnPjyqA4DHe2QG712KbiJnjRfB97D3Qkb%2F3%2BresMfJmospwq7eUcTxVdhuj3wIA5r4BZXcvwPrjVSv03O3LBOToPgJUUBZQ3Ez3ZMFLhF0dTBQa%2B5V%2BX2oM%2FidpTD%2FAuShpQBVwgAiXrRLeL0LpWPHk%2Fe67MP6MJku3nylufKfT5WphSiAk9XYtQhTYpeU&X-Amz-Signature=a062a209c93c09a2ac54a21417df8af14455f782377b3f5a5613a592d55fce62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNGFPQYN%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDOntpnZVyjCqbbGK9vxX3w0KzZ7ScSHcGRcaYq7HErBQIhAPZEtnJELtS5EOAkBFPby4bcOEOZIE3k0KLFlUjbN9gnKv8DCBYQABoMNjM3NDIzMTgzODA1Igzr80jOF7AsALtmdv4q3AM2yzzFErOqaaYx6A0l7SFtd5RM4kT2XIDJFoSB2S4f4N3BYruIchS%2BQ4%2BbXLofwu1BzX6BaVV3IDPo1pGdvemXxt%2FKxZzBRU4DC29buTdRpNK3kEj%2FAkL7DC3dZOqyjftX4rxXIDHvve4lpR1KzZ%2BWc%2FkQS8opqpxHjpFLKKXzfGXJ%2BlrTRpEg3Ra96IREFVCz0xoOngglRnw6l82DpEDDyKzCStCkEn0TnSqNSUUec7YyH8JOrBePC5tQLLA44X5v9APzCPCYZSxbpASsFgBhtE%2BuyqL6zlXKlXK4ZCEQvLvqa%2BVqm8Wmq6Y4Z0n4IUox3pfpRn3X8fzEO7ohHbFg%2F2HbQ2IR4%2BA2gwuJdd8tgQ5JD2W0IZqb1URka2JN9v3D2TMUFCnUwA3I3gvD9QqOtDpaFf0ehnLk%2BlblNwy2NHI1QlgyMKx0yHhM9o76q50Sj8U8hN4W3IcTfpmpTKBSOmo0jLuYlGVE2hERpwkYI1EoyjWXBlWWN%2FnsSlvOhtiJArZ9EZ4bX%2FUg1v0AQIkcZsyBxmutOa%2BVjBzxWUJtLCXjcMlUsK2DAbQntLrsS3C9p%2F49qIm00ZhJ3rPq414zFT7vlOuQ1qY2TtP5CA0YoL%2FSImzkouFrrj2HPjCUosXMBjqkAYwAu5d%2BVmJWgse9Rm7VrC1hszhx5zt9hxMe3S4poH5rsLPB8HXTTLdLPtA3vLkT79pS5dvRPZX2V3w3fuk2QVI4ii59aW9ofvYx%2ByIxLC6zH6i86PLlzVDZxT%2B%2FyDM%2FaNW2Hn%2B18Byai1KmJ2PqOyeeBJWfqiLNfoQhXygIL10OpIfXR%2BWL5%2B11d1%2BrtQKQ9qbONM8p8UdXgraq%2FAXr3RyDXMcZ&X-Amz-Signature=080b7f6da8043300d6869d943b0d5235536de026e3ef70537b47b2ba42276cc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUOPV4OM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCAQG1HPUQZ5l3UrrgCfI4Ov5MvfDKFmRaK6X0d4xOfCAIgOQvPAQBXprFR%2BVLT5veOKXOrS1xirK%2FKY0W4%2FTcEA5Mq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDAZMzIf5fSZXCQm7sSrcAxyp4FFkPpH8t9RUJKIlUcnpSC%2FAUBXyd2CkZwcqv1Duccm38dPS3x7ukIJnW50Awz9vxP9oM5lHcesMCv1ZZdiKUWlTJfqp4i5hQk2mkZuck2KN%2FkjO4TvgcmdyfhML07RYhLvwBhvWxS5pcKLex7PpFmT17NK%2B5ghRsJBrrgap%2BkOruEc5Jji7QyLCuErLHKDxbWpXWzkc4MCrlaZbUU8bM7rS6espKTckH8ZVYUnnpBWT8vmRoRfSkOnJI4GLWPlkAyUNtQusWdF%2FMr5Dkwh3hAuaw4fx358sbXoaQ6Zdchi3Q%2FLF3sqAnz8%2Bz6yLHr%2FYodLmvchoe7tWL0AtVjVUjzDk4Q0StfUha8LaCkvqVm8ju0ndNZ3TmB9u7kCXTBM%2BPZCS0ohUQrdL4Op%2FNu9acQW2CvSHjFGcxa7oynE3bIGPrv8ATvyfbFebw3TJuxEqgMaJ2%2B2elrRNieyxc9V6jl0%2BbD%2BdK8oCLKGn5SOiEuGTvtYoJVb9fRR9ZCX9nZGaS2al9br4gyCibmK18kK8HX8hMsZY3oIonNAm2xJ5Ldv6kALlOd1%2B6GeQXbBOC5rOFBR35DTai8jKBoJWcCIddJG901vzUADu75bwXYqClqhjHuPtNQ4YYutjMJOixcwGOqUBgvODVzqBfpwGfpIKTAOn%2F3B%2BjA59%2FVH%2BLQlm6gmbzkzg6%2FS7trppbyXeXR0W9RrRDMvbxmW4vfxM%2B8ixhCpjsmKu3FkyWDN%2BTkxB9bXnS4hMk08k2yZGRseUiB4SSLRyUjVBqOpjqu2CIG0f7hLLcvxgB3yqk766hhk51NcJVFXkdaRLd2XRNbgzPmjjZ9cjlwI1fAv9gSJVlDbRZdVAb0omjANj&X-Amz-Signature=850e24f74d8182190ca74252062ae3dcaa039336d841f224eb963c66d0f24872&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUOPV4OM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCAQG1HPUQZ5l3UrrgCfI4Ov5MvfDKFmRaK6X0d4xOfCAIgOQvPAQBXprFR%2BVLT5veOKXOrS1xirK%2FKY0W4%2FTcEA5Mq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDAZMzIf5fSZXCQm7sSrcAxyp4FFkPpH8t9RUJKIlUcnpSC%2FAUBXyd2CkZwcqv1Duccm38dPS3x7ukIJnW50Awz9vxP9oM5lHcesMCv1ZZdiKUWlTJfqp4i5hQk2mkZuck2KN%2FkjO4TvgcmdyfhML07RYhLvwBhvWxS5pcKLex7PpFmT17NK%2B5ghRsJBrrgap%2BkOruEc5Jji7QyLCuErLHKDxbWpXWzkc4MCrlaZbUU8bM7rS6espKTckH8ZVYUnnpBWT8vmRoRfSkOnJI4GLWPlkAyUNtQusWdF%2FMr5Dkwh3hAuaw4fx358sbXoaQ6Zdchi3Q%2FLF3sqAnz8%2Bz6yLHr%2FYodLmvchoe7tWL0AtVjVUjzDk4Q0StfUha8LaCkvqVm8ju0ndNZ3TmB9u7kCXTBM%2BPZCS0ohUQrdL4Op%2FNu9acQW2CvSHjFGcxa7oynE3bIGPrv8ATvyfbFebw3TJuxEqgMaJ2%2B2elrRNieyxc9V6jl0%2BbD%2BdK8oCLKGn5SOiEuGTvtYoJVb9fRR9ZCX9nZGaS2al9br4gyCibmK18kK8HX8hMsZY3oIonNAm2xJ5Ldv6kALlOd1%2B6GeQXbBOC5rOFBR35DTai8jKBoJWcCIddJG901vzUADu75bwXYqClqhjHuPtNQ4YYutjMJOixcwGOqUBgvODVzqBfpwGfpIKTAOn%2F3B%2BjA59%2FVH%2BLQlm6gmbzkzg6%2FS7trppbyXeXR0W9RrRDMvbxmW4vfxM%2B8ixhCpjsmKu3FkyWDN%2BTkxB9bXnS4hMk08k2yZGRseUiB4SSLRyUjVBqOpjqu2CIG0f7hLLcvxgB3yqk766hhk51NcJVFXkdaRLd2XRNbgzPmjjZ9cjlwI1fAv9gSJVlDbRZdVAb0omjANj&X-Amz-Signature=7bdf030e41788c51a31b38e164887d15b88a115921bb6b8660bf57143366eda3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LYWIFK5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDwjcC0%2Fns9G28Tae8QpQbOy6P57eG21mHFudDTHaY6JQIgRHDr%2FuTyIJybYCffSUNRZhAb1mTYh3yhWRLmz00jEkUq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDMKzey4zWTjhSVbG7SrcAwvNIASMYsQOJudTnBUcIB6KYWVp3WWqIJIbZFjt2cLt6mqlcvNCwFEfMORrPBlkOYlDf5K20UsKHBFf9LTAICEFGgeZe3qHB5lcR4jw6XwZgoobZwb0RKx%2B6W16%2Bbh8bnBKeJFi0V9bbykFasiWpRUHfgPtW4IYTSCyW8GYmioOQ%2Fg16%2FSbtRZmtc7sfnsJMatxOV5Zst4gw3hae%2B%2FXcDvIyoPzIDX%2B4R%2FYuKD6yz2QA7APKm1QlMl4gH5aelsX0eJoETOD51eA3RCatRYo5FG8aPBT6WE4eDU4O7DuQ%2Bq2UNM6omc6ogvaR274qDK7%2B6fQ0AicyjgoA6Td8EOcwH0mGajEJ7Ye6XrGbXNkH%2F%2F1tHEez7atpjCy7SOxVvtfh6b1DRu2D8%2BxAWWJXnV2nsL71JHg3M6yWEBAsEfTJiAOiYLwSDEWjwyMXpdOSrcRbDrZRqhynFIkMSQaqssw%2FQH87je%2BTar9Gss1g0n8mjp6jwWg2d3gMmAns33QtuA%2Baab7s5Y7sfV2SdXb930LeSP%2B0yMQVx5fRiZzOXfIUwbluR41rFiKOVbT3qQp%2BlYHT6fxRevr8vmRlyVxN6tYLn6fZ5toRpY7qNje7rkxUcsG3sTvQ35n8hUCiVXwMIajxcwGOqUBH7yzkwtmFxWhcY2mflKnHQ6PbKhZ9%2B72Tpf0B2UhipQqcXiYgoPQ9l9AgyGNqTpfSG2uCnvZYEgNkdu%2BtnhWSKnYIWd2GuqIKvhaOjYrdiywkIHdPtUitCQ%2Fr9TJ3aLexMhn7WF3mL7UbITu0FolJUdpQeMFO3bhOvQ9rJ4KS1YhFcJKqcWaguLbYbRdy9%2BxUHff39MFafPZ5hv10tgdFCn48nKL&X-Amz-Signature=a6b7eff02a443a875d90f0e487d9e184c451b481b4a42b06d01c8ffe12f427de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6WFRFP7%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIF8uvF2KKEZfquPIGi6hnJphzEV8jj4wGywvsfpWhv5LAiAY3OndXvkYv5GEMUXR0Sc34S%2BPlM%2BBQdvAMiTUHfV%2FLir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMMHtZtW6QjS%2BjxK8gKtwDp6%2Fq50SEDW%2Bo4oJ2diBRvUUYS3B4qpPfhOG1j%2FlNd%2FBzqVi60EZG2On8PNG60uGg9o6kuOV2epChyUZxI9gR1QtQ19%2Fo%2BB9uEG%2FLTdOEHW6sHVML%2FZhCp9rCMpy3ogRGVc12XMeqih6ug7SF8BBT7VlphTHj9Hb4rQrT4ZBvjXHxbjKIvZwZtifGIg%2B4WM4q1Bn4HXYP7Q0hfVnuU4Kxs6K%2BXkUiUDaeCF%2B%2BRLQI1upICsOKZMIJG34XDIJmAgH8N1vn7p8zuPjc7I5f7uvxqdYwE5bvGQleBEnXcj39ylY87XED%2B0T2XhNvwgxp%2Bot%2BEii5AQZuwgIxeT%2BpOCUFFW%2B1alRMYJvdmSenjHy7CU3pTilntVxIeYCFq5ZtEbb0GpxLwF9V4OY7o9UVLbj%2F%2BUKQAuwYzgnLQtdCzp9ClGUWK1zpDFPmW6v%2B%2BE4DdaP%2F6toXAaZQiuWcQqpE5sedY8RmxGzOWMk3DizqYQje%2FHOBuY2B7HwXcoaKKqGQPP%2F8Mu29rbxIw%2BAOSPY5qTOBKwZ2xC8zCvJqFIQ3UZyBp%2BDAfK3vghcQtwgqYYSFpU0xR3ZnWYkAw8mIvo67%2BadOMkR21O%2BrDduOV9BzvxPGU8M19fhrt3SPmc7FW7Yw9KLFzAY6pgHWONNIjrC6sJa%2BplrDOQ3180K9TpurKeg%2FbNLD1I6MYksyqR18mWeL2wLVzD5LPJAOgXC8atzqhI8zDaRnVazQGVb0P3NyGupEwJbPsCybF4A46P%2FknswgcXhStlA10SLql289g0ZzQGv8M4AO5F60yhxoElU%2BTmktJmEykXiXHms8o6E5MZyJuWKhYFf6%2BlfcmsLiFafId3625EvS56Cl676q5WS2&X-Amz-Signature=3b61422394e55b45393571b57f0546cf2ffbb3b9fa2f7ead137a9871567d1226&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWJQ7EYD%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDJitobiNrhocRXL7ATWGyvcXh9KHVuYJFri9B3gFPCwQIhAN6JYttjHDWHQ7awNLNqekqXxvMbcLy5eqT8zwZwbg3pKv8DCBYQABoMNjM3NDIzMTgzODA1IgzjLJ136TtzEm5ZMkQq3AO3AYc90O02GjjZmB%2B%2F4qm7gvOaqr%2FuNOiNLIPWkI6JmSc6mvotPM2ONpVxoI7ZDQ44t5mMj4F%2B1ohLwJppOtBUHdPQoQE3Li37g2C5hS%2B6gWi3lmprRjokg%2BDDqmRI%2FdSdTVmD%2BZz5gfF9L3Nap9vrfIfC%2Bl9a8Z3XtSwD0HVnPdWnsV0GdF8tYXVCse3pk8F4i8NPKOcA7ToTQhGn95BRhuA5hgaZeq9HpOhvjeQxp3pit3jur0ylAIYOilzCsNeTU%2FNTwi%2FMn3GcJUzHGwYDrfrRGzHTq5yW0VjQTwx66Y4lFXAlBNs9qDqyw6Y2ztGZfRzbXs9OStt%2B1wWsjl3uBft2iRtCjKC%2B2IGM4NL%2FAFXpk%2BTs4Kba4hF2aH%2BhYRL4LC8ICJjowXXohV1gwy5elz1eL5i9KZHf%2F5tEjwUgZ7qWkOMY3e4sxILUO8eL2TNKoM4212DrxYiweNDXtkPRShJcFACqvCaYrXpwYhnvzYQG4K1SBB7%2BE4ntA%2BN2g8omr%2BAm4MQK9snxXWHyO7GQjTgzhEfoBNeXHS4lXp%2FLbQQLYjSKyqDasLyMCYiqMcRPobCCKZ%2FFCIrui803CMsYs4FsDmUyWjJ0YqHl0olEHEh77R9%2F5vCbvuUAGTDlosXMBjqkAWUV1MWHhRV%2FQFpkpsffDSTy%2BZ%2Bs%2B2P5lqF5%2FZ4je6lrrTDDWlw7Ocqi5HryhEKpFUirAlkSicwzwMCLtsRA9kiaDHf%2BEUDwfsxqGuzSX9nk6foNtkKGyhglTXCTAblDCnKUmJwqkIMT7%2BEgp2ILW7hL%2B8yk%2FNGRZyUWOhL1mkV0X9aHHc%2FlTm6wXK4fomMNZiFsv23fiyt%2F5dGZKQDFeuWYkuW5&X-Amz-Signature=18d2f40df7fcd2e46d26083c4c9746cd43a95ea30ec6912dc5f0d249aa4f40eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L5M474C%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDk%2FMM93fdCN2xal%2FKeXo%2FXXWlHq%2F8EZzI%2FH8Fj80ca%2BgIhALN5pUWE38aNvUse7Qmk1Qsrl8WLnfyekkzRFH3fAC4CKv8DCBYQABoMNjM3NDIzMTgzODA1IgyxY%2FxK3FHrOVzjDngq3APwzclrj7b5vy%2BYjFWff7svsoQUqtgZS9%2Fgrs9Dp4JqNT3n2Wc93fn%2FYDKjO6UUxmY6ZPuN2pGk9c5OPbgnIwc2%2B%2B0PsoH%2FWyrNcMXeqFpbIaZQF0J9th7gZkmKIVw2CPW%2FX0qwyHmTgZLhN2LA6v%2BCU7Wqi0qW%2BHW6ru8TogG0JVzeYFwwjdWKIYuuvXTseamBX7QbdMKdzvsM6epm4%2Bg3%2BRrlQp317UMWaG1hV7qK1ob8l7hqYZn7fh80%2BfzBtXtmX%2FfFMo8HXVifQGJcTVQUpAPOEoYeHjKMd7w%2FzetCaiUJHsaYQfVq9PYXShyvz9PissU9g37ZYfPSJ5v81WrMKWz%2F2XiaXQM0JIq3ZVvPaILCMQx1jtt93Joj%2Bv%2Bq0u7mUyWusm1uy3vxhYq77ZETT%2F%2BsfnWoizcI3E15NpTOmZjqfDstPvDzRGE2xPhR%2BU%2B4j7vGSrHC96YMEDNZXBJO3690mEfvCmo77JZtwO7YVi%2FEQ71EPNM9KBPbYH0flM9SCWBAS7qSj5pr7koDOQOObWFttaqXNeGiGVOU%2BMFLFkWiPk9yY4NZQlGlZl%2BI%2FQO3bC4h%2BOcpzOx9Ht0ctQyQB%2Bbk%2FcLe5xIFP0niWoyhGmLodMrWu44URj9cSTCXo8XMBjqkAVhrUai%2BPi5kl8Tos3zFwq4%2BOvUnnyxstcm4IlRONQ3Iypm6G26Oox%2Fa28Ja9gxd0U4caH28c43Cu9cbgkjpIa2C021VYKpVNTFAcbLpLsvYvhG0PRaTdS5m6Aox6qOcDnnEoWev%2BCtoz3HWi%2FVPLv1Mvc7Jk5YxO55tYOycuSFXpE3cZTcboztAWACjnbfou5nLBH3yZ2O1TNdQX3EZgNDSZBWu&X-Amz-Signature=121a72a47abcb7e53b4b11ed8b777c2cb5ef87efbecfab26fe32bb34edee9bd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L5M474C%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDk%2FMM93fdCN2xal%2FKeXo%2FXXWlHq%2F8EZzI%2FH8Fj80ca%2BgIhALN5pUWE38aNvUse7Qmk1Qsrl8WLnfyekkzRFH3fAC4CKv8DCBYQABoMNjM3NDIzMTgzODA1IgyxY%2FxK3FHrOVzjDngq3APwzclrj7b5vy%2BYjFWff7svsoQUqtgZS9%2Fgrs9Dp4JqNT3n2Wc93fn%2FYDKjO6UUxmY6ZPuN2pGk9c5OPbgnIwc2%2B%2B0PsoH%2FWyrNcMXeqFpbIaZQF0J9th7gZkmKIVw2CPW%2FX0qwyHmTgZLhN2LA6v%2BCU7Wqi0qW%2BHW6ru8TogG0JVzeYFwwjdWKIYuuvXTseamBX7QbdMKdzvsM6epm4%2Bg3%2BRrlQp317UMWaG1hV7qK1ob8l7hqYZn7fh80%2BfzBtXtmX%2FfFMo8HXVifQGJcTVQUpAPOEoYeHjKMd7w%2FzetCaiUJHsaYQfVq9PYXShyvz9PissU9g37ZYfPSJ5v81WrMKWz%2F2XiaXQM0JIq3ZVvPaILCMQx1jtt93Joj%2Bv%2Bq0u7mUyWusm1uy3vxhYq77ZETT%2F%2BsfnWoizcI3E15NpTOmZjqfDstPvDzRGE2xPhR%2BU%2B4j7vGSrHC96YMEDNZXBJO3690mEfvCmo77JZtwO7YVi%2FEQ71EPNM9KBPbYH0flM9SCWBAS7qSj5pr7koDOQOObWFttaqXNeGiGVOU%2BMFLFkWiPk9yY4NZQlGlZl%2BI%2FQO3bC4h%2BOcpzOx9Ht0ctQyQB%2Bbk%2FcLe5xIFP0niWoyhGmLodMrWu44URj9cSTCXo8XMBjqkAVhrUai%2BPi5kl8Tos3zFwq4%2BOvUnnyxstcm4IlRONQ3Iypm6G26Oox%2Fa28Ja9gxd0U4caH28c43Cu9cbgkjpIa2C021VYKpVNTFAcbLpLsvYvhG0PRaTdS5m6Aox6qOcDnnEoWev%2BCtoz3HWi%2FVPLv1Mvc7Jk5YxO55tYOycuSFXpE3cZTcboztAWACjnbfou5nLBH3yZ2O1TNdQX3EZgNDSZBWu&X-Amz-Signature=5e3b08e30f63640aadf01ac8ebe8fdaf48ef90b9979a635b3d8fbdfd3b4acab0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSMQR6I7%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDfTc4EhOJMfNgrB6wypvVv8xhCdkp2RmFh4ACQx9dXzAIhAM%2B5qci%2FPKKulNuroWqgr2CVwpHJAHhw%2F6mu5k8bvQjzKv8DCBYQABoMNjM3NDIzMTgzODA1IgxuEH9tyiXoIgzT80Yq3ANkTBVwdSJyV%2F4DG9ifANLpybzS4ckb91dgfn9u4GIG2vdKmexYU9Teivbvtnj8Qf0w9YmCYc7pNzUm%2B6%2FD%2B6MOUVvL6aBl5VDkPyG4nEY3v40iCA2NEJhkE7zRB42TkxidXI1hEf%2Fj95WKVAXbne9lHzV8pxaja54vncv3wJ2kcTjQd0xBZxhaefVWcxpjL1E5QDh%2BX8OUNuFzU%2FvS355GQFUl%2BkOgl7yhxyVPtl4%2FeHWzWfBeB5AqwFRWivA6bKsPA2u1TDD4m%2B4CCEXYoOkzdzyI2FZjSHzGL3p4o773pgWw0CEaJkfOhXvl75BciqhQ0aKUFlveDyn%2FQTueoUeLs7eu0DVZZWSnVyopMt7QnRF6r1CzCC0%2Fh%2BXydultYv8yaPJT7IuAjhPwVzRzyLDq4DnfeLWqrUlIzc91qIK7tf6i9okuBGYyZHRcjJ2HsCQ4y1BKfcYRZ5yp%2B2gS8agwL75Vhb9Z8Njz7OBdDt1x5AnBTpCM4BWYNDSMzK1Kb4bGEv7gGdeBFUwHV8B5h0l27zPxt8EjfuQw07EJzJ5TQ8KApu5cFiAyQ%2FK9DU8J0PhBFdtdtFE5L%2B2x5hAnAJ%2Ftd22oUektmKGfjcHLJTnA7y1oxGqF3SqZgZlZ9zCZo8XMBjqkAUZGFFHHj4ejeFYRfzdeuALFvwOf4cPtphCIT3EzZ1%2BIWce0OBSRQA1vVNgw9qyKIiVE0pmasiPmqmerGYeX6vIDB1x0tbfW47ToEOv42MzxVmDVMzbFHuS8WYOo9mBJsXhVNTb1dNStf0WmMMI8hlxkZXUrzLijCnsYRc8%2B4B3Tj5T7Xdog8CJjQ%2B3Ib6Y6xwiO3fJkD9LGFahmgjr%2Fdl%2FO8AYW&X-Amz-Signature=0ac0cdc4995906b8aafb90c59f6807b0de65e0acdfa83e640c56ec3d59a255b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V654PRH2%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQC2vFU8q69TmpzGpCutuA1whOvyPk%2F%2FvwNmeE2N0nbR4AIhAJsiQ5b8s%2B7Ud1Vp84dfImXsNyUgTDFaNblYSknnBZP7Kv8DCBYQABoMNjM3NDIzMTgzODA1IgxCBQG%2Ff6m2BgQH%2BD0q3APp%2BJLWaFK0S6fhAsT5Gk4KG99HgQiEriDRczIvjfjXKr%2FXzBfNB1Xi1sUwszyoMEankiOTPw%2Fg5aurJOHZaiwYxcEvNdiY2wqqFMENHoQs6ZrOhTtTwa0aDnDRZ3d%2FydHmFaZ%2F6Zg5uiSx3P6JGv3KpscoMa141uCdfpZSI0rkZiOtlzMoAx4zYMJKsXE2K4zelyhVUPZWp%2B1XyBSs9ciCgcvBN9BoSSLGGrJ%2BfBFPNZtHW1evCwgxmrEFFP%2Fi5uLlfTBnPe0sF2Xddw8A0jrD8fsmQhduqq4oVROxsOImDU0mMHT44lwcuAy8EC0W4lncrSm73VcBzx%2F9krUhrmHAqyLSxjzb28GHIoG%2FSNmepNlh5Lpo4mFGi3YjDTrnO4YKJ%2FSwwoU%2Bfl0Pu4cvqCDP2Zudz3ftXMjlF5AhwxdChjYcVHDZ23mypSz3NiYcjx9QAaid0Fh9j%2F99jJptmt%2Ff7CKUsT5v6UNIR7aM2Kh7WFLwM4KrYml%2BpwaqiAfzbTylNDsUc%2FhqgvolCOd2WXpX%2B48BoHUViWxCMMJ3L3WB%2Bst8smXsRGspoM5xEylOoFK6P%2BvhLXMAhRklJSnkBsmSHyQJ4flOQwcZRsrUB7J1Y1%2Fhs9SlZN4fSUqZ%2FDDCosXMBjqkATlxJVvwdKLZFyKsWb02B5fIpzqDofataUaefZaDhrwDkI6yhuygV2JYHNJeKExQVUp46fIuxKfrbrfRMsaAUrX7czTLsWYPvdJ6B9sfNnzDZeSwnKwt6VBHexMXVCL94kYnrzi5neyN7LDPKZorn0LJgYi0woO%2BnW8qcH611j3qcpeahv73hJM9H3n2OkEWPrMzNbLPDXS4ROhDd9BznCflQ0dR&X-Amz-Signature=f81aced45b5097ef1e7f3dadf0714480a3d07484d78397e5363d1ff114e1e208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V654PRH2%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQC2vFU8q69TmpzGpCutuA1whOvyPk%2F%2FvwNmeE2N0nbR4AIhAJsiQ5b8s%2B7Ud1Vp84dfImXsNyUgTDFaNblYSknnBZP7Kv8DCBYQABoMNjM3NDIzMTgzODA1IgxCBQG%2Ff6m2BgQH%2BD0q3APp%2BJLWaFK0S6fhAsT5Gk4KG99HgQiEriDRczIvjfjXKr%2FXzBfNB1Xi1sUwszyoMEankiOTPw%2Fg5aurJOHZaiwYxcEvNdiY2wqqFMENHoQs6ZrOhTtTwa0aDnDRZ3d%2FydHmFaZ%2F6Zg5uiSx3P6JGv3KpscoMa141uCdfpZSI0rkZiOtlzMoAx4zYMJKsXE2K4zelyhVUPZWp%2B1XyBSs9ciCgcvBN9BoSSLGGrJ%2BfBFPNZtHW1evCwgxmrEFFP%2Fi5uLlfTBnPe0sF2Xddw8A0jrD8fsmQhduqq4oVROxsOImDU0mMHT44lwcuAy8EC0W4lncrSm73VcBzx%2F9krUhrmHAqyLSxjzb28GHIoG%2FSNmepNlh5Lpo4mFGi3YjDTrnO4YKJ%2FSwwoU%2Bfl0Pu4cvqCDP2Zudz3ftXMjlF5AhwxdChjYcVHDZ23mypSz3NiYcjx9QAaid0Fh9j%2F99jJptmt%2Ff7CKUsT5v6UNIR7aM2Kh7WFLwM4KrYml%2BpwaqiAfzbTylNDsUc%2FhqgvolCOd2WXpX%2B48BoHUViWxCMMJ3L3WB%2Bst8smXsRGspoM5xEylOoFK6P%2BvhLXMAhRklJSnkBsmSHyQJ4flOQwcZRsrUB7J1Y1%2Fhs9SlZN4fSUqZ%2FDDCosXMBjqkATlxJVvwdKLZFyKsWb02B5fIpzqDofataUaefZaDhrwDkI6yhuygV2JYHNJeKExQVUp46fIuxKfrbrfRMsaAUrX7czTLsWYPvdJ6B9sfNnzDZeSwnKwt6VBHexMXVCL94kYnrzi5neyN7LDPKZorn0LJgYi0woO%2BnW8qcH611j3qcpeahv73hJM9H3n2OkEWPrMzNbLPDXS4ROhDd9BznCflQ0dR&X-Amz-Signature=f81aced45b5097ef1e7f3dadf0714480a3d07484d78397e5363d1ff114e1e208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWJ7CSVR%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T051354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDl57la1TZEgNEbY0HUCKdcIhTtqJClVjARIYfrhDMSEwIgaqKm9IyT6cNaHblgjrHMHOl3Jet5atVZmhWh%2BDA%2FlYIq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDGnY4%2FTJXemwDXdPAyrcA6eVJoDTX%2B21hyirn2%2FhPtPqdQuspBAIElNXpmmBX7r5BDZhjfPw5oyK61%2BxnSGxa988vUvavPFJBxd3mH%2BYLvNmCGnTeWs4adgLxiYfCpWPtDBVqacNKWJOsTynMd7NJU1YiDRPxxphmP9DaApKHkCkryDmFPwp43%2B7e%2B4LLc1bqknWLBBec1q2hETTNdU8GbLN1CdIZe%2FbBeQkQLmKobPXcRr2%2F9%2BnoBjLyg1nfYMwZWLdgmSbBm58RVFu57k06t5ctsequfv9rJIN913L8zsUwg9mmV6GDyPEUV%2FXlRkkwKhZF6thQTIVEhd5a09%2FWnxtxXSIAofQxuC3A5HECq31DzRrpWoKYNNWzxQA6y2SlALArz5wEXNA1BeUFskWc9D%2BTsBTIRFRsS8KHaodv9WzSAD33hOOVX0Izlti0EeashzmHkLJFEfch%2Bxf%2BLk03GzQGxNwkbr1D%2FWr99QMNKMb%2FfLmfDIso%2BwRjnmO%2BlgzS7E17%2BnLnQ2OSbZtIRo%2FbtIPwvMphabQKaA9OjxPA1DtmG%2FVuSI3j91o1Py1ZFOhZyu1lwfxLFru4uF%2FG9YkaXgAhPUX4dpI%2BH0%2Fp%2FjNG5h0MtX9iIiFjBpQg%2Fa%2FRLycARYozdW%2Br9QPl6BBMPqixcwGOqUBxVdUBbBQOUngfe6i8I5ojnxP77Zofo3nq%2FInl2WazPUTQmatSHMYDZOxWiEpFqGGIhvaQBxMlrzcyaVspVaPETvhRHV3NLhXM2azbx936Tpz9cORPaIHixLxFQ%2BeaCObZa3A%2F4SIGEwaOD2dHiYad9r8wudXdaM9gytVI0JQyeeAU3aGUzR4R0xObYnpkTpBAr%2Ftd93DnZwbCba62XE1TcYI2duL&X-Amz-Signature=eab88822918954b03c37deb6248574d00c1897c4a07d2124e92c23783a440b0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

