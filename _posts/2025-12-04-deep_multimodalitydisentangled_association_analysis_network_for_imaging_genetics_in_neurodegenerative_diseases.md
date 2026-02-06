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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTRNYE6K%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDzNslg%2FBrBHTtX6NsAEew%2Bqv6efA4ffq8GJnmu5EztcAiBFRDfBoSJMOSOLPBYJ59BRjuQyI6PHAuuzS1yBNHRXOyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMXLJMUlIN%2Bq2LJoxCKtwDwPN1oiBgTP2vhuf90GHXbkbHd8o5x1Ux923Edvfb8spsvz6ndVkiJ4%2BZvTKDH6o6RhSc2w6Ms875n2DNpgj2DoqY8VrFcXtK9E1S%2BwpHbAFM3HnX7w%2B6WtmS2rDIYBebV6%2BMQeU4t%2FQ1AEMJ8rmFxZUnIgktozLGP44V%2FEsvCpdZ3Jczx1NUrtG4pBY%2FAvw9UCH53j31rnkqQ4BGvHsLDauzcL8N8RgkXOvL4qiS0hQ%2BD2HJyKRyERzlsWXGlwGFj1r3JwjUkdgbJRt5brWjPe%2FYSJ1kJC4%2FV6qUWg44p1UuUQhmu1qvXtaA1amIwINV%2BtY3PC9PgPZdETsAkA09Qym9wgFjvdpcCW6TCC1%2BtP7MDsJOAt0MS%2FUkUMIvqkAo%2F95bouSCzFJVrbvOmptS3hZS9LCqGH8JUkB%2FZZ9tuM621tu6CNNpdmPjALike91rEBmBJ9AC7kDpYcFtqSGJ9kGaNKCt5NUt61ViOXk6iY9E0HqYj8wlp4qaigh1icpXye3xa%2F%2FX9D46V2ghREybFTxiSBlsLiOklUqwaU8x9S%2BeQLYRFbVopU%2BO8yW8KCdc8wvFlSGnHux1FlHHuLo1C9m%2FjT%2FFlCBRTaHtjG8MNLTKk%2B1XpXIqOnIYlRYw%2BIWXzAY6pgGc36FMoCVAIcU4Q8yJIJ25JOMWtqGZdvuyclk6UEiiacKhPjGgJ%2FjQVJxRMPJ8S%2Bm8VUAm7Adwb5t5Wvf4H%2FyL0ePsLnRooKJcKJMXVLqTfNu0ueLzW65b1YJeCQUMdayezUfjhhBeqINOPrdcez2wxJXD%2BVFSZy04QQa0Zry%2FGHLDKnRwnWuhCxL7b8xH7zWE1XU97CkCBTMT6qP1LSU5L9DBvCzp&X-Amz-Signature=c471ff9ec190f4502a167dd255740854055d4b45e29b569008cde09d87cd86f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTRNYE6K%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDzNslg%2FBrBHTtX6NsAEew%2Bqv6efA4ffq8GJnmu5EztcAiBFRDfBoSJMOSOLPBYJ59BRjuQyI6PHAuuzS1yBNHRXOyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMXLJMUlIN%2Bq2LJoxCKtwDwPN1oiBgTP2vhuf90GHXbkbHd8o5x1Ux923Edvfb8spsvz6ndVkiJ4%2BZvTKDH6o6RhSc2w6Ms875n2DNpgj2DoqY8VrFcXtK9E1S%2BwpHbAFM3HnX7w%2B6WtmS2rDIYBebV6%2BMQeU4t%2FQ1AEMJ8rmFxZUnIgktozLGP44V%2FEsvCpdZ3Jczx1NUrtG4pBY%2FAvw9UCH53j31rnkqQ4BGvHsLDauzcL8N8RgkXOvL4qiS0hQ%2BD2HJyKRyERzlsWXGlwGFj1r3JwjUkdgbJRt5brWjPe%2FYSJ1kJC4%2FV6qUWg44p1UuUQhmu1qvXtaA1amIwINV%2BtY3PC9PgPZdETsAkA09Qym9wgFjvdpcCW6TCC1%2BtP7MDsJOAt0MS%2FUkUMIvqkAo%2F95bouSCzFJVrbvOmptS3hZS9LCqGH8JUkB%2FZZ9tuM621tu6CNNpdmPjALike91rEBmBJ9AC7kDpYcFtqSGJ9kGaNKCt5NUt61ViOXk6iY9E0HqYj8wlp4qaigh1icpXye3xa%2F%2FX9D46V2ghREybFTxiSBlsLiOklUqwaU8x9S%2BeQLYRFbVopU%2BO8yW8KCdc8wvFlSGnHux1FlHHuLo1C9m%2FjT%2FFlCBRTaHtjG8MNLTKk%2B1XpXIqOnIYlRYw%2BIWXzAY6pgGc36FMoCVAIcU4Q8yJIJ25JOMWtqGZdvuyclk6UEiiacKhPjGgJ%2FjQVJxRMPJ8S%2Bm8VUAm7Adwb5t5Wvf4H%2FyL0ePsLnRooKJcKJMXVLqTfNu0ueLzW65b1YJeCQUMdayezUfjhhBeqINOPrdcez2wxJXD%2BVFSZy04QQa0Zry%2FGHLDKnRwnWuhCxL7b8xH7zWE1XU97CkCBTMT6qP1LSU5L9DBvCzp&X-Amz-Signature=c471ff9ec190f4502a167dd255740854055d4b45e29b569008cde09d87cd86f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TLIPMID%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCzAkQhUsws4GYjlRl%2BvLQhhWuKBy%2BVELS%2FUsdrU6x1oAIgB4%2BEIP1O6bjAid9r71TEnmG88rqWq2b%2FPrxnyDmRINkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDLTgt9oHfRdkCO3XvSrcA1%2BA%2F02fX4tu1BUr0vKvWj5HdB55%2FXwF%2BbHiLBrhw%2Bv6Do0IpBbuQTQH6Ommz1EnjTpDlHpXfFqXr1yUIsQV6buNm5%2BPdndY0q4WGNpyhV1qfn4MapYDMPdZNfRSo9FEKhGbE2vj2a24TvwCTbJWcB6vGYDtSQF3EsMDeULoVmyiOjdAK71eMskUfWcQ38X5k1LZXAs7K0WXebRX2u3U%2B3nvBkonwhe60IBJhPS4BzLpxsN%2FTFJaO3zVP0C9Ej3yF5jkOx0%2Fkxm%2B9PDsUePW7hMDMhBtPdSXj3uuxmFqVIohpwHHAB5vzUmodvK96WxJY8FBHwuTRfEmyfis1THegg%2FMcaivNZd3carWpYIYeFfSaUtgjO88gKtIDycD6KE%2FV%2Bsb%2BBllBvW%2BmPvGVjwmceVO0I4JOoE%2Fq60eLXSJel%2FeHsLaUROtMDOg%2B18UY7ODp%2BrBx9gsDrt%2Bg4vX%2B3HDijSWKKfzd8q6Nr9OlrSaLCD%2FDmKGjMGtDSvnUm5AuV3U8x10cv2FuZdS%2F7G8iPfl47Wc3wIR7Ymlqyztv%2BkL3xZZf6Ie5rngtlfTjgTMg3GIHt6ZYF9FDuggro6M5yYwaFODQFEnskg0k8t%2Bb9LeAcU6MLdc0gC8TfEYsyO3MIKHl8wGOqUB0ZkjQghYwYXDwT%2FjmS56IbR8v807KI9f%2F0wHxb%2Fk%2FMEB9%2BPvnz6jGBZOSAXyWBZgWeRhtqL2ee6CbcgViCOJVaVnU9UMlBY%2FZAcdq%2Bv5XaWUoaMbE%2BFJPCJnM%2FtENH4N%2BvSnVdlJNcl2HLUM1PPAM5U3n5JCBBn%2FlEsO1n2Yq3A9bmZUYHg1A0dHmkwHvIVlekCeB5YfoN6acUCxw3gFqDWfGoPN&X-Amz-Signature=a9b1f671cf0a578bdb6d67c3e3d28b5c93439ef6d3931930a856db7fceace103&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GDU6Q44%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDghz1Qg2F56pitI083IXWySx4Tb3sTDpRReJ%2BdAYjtpQIgCrmW%2Fev8t6W1F0%2BfoG9VC%2FsDIbZgRXVVkZtc9pCm6xIq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMmHRJwaAbLjOGgbZyrcAw9oo6GF3bjxJrtLcpj%2FJclDH3z5DA%2FPW0N%2FtAEHmUA88iDfSZT4F2DbBpLRprSIgpqMhKHb8PgGj9R%2BcezXPn9jRoLbCalsjEtvqcLJtVrzLGKJou2RI7rLeL%2FDZD%2FMJaDS%2B8E7PwLvNpxN%2BoN5QWEPm%2BHLkBOVyMMY%2FhLWTJHtYUNkQxylESPcwZUr59RKsQa5AkFgt4dV1WHUMibwO6o2Qv2toNkDovnSDX8TxzxGex07Y4RMCvgpk1tWM3dR0WcTeAdYGooKkSfiYZqbwt%2FTWBmv%2BEI2r%2FWxTPl0SE6%2BtkozcjfS84za7XXJp4Cqinel81AGg9MnP8MKOTdxCqBBkMKE%2FkNIvQU5j7xwOghcY%2BQtq5JzBTwXVaLzqVtrNUMmxwAefktY53qyeunnlAcaFg0wVxLAd0qgL2cPrXeqGgKP0trzHnxStEWPTR8%2FkE%2FbnxS6bi1vzzbkMxeQ9FVb9t9j6WJHjrszpWVpGBjSYZn9jcDb4LiKjJL3SIRizJJoD62mmMklwrLp%2FGmXjnn%2FBD%2F4lyKM24Q2DMEEaa%2FhvEKyv%2FQ4NFa1x%2FksBQwwz0%2B%2FTjJuz4ID2AtaXJhc1zd1cDQZZNq0n%2FmjpjRfxo5pcPstGEBlc1wznqYoMICGl8wGOqUBoS8hDDePPofSY2H%2BtAssOBPJQOg4fqG4pnUU41knxlzSXunPvw0pBaXPhaCrDG%2FPIgnHFs4Cmn8p34jeE8yfTDGJYvu6TW1Cc5JE2681%2FCI3wUMS5JUpY%2F0fP6lcmuOj%2Bsfl0AtovZ2DF4GDcxPbyluMbMBpLBtJNJjibJeQ7xB10nAW53uehSgd811ZyuFir5xvTK1IyJo6R75k%2BAEHvXRM6OzE&X-Amz-Signature=9235ea057b1ade87c71466b1414e0ee2136dbbfac8de2f930f83f49cd203db17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GDU6Q44%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDghz1Qg2F56pitI083IXWySx4Tb3sTDpRReJ%2BdAYjtpQIgCrmW%2Fev8t6W1F0%2BfoG9VC%2FsDIbZgRXVVkZtc9pCm6xIq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMmHRJwaAbLjOGgbZyrcAw9oo6GF3bjxJrtLcpj%2FJclDH3z5DA%2FPW0N%2FtAEHmUA88iDfSZT4F2DbBpLRprSIgpqMhKHb8PgGj9R%2BcezXPn9jRoLbCalsjEtvqcLJtVrzLGKJou2RI7rLeL%2FDZD%2FMJaDS%2B8E7PwLvNpxN%2BoN5QWEPm%2BHLkBOVyMMY%2FhLWTJHtYUNkQxylESPcwZUr59RKsQa5AkFgt4dV1WHUMibwO6o2Qv2toNkDovnSDX8TxzxGex07Y4RMCvgpk1tWM3dR0WcTeAdYGooKkSfiYZqbwt%2FTWBmv%2BEI2r%2FWxTPl0SE6%2BtkozcjfS84za7XXJp4Cqinel81AGg9MnP8MKOTdxCqBBkMKE%2FkNIvQU5j7xwOghcY%2BQtq5JzBTwXVaLzqVtrNUMmxwAefktY53qyeunnlAcaFg0wVxLAd0qgL2cPrXeqGgKP0trzHnxStEWPTR8%2FkE%2FbnxS6bi1vzzbkMxeQ9FVb9t9j6WJHjrszpWVpGBjSYZn9jcDb4LiKjJL3SIRizJJoD62mmMklwrLp%2FGmXjnn%2FBD%2F4lyKM24Q2DMEEaa%2FhvEKyv%2FQ4NFa1x%2FksBQwwz0%2B%2FTjJuz4ID2AtaXJhc1zd1cDQZZNq0n%2FmjpjRfxo5pcPstGEBlc1wznqYoMICGl8wGOqUBoS8hDDePPofSY2H%2BtAssOBPJQOg4fqG4pnUU41knxlzSXunPvw0pBaXPhaCrDG%2FPIgnHFs4Cmn8p34jeE8yfTDGJYvu6TW1Cc5JE2681%2FCI3wUMS5JUpY%2F0fP6lcmuOj%2Bsfl0AtovZ2DF4GDcxPbyluMbMBpLBtJNJjibJeQ7xB10nAW53uehSgd811ZyuFir5xvTK1IyJo6R75k%2BAEHvXRM6OzE&X-Amz-Signature=1e4d7f6d33e0b695ef28de1d12f3e50b4b667d1ad60a649c2cb170e6cb46e6e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466356PU2NW%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIDdS6M7JtoCPELL1svxi5TvA0R7aOXBOO8ex2kMUyE4GAiEArl5hNL%2FV1UlPU7JvxkLshPOSU5RYPA1Wz8xBPFlAtbEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDIxMo7GcQPPVwG7wFyrcAwlo7jSW3%2BCOE%2B8a746VxbfyEbDsB8%2BKI2uAD5us5%2BbYM0Ut8WAdocMzCS1%2F7g73RG5P967odyah4DopP2nXxTEQ1QDIddJ8aMklN0nWjK7tgkBN1k784pgRglZWEZZGHPzbWl2egQhugv%2BSKAQOGVC%2F7aAjaunrfhwETbIiJtjQ9Ynet60rrz8mk%2BU8CNtGJrN8I8AU6p%2F4VCP1seeOaPVIh3k5SNdCSjeRQrQ1ai7ERy6s4oS%2FSMNi5%2F8vmzGNia5ehiL0yZQCYLcR5ZZQcFp867uTBUCHDmd%2FJe%2F13b4AR08AXF68wEKhJ5R17LdYQPpyltOJaja9xqMOqzo5ulUZs1b6jxUEuelr9RtqSdTCBMFc0s0IXPBX1JZoFE9Xn3W6GQ40UTWZoBSyYnsFaZBy5dOkTOWepg7N6Jh9vROsScoxnzQRDjFPIGFRT5ITbEbYBLRPAkbj7oS4UAb8pEwtfYIFPgFNaKi9q1wo5AWPX5quxo8BihWiyZKCAQfOmcInUy3Eu6tBQdIquRgAsIjKoEBXJx7xp8UrrLNLYxj1LFmdRH08CF25uL0m52GfRkKToOM%2BAUBaNNRXEnBPYxdR1RFgdAFA4IRATkZ%2FnyC7DD7J%2B3lHuDYrwR1pMO6Fl8wGOqUBRP0f409gthyb9qEumUQnPQsZOCbj0AKiGKiUDqOYYnYhNly%2FWud28N28ccr5aOook%2FrJ6kd78dGk%2Bay6RRZBJIX2G57%2BXw52UJIzwPwGPxvvDn0VMOX0iiR9%2BgAiFxwvRJnRjwU0pKiyZR1jCOdxHfMg7GB08%2B0W5pULF2S29AksT%2FyzofBvKCyplXEwy4p5cex2fZxRQ%2BkUNPT5r3KcW%2FrOo%2F3Z&X-Amz-Signature=d6a0ffe8fec5556b7115e189e3a06d20785a2e88b3a594f3e318e02c15ea9801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XM3TGKJ%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICkEiZI2a9qeUQBGXS5LPWxSPLl3oEY%2B6RCN0YUqpwhBAiEAnTUgBdflDLnrzS7OXPgIO85NItagVIIXKG3HiV4GPD0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDBSvcvyFsRcRZkuRXSrcA6yqb%2FwUAbQ9xqRFFcdRb3C94lsAx13YrwP15%2F8Ta6TAoYKjLZwdTGPsDB5PUXdeHmN%2FQ3HgOvw6ZkKDZ2Um2CvlxWyg6CeRrcM6JN%2BxC8b2hkQ7MSNsLjtHbBGUuWxaVGQNTvtuoHExhLHDSad%2BSGNfIbax5ezYJBJnq5L3qB%2FTFPDCIP4w3I7EDEL1mF7CnAFes%2BUm9nWtlTnRMZPRXJiboN2ZCXlrDv7yp%2Bhw5bomFr7Ylq9zcCW1hO%2Fmn67OzRgFM%2B0s%2B2fxatO0H7iIWpp3yjX5gPAmae6JDkcoIlIxUDy0Fhk7XgawVvzbWEitDirViVzp0UbCmNvluSeR3kNVq%2BGJuhdzJBHOCubNVm%2FCihDlVyCp3iKCqvQnKM3UG3kCAJeNx%2Fmzf9UI5g5Q%2FWJ4%2FYR6uplTXh87TDAFCveotI9VaaHVDBRq2IfhVc65ZcrCelOX2c63HAlLF8LOT0kAqUf%2FlYg%2Feitsm1F07RVmMc67SIN0FM6FDXAEC%2FubVTO5H%2F3KZdgb2Hi5Ra3PAWsh1DEbAwG6JJvFTfFAdQ7Dvn2hoUbDljEL9HzI54SwPUr3mbGjDMd%2BnY0LR9Q2Cdx0TVea0UMaTOrXOFNG9CCNXMCtDmr50DvsExnuMLeHl8wGOqUBIe500hhSrxAEnUHtLuPhmiSMgUWHSAj9%2B3C9xzWIum9COxOrbJHi4Sx9u%2BDqYYpGaXPD0BjdIuLk4sOkDu1rdhVVIT5Wqc%2BlFcr%2F%2BLM1n4tkNk0ATS6pYzl4gtYG49%2FEHaV2MbWEeSb3ygw7X1W869gBkruhysmw%2BGh9VvxhxVrxIdYTBGunpevwjOvRClIXKV5mQ4rgdCOLaWY%2B1ydH%2BLPPzAkP&X-Amz-Signature=ac11edc78e7503b648dae84b20d64de9725f35b3e31ac2c8e44c73a2bce35f5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643HM3623%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCICd55q3qdMCNcIEgQvX4wCqrJRqW4LIeJxY8mQ0qQKBrAiBHypSiinbfPChRrPxe3K7uZ5a0MHe8i9vA%2FqSxtPOptSr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMBMhU94aHtEPZJwr0KtwD%2Bt%2F2Y9Sy%2F%2F4ldk4g2FVMCU0rTDTT38XHoS1bsbDC%2FQiR5IJtLOhsqL1%2BuoRkQW01IseI5WzA7zLigRZVbvaFuI9OWy2odSTnY4I2jlE50mnh2yR2fcaxgKW%2FiAKOZ%2BrgL7sfE%2FhQYVpdv%2B83HCBthZqabfW2mBL257DB0dd3UrD0UcougYBvR7hErLf6nYxPBkTntDyZAqOZ8sdT8nh34VB4yIHcMAtoZ0c2IsIkscr93kQ3%2BzYBYCIkPpExrTeKiKvjyL0oJgGVS8cXDjb318KS5OZy7Ncl37g6qIcOhtBGdLs9JCovaUQNY822jvt6EnGiV2a437n8SjJlaa3%2FHNPO0fE24Tw967S94%2BG2yJGpAY%2Ft9gtj1d8ThnNbV%2BTLvTore171zjIlVnp7vGzFLQ5gEBdcc%2Bi4lRgKuc064cl94ZV%2FEijPfiMpwBF6MIdKcddSPmdQKKd1BTjd%2BEpMZOOQvgUeQBtMJ2MNOctkF11GTHogjyoL8aaEfKxkI%2FQGOFTYX%2F5eCvaLrWJW8Up%2FYM07W1W4PJwGiJN9R%2BPa3Y4ruJ3%2FNUyffZcl%2F6T1hl21QBfMIDBYTZsNrFP4hPL8kLBSE91dR7Ljs02D3wwxS7KAVMpXcgfEhrn3M7Uwt4aXzAY6pgERycKOyXimGO4FiD6ogZOqELYLRh4rbhVdITCTMBGTmVpgDFuxNFCv%2FyDq9OG1IWp3osuMG%2Fg1gE5vrJ0CZWmP60E5F2KN25w4AiSyuM1jgdsILVM9h%2B5sP5MG%2B09ZCUgArlfl%2BPD6S8%2B1t6ZQbWFoLSvTuHe4dguky4rcqWA4EQFvnaF9mkdVdXLbYluEbhl8W12YPTRwH5UibxbB%2FYrY5qi5e9%2FO&X-Amz-Signature=9901419c64cfd90a5baeab38f12942e5cd9cde24cd2d1cb2afc1d74276eea593&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGTNAJX7%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDIOhSWq%2FJAyJXGFPd0WpHKlkzc7nNC2Mc%2FcB5jNIoFRQIgP1BscnVGqSEBeYmBQOY3izApW0%2F2%2F9bGcmRAZU0UOUYq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGEYDOlLOAqfJgbQ%2ByrcAzCTW3PK0x6VAztN5qpE8dFbamfd2re2Hlm%2FGBloVnjwpOSfjyGakTUa120jVAPFVat6kcBbCt7Y0JNlNW2PlQilxhMs4VNf0COTvJNc4gyURTtLcI6UquWl%2FrG5GhYFB2uOwjPASqgfH24Fhx%2BD2iNIcinHtflyqBnSviwaF0IN7aRT%2BlWaWA3TqHgdH9fevjKlkVnp4nGTBazBEImCgu9dOQe3vXDJ52WADgRSQNyNCmWXdyGPzs%2Bu99NEC%2BzIW4vsxbt85O0Kwt6uTokZq7Dw3nty%2BKZyxkNTicnt%2Fb14OjWXpV6WTVAwh9ISUKB%2FyAcg5%2BftwjYUqxCptQDQTCvR58IRPeFoD52k86ClSViHIVEAx1Cr4eWgrFG8XDw0lhuEAzyzF9z2pWks5SQRzl9JfMlxWFAxVOdsP6BPbpKbVPUhEQPLecdIW%2FIu%2F9Jxy2Ae3c2ZsnmY2bb7Ooop5sRvOthIbloK6G%2BsBi4VjJgEIG8z%2BVnDHzbS0kCu8OfLXe%2Fz8yxiz0ERMvBsi9wquWgzbUr22nRpTcuTQfrUAmYu9Mw97ZUM7K0ZGQMUziov%2BmPqpvf8PnE9YduhB%2BqOs1JlZY6YcYK9AlqVGdfdn4NKrAOIjbusjmteN04YMLyGl8wGOqUBjqfNm772Tgg4vPKtggBqulgzGeKucgHr4uVuDcU6QD%2B3LIAVByJJVyr2BKTQTNd418niM%2B%2Bfq3qXXYw36GY143f%2BOZnfmN7LWOyrQDrRy43dtpQaajfCuMCy1OOxxsS96xCI2XmZgqWfb4voLVJaiwpNISfpjQn9Z7v1BoWF0HHlmC%2BvzlKqyuiNlQ8a3g9IHVCkjE0Gp2eumt%2Fzs0c1TkpbUUur&X-Amz-Signature=f403fa52109ff03e19be5576c495f0dc76de763a956147c9e864577d921f36a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGTNAJX7%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDIOhSWq%2FJAyJXGFPd0WpHKlkzc7nNC2Mc%2FcB5jNIoFRQIgP1BscnVGqSEBeYmBQOY3izApW0%2F2%2F9bGcmRAZU0UOUYq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGEYDOlLOAqfJgbQ%2ByrcAzCTW3PK0x6VAztN5qpE8dFbamfd2re2Hlm%2FGBloVnjwpOSfjyGakTUa120jVAPFVat6kcBbCt7Y0JNlNW2PlQilxhMs4VNf0COTvJNc4gyURTtLcI6UquWl%2FrG5GhYFB2uOwjPASqgfH24Fhx%2BD2iNIcinHtflyqBnSviwaF0IN7aRT%2BlWaWA3TqHgdH9fevjKlkVnp4nGTBazBEImCgu9dOQe3vXDJ52WADgRSQNyNCmWXdyGPzs%2Bu99NEC%2BzIW4vsxbt85O0Kwt6uTokZq7Dw3nty%2BKZyxkNTicnt%2Fb14OjWXpV6WTVAwh9ISUKB%2FyAcg5%2BftwjYUqxCptQDQTCvR58IRPeFoD52k86ClSViHIVEAx1Cr4eWgrFG8XDw0lhuEAzyzF9z2pWks5SQRzl9JfMlxWFAxVOdsP6BPbpKbVPUhEQPLecdIW%2FIu%2F9Jxy2Ae3c2ZsnmY2bb7Ooop5sRvOthIbloK6G%2BsBi4VjJgEIG8z%2BVnDHzbS0kCu8OfLXe%2Fz8yxiz0ERMvBsi9wquWgzbUr22nRpTcuTQfrUAmYu9Mw97ZUM7K0ZGQMUziov%2BmPqpvf8PnE9YduhB%2BqOs1JlZY6YcYK9AlqVGdfdn4NKrAOIjbusjmteN04YMLyGl8wGOqUBjqfNm772Tgg4vPKtggBqulgzGeKucgHr4uVuDcU6QD%2B3LIAVByJJVyr2BKTQTNd418niM%2B%2Bfq3qXXYw36GY143f%2BOZnfmN7LWOyrQDrRy43dtpQaajfCuMCy1OOxxsS96xCI2XmZgqWfb4voLVJaiwpNISfpjQn9Z7v1BoWF0HHlmC%2BvzlKqyuiNlQ8a3g9IHVCkjE0Gp2eumt%2Fzs0c1TkpbUUur&X-Amz-Signature=418790addba964892c6f255ee811111f9d91bde23c2f7401b46114f9949cc20e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMVEMYTL%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICWIe67juWoNrhvFiX2NoYZEWDogaAudp45NJ08ymiY7AiEAqjIeDcbIC7ic%2FZPpKyS9pvcPKKGhMtuD4LRxCl3KFRkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDMZay8cGWyhIGfyp0yrcA5Fx1ig1njbaf8YSB3YDerXI6LXcFaJ9FhZV2X1RqbGDweabutzchXxCO0mg71hAMsIzwIMzkFnwaGK4CsqDxi5Hiu3OALKsPuqY2pWt61dIrlUjawk4n%2FfOXOMEKvucprAE49DSLBU2w17NEeMecO%2BZdzur2fSxC7ykxNkHPzivXBwtEo5%2BnJzo3IohV%2BLIowQL7ackYo9dsmuoIyUjR%2FxWacr07CYx82tneqeyQ%2B5%2Feey9w8hnFCJf0OUaimcVTgz7wI8V8idzRgJJrrvfrCgUwEEL%2BoKtnPqrYrE9WZLuMmEJVtVWxjYqalciw%2FEQtzAvAcp3QoSn7TZ3YfED7E3rmIAfF1RbZyObIo2oA7a8j41KWGE%2BvTbel%2FJgBH57o9z%2Bolz5xR%2Bi%2BSeYR8KTktd33fUFjMe8Qz7Zbb6sNKG4xo5nGNW1NdjvQpskUnqn1pqCTVzrI0GBbrr3%2F6OoDeu7G%2FCadb2A45mFTtRwT%2F4G9Z4%2FX9u4wiU6o5ljvIWpTtkmFNJyOAz4vOMvEZLUdALTJ4YkKT6J1dJcvUjYHI7NvJZowx69EvWbF%2FBtv6jQLU1ZwpvaOO9BTFvg7Q5jgi8FQ4IFPzAsSbbB%2B8U8zxTErgrF9dJ3Ss3xdUr5MOiGl8wGOqUB9Y2CY4nPVK9Nf%2FTxqiJGi2O8yI24Ldyf7kH0M5QJhUmNFljD8i%2Be6NEN4j7T1j2LE43AfO612PRgW06LdESzUZoM%2BZAqQn7sBnRHVhk1RQ9YK%2Fv6979LGAdPi1RWMHe1W40ot9nbxsftx8e7De75Ezl1G6FosySxqXZX8IFHPPAVyr%2F8vVBycWkEaZtZxMiAcG4pfEyDJCKYKUg%2BBpivTN537Ljy&X-Amz-Signature=36f41559ba7da11d4d6bd1b98e0ca708ccd9ee3c6b2340a88968f72da5326545&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TQVL4YN%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDM6QJfS7HnPMcaTEBckdGPAlO9n7SsC8MWQQvsrpNGiwIgfpgPrFikhvw2mqKleKJoGvIoLB5FJQ1J2VcNkGKAvtkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDIkf6zuvNzxZly1BVircA6mgprEvlY1BmeEauEfJ0XqP1zwh8ysDRBMFAqcLIwe4fBfb4pZhnYSXoNCmTiMHZ%2FYUuOsO1s8Gp2OATFM8NA3tJPpqLWS8WDJHwGwXx7%2BYFjzFGmLcLoscc%2B71%2FTE%2BuoNbi03QqAIPXRL2Vm%2BQ2Vo80egwl3BgXpY8scAOvamcWpMYq3q6h2nZfUCzpiedVg62MNsT2w8n2IJ3RyNVfCrRcE3yH3V4jiEzRhZd7rhNsFZBbo0A9z7AIrA1xHqkAxKqm37Uqr30o4UdjATKf7DwJy0zKHyCJ9uhGRwsWG7m%2BNMEplEMDSPce3%2FiHxvC5PTzxdfBNMECduhqgN1c5wyell4lUeAYfGWSPXcXd5VZanCCqhQEVELGox5AfHf9FRBp6OVMO9s2dbwtX4jEc%2FUPtADDLlxNbjlIF%2BgReCDuks6h2mF%2FDOnArK2KMOF524%2FaYF8rnvBkZxRWPhqSD1IJIFhLY7zJCoR1pG6RMPbsAXkWNvMvbyPDA61jtAoAzkjQOc8hlDQe9Y9smkGEbRa9FZxuVs2T34GvnB%2Fg5JQBCh8%2BGdiyAVMt67C%2FdadbziejlpDsDXsqZE%2BJlrBTQ%2F3b%2BAEh1EsVbmfbc1kdiEUBh%2FRZzu%2Bkv7rh5GrIMPKFl8wGOqUBvUIlKghDdMo2mALLkw5BnktGUCXlWkCgy%2BV17%2Baz01GDxppqBTgG49108k9vqoCKY5%2Bd%2Fb4nuO5DNyD5l0y19BoOrfN7KtWRMEcLwVaImkvS73suebxjnQ2Dqgc7W5ZFcTuFfQ2ANPIVPnxJO9Y24XwYT15lsdsxum2P3wBkmzUDksXSYVpzDzGtf9h68R5874kMMMhFwVclndmjMFtHmXRZx27s&X-Amz-Signature=b96a994f1db691b23a37a4a594fadb73b1c854146288a57e03cd0cd9737d645b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TQVL4YN%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQDM6QJfS7HnPMcaTEBckdGPAlO9n7SsC8MWQQvsrpNGiwIgfpgPrFikhvw2mqKleKJoGvIoLB5FJQ1J2VcNkGKAvtkq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDIkf6zuvNzxZly1BVircA6mgprEvlY1BmeEauEfJ0XqP1zwh8ysDRBMFAqcLIwe4fBfb4pZhnYSXoNCmTiMHZ%2FYUuOsO1s8Gp2OATFM8NA3tJPpqLWS8WDJHwGwXx7%2BYFjzFGmLcLoscc%2B71%2FTE%2BuoNbi03QqAIPXRL2Vm%2BQ2Vo80egwl3BgXpY8scAOvamcWpMYq3q6h2nZfUCzpiedVg62MNsT2w8n2IJ3RyNVfCrRcE3yH3V4jiEzRhZd7rhNsFZBbo0A9z7AIrA1xHqkAxKqm37Uqr30o4UdjATKf7DwJy0zKHyCJ9uhGRwsWG7m%2BNMEplEMDSPce3%2FiHxvC5PTzxdfBNMECduhqgN1c5wyell4lUeAYfGWSPXcXd5VZanCCqhQEVELGox5AfHf9FRBp6OVMO9s2dbwtX4jEc%2FUPtADDLlxNbjlIF%2BgReCDuks6h2mF%2FDOnArK2KMOF524%2FaYF8rnvBkZxRWPhqSD1IJIFhLY7zJCoR1pG6RMPbsAXkWNvMvbyPDA61jtAoAzkjQOc8hlDQe9Y9smkGEbRa9FZxuVs2T34GvnB%2Fg5JQBCh8%2BGdiyAVMt67C%2FdadbziejlpDsDXsqZE%2BJlrBTQ%2F3b%2BAEh1EsVbmfbc1kdiEUBh%2FRZzu%2Bkv7rh5GrIMPKFl8wGOqUBvUIlKghDdMo2mALLkw5BnktGUCXlWkCgy%2BV17%2Baz01GDxppqBTgG49108k9vqoCKY5%2Bd%2Fb4nuO5DNyD5l0y19BoOrfN7KtWRMEcLwVaImkvS73suebxjnQ2Dqgc7W5ZFcTuFfQ2ANPIVPnxJO9Y24XwYT15lsdsxum2P3wBkmzUDksXSYVpzDzGtf9h68R5874kMMMhFwVclndmjMFtHmXRZx27s&X-Amz-Signature=b96a994f1db691b23a37a4a594fadb73b1c854146288a57e03cd0cd9737d645b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7OMNJPO%2F20260206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260206T112332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIClEDhKNhVaQTqhDaSLQl6rPuEh%2F0vePc4eLD8Km6ak3AiEA1RKSORnFMcuKnhyAx9DRMi0oDa72BttlYRry7M%2FPg3Iq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDGfflOIxAdZ%2Fy6qr1SrcAyds%2FGgYTSK9DIWefnzItqDcOYzwkqB9y5Pa7C7qK6HLDBB35VwkH6xwYC4bN36RSkfdjaRlh8GlBYjQf8Fxz8JS1jcqjhLZrh9TG6hb9nvmvZmoLkSmKCEw9Jglh8QGPLFireharqHHYtLVaQxK1brjv8Bk3CnGrjc%2Fc0LKGckET2qRd4i%2FtKk%2FsvTXMT%2BIFwItJ0HZOvPPkTBVybiD5QrYJPbXvpN0T4yN9vr0xrk2esKH0dSwtxIws%2B0%2FKiLtmRRa4EHNVNZw9TvD90Ml4ZgAqZv4C2JecDgcZzJk3FP2x2IgMPv%2FakUE7Ugx2dnFrquQ1E5Oxj1%2F3isXcCaAxj7nP0gMAyXWM9jyp5THNpBpxRJbPqJu%2F6UozmRI4ZE3TyOC0Aa96QOmnAsuk0DUd9JzsOw6NcclcoAo3NFop9brWQzr64YHxR4HxtDygcQhWetwommNjk2HqGTbSrsCJjfMU2vGVFpOTMTCMoB54JH6cJYSzzqSej7IrhxAWfS4g7IRjS1hPwRsp16XhI1AvsRJGbow8q14BuqO3nU1TA697PV2OwcTU4O5JvBVNHVvrf6KbAiCC6GspTaKR%2B8dm3e08%2B8KSLP1a4R5SPJMR22HMtGheGEv7Eb7yyv2MPiFl8wGOqUBYAy4Kzr3ERg8cQLrqY0pdGOAFm48mNsx7SR4RWTf1R0UewbJq%2BSO6dm%2B1Fge9bcmjyr%2BAGLK0i1OzGQ82qoT2DgYP%2BHbOsHrSwWch%2FIQgVIVyZFzmbiNbZJrcoq6mep6hAA%2BGiEmayPxzmISvXbxJsKyOvgV4VA63vwHlv%2BWA2Nw%2F%2B%2B1ppmeC%2BuJ8zjWCuUb3yalHwfupf5h%2B2lZV0gzYPlK5Bfg&X-Amz-Signature=255b4590c635d3a2c83eaef653c3ff72c9765d82a7c8f015d4a526239f8d5fe3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

