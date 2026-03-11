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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH5U42OX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3wvLyCjoWAvmK10YJbHe1S3Nj2S%2FzwNAex0NZJwaHfQIhAJCANw0oL0gjMDLvJ7hH6vwRX7eRHJilXFw6RYvzY9%2FyKv8DCFoQABoMNjM3NDIzMTgzODA1IgzWCMWtvGTjf9QzVksq3AO6JCWwLYDmwMIZvUWaGxVSoI7R2%2Bo7IilvO7ANo6avB3CmaYY%2FjiK8Etz84hCotRHYoYVtKSZAcotULX6SExCJ5XdZRoI8mkqb0CoOcZ9suy%2Bmo%2FIcEVDh0lk7%2FTf7NcJh1T9H4%2FnZzLro4Bf0XHVsCuvWvwbw%2FujStAJie8CwtuL8p3tFGmiWTSC%2BTGg1vWSOLaIHz4wgLcvoQoY%2B2U3nc1ZzwN8xVjkTPkLu3kkzw1t1IRfbOAXEfTEIV%2BLRnhm242hQTgqFTKGPWMshYw0SRKD892lgUBC1BAsffm5q4duBvsqiUvT6EIkcg4uGbnnyqASMIoshAGo1Xhghz62IuqkR%2BomDJeohSWi9stfAjpETFzoMh8%2FxbHWeRue%2BrNwAvTgrbFDGEYyrfEmobOe6VVzFxp8t8zh92bODFcJdeS800bBqreU3ADJqG9MA2OtyTp%2Bx2rbT%2FN61D3Pf4JiKoBR9yzZB8ARgAcmZPHlkiHI%2FLE9kajM4whYyWcufc5hWIOzjKzxD5TuS917qAY5TZW8NJVYkvBPwqvMqA7Sk2zBe%2FRlUHSTbI9DtCz1rSyVs8LRl0MnxvaAFXGlM643aEoDSXRWghwK6gROD1uFT%2BjihNQgXFIKAbyN9HjDJ2cTNBjqkAYjCSemfPlrFeMI%2F7MRKWI%2BMCNjWhdhRLKIPeLoGkKHxopt4QR3jH72jRVhiMG8m%2BGhT1JFn87o%2FFRgC0FRJtywa4jUDFv1RuNhgGZJwdvj5iMd7Cp2FtIqgQp%2BYoSVZpq3%2BDJdr3EY8biXji3Hd6Q8yyG6kDmhCV%2FV4Ljdpeq8pr6akFaKsoTjk8rAo2lIEYwlLclT9e3mWg4UkdOpRCSriuSf5&X-Amz-Signature=f3240409a8ae80a466028322dfd5871c78069eb0618c33ce85b19ebf2cd7704b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SH5U42OX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3wvLyCjoWAvmK10YJbHe1S3Nj2S%2FzwNAex0NZJwaHfQIhAJCANw0oL0gjMDLvJ7hH6vwRX7eRHJilXFw6RYvzY9%2FyKv8DCFoQABoMNjM3NDIzMTgzODA1IgzWCMWtvGTjf9QzVksq3AO6JCWwLYDmwMIZvUWaGxVSoI7R2%2Bo7IilvO7ANo6avB3CmaYY%2FjiK8Etz84hCotRHYoYVtKSZAcotULX6SExCJ5XdZRoI8mkqb0CoOcZ9suy%2Bmo%2FIcEVDh0lk7%2FTf7NcJh1T9H4%2FnZzLro4Bf0XHVsCuvWvwbw%2FujStAJie8CwtuL8p3tFGmiWTSC%2BTGg1vWSOLaIHz4wgLcvoQoY%2B2U3nc1ZzwN8xVjkTPkLu3kkzw1t1IRfbOAXEfTEIV%2BLRnhm242hQTgqFTKGPWMshYw0SRKD892lgUBC1BAsffm5q4duBvsqiUvT6EIkcg4uGbnnyqASMIoshAGo1Xhghz62IuqkR%2BomDJeohSWi9stfAjpETFzoMh8%2FxbHWeRue%2BrNwAvTgrbFDGEYyrfEmobOe6VVzFxp8t8zh92bODFcJdeS800bBqreU3ADJqG9MA2OtyTp%2Bx2rbT%2FN61D3Pf4JiKoBR9yzZB8ARgAcmZPHlkiHI%2FLE9kajM4whYyWcufc5hWIOzjKzxD5TuS917qAY5TZW8NJVYkvBPwqvMqA7Sk2zBe%2FRlUHSTbI9DtCz1rSyVs8LRl0MnxvaAFXGlM643aEoDSXRWghwK6gROD1uFT%2BjihNQgXFIKAbyN9HjDJ2cTNBjqkAYjCSemfPlrFeMI%2F7MRKWI%2BMCNjWhdhRLKIPeLoGkKHxopt4QR3jH72jRVhiMG8m%2BGhT1JFn87o%2FFRgC0FRJtywa4jUDFv1RuNhgGZJwdvj5iMd7Cp2FtIqgQp%2BYoSVZpq3%2BDJdr3EY8biXji3Hd6Q8yyG6kDmhCV%2FV4Ljdpeq8pr6akFaKsoTjk8rAo2lIEYwlLclT9e3mWg4UkdOpRCSriuSf5&X-Amz-Signature=f3240409a8ae80a466028322dfd5871c78069eb0618c33ce85b19ebf2cd7704b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHQ7HLPW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDK%2F4j2oO4RSKu6FxQNTa%2BFU9fWSN680mdOXrUQZGbt6wIhALUiMQb%2B6%2B7Dc5Kt07PKNraY1O93vqMMnScUx8RNOQU8Kv8DCFoQABoMNjM3NDIzMTgzODA1IgzF6yxdn%2Bdu%2FqLhWM8q3AM03rqtmE9gDa7UNXybuCBVAq4tOhJ5eQk0Kaxda%2BkWjrPaQtCPJHWMgW2g0dK19Mz3AOV39QRWq8OrnO1xPC74c0bqVSgJX45VtJN%2BuHd7iYXYGbVEPSVIFPAJo6JhecMU95cNEQ4pnvAI0oNOip1YokTbbq0M4MsklNT%2FCushksE84We8UVRuCPQ4Po053tUwjYRSEO6k%2B1PmXjxbqJa131ctctv6VuAFooMsXJp9%2BLIrapHH1CscT6sEN0g9mM5hk4c97AtC3okcg%2F8oJuIs%2Fb6TqODlJpGygHl9K6HeSCww9UMzCfdNhAtcftjrhmHqlzhPyp4R0O1kWUiERrb9LFw4LR%2FNMAQUSg81VJdMKkkgrmK4WCh0u6SZT8V5b%2FMgHenK3W%2BOSwxUTleZAR4y1ULzXYG7ruHGsOCjXjxfuRxBW8DvpeVeFz3ls5Q1AjDHO2AfgMCnrw6GvwLcbTSfcHRvofncL1LYmDylyvW2Auc4vfTsDvRdOGR40Pc3H5jITWvDYMYJirRecVbDLSg60QUxu3d07rhx6BCFoUvTgp1%2FcVRtkEmpbKYTATLJYW2AHtkzDeLHxOSohUKT%2FJD%2FGWWpOqw3D8BJQGHLV5vhlzGXhOJuJKwfsnoOWDDI2cTNBjqkAbhglESEbKv5%2FaVAFi3H9%2BIujWiPEkOv5XDpOoB9rOfXK4vHIentUxxh07SR6QT6tXKFQzogXwgLF3VkSFsGA%2Ffli2C3UhG5TYmRbo961V9M472PnLgnC1hJrqQly9rfEB%2BQti7PJUIyxn49t7O9bUdhiLZWEyVJ2yIOaw63Yzb5%2BDPcQWAzU4uJI3IcKyTQUV2RvO9f6KKWLcoX3GBljQqJQgzK&X-Amz-Signature=0f8d707e032437a98db59271de86aba6f4a200a53c89441e5b26a59c93f5d156&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2N3CEB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFdXhO0IeT1Tg1%2FGVYD2QuDRA6iyTSLBcMuLP4ixjb7iAiA2Za8Ah4HlUxmrM4%2BDN9DfAgbzuA35payse%2BgFp6o2YSr%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMUB0c3xCxj2TPA%2Bv4KtwDLOocD6cTYnYwzXfrp3XtknIvX%2F0kFDw7kMV1xjlCCwAFaLUyTTP7f9w5wSKFLk7rSKJQ0G4653i%2FWd5FIV%2B%2F2YoZK%2FC1TJ1I3fj4VIoH9lCgevzqestTOPnQYLsx7TkTMqgtX2piEaLguj%2FcGC9%2FgZJzJWzL3tbRYI8xSTRP7S9Tla3xOOmnNQYg26Io6hlULn0v4AkOQRYUPwveS7hsOSYlF%2BsTzAGUwR261eZc0zLKQEllgMUhEPxdvsArm3Brso2lIVKFtJART5XhL7GEidSw8B2%2BfaTy8zSl50bWibgE3wyTm94J30I4SvwPNhv%2BfQRDatI47C2tID2%2FhskxUyx3Uh0hrwR6FMR0qMEZEfAWY8I0GQspokOvBSoQP6s4TVWC63CzaCRKFmEqjMV3OxKh0hq1tqGX15VO7LdnTk93cQHZF7GmXWen6L5P5CK9BKrsRe%2FMDAUq5xJ1cERqBlpPaECh6krpiiVGZylr9tC%2BofftMC%2BPAGplwmA95elzzbVIBhcR3IiEN3X%2BlG0y3limnsRNgewrKsZXwN4DehtOPWmZ9f0aMi3btFGFdoCGeXwNNe0oYiGHv%2Bl3NU2XwllODE6ck4YfoNvneXFRbHldHT44bv9d3p6iF2Iw79nEzQY6pgFASKphWciVeST%2BuwiEyuiCeVHAkkpbNx2P9CCmwAniOkk5fj1BuVnzl98Lz62%2B02E%2F8FjMMNvacb9C1W4JbWQqCEV98xGUH9wlPJA3dYvMRJaHlsirHDZCklyK3nTp7FH1ip9K5eIJwhslIEGH8G5lCS6iGVMRG83PGppuKPR%2FhIWgjZxPd%2B4Cnjt%2BgP%2BfUliXAiBo9GJqSU3MTYPGMcAf8P0cmH4a&X-Amz-Signature=c52d7b4014eff0ad7164259bf4def8e591e4b142808f636f5a13d490cf60dd08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2N3CEB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFdXhO0IeT1Tg1%2FGVYD2QuDRA6iyTSLBcMuLP4ixjb7iAiA2Za8Ah4HlUxmrM4%2BDN9DfAgbzuA35payse%2BgFp6o2YSr%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMUB0c3xCxj2TPA%2Bv4KtwDLOocD6cTYnYwzXfrp3XtknIvX%2F0kFDw7kMV1xjlCCwAFaLUyTTP7f9w5wSKFLk7rSKJQ0G4653i%2FWd5FIV%2B%2F2YoZK%2FC1TJ1I3fj4VIoH9lCgevzqestTOPnQYLsx7TkTMqgtX2piEaLguj%2FcGC9%2FgZJzJWzL3tbRYI8xSTRP7S9Tla3xOOmnNQYg26Io6hlULn0v4AkOQRYUPwveS7hsOSYlF%2BsTzAGUwR261eZc0zLKQEllgMUhEPxdvsArm3Brso2lIVKFtJART5XhL7GEidSw8B2%2BfaTy8zSl50bWibgE3wyTm94J30I4SvwPNhv%2BfQRDatI47C2tID2%2FhskxUyx3Uh0hrwR6FMR0qMEZEfAWY8I0GQspokOvBSoQP6s4TVWC63CzaCRKFmEqjMV3OxKh0hq1tqGX15VO7LdnTk93cQHZF7GmXWen6L5P5CK9BKrsRe%2FMDAUq5xJ1cERqBlpPaECh6krpiiVGZylr9tC%2BofftMC%2BPAGplwmA95elzzbVIBhcR3IiEN3X%2BlG0y3limnsRNgewrKsZXwN4DehtOPWmZ9f0aMi3btFGFdoCGeXwNNe0oYiGHv%2Bl3NU2XwllODE6ck4YfoNvneXFRbHldHT44bv9d3p6iF2Iw79nEzQY6pgFASKphWciVeST%2BuwiEyuiCeVHAkkpbNx2P9CCmwAniOkk5fj1BuVnzl98Lz62%2B02E%2F8FjMMNvacb9C1W4JbWQqCEV98xGUH9wlPJA3dYvMRJaHlsirHDZCklyK3nTp7FH1ip9K5eIJwhslIEGH8G5lCS6iGVMRG83PGppuKPR%2FhIWgjZxPd%2B4Cnjt%2BgP%2BfUliXAiBo9GJqSU3MTYPGMcAf8P0cmH4a&X-Amz-Signature=f04376365ca31c139a036934ad63f5f31dc1d8e4ed1dad4239be4161c37919a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CSQ4DJQ%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6hfJrbmhI%2FoDH3uY6mRwh%2BTIq3vZFKKNFuHnp%2FDlYwAIhAKHBezr%2FRYY8%2BJSNhDUTB68fiuRaoEJuR3N1A7h5nSOWKv8DCFoQABoMNjM3NDIzMTgzODA1IgwDsgYj22US6npysAwq3AMtDc6QJtqytxGq6R7pxO40G%2F%2BWFekuR9oAhSDBnk1VA6FBthXvHUmCofY45Kv6tjnSHOwxgTjsjnbPvXRskrp8UCGdoR4OR6iX6hcY%2FG5GMQpIWx4Jb3IPVgoZO5pgWFmKYO3vrxkWK2lGh6HuMgCITxfC87jK4qXFwR1N%2Bfz7uFJG0j5SDrCbcCbTd%2FW7aMk%2BukBwVA7yoex6NeJuT%2BYlnNitr%2FEqdv6Q4er5mzzOt5fb9zbELAJ8UyXwnL6CpkptftNxyR0I4QTJStC7%2FQihAahSFOUwz0d2kZinXDZPcrhpE9FH2VpZhR%2BPRlXSccWv9klcBXgeqY9%2F0%2Fvu4CuAMKFD3oIXTlOgdAhKPkoTpUXPlV4L26oCJO%2FUaDChXzzMoAMjKivMvnax1vPR8kz1W%2FDRAXwqcALnnby6gPw9f55SUUSEYXINM4WsoVADqM%2BLWd6CoiKNs4xu2EgaZj%2Fk9f7yw7FpGIuaY37sxrCcERv0GGBJoD0D7TULxzUPhPLQ0d9LMCC6Q5mw57gb6qUfipfk8W8SSS6rItYIQSdviLyoIkKo1CBkKu5mPaG7tSxPx1XQz2%2BqR9EkSmuEBL%2F0zRQiJTunZOy3x2zsZx3E9J0zgyKkQIokEOZJczDd2cTNBjqkAQVE7mn1JAVRRZ1H%2BCS4Q6pDSHt9ELVmX1t%2BbG2ULZuqxVXJVxPrTqBhiCBqwm222CVRrS10ySvXZhxs1qCD1lSkEZGUNcSABZ1jlgOFDztq8v%2FpbgFc1pnhoXRKGZKPa7VPtWanUi1cute6rqREkXlO7pCvA%2BvkHsSnjE8Gpj1gs7SOQkcZnHsA%2FwiAsPN4res%2FFrW3fgoPlrCZXr1tzFPO32n7&X-Amz-Signature=8cb02d0aa3f3ef62823507eda1bec0b47397f1e2696c17d558e6db40d8f4f488&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L44FGYI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093025Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD54I65I%2BepIaIMZTYhCP3pN6z5vAWS8%2Bk2ug5EPE2LjgIgT7BDcIlWoCf09dqyZ%2BUUpVOXztrOyA7KYQrzH82TGNQq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDMYRLsiWD1PJgkKCYircA9A3LnJYPlWi3CE4pDmhjLJC3i%2BuRsn8myJJya5L0%2BJzOYYBM0WpWhmOBJfFn%2BnXihKImGyqnWbS0%2FZL%2FMUer0BdzU2TN7BamC%2FsrKxJP7qSbKLxlqh%2FN0K%2FmOgmWiH9xh8jY4zX0%2FTpOyZ2RVkMhgQ1bn2UOvgCbZvR7dnN8Xjwl6xHGs2A%2BNuiSeU5i28UBJtHfu6PohVcm3cnCV5qgsxuI%2Boi9uQ2S%2FZV7hQer6ns3APzaXwMnnctRU3oAGx0uvekjoL%2FDsb6mhN6cnTD5pqJFWP5FJmDiewO7gE5dYzXDZTu%2Fvfx0zWMqiBJs43AEE76bSaP1Nys7WUKSCZ5dThod4Ha5m1dq8RHXafIRevMYsDszyD7Tr0Ig7AvKvfB3VVY6o8MehapPyBwbAtuVsZO%2FJ%2FnDflXIHyac%2FqP6pzrgy8S2MkZaZ4wpnOdUa1KCS6Pit38tDxxRpNKJ5V35%2B7n6cat54L1hnQNUSM8JFDjvNbUZqTbCf5l0BX2Ah7qaBztKkMi8Z4SXuxZZBqoWnpwcrMxRGPUrNq9gF8Dv0ACOn8hSjpf2VeHIYt07tQoh4N2%2F14fWQRKp23YlI9fHEvLaWDBONpkSHEsw8pjZRIaPsnxl0375%2BXKDr0AMOLYxM0GOqUBrOuqCrKqDHziRvV6AJF1CLtKm4l7gWqaVvefTIZuYWwrfcuhSTl6upkFew66tvCn8ULQCl8nf8LG%2B5L5GcK79OFQq091YYlT0R6CWW7EsD9qGfto5fBcD0U8zarmgSj%2Fg1%2BcAu%2Bsduw%2B7IPw46e3IRTxMHQ6YmF0ap7sru5zHCMLoyRCkBHHpi%2FwKfnxNgLxh6KrC%2BeFHMoM%2BufKBDCFJnmOoEmv&X-Amz-Signature=d68455ff596c5e4fd4f31a4b9b39222f8295ff67bf5332beb6fdffd3f4ea0ec7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZP6DCWC%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDApWHKwU3eAgVk6nMvCCX9Y3OE6GPrVtOGuUrK3gt4gwIhAKL6doQ5zaryjesW4PofeV4kQKyS38UQfsNpq5HP4T4IKv8DCFoQABoMNjM3NDIzMTgzODA1IgzH8GmCWT4iKCaezrAq3AO%2Fqr3zEL7KvtpKRqTMABvzhhC9sEBmWjnmAWQzHsM4JXb2P4LSq4JVu9el1YDKn9tBHkXfZlqWKtXOKegN%2B19B77S6olG9Ugxg9JUzWRMnT%2FmgSnJFkItad0AhQa0%2F46VJnb6QaCCLqzThhduNQden7%2FF5ormtjGVB1GTJNz3arAF9u%2FoUReCG9%2FTa2B0sZkZyUHJG8XQS7REnsJTp6a%2BQPwxjNg9C7H9tSmfsYgXXu5O2roQhKbPOKzirRrUTUG4Yo6FAHxZ25CdskN72UWBLa7GxslNvRg%2FB37EWnw%2Fl753N1YJDBB5s1BQEIILgk5OdRXXX%2FA4g%2BPA3gHHneU%2FFZpTZcDwkMHhzTPpe5sW3d7%2FmU0UyV%2BUaZFRNUR6mHaO8Q13clEX2lx6lOudn6vS6YQZrPoyxQL3wreK2Ve%2BVK8%2BwDTAGQJI72hn2KT21E4Q6cWYqJ8VeCj%2FJSBBb3df85drYkmTqSp4Gd7KZxlIEZ7X25%2FVrPCSvp2An64ryhwI8SBzm0jqs9fz77F87ntfauBDxL7tFu36b3X4A6wzbey9iHO%2FyEMsSrWS4yJ41dtyD9QLL2eOwFv7g0O1kvdJLfV4npPE22fm06GNV%2Bwqdd%2FhDgb%2FJQCIRfGVaijCo2cTNBjqkAUo3pcbK79s792N7HYyi96oBs8jB8XHkLNBgERg0mWy4EEPJnsQ0pjukQb04S3fDlMyRZzu2dYu0y8LlPlB1jS0M3lc5%2F7dsNO8MOilVx9vX5eNtCThmICmsDiP4VWMHeMRx8ilBE3TPNX5tH3eSuevQ%2FAao2Q1DoxBxLi45kbQLNMuHVfMoapsicnxqBiLDOfM7Kh5SYFBeWiaf291mbgjK9UAd&X-Amz-Signature=86cc6a936647875fc83659f5dbc15b88ead282436d2b9ad35bd6bbfcc6a1dcf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VK4QJBI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIARoF7M9%2F9jrdGAmnmoTrFkK7V1SHLe24qovtojVQI3SAiB1rs%2FV48FTDRTuVkav%2FyDofSW1hbMel7OMQ3eNRpwUmyr%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMUKHP1BFWXUT0AzXFKtwDsCDZWj6tSbFA3raoLPG1EZtSXjn2JjOac0zUu%2FEOLoJti3e2O8b8%2BR4aXeWvAyMydg7twxmyJCi8YRUdo4V%2FGUnYE%2BZ66lZlxhWxNm8cfHzdlXN3Atrvj%2FbewpcpKR2lFILwBCM50jnmiDzzO2XmUI6aPHIAMmzrLsmjbdH9zXEcLzjnNGKYbc9sNwv0fMjWX6ikkF8DhxQ4BZpDvowjw5qlPcMyE3oNNR4sHNPIaZVVDt1eAvbeN2ozgjPkzkfBIY5W3v8g0pgT12i9Er8MB7OyM0x%2B8FmBra6Zt5KaNhxbYWtkC48aWNVaBKKQWAXGDOBn9%2B6DO1QpkTIqAZrlThP3ygsIqGz2vCS0kCXS2kJJ89hN8xnu1KLWxr0EMnEmQP9ylaDpT0j8odxaOJxtLNOq1cdpCm5bxPI90iPz3rYzjTsvTyimXwvIgrrITKhXql%2BsJNWGiPKYU7xcjB8grpuvrm1v8GwOQxczgKfb7J%2FaKFBm3oO0g0Gl3t%2B95qH43Z%2FmCXdAVV8wcveGoc%2FRbcr7MFGrxZY%2FstO2kU1vtUzSvnovMUDA6yGb3nWfmsImFwfBJPkEccl3jA04WpRCUm5dX5ZhQDk3isCjeJwent4DRXEHiMdXOSNisowwvtjEzQY6pgEsIRg5YtSETgcCzvgLrG1ediUdkZ15zGOtckRbUXvADf4tvhC5l7bXEvf15a1LyZTJz0KbD%2Bx%2BBQIRhsD1RRonVNGTdkeyvPdj4x%2F3b3xR02du99RxCISHJCaHsO1feKEc%2Fjyl2Z8dGtNCtL2B1cKjXXhzX83avM27cXsqbEKy7dgwHHA40DIsPrUty5rFKf%2FUTzC2uzc%2F8vD0eAW0DgDZ1M%2BUfQGF&X-Amz-Signature=ab3c32e5b64e002fd4e1031a0283881eb8fe2522d489778587257eac267745b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VK4QJBI%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIARoF7M9%2F9jrdGAmnmoTrFkK7V1SHLe24qovtojVQI3SAiB1rs%2FV48FTDRTuVkav%2FyDofSW1hbMel7OMQ3eNRpwUmyr%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMUKHP1BFWXUT0AzXFKtwDsCDZWj6tSbFA3raoLPG1EZtSXjn2JjOac0zUu%2FEOLoJti3e2O8b8%2BR4aXeWvAyMydg7twxmyJCi8YRUdo4V%2FGUnYE%2BZ66lZlxhWxNm8cfHzdlXN3Atrvj%2FbewpcpKR2lFILwBCM50jnmiDzzO2XmUI6aPHIAMmzrLsmjbdH9zXEcLzjnNGKYbc9sNwv0fMjWX6ikkF8DhxQ4BZpDvowjw5qlPcMyE3oNNR4sHNPIaZVVDt1eAvbeN2ozgjPkzkfBIY5W3v8g0pgT12i9Er8MB7OyM0x%2B8FmBra6Zt5KaNhxbYWtkC48aWNVaBKKQWAXGDOBn9%2B6DO1QpkTIqAZrlThP3ygsIqGz2vCS0kCXS2kJJ89hN8xnu1KLWxr0EMnEmQP9ylaDpT0j8odxaOJxtLNOq1cdpCm5bxPI90iPz3rYzjTsvTyimXwvIgrrITKhXql%2BsJNWGiPKYU7xcjB8grpuvrm1v8GwOQxczgKfb7J%2FaKFBm3oO0g0Gl3t%2B95qH43Z%2FmCXdAVV8wcveGoc%2FRbcr7MFGrxZY%2FstO2kU1vtUzSvnovMUDA6yGb3nWfmsImFwfBJPkEccl3jA04WpRCUm5dX5ZhQDk3isCjeJwent4DRXEHiMdXOSNisowwvtjEzQY6pgEsIRg5YtSETgcCzvgLrG1ediUdkZ15zGOtckRbUXvADf4tvhC5l7bXEvf15a1LyZTJz0KbD%2Bx%2BBQIRhsD1RRonVNGTdkeyvPdj4x%2F3b3xR02du99RxCISHJCaHsO1feKEc%2Fjyl2Z8dGtNCtL2B1cKjXXhzX83avM27cXsqbEKy7dgwHHA40DIsPrUty5rFKf%2FUTzC2uzc%2F8vD0eAW0DgDZ1M%2BUfQGF&X-Amz-Signature=871ae34ef82cb6c27e020fc849a8c498f391942e0f2dac2acc4595c81bf0e34f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVVABXTR%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5llkic1z2SqMAuhliDViChXjUAyhyhhh4vI%2Bn%2FlnDKAIhAJoBsfh5rbwJOv5CA%2FtzPi%2FrI%2BME5COya3AFkJ7U%2FKL4Kv8DCFoQABoMNjM3NDIzMTgzODA1IgwrEDfxXwFfGNySKB8q3AN3Lg54Avnr%2FO5BLn%2BxZ7vgKKc744VM%2FjSIMaOPN%2FRtGSM0YGc7hf0sLjyOXfCobDTWckx1%2F%2FtVVw8xpX%2FXqCzGz19J5TowNSLilYnboAxpUNX0DnkUb%2BUMIN%2F%2FbV1evCPckmbkvsK9ayj4vu7XWD5Td%2FbQLTK%2FWs%2FjBHUzJohLjQ%2FnnZVBKwIJ0hnDY37pS9GHbRCKMzBIShL9Uo5VVNhnHbsNS43ovWxQA%2BshyfebZ%2BBtqBoqCF4Ojnxr%2BLUWA%2F7C1%2BxQctdeiemb732ZzIU%2BvzkwX45zwfkNR8HBsB%2BWUvGxJcuiZDZ23owbTUy197JSsmLBRgbTIK%2F0%2BqjIOS3OsWkKKBobzbsP54%2BVznwLaWo1o9cb1R4ArUPGzBsx8pumi2Tu7znN%2F8D%2BbvJ6DcK%2BCsmWantqrIPwqTWKlgXl1z59w5oo0dk5qg7JIU%2FZCBOdEFVAVeYThekq2HCxrO3yB6ux1XFFNgowVrTA%2FJUl%2F2gWa4zsCL2Lw3mf1AVodrJPyF89qREKYV4KdNWvwYdogiVYrZZarX6%2BK9WsRBovrQrMdviGriFRp6kpdDjc6ZZpHNdn6DjDlOdK4pG09qfNeSuQ5ZBuoQmMOUIfLYhvpLQoU4ojnYy67Ul1PDDm2MTNBjqkAQh9yAY5vhVczjK5DNlPzNkDNXqoFDSVXN%2BBmSnn88pmAJHSlwRom2HVHRcmOi35xqQliyAtu0UeauBctDSISN14CIt6LUIn35idHdib%2BLRZJO%2B2iBsIX49XrCTN1vqqDo0%2FASx5qYQIpRGHmDcVAkuoVV2DaVyeVp%2FiJM4K9ERjyVc6wgaDLDGjN8eL07irYzhJpxWYD7IN11PH4WrB8g656oiV&X-Amz-Signature=5e34613d00aa9d9fd61409ce3a7cf5281ef5e97d7544dd317c2acef6667e47cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7JW4CIW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTtCjDTK2bOffMu1hMjUDfJ4OKf5S2HtAj2PatC3G%2FKQIgHCILB9EkNttoCmT35y9PF5rrId7TnmAnRmstzAXhZiMq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDMbbrGO2FgbCByH6qCrcA04ZUm7XLtooNG3JtOhx1IaIuEM2k%2FYLJXDst1G7ldgOF%2FgOQtgNpSPdc4VugKcJZhqExIi4Hh7Y2QLoXMkemAqVl%2F7LwPShIw3Apll9ffnn%2BnjSI7N9s0siEXG4aOVzMr%2BA9Ia2KIn51I%2FRHfsMWArPmR38%2FzOZ0NPgabGQk0ETypgyfB66%2B26y8HGkQfdN6h2vcxlcH8VX4dnsKvaUGJW5zAvy8k9o%2FS7euvOvBYEwiZjF1J12c3vZ1NnepOnMRB4aBpt6bQ89Rfyajs2GnbNgPDz706ZmEndbI4HvyYF5yCH3KTneZCp9WVbne9tm0QcTPCrr1L1I9oRxWUioQMLNePeZadrzgI7OD5hQaw0zmZC6kztcF8VODWL6v7PkY9wg1d07fT%2Fn%2B9XLjZX8bxpVuusK1SlJw2lqKd0s6X5c0IX2vlq9jdgJrzf%2BW%2FUDibz5a14zJU5aiwBW48SlUWyqdRQmYAKyqQYXTgwFMTCbIjdgm1ETbaki4mcDzOMeWAUZnY%2BgGz4e8tuQSAL5wlZ1%2Fb13r6rTADHQlsK0NGgEDYRJnp392cM4TXY%2FnyoUJ89ZO5vgPRawDF7Em%2BOyl65IlRFscHV8qGKP78M2NTTNitL4DEZb9KKOgHqGMI7bxM0GOqUBL0SuPvDhd4GYGyhtT7eAJAdLLsJQlBZwrXLq8uqcv31%2BcokO6h6alFE6imf16oucIz%2BIzw0jPoucP2ndDCtfx8otYvMGB3y0rJWqG1hIu2TF1D8gSH8WMvyzInM%2Fqvksi%2BDQldkxUtUd08QREPL69j20SIw4rTZ%2BEZiAmtqF0vY09qFhIhXUpVYDZRuQd55Fv50oLja0idWzZmk7%2FR9hxTsdV%2BnA&X-Amz-Signature=cf8941372e18425dff28b1cb95fb352b9f752287a7c93e81da4aa643cae9695b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7JW4CIW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTtCjDTK2bOffMu1hMjUDfJ4OKf5S2HtAj2PatC3G%2FKQIgHCILB9EkNttoCmT35y9PF5rrId7TnmAnRmstzAXhZiMq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDMbbrGO2FgbCByH6qCrcA04ZUm7XLtooNG3JtOhx1IaIuEM2k%2FYLJXDst1G7ldgOF%2FgOQtgNpSPdc4VugKcJZhqExIi4Hh7Y2QLoXMkemAqVl%2F7LwPShIw3Apll9ffnn%2BnjSI7N9s0siEXG4aOVzMr%2BA9Ia2KIn51I%2FRHfsMWArPmR38%2FzOZ0NPgabGQk0ETypgyfB66%2B26y8HGkQfdN6h2vcxlcH8VX4dnsKvaUGJW5zAvy8k9o%2FS7euvOvBYEwiZjF1J12c3vZ1NnepOnMRB4aBpt6bQ89Rfyajs2GnbNgPDz706ZmEndbI4HvyYF5yCH3KTneZCp9WVbne9tm0QcTPCrr1L1I9oRxWUioQMLNePeZadrzgI7OD5hQaw0zmZC6kztcF8VODWL6v7PkY9wg1d07fT%2Fn%2B9XLjZX8bxpVuusK1SlJw2lqKd0s6X5c0IX2vlq9jdgJrzf%2BW%2FUDibz5a14zJU5aiwBW48SlUWyqdRQmYAKyqQYXTgwFMTCbIjdgm1ETbaki4mcDzOMeWAUZnY%2BgGz4e8tuQSAL5wlZ1%2Fb13r6rTADHQlsK0NGgEDYRJnp392cM4TXY%2FnyoUJ89ZO5vgPRawDF7Em%2BOyl65IlRFscHV8qGKP78M2NTTNitL4DEZb9KKOgHqGMI7bxM0GOqUBL0SuPvDhd4GYGyhtT7eAJAdLLsJQlBZwrXLq8uqcv31%2BcokO6h6alFE6imf16oucIz%2BIzw0jPoucP2ndDCtfx8otYvMGB3y0rJWqG1hIu2TF1D8gSH8WMvyzInM%2Fqvksi%2BDQldkxUtUd08QREPL69j20SIw4rTZ%2BEZiAmtqF0vY09qFhIhXUpVYDZRuQd55Fv50oLja0idWzZmk7%2FR9hxTsdV%2BnA&X-Amz-Signature=cf8941372e18425dff28b1cb95fb352b9f752287a7c93e81da4aa643cae9695b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE4QL7NT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T093032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAGRwxoi55ppAmkizNMlYkgn0YCOgmuOwtRw6cFYkPCwIhAL%2BZqMZVmlYQzEBOhcYG7zGk19E7JRAjhbFBrmvbvi1ZKv8DCFoQABoMNjM3NDIzMTgzODA1IgxtJmVkKN7LiC3Y7%2FEq3AObxYIYTRr5qwcs7yRCSfu81NDtU6IklhfIvw7T4ez%2FQxwRsNmNiKPOpN2Zn76iwdtRiQC0KYNWd629JzHFj1IdliPgQPEvVEGjN5Rt4wFIIAeS%2FQuf3UU0CPxcKqt3wXGgY9dhBVg8ZUck73Q0cyPQlkm0piMyuJlkoe5WjGx6jMm3u79t%2FxejbZ0GlsDIEwXvE6ywKrqtILHg3pwcJWXXe%2F7tpulL0as6NWpiktMB85yd5FE4N4SeMfiIX9JuKg3p%2FzM1n0DERKrjjn%2FHNGl9utFnmOgGQ6wQ5wr4UKfGrCoujNp3Y%2FbpxsFeLwO0RO3e4wCIBUePV5q%2BoabLzyzgfrRzlPOLGBWL1HKrddXV3JrYOBB2cpClq06sh88tAejgmRRY%2BLCMrKLgQN9DgUqkVdMIGOnCpFCiobnWCdiZaLxXjBtNNNlGtVPGIPoyhCZI6te3TRHlDmNItlPJtWBAXS9Na8qbQ7iuMMaWwkpNJKqIWAZEECmRIRLVkLTavtAzQGaBxOw87KWBw7krys1WT6l0%2FJ41BtqqB2AFtABoDas0d2iD9vykpxHFmVaCSDJ4Qhaj9GdPaEpxa74TTcix0GtxjZsimqgeOsIKyuWc1Frp2JCyNHkqvtbkljDJ2cTNBjqkAUBtYannBmCRGagpRtKjlPbos9iQkh8%2Fhuq6X0vN6rUB%2FMzmykkwp62YITwgCaRsWe0cnBSaCZi01y3SyYfPfGy5uMlYFoYg9TlTA8hVfj10EIjPV0tgpuHC0mKBQIAa7E5LdNAN9PhyvREYQKb%2FUm47q8aKG6GIUwKxl78yCxailWORWsODgpUt39pu8dCOkYLT%2BEBhQDu2uLqjQc2INl8cgre9&X-Amz-Signature=6e80f75bcc0240dbddba668b81aff1cfcbfe3075f02bf9f8efafb7b2aa0023d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

