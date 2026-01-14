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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOK75RMV%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDKHGVY178qOWa%2FMLgYxDdoYkhqtYf%2F39nZNERcYxVR5gIhAKkumfu8ra%2FXxMnOR%2BZsZHOGNSU6bhyjkGN1E14JAIdmKv8DCBgQABoMNjM3NDIzMTgzODA1IgziTRbBzY%2FH%2B8abgqUq3APewfgdMeMllL810UGynPRZPjWu8QLgg4zQTGXDYW%2BfK4IUClYAV64Tgh4eGqb9zMfrBC7BV4gS0x1AUgwY%2FI9mIzeVh7V%2FeclBmZBv%2BPYJrfFvP1KvD5Xt9EK4roLxg%2Fq%2FFKRqMPrcl0aGDSaTMTAgpyYwGLeTDVRWIRtXkyqdJgAV2hskCuH5LcFHI%2F231L%2BEEbFea81na4VhX5E%2Fbq3dJ2vzKy5a5TRzuttJVi70ZEOkEWkAMQmL2T2SDmG1gGDWr7zRj%2B4cL5NOcjaNr2gp3JGVOQggFQFHWslJM1LZA%2FaeKHGCTsnLL47Tk9VPM30tO%2BM9w%2F3iDE75o0%2Fc8UYxCRtbXaq8OM%2F9ZLxhU%2BOiqiAx38fEZywbx86429MjAvk%2FXM%2FUwB8Je1bLGZ1%2FXLwI4gn3%2B25qBtlqajrSVTk6RjZfM4W2JWDQS8%2FVkYLXDnhrxDnbBERKWy%2Bbhnl5hSMEhEB5CFxUcdsxDbyz%2FCy%2FMnxm39PFzNsKwaz2SNaswgNVf7CsvZstfl2vWaxHR%2BsC5VRctqRnJIpOzu5UbL0MWPBo4bt0sTKAYIoDG%2Fm0J9qkcQLqZlIE9bfXvOtdnDWKghOaxY35TcfUUJ5sG02wRiMO8RCMUfdWYzeLGzDv%2BJzLBjqkAQJRhkCc4VSHeXOjEAfJtcWc5RYEa8hOCrt2%2BN%2Bik7qxY5CQpmMU4ej%2BR3CiNB%2Fu9Oq0ijztdbYG8d2MC9NVlTjQ3cx169zFLiEisoBSUkzgkc%2B6W3Z3VZgYGalfriT%2BXKWsLbMLoFr6%2BZ7okigqYb4Ngq6lXTb737cc%2BoKiszfxZ7lPsX%2B1n9Up8o6hFIOKkO3YlQ7hkUKsghCkTGdl0Z3T986l&X-Amz-Signature=fcd88c8ec08115356139eb02d0e746af93179f164aa565edbfc298805645ee4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOK75RMV%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDKHGVY178qOWa%2FMLgYxDdoYkhqtYf%2F39nZNERcYxVR5gIhAKkumfu8ra%2FXxMnOR%2BZsZHOGNSU6bhyjkGN1E14JAIdmKv8DCBgQABoMNjM3NDIzMTgzODA1IgziTRbBzY%2FH%2B8abgqUq3APewfgdMeMllL810UGynPRZPjWu8QLgg4zQTGXDYW%2BfK4IUClYAV64Tgh4eGqb9zMfrBC7BV4gS0x1AUgwY%2FI9mIzeVh7V%2FeclBmZBv%2BPYJrfFvP1KvD5Xt9EK4roLxg%2Fq%2FFKRqMPrcl0aGDSaTMTAgpyYwGLeTDVRWIRtXkyqdJgAV2hskCuH5LcFHI%2F231L%2BEEbFea81na4VhX5E%2Fbq3dJ2vzKy5a5TRzuttJVi70ZEOkEWkAMQmL2T2SDmG1gGDWr7zRj%2B4cL5NOcjaNr2gp3JGVOQggFQFHWslJM1LZA%2FaeKHGCTsnLL47Tk9VPM30tO%2BM9w%2F3iDE75o0%2Fc8UYxCRtbXaq8OM%2F9ZLxhU%2BOiqiAx38fEZywbx86429MjAvk%2FXM%2FUwB8Je1bLGZ1%2FXLwI4gn3%2B25qBtlqajrSVTk6RjZfM4W2JWDQS8%2FVkYLXDnhrxDnbBERKWy%2Bbhnl5hSMEhEB5CFxUcdsxDbyz%2FCy%2FMnxm39PFzNsKwaz2SNaswgNVf7CsvZstfl2vWaxHR%2BsC5VRctqRnJIpOzu5UbL0MWPBo4bt0sTKAYIoDG%2Fm0J9qkcQLqZlIE9bfXvOtdnDWKghOaxY35TcfUUJ5sG02wRiMO8RCMUfdWYzeLGzDv%2BJzLBjqkAQJRhkCc4VSHeXOjEAfJtcWc5RYEa8hOCrt2%2BN%2Bik7qxY5CQpmMU4ej%2BR3CiNB%2Fu9Oq0ijztdbYG8d2MC9NVlTjQ3cx169zFLiEisoBSUkzgkc%2B6W3Z3VZgYGalfriT%2BXKWsLbMLoFr6%2BZ7okigqYb4Ngq6lXTb737cc%2BoKiszfxZ7lPsX%2B1n9Up8o6hFIOKkO3YlQ7hkUKsghCkTGdl0Z3T986l&X-Amz-Signature=fcd88c8ec08115356139eb02d0e746af93179f164aa565edbfc298805645ee4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNJKSQB2%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDleXySjT5DIfx8yftNxGZAzJNpIFapS%2BqaETMbzNYLtwIgROs8VGNvsLC2VaTwggOsD8fEGkv1AIO2VuiLNaqvYhcq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDLklyV%2BXOo5YJtxJhSrcA%2Fy3BXUPtBo%2BxYpLSJno7j8LXIt3fUd2RnO4c3ix%2FQyoaaCswxe1GYe19j%2FcfFV8w6%2BpHLUR155fYedRF590zdaAOAiIMDVy4Ggh8Gb9AjRjN0VRBvdFBlM6ZMqNqwG%2FWFbxR2fBsCmTA%2B6BhLMFMqzIoW2LAc7AfeXbGErjQYuyTzH1YReBVu7auCUNkqBwCEoL4uLdCeEWrkunID2NNEiyhDOz8alXWC4Syy9FZEe%2Fd9ICSptxiqIQ%2BtX0YZOoEHyFEEWpeYB95wHl%2BN9PRAVtBZSsovDrZ2IRcr6yTyf2HukaTyy9ctPoKZLM8HLeDyze8ciZ0yAbAoxI0C5hdrcORfv55brhSy%2F4RnqKuCpE9%2B3bgfvO5XbVoBbQ2XbxnvjJceMfnUBaNvKxDXqfxNHX%2BM9dxffRHb2ROM8wVPMV598AkpkomXHXw736Ttge51n7I8QTuY906720qTubi0XdwyiUa1oWtq64eIC9pc%2BumPpsId0kx3bcDPz0L6cT7BFylqdDAn8vpAyzsre3WmW78SBGfT6HCnrHXXT0zzz066QXsxg1k64b9XRkBe%2BR9Gmcn9xh0l29I6QL%2F86uZ6oLIBrW6WbetEUoQ6aubWUmajw0XHvkPyA%2BkotnMND4nMsGOqUB1ociPCu5HnOVgwrIHtPeEuJhY6uFUyGgKz6piecIkAL9PDvtAtlbA9UZDHDi9CkUSnD6EWCSYI7cdRKIRRG5h%2BqF4QQJBhwA%2FVwSNSDjzjRkSXGkgEeE09S2PnVTBrjQR2ONJCfIMQbUtplMu%2FyOtAsAhQGFjn%2F%2B3h2ITzKkqUiYsWVG8%2FA4uIoUHqx%2F%2BFc0R035HZgupZw%2FM%2Fgy7X01oP96oMd9&X-Amz-Signature=7f8b1d2b7628a9c746f094cc4a37e326391536c0254c9b3f882f5ba82fc5be8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FRKTFUY%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIDVuf0OPndyctFfojuIk7lOj%2BOMkRMUWlItERxkxxNWyAiAnqy%2BYSx9%2FHk770dRF%2FhPf99qou7BS2bu2V%2F8sFa0JdCr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMOfYILS9UTW8rOLTeKtwDTfjQg5ZzEmOdy1N8pVH1oJ4PICJbsnKa8SP%2BDRzUgbT4ulHiSpJ8TjDrXahdXGrHdqBC23JqeIjfTS6WtDG6RnYEom8FNBoqmxe4zZdfrVrwW2h0YzMvp5mOBWa6yY%2FJKe%2FZ2Ug2v2ogVdnMyHkdudhSbPoicDJbCLDrseaFtzbOYZ%2BZ9NGhs3iqOqaLB7CRBs2fdRFUsQa7F9Cs9bFjp3fkyUI9RV2u%2B4HrOp1paR3YR70olUT%2Fi%2BOl6nKXeok0lKF%2F%2BUCANmtyMYDZDP6vSsB6%2FZT1zO4v0GImEBvtEK%2BOFjJbQlrCdO0a%2FRUgSyePIeXLumle9F5Zx638NXBkwufBLG2AcYrJAvs7RggbVkAdg6tGwnMPiBAlQ1Cdtvt7NnPGd4jdZzEdaaOiKW26QFUTSalhgX6rexpZO0c1DCbpIbYPR%2BT7B5afQJQpijzMrDQQXaDtcGlb9ZcXz%2FfVhScHz9bpELeq9rvqeo83G2tInsNtag6Ap8lhpK7Gqfp78%2BF8i%2FfW6V4lBsrJyIoUVUk5bFAl56NU%2BxC%2ByyfuIDUzZRp3cY2%2FrhtamE9potq1QYwKBk3JEfutrK9oxGB6T3kMkzNqftQRuR4jAT1gZIxiGqlaU8UjFu8BE5Iwu%2FicywY6pgGBPH4HucWDSkaLLhBGmrLOXZqQghanMiC2gGzrZfvTqXAUoSpYGNkyQVhsvlqnQJt6%2FfysiRuC59fxPzjH2MIRX%2BOyAosztlwAx7BjgSWF0l30Kjh9a%2BJJ3AFDO%2FzBTd6E1DAk3toEPXhhUpofZ5XMqeL9QkNeoByiWRjFvv%2FJJhFq4dRkrYMLV2kvKbtx9m5eJ68RUJwLjpe%2BctA%2B%2BKtJ8bpDVLsZ&X-Amz-Signature=c3fc6635920c0c77a1f003b8e2dc47281e43713076d6288c6d9026753a225aa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FRKTFUY%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIDVuf0OPndyctFfojuIk7lOj%2BOMkRMUWlItERxkxxNWyAiAnqy%2BYSx9%2FHk770dRF%2FhPf99qou7BS2bu2V%2F8sFa0JdCr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMOfYILS9UTW8rOLTeKtwDTfjQg5ZzEmOdy1N8pVH1oJ4PICJbsnKa8SP%2BDRzUgbT4ulHiSpJ8TjDrXahdXGrHdqBC23JqeIjfTS6WtDG6RnYEom8FNBoqmxe4zZdfrVrwW2h0YzMvp5mOBWa6yY%2FJKe%2FZ2Ug2v2ogVdnMyHkdudhSbPoicDJbCLDrseaFtzbOYZ%2BZ9NGhs3iqOqaLB7CRBs2fdRFUsQa7F9Cs9bFjp3fkyUI9RV2u%2B4HrOp1paR3YR70olUT%2Fi%2BOl6nKXeok0lKF%2F%2BUCANmtyMYDZDP6vSsB6%2FZT1zO4v0GImEBvtEK%2BOFjJbQlrCdO0a%2FRUgSyePIeXLumle9F5Zx638NXBkwufBLG2AcYrJAvs7RggbVkAdg6tGwnMPiBAlQ1Cdtvt7NnPGd4jdZzEdaaOiKW26QFUTSalhgX6rexpZO0c1DCbpIbYPR%2BT7B5afQJQpijzMrDQQXaDtcGlb9ZcXz%2FfVhScHz9bpELeq9rvqeo83G2tInsNtag6Ap8lhpK7Gqfp78%2BF8i%2FfW6V4lBsrJyIoUVUk5bFAl56NU%2BxC%2ByyfuIDUzZRp3cY2%2FrhtamE9potq1QYwKBk3JEfutrK9oxGB6T3kMkzNqftQRuR4jAT1gZIxiGqlaU8UjFu8BE5Iwu%2FicywY6pgGBPH4HucWDSkaLLhBGmrLOXZqQghanMiC2gGzrZfvTqXAUoSpYGNkyQVhsvlqnQJt6%2FfysiRuC59fxPzjH2MIRX%2BOyAosztlwAx7BjgSWF0l30Kjh9a%2BJJ3AFDO%2FzBTd6E1DAk3toEPXhhUpofZ5XMqeL9QkNeoByiWRjFvv%2FJJhFq4dRkrYMLV2kvKbtx9m5eJ68RUJwLjpe%2BctA%2B%2BKtJ8bpDVLsZ&X-Amz-Signature=a3cfd0d93d33c59ae72fca9463ace5ed4c21cef5000d70e7a2dd99735e7a4a8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XUH7I7Q%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDpRNQJa468o0zWc25yZZ1nPkRjPQ1Bu11MZKusrpHTQwIgGMtqbrXfMeuFv3dif1%2Bk%2FVkaOQEr5C3U6fVmInQq9bIq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDAmLtThaNZ1vdzD%2BxyrcAw5BlVfpmqWxme2DFMURHmZNyy5J68DXkh8M1OCYcg76gn0SGBGfeS7X3oc7inhpdYVh8lBntut6MUcFP7OEWetRM1SceMUdYmtFmnmIFYsH%2BNrBJZoFUnUjyHdaZ1YFKTSRSV%2BStbj6WBQId7oK%2BH0dkEz5wz%2BCHdGIV%2FGh5ReDAVIee255SI0ydrz53P7OojCKzZQosXGJm73TscnqYhLWdAJQfY0w5o7oSeBj8VzG6wTfzEAsqRTwOwuxNu8TF3cWmw1z%2F09f27g4MufzIOp5mwPxyqDTHoEh2GI9gSGpO%2F3Mwr%2FzO%2BtIXnXrFSrfGr9K7lpQRXvGe9RcoapFE5hmRALovMr%2FXDV%2F1Rv6j7sYhFHvrp5yDJAeso61Y7GkvbG3dLhr2mneJ8H8KoCMLSQ2e8fda9Bt1lQc8mVYWagnIybl2XiH28%2BUleUgTqSJ5Tt3ODirmOr2R1aOT0FtT04iu5N50USDxW5ez6m%2BCdDxGp5j7Zb1ELw%2F%2B4bg0p6dywc%2BCP6csndmkw6aB39EocINjpoQ1TA3ZXUKy0A0TVrJrOA6NaZmqS9IdIx7DTRLoN7QC04m9r7sqU2tSg3u%2FmKOVvFiX2joovlxusnmDDjj0d1JMku8JtlAG83iMN35nMsGOqUBoCNUchvTKExkrNyepe5dmJBiwJPNJw64MPE4fDlwD5cadCyGlAY1VHQp4OACGdKmu0GOusAvBhd3m1vcJg4FXXy6chuYXHH2KqHOqyxiB6KPybqK%2BgGiom2HBTKSUw3r4cP7KlY53q74p0%2Fk0g0TsyheBXX4yoa9gpoVqKORPABpuLvv1pL1soDxyYheyHxqB3GDL2c94M2wTaJF0smi%2Bcn1Jf7X&X-Amz-Signature=c770314810528eaf4269e67e3262bb4bfe477715c9068a6b7bd90f5e01828a46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FQ2R3TC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIAfsKg8UJjwNZhki5XVo4VmIfHaAxFHlrZ5V0ajH73HkAiEAugLqpkWVlkQKPzbA%2FpPKbJu70kzmXUKcAoNxwd9zqgMq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDN%2FMHZe3FjsgFNXHUyrcA3vZi0m9KrnOdyer80lNvxDVaesSIbFqEGwDTwqSGUhzzwKtgMR9rXUB%2F6sooi4nMLTbkGcQClakkudMkks6afKi1eHXoNE9Kc93j7mwqO5om0wfpAAOtWhEE%2ByKq5im9eyMMAxsPRi8MuDX9%2FiM9Ml0WNjBTOKUJg7bwB0rxmjGkSZxKWXC6OT1f9nauU2%2Bs9OWUovI3TnyMOFGCGTDCErMBHokIZdFU0KhzdOU35%2BOwVtu3bhlRoUS07k6UsPYaP5MYN40E4pZNJiK9BYXU7c%2BixGVstQYvnI%2Bu524WH%2FsZqgsTss6Eh%2BzgMaE82S%2Fojc5zEalcwzSGiDPUe4uz00EHTBVmmmFHiTiA%2FkFgQlHG0bVFIBZxVYxwvodO%2Bs%2FxDNePMVwDGS19ApgltvM3UL7k%2FRzVXzSqO%2B3w8ysml8N%2FFwL2xodupaNr6zZbedTHPzrLpJVrB6EH2gAWfkoZH%2Bi6Wy58q5dh5JnVZRPS5vaj7Fhz4520jHBX22HAcxa4ZjMfMhSOyDaLd5GNRzDDf4cDBHmKEWnEwOOsH7IAGDThyAV2cds3xgpZocmwuyX2%2Bt%2Fca4gnzXOmFV7l%2ByhzSHRRYy15FLvtJ9wvM7xinFXtw7svgCYZjaYOLP2MOz4nMsGOqUB8QKwqp%2FTHdIoYGaonHXDNObB2xF5tIhDzhQfYHg5%2B2xBFAb5BNrHCmHQ9OXsKYJ4EfO53MhPYWad%2BpIZWBghQ%2FN1u6OXIqUt1%2FPveQdeJQ%2FWOOYBP1LsH3WW6556ITmfjLY40yU8Dg70qQ9k2IgxUgLw%2BHtvTFQhqWaDHLxytoHg1FRvyjCDgqQEIaimQ4XfLASGhnwOAuQ%2FM8kZjiPat5hT6XER&X-Amz-Signature=f30267f5bf44abe2ed8c0c7e87536c6d539102eba3fbc032439ca69ba24a1844&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FPZCFMC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIBWP6OnSFvzG286DWEfEFgPryc60wqu4R%2BSADkZgYu84AiBrtT%2BMQjaxi6X7JaqBZo8jL%2B1xH9dhZwt2K6hREw8G3Sr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIM4s10GcMYuK174uMLKtwDNxfxP5nuA1UYuN%2Bi%2FLUyJT1%2FEzlF017kWxNpxz3FEp5NO3%2F24D3ts%2BN8Qp7CSn9jOHxWr3Z0unzp3JvKCQws2NkzlZsqRpqts66SMNYVbuml5LRVQFLYS2Y%2B%2Bmyghlwva71%2Fj1AWkw7WwXU0Jvu7DfbVcUm7NjCs4h1w3iPr%2BpXd6fUJvnqd%2FhQYm8IShMWlbNy9h4RnfNbydB0AUAwx6xx4pwALj7vDCqRSGGx8ZSODujVoeiZBp8%2Fo%2Bjg7IOnDRHCnGCUCfPEVLdqVe2%2FBB0phJf%2BLYtelRSQJDtgMEB7RzISWBx1xC188JhK7G4ZYT2GwR1phAydRNHb%2BAOM3OrE5v0ox2Q1lVwEB6RL5n1Kekdmiwu%2FgU0MOXbloe%2Bx3dCtMEOphZtPoW4wCQkSPVpwJ8KZsjORdBmAxo1udhwMyhxn5kfd7vrto5KRrXe1apBw%2Fjfr4439ZWNDL8U68h0dI1xforAwionEMWuFsdPQ1F5bt%2Fcy9H5AEIWXuvW8V%2Fcbn3QGuUO1pRA7%2FWa8%2FYuTyb5FxCXR9WvvGP%2FPYKYPmTUJKjJOvDDuq3%2BF2CMpCHkkr9U%2B9OGHhPkQSEA9vS7WSQX3HgCbZUNJLKnMnAmAqs3GeEhVt7PxrIp4wq%2FicywY6pgGFb2%2Bv12u9NUJcSuMNpmSaweI1XXRbSd6cXMWFuKJLyB5z4q5HMSI%2F12NaMeoN6ZLRJFaBUX6YDU4A1nMuc3RVUTwXFsq4ezGpKlzjPPc8EbhN1S1j6ygXIKjkm50m%2BGtwo02GhPpoDragF0lMqMgEHrQqLnNy2DhmSJspZ6cV7TrgDYyLUCKyRnFu6jy7UYnkIW%2FfJCPBS7sjyFuzaBmkIA%2FBlUyf&X-Amz-Signature=35c15b719ac5afe07e4f272a5274fed8e21a741b287c531df0837d593d43b32b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMMZQIPG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICizTsQOi%2FOesZ3cR2aM6sBsch32xvlf0NFKye10luAHAiEAh8dMo%2BDDmupnzo5wsPi53kImRCOSrIyOdYtsbHe28GEq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDG%2BmK%2FL3ezdu8JB58SrcAz91SJnk7nX%2BOtOahYZYzZT5wRwnfYeftsOdtj9mP9baqjB13aLeQtu%2F%2F1h%2B1Djy6hrh%2FqX5jkesKIpepJHU2HbFZTDSfhQTBjonnxrSk%2FU5SHr8tISs%2BJQYGB672bGtq9EPWr988VA5bYAlCGsqU9a9JxQu7OPdrLAv%2BH96UyDfFLO1ya1jSO6xVc6bkOHvijM9glSlvOTcMV7WOLS%2FK7SEyKoohouYkkeKBKcLPNFBypbwr0A8CvGl2W0%2FcerGPqEEY6cYhKwO6To9QEF8h7APyJng3OcGitVbl1sBqMk1%2B81d0mFwGLq9sB4n3MEMlQgZCbeXYp3EYHvUHSw46%2BP5UHuJuEh4CSQKf1XOSn%2BD6a95hc1WlckG0sRxTZ%2FWeG5DysXsghPrJP4ie78bFIUPWyzEvtdJiNAkMw0nRPOG3AuqRJlqRdGcFdu7JYQanxDAE0k%2B6Fhl4UJxxm1TRm2uUeshcvbzDy1%2BLU%2BgyWsF8SlLxMql2T6mON%2FQEFhVIfjOlUzOk1fSaz4VVNtItoJqYmG6f496Y4u%2BMTjD8z8Sf%2BsRcLJBd7mNejPX0Onefp97DAVefgDj16hyRICn%2B%2B5Sgr24kANeuFquDIIMZ%2FtRO0f7mRJvADnrdCZSMKn5nMsGOqUBklB7FkwzqGJfRt7d84akK%2FPyIUgfCNOLXY0KWk74XJiuwMiQowir%2FQ3%2FovHWRzKxz%2FpO7XEztnvA%2Flt7QKXC486LepKewAWAMp7eDN%2FukuzQjoqldPY2XQRmuXzHpo4vZiyfnnJCg95hOw8%2Bhub8xHHGMTcfL3uvbNZM9QecViA8APY8NEWVm%2F5ERki4Xu9Dxp6uERAEVXaPaeOKeoIRj2Rku0c1&X-Amz-Signature=bcfeb8124e6dfca0dd41c45da6ea24eab08fecf7a1991b9ecdab51242a2bfccd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMMZQIPG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICizTsQOi%2FOesZ3cR2aM6sBsch32xvlf0NFKye10luAHAiEAh8dMo%2BDDmupnzo5wsPi53kImRCOSrIyOdYtsbHe28GEq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDG%2BmK%2FL3ezdu8JB58SrcAz91SJnk7nX%2BOtOahYZYzZT5wRwnfYeftsOdtj9mP9baqjB13aLeQtu%2F%2F1h%2B1Djy6hrh%2FqX5jkesKIpepJHU2HbFZTDSfhQTBjonnxrSk%2FU5SHr8tISs%2BJQYGB672bGtq9EPWr988VA5bYAlCGsqU9a9JxQu7OPdrLAv%2BH96UyDfFLO1ya1jSO6xVc6bkOHvijM9glSlvOTcMV7WOLS%2FK7SEyKoohouYkkeKBKcLPNFBypbwr0A8CvGl2W0%2FcerGPqEEY6cYhKwO6To9QEF8h7APyJng3OcGitVbl1sBqMk1%2B81d0mFwGLq9sB4n3MEMlQgZCbeXYp3EYHvUHSw46%2BP5UHuJuEh4CSQKf1XOSn%2BD6a95hc1WlckG0sRxTZ%2FWeG5DysXsghPrJP4ie78bFIUPWyzEvtdJiNAkMw0nRPOG3AuqRJlqRdGcFdu7JYQanxDAE0k%2B6Fhl4UJxxm1TRm2uUeshcvbzDy1%2BLU%2BgyWsF8SlLxMql2T6mON%2FQEFhVIfjOlUzOk1fSaz4VVNtItoJqYmG6f496Y4u%2BMTjD8z8Sf%2BsRcLJBd7mNejPX0Onefp97DAVefgDj16hyRICn%2B%2B5Sgr24kANeuFquDIIMZ%2FtRO0f7mRJvADnrdCZSMKn5nMsGOqUBklB7FkwzqGJfRt7d84akK%2FPyIUgfCNOLXY0KWk74XJiuwMiQowir%2FQ3%2FovHWRzKxz%2FpO7XEztnvA%2Flt7QKXC486LepKewAWAMp7eDN%2FukuzQjoqldPY2XQRmuXzHpo4vZiyfnnJCg95hOw8%2Bhub8xHHGMTcfL3uvbNZM9QecViA8APY8NEWVm%2F5ERki4Xu9Dxp6uERAEVXaPaeOKeoIRj2Rku0c1&X-Amz-Signature=29c4310f5ecf8e2d873b32bf14ca45fa6b55bdd62457703b57437d21bbd2d3e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4ORMJOD%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDvTpACB8Gova6KHlHdFESkLYwFPoMBhZD7rsD4XUF13wIhAOlDU90APoWHgiNF0J1NBeXGPr%2FTlLgG%2Fu07a7Kv5ew%2FKv8DCBgQABoMNjM3NDIzMTgzODA1IgwmjH6NAZYkIkdIMYUq3APngYXEpAhN%2BRn5l1OjJB9MXiyU5fA%2FKf896%2FpZcO5bFGaMwaeYjZ3t5CPGPMli0zhWP4XO66IJp6MbUn3FaCWpduvN2IJdZMjfsl4x8GotAogXrmn9O1xGE8gysgex4p8ynMyaJkZRK5xcVuJ7L0JODt24TqsoUjfIKAUcvSCImFHaehQBJKxe%2FwZVzRcX8AYp4lxMwK7MvskTMdU%2BQOqDFEjW0AahSuNd52tuRUyNf7SurNgtzsUKD56xkfCtow4nTJZMSrGhX%2FwBU%2BHTXw1XtvBQNdZB3Li%2BB4yFe9zPNMLume7qO9xEBcWhqGdPAM7v1yGA%2FEjfE3kzJA%2FEb8sEM7uvBMBxiHxLVYQ6AmSMijgBb0idws%2Foc7JZea42b56VxEeEcIroF3kYzlu%2F6LRSt4SSR6NV%2BvMSxyk05ex44nIdKO7f48NpAtQPe6t1H4IrnGqMOmT0zONBKycXtIefSZKeIqpvHL0vr7SCwaasWU3SuGkrqfDi7FmyUO27Y%2BbnoHe0yvmDy3eXvnrAVZEYWFdDMjMh5hGd9XExC%2B6%2BptfA7w3juqbDn7W4omGKIAeNsewLsLqTZ6FqDThv1qODR1Sp4CXpj%2BNf62ZZ%2BTfp3pdB7s%2FwydnSSQrm8jC6%2BJzLBjqkAc5sKdTEe3mC6QdqflMwOoZLinKdJ1NxZZwwVbWq2b7xGYouCx6c76pY0Tm79lT8edsOqB5ooJnByiOSbBpi0Xtg3VgGDHn494FZ6e56sNS0ZjDDttD%2B4V112jyfOskGehq5th7LGFhNZ%2FjS2LSmioykpI%2BN8LLNHa8PuT71LbOby%2FlbZL3rZFs2Whuhmlfrd89FPgMKaZdJ%2FgmwN421fQYXXMdh&X-Amz-Signature=3a8dad2ff7da3b2beed70cd3e93ca1f7f4736c47d0a709ea1758a5ccd63a970d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYFNNIWU%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDE%2BPsMd7TXA0XqdKZ5G1WFEtbcB5Rv5xnW8zRIbZ7ZegIhALhJner%2Fx44RW94CMzbxkpM55vEU4vmiEaAGmQRk0UdBKv8DCBgQABoMNjM3NDIzMTgzODA1Igw3NERE5NkaK4qj6G0q3APImg3E3rC02hp3VX61ogalhX6AG2NhECYgd2oy6uaFJ%2Fo9lWR5Aqc1ncJMrgl5ztgOMhMnS%2Bbfp9%2BsIadzh2flHP%2BTFTK62SWWw%2FcPj0gGv9lzSfiAq3XO5RvjJQ3lwpCdQ4NRK%2BvN5Ev8tQin3hVdGgV4G1Q7l3p1r0osYEoGNElBUSmfbAOppVnelM14ENO5yK%2BgHREfgNr789MbQfYaqld3A2yUfbl725qffGyZadfFHTWej5tl5lTiIl%2F87PbL1HUZzzdz8ZUQj0Jrfa64lghWRoMnlGkhgWG5VilbXPKAl7Du1XS9x%2BbZetjfDuplR1zYb%2FbjO1dbRQw7NXw1rwqIG5%2FUGtPgVrT4EpZUC%2BMOLqY9A9k%2FQM6%2B8TsB%2FcYiOtXZTkL52ODCkD1MdkZbMwjGNpgA6FKqcZkFrIxqbEpM8ACOSYcf9fYqH1Kb3G5eJyyph9kgxnB3FyaE%2FRNqA1xNpNAZpYJAlxHiVfNUrFWjaNcJemu99IOTqErWbIxFt%2FGcYiga%2B87Sasu9hmCCifVWihMh2yAYGjjV5Dp4bbBnTkSdVit15jBxdy3MFlCGm%2BLWttm0Xr2z03H7IcYs%2BnGNs%2BXKPZG2rBFiUWG7yoJAlOxNDg9diVfNGDCD%2BpzLBjqkASSRvwM4C7QTpic8FqNu6acfFAngh2nEhI%2BWSJFI2HxG6So0ax5VfmT7Tp0EopSRq6q3NrT49NXZ8JoELhE3fzKZArnZEun3DqXIoGH6z5K0ka%2FWd%2BzErDjW8CTakRXPPHJn6QjI8EPftcqN8SO8z3SEE8%2FX4xiZEAAjtOKNL2%2Fp8XqHld7iQPmaYN7TBYDOoBHkdE0OxIp9I%2BlJ20JENbooJ3ig&X-Amz-Signature=37eaa0e9437cbda2042b8c92faa73baccb0fb7c6bddb67117cc4203d42704fc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYFNNIWU%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDE%2BPsMd7TXA0XqdKZ5G1WFEtbcB5Rv5xnW8zRIbZ7ZegIhALhJner%2Fx44RW94CMzbxkpM55vEU4vmiEaAGmQRk0UdBKv8DCBgQABoMNjM3NDIzMTgzODA1Igw3NERE5NkaK4qj6G0q3APImg3E3rC02hp3VX61ogalhX6AG2NhECYgd2oy6uaFJ%2Fo9lWR5Aqc1ncJMrgl5ztgOMhMnS%2Bbfp9%2BsIadzh2flHP%2BTFTK62SWWw%2FcPj0gGv9lzSfiAq3XO5RvjJQ3lwpCdQ4NRK%2BvN5Ev8tQin3hVdGgV4G1Q7l3p1r0osYEoGNElBUSmfbAOppVnelM14ENO5yK%2BgHREfgNr789MbQfYaqld3A2yUfbl725qffGyZadfFHTWej5tl5lTiIl%2F87PbL1HUZzzdz8ZUQj0Jrfa64lghWRoMnlGkhgWG5VilbXPKAl7Du1XS9x%2BbZetjfDuplR1zYb%2FbjO1dbRQw7NXw1rwqIG5%2FUGtPgVrT4EpZUC%2BMOLqY9A9k%2FQM6%2B8TsB%2FcYiOtXZTkL52ODCkD1MdkZbMwjGNpgA6FKqcZkFrIxqbEpM8ACOSYcf9fYqH1Kb3G5eJyyph9kgxnB3FyaE%2FRNqA1xNpNAZpYJAlxHiVfNUrFWjaNcJemu99IOTqErWbIxFt%2FGcYiga%2B87Sasu9hmCCifVWihMh2yAYGjjV5Dp4bbBnTkSdVit15jBxdy3MFlCGm%2BLWttm0Xr2z03H7IcYs%2BnGNs%2BXKPZG2rBFiUWG7yoJAlOxNDg9diVfNGDCD%2BpzLBjqkASSRvwM4C7QTpic8FqNu6acfFAngh2nEhI%2BWSJFI2HxG6So0ax5VfmT7Tp0EopSRq6q3NrT49NXZ8JoELhE3fzKZArnZEun3DqXIoGH6z5K0ka%2FWd%2BzErDjW8CTakRXPPHJn6QjI8EPftcqN8SO8z3SEE8%2FX4xiZEAAjtOKNL2%2Fp8XqHld7iQPmaYN7TBYDOoBHkdE0OxIp9I%2BlJ20JENbooJ3ig&X-Amz-Signature=37eaa0e9437cbda2042b8c92faa73baccb0fb7c6bddb67117cc4203d42704fc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPTR4CGH%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T071503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIEwQbWiGyHPD3sLjL9XQXcCtcA5ciF%2F6Z1RysStuZ0dQAiAvPYJuGOSZSB6PxM7zuyEaPlbgJran38cu8OYe8kWCYir%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMZ5lk%2FUb%2FfwrsX3JWKtwDpFG3zXiuJGKF3%2BIThHA90YD3wpcVyF%2BW28bn4E01JhnqPO9EameK1ikpdrpUvXnBcX7RN8RL1Fc9Vze%2Fsk86v5w90%2F4VPlGnqYEdT7m9qDBDgs4jxIk9Lz8YBfSSqCCkdbvxkzY8DXu2nzQeZCAMYqa%2BgBwnzpNJYo8iLfjSy462QSjYH0qSbuJWUFZ6mNNUs7bBjgmEBStoMtT16JoHFZnXR%2FeWcvqIzAi%2Ff7MIrUTIi9t52oQLlKSo6HL6J2PkXCyK0cSGuDd2aXm4xj%2B7XMMR3UdDcM25jotsw9vCbCtuCPTu19VYCoZyIx%2F1GeYzPuJprDATAb6AHV9xn3XMk34EbSMMrMoI3IWOF72QnkXLT9IvMcKoyHCCzvrO7ceHIl5gpJ6o%2FGj7%2FPAOKbfUhzqhFnz%2B7MhfiR8pvUw%2FgpM%2Fw52PhkIpLtAxc14QPZpo1kCLFNC6ieRSsNpU7AaVw3b7ISWXxZmmhv4cKkKA%2BHniUqAdMvocY5sZOO5LTfMfaBzGnt%2BsYhWWazDJniXElrmdokJMLgWDF7U9t9nelejjE5MaPmL88LU2mz6rJxjz9KiJAxkvRs2WSVllX5CTOje2Wm3bpqkq2M0bqJwi7YXVMnxLjL0RzDOkYpEw2ficywY6pgGAOKhQK27BRHM%2BbYxGsg1lY4Hh4GATyg4AnUv%2F9%2F95T2IFXPBK9VfWA4xk2fEE5gyGBJwFtCuUwAOlFtDmKFs3H72CXK%2BqaoCAHDMu64aibfd6WdD6eIbAQPM9F1y8aU2r3UuH9QWcs25pDkQWVwAL2E90pvao0Eyz9CP1T0xMy0AhseZkwEyQ815yrXsz1rUveZqq52jONJQwWSgz9XPZjQdj5LOj&X-Amz-Signature=754ec024be29b8361b0045bc2fe4c5c73df751e1dec1c73c6ebb70d90a84a105&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

