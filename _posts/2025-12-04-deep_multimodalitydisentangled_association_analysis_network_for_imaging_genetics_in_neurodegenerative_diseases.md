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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVY5OQCG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIHqajYIZP2FpvYEx29af4UkU9CXVcSRuCcVc%2BwGsx8o1AiANnOUKAVI4jmMvmr05sxJk8g1eUBVC8B%2F%2Favq0e%2Fqslyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMr5TrP7RkSGZBX6YRKtwDXI%2Bg9oSjyZhILTMRAKegDIbCmCxq0fKJ0nfoP7LmhWZLRusvsMbG4YCVhGQHqfLvP4yl%2BlqjPaWAaBmhBrvfcIiSCTo1uUXvTXwjwzPjZwQyYBzwLAJ%2BV1FNxStjr9VliWQA2S2BfJHIdlrqmb4mdqYw9xuEX2%2BWUXeqXfdolyqHn4Y26CEJ6pCphksizgfNOoNmGSDGfBGlMeZ5blu2QDaGnyKyKwVBdvPvz5UhO98tSV1p8B9MZvY9U7UMIRlAjbrl%2BTm0c7OAtdfc3mqm%2FfisA8gTV6o%2FYlscYD845XfbEqisIZy4Q8qteXLWtMPzIrPyQzJ0%2BqcfQ%2FkixuCpFs2FpuDJZamGoJwGFJygjupIGdJegLAJNroDbfvTyHXMRWkk5mQebGZKzJek9Mj3T4M1T2NsN0tf2kYcz96bsACIWrQ6efCNerTZ%2BYcR3MsKc1hFgYcU18wF0y6Or8lcJ4DD3Hm4Q%2BSorL6C6QeloKEIjhI6Yr1EPz0fdZCBwTC7FBz5qxdfZi2Evk2DED2Qn%2FmPbXU7yWXNL4yWTsbvEexeOJQ8iJG3MFFNtKuWL7eMW1SE28ftmY%2FJB8kP1Z8VDzSdtvlE9Zl%2BlyTN%2BwjsnpnzoQzoLC6HDtjKtlkw%2BeSrzgY6pgEI8m8oy4dZpXXW%2BNIXNqIJSLvpqJ2AWt2kNBLkspbExc31UXyoetAOOiG6KkLiag3mYgYz0GmH9ck1st5LkcUZXF5f3XuQF7vjUTmiS9o2NlJTC2yzdRQg%2BqqSf96rODCZQ39LHmcS%2BGsDuYjmYNkc3LWu7JihBslXvqUmY7MPf%2FqgmJV82y2wB77c1D3L3BJ2YsQnAR9rIEb29%2BvST0i5Ym9Gmnbo&X-Amz-Signature=815d08ecdfe6f89645281c45f414d7980776d391c5af1483960664cb146ba69f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVY5OQCG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIHqajYIZP2FpvYEx29af4UkU9CXVcSRuCcVc%2BwGsx8o1AiANnOUKAVI4jmMvmr05sxJk8g1eUBVC8B%2F%2Favq0e%2Fqslyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMr5TrP7RkSGZBX6YRKtwDXI%2Bg9oSjyZhILTMRAKegDIbCmCxq0fKJ0nfoP7LmhWZLRusvsMbG4YCVhGQHqfLvP4yl%2BlqjPaWAaBmhBrvfcIiSCTo1uUXvTXwjwzPjZwQyYBzwLAJ%2BV1FNxStjr9VliWQA2S2BfJHIdlrqmb4mdqYw9xuEX2%2BWUXeqXfdolyqHn4Y26CEJ6pCphksizgfNOoNmGSDGfBGlMeZ5blu2QDaGnyKyKwVBdvPvz5UhO98tSV1p8B9MZvY9U7UMIRlAjbrl%2BTm0c7OAtdfc3mqm%2FfisA8gTV6o%2FYlscYD845XfbEqisIZy4Q8qteXLWtMPzIrPyQzJ0%2BqcfQ%2FkixuCpFs2FpuDJZamGoJwGFJygjupIGdJegLAJNroDbfvTyHXMRWkk5mQebGZKzJek9Mj3T4M1T2NsN0tf2kYcz96bsACIWrQ6efCNerTZ%2BYcR3MsKc1hFgYcU18wF0y6Or8lcJ4DD3Hm4Q%2BSorL6C6QeloKEIjhI6Yr1EPz0fdZCBwTC7FBz5qxdfZi2Evk2DED2Qn%2FmPbXU7yWXNL4yWTsbvEexeOJQ8iJG3MFFNtKuWL7eMW1SE28ftmY%2FJB8kP1Z8VDzSdtvlE9Zl%2BlyTN%2BwjsnpnzoQzoLC6HDtjKtlkw%2BeSrzgY6pgEI8m8oy4dZpXXW%2BNIXNqIJSLvpqJ2AWt2kNBLkspbExc31UXyoetAOOiG6KkLiag3mYgYz0GmH9ck1st5LkcUZXF5f3XuQF7vjUTmiS9o2NlJTC2yzdRQg%2BqqSf96rODCZQ39LHmcS%2BGsDuYjmYNkc3LWu7JihBslXvqUmY7MPf%2FqgmJV82y2wB77c1D3L3BJ2YsQnAR9rIEb29%2BvST0i5Ym9Gmnbo&X-Amz-Signature=815d08ecdfe6f89645281c45f414d7980776d391c5af1483960664cb146ba69f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636ZCKNHB%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCgZKOoElqN%2FPdccYss0fKeDVIlGu6v4j%2F%2FKOswvebCtwIhAOLm4%2FeOPJSvJMcSPsQUAP8%2FJE8pm2qqixkMaxTx5NvPKv8DCC8QABoMNjM3NDIzMTgzODA1IgwHsuInf0480lM%2B9uoq3AOVCF2qGfrbSQPZLgsVmkJQ9IxALjpc7uaOJhoiEZ4hyW%2F%2BUZKV6oFeg%2BpBxggdzC9%2FiW%2Bq%2FIfQOIlfl5xpBLArIdnlHBsuwTfEnDpR0Ip%2BZhR0Zd9aMhm0XHVWQXI6rWloA%2B3UQz06YU3WJN7qdlRL021iAOLvuQZhneFgk30ws94zxGfYHKgihVDgio4mbuRI3GrloI8Jw063FLKzRvtsqX7hjwXPp05E0D0%2BZF9PvXTszRF9ogjq8pu5NgT9rvEmV8ENolF%2BH1yy0Q3UZlcdmqx%2BHC6xS2uhQDpIFi6OAOL%2B0v2ijSn6MZh7hIGIYX8sq1tcnNOjWIgGmGxZCZees0arz058%2FI6Vdhcsy4zZObnky%2FTSqUDxJPwG%2Be8tJOYLu25ba0XtBy8lnFnycL00adhfuEViO5hqTq%2Fz6lQ6pk8zIoBw0%2F6v4onYWkG2kh%2FW9rutm1Ll%2FTX%2FXQ2303FFXMfD%2FnodUGE4SII7Eqa2oM%2FKYZ0wMGByuA80bBiWCjHLvpfPi6BcrVIy7m6v0uIta2IuT1VgdpwFajsUizJjOPmCFNv%2Fwo7GyLKH08TsHM6hnhTAXPRIpPyKmltYNcGBys1VPekvqI0xbewVHBen8xNgObrMA6tiq3Ns2jCK5avOBjqkAZELDOD5e%2BKOmeUK5LiUR7ieCnyjMlCpOOqHG126ZuQ%2BCISUXjy36DVKH8CNoivEZE5kDTX6S%2B6Pa1crvpFk0EFiKLuv8pofH8bgdvaObCJh40Z27dTF%2FLVGHOpGpxIW%2B9gXgNRr8KwzK3r3T1Rq%2BLGxLQGunGR6nuusRH%2BI7EqN4oGYynG1GX1RpANbVHBVAjTWIxqShQzaNqkWqo%2FouVIzKRAU&X-Amz-Signature=d6f64c471d5c7640e7f122f6d186f506e20a3bf7f1567a16b8007a6d78becfe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGUVNAEG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEtRcSk7aTnIhCXR1fK%2FWJ8xhpmktXJq8So8%2F8af8FQcAiEA2lfmfxRZ0yQvIetTTkFy%2FvEU5kWgoWKoGLNsKwT1I1wq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDP%2FwRMp4xxzrUl%2B1HircA2mexh4JSTexBWVBJ2LW33Mp5iB86l2MWln6Zpn8gsMBNlK0IM7fNYFu1r9gVh2QRPurGOepu3aY8BebwmpKvW%2B1Y8k7soMutEWbgPT4O9pwLokzUSBdMrwm4B%2BN4ffO9%2B44slJqj4oz6wUn2wNS2i0IQae9vso7V5w2R16LJL6S6ICJ6UZ3efLUToFxrLl76BZZFVs6LrDYlnMC4mKaFxR797pdfkIcpfdjew3LbwSa9TUhVgur5yru1ziULReZA0FmAOxZWLniI5otOtOJqlP8RFd9vsIm5pAm6kFx3gaRkRoaqmyOyL2%2Fnw93enGAryuxZf0kuizs9l5dMRGKW6Evs1jZ%2FtnzdefX1Fo1hS4ao9os%2Bl8PY%2BjyxcyZpCtRI4KLT5enjwzpIrVxFtxRKS7HhGKpIwPghcRx2%2Bb5dRJ2veR5ZdSK5p215i2um28s4l17FpHuMNOFot18AjMuBhZZG7y2%2BlJr%2BtALN0NvWMsLRKD%2Fm%2BfZh8nVUIz3WK%2FbVwmn63c%2FG9iYvQiV5K8IOvS%2FJ4%2FF1DnYDE456zQAHxICbdpeP3V69pjFdlpVhbwZeemhvdPwstnhgW8UEvg6lXK0T12SXRD1677q5U5dZ%2F4C9%2BRHD%2FRlJd8Na6JAMMXjq84GOqUB1sLbnrnrCvQgAc8DufzcSOB7Fn%2FokhNMNEBvriNG7Y3VEx1gobRe3XylfXJvW3tj3j%2F43DSO3WirysxXQqD%2BEMI%2Fak2csoSc3ip6pk%2BjZABZ637s194Ldf3whnhYzaqeVx%2BhrZT%2FjC9hz%2Fjvui9qaHbg9ue8HrwcCPUp7JBKwNqmO00lFcZgf84OLNHuvUDlAaNXskVKDZX8v8r%2F0T21pZXUGERv&X-Amz-Signature=5035e2ad81260de6d9b4c21bc283fd9d53d50b4b88c3c52538b2ca3d74463bc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGUVNAEG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEtRcSk7aTnIhCXR1fK%2FWJ8xhpmktXJq8So8%2F8af8FQcAiEA2lfmfxRZ0yQvIetTTkFy%2FvEU5kWgoWKoGLNsKwT1I1wq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDP%2FwRMp4xxzrUl%2B1HircA2mexh4JSTexBWVBJ2LW33Mp5iB86l2MWln6Zpn8gsMBNlK0IM7fNYFu1r9gVh2QRPurGOepu3aY8BebwmpKvW%2B1Y8k7soMutEWbgPT4O9pwLokzUSBdMrwm4B%2BN4ffO9%2B44slJqj4oz6wUn2wNS2i0IQae9vso7V5w2R16LJL6S6ICJ6UZ3efLUToFxrLl76BZZFVs6LrDYlnMC4mKaFxR797pdfkIcpfdjew3LbwSa9TUhVgur5yru1ziULReZA0FmAOxZWLniI5otOtOJqlP8RFd9vsIm5pAm6kFx3gaRkRoaqmyOyL2%2Fnw93enGAryuxZf0kuizs9l5dMRGKW6Evs1jZ%2FtnzdefX1Fo1hS4ao9os%2Bl8PY%2BjyxcyZpCtRI4KLT5enjwzpIrVxFtxRKS7HhGKpIwPghcRx2%2Bb5dRJ2veR5ZdSK5p215i2um28s4l17FpHuMNOFot18AjMuBhZZG7y2%2BlJr%2BtALN0NvWMsLRKD%2Fm%2BfZh8nVUIz3WK%2FbVwmn63c%2FG9iYvQiV5K8IOvS%2FJ4%2FF1DnYDE456zQAHxICbdpeP3V69pjFdlpVhbwZeemhvdPwstnhgW8UEvg6lXK0T12SXRD1677q5U5dZ%2F4C9%2BRHD%2FRlJd8Na6JAMMXjq84GOqUB1sLbnrnrCvQgAc8DufzcSOB7Fn%2FokhNMNEBvriNG7Y3VEx1gobRe3XylfXJvW3tj3j%2F43DSO3WirysxXQqD%2BEMI%2Fak2csoSc3ip6pk%2BjZABZ637s194Ldf3whnhYzaqeVx%2BhrZT%2FjC9hz%2Fjvui9qaHbg9ue8HrwcCPUp7JBKwNqmO00lFcZgf84OLNHuvUDlAaNXskVKDZX8v8r%2F0T21pZXUGERv&X-Amz-Signature=1452e61e8df75a831416df024902f0d45ae562f02f811b052aee6e85a91a2eaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635XTW5XI%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDZOLZPn7sHqezH78oFcmuxB5JTY6ndTs6Eqp1smhDnwQIhAOQaD4VvDfscuhJFhpUNtrVH%2B2QOTL0CIT2%2Bly7ckMaFKv8DCC8QABoMNjM3NDIzMTgzODA1Igy7f8UEHOc7wz68GTwq3AOk3K3U6l37GotUfIdUZT2mKrykOc4Qdye3f%2F4OfixDIRyLxPRG88XGapywJ3Z6M1GgDNRs93vxEhBW3b3Wj0494k2pK3nND1hy%2B8CGWdZ0gaJL9k774XqdZkLmn1NLkYYyDVV1pZ279EaSkQ7lEBK9FhStItZDjksWGzD77LuuglJyGf17dFO02GPnUHzd3bmv3SsRbCqkpV88mVBkUgt8tHxU%2BIB4SmVanmD%2FeYKfkNSulYnudBRn1eZqsrRI4Izx2hhuQn1kKnB7aYL69UeoaeHZpvFL9k0loPUiUKJJl8VIW%2F%2FF5y%2Fm9gSCiTeDWY0%2F%2F3Ao10UnLcw0jj183nrx8LpRujn%2FFsEtlW7%2FM6o8DeQdGXfFk%2By%2Fky8AohsXpA7Djt61zv%2BTe2kjssC1BPUKp6qntSQObfH%2FeMbNTVxqAUTK5wG1UBYksbd6FSN5XF5JxTtgQUZPXVpzHV3xwxkSMHsBqF70NaLF8gV%2Bxuw23RPHQtCts%2Bvw2Zhx0%2BqGKFjVhd03ilQpDJzHiWliil6V5efUMh8SkzEt2%2FKtbkvgG3AIUT49Kxjr61l9ZkScy4%2Fid1WaOUhcK2LUrIlzr%2FvKZrCroxRoH5wnIjWqJhLauZFcj5PeK4KsYCk9JzCc5KvOBjqkAQrVZKhBSChBR55Ree9TW3PD2PQCjHRBaYcHc80D1pdGCqlmYZb0Ps0hTz9y2B6z40R8WWM0%2BJ6KSXnvtNrd9SSM79sw2epcQw6hDkpwPcszCsrsgov6oCqNPbB%2FROHyLTPElN2rgiXTKDEBKPebuY%2BiEN0fY5B21K2k6DtdNX6uJbfAzd2boLqFFXuO2TH5fYNu2jOp10vhHb5l023jadjqyogP&X-Amz-Signature=4b8a59975f77fc86f74372a9a008cd9f8c447c74c4bbd1aae3e920d30598dcd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKM2GHAG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDHlVf3ESEu0q%2B42W%2FYJwC6r%2FJExWDN5Tj8T0J5zarzfwIgFVQro79i7Q1uxqwp9Sgr%2F%2B3YxjZt5C99Dlm6Fxw7Plsq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDNfOCQPdr9RvsmYBwSrcA%2FawdtljFOPVivUavnJVQI3vyWICx309T7lSP4KeDsLXpNLw78J28pPycNK6hRCWtF%2F%2FPhy%2BLpaJ5LsZfI3ILHsIK6mbqQ30Fxh1hJfQC8Wbknstakp8spVOlJkggTFoPXWvZzPZUg45G7ihLBQegR8ckVI5wv%2BJonXgfpgnQBVDW6MM2WFSzbcUuBR%2Bsc83cdX8JOtTotZptNEw9UzhIhN6muaZNxl1iyeD9e9GfOxNmnfVZp8awLhk0fm25AxEluwnoyDuJkwumtKenwMZojO687rXvbqzezYZG%2BHPRVH29bAZX%2Fbv3Ezuoa5%2FAN0HGey4rKpGlkdZ0uqagq7TmpE6wtYzT4aMMNiaVYOP1II4jeSNau9IQs4Y4wr3aH9BQ4gSS4qzvwIzrD6rrSQ7pKbs6A5Pb549A8zJeb%2BImRdl7keTOT3jQhJo2LM4Cw6I0ktbM6vPgS9jcRn1JFt0R79p0WsLzkkzsR8OFsi7q8i9hz0jj6sTMW7W%2BFXUnAyhqXH5GmRGrB3MMhShu54jBswSZzRP7LPjGnoPzj0oLP8lIjXIWTSHHDn6tuKo1wjjxjRN6pplMsgt0sKHUIhUg20%2FwLwDDIvGCJmpzZGBt2dLGDlIm%2FKwJ1AVavctMMnkq84GOqUBNupiW4zHS1Txcgdj73TZ06u214gIjOU2L9kgrsfmzLQpEobkbhmXZqB2xweBQ7hfax43mZHMu3dLYUHGHpbLINrghpgR86WAvnYB7Vy7ODSZrhsmYEW6e6XNciMWpVA%2FwSyb3eyNyjAM0wjFG1Q10d%2B1a%2BNe7w7nA9m9rZ7mS2LssaWEi%2FqEvTnKZ%2BmhtQTJij7wgADXb%2BdfvhsbGJplppF0aDBL&X-Amz-Signature=20787de2099a858b2fbea91501ca02cac7f1aab4f9b587be37863f9dc40cf6ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQA3FXY3%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCICtNjxKLM652BhBNizLtaWqQ6KM2wRsKd8T59jmH35gSAiEA2MFeLtwZLBZtdF0IiSAHLaDcASCyz6k33mxp3ZSIALQq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDGDjd1Fzn7dGbEur8ircA0P8CFq89MJWo%2F0MNtjyFZfFF6NSk4LNDrNJu2RyxyeCbyATyjfeNE1O167JEdRac09cIpqtnAuRV5Kfd5C2LX8tirkHegYe0Hd9fyXiUBKmd6b4oAOnMkseXhNYGoVREjTDyoEO55hSoMRArgr61rBNDNw7Snl7Ku2QfOoXlm0E1O%2B68bwIVV6T0yIOv97LOSoQpwk9fXAwd8PezwHpSUYvOe8erEopK1HWnwo1SonprFCBCFWuj%2FA8OI0pVEoM0nOKxXV5Pz0sD7o2TnmocPWKA%2FzSiwFrF3b%2BjTY4Vt83CNvSfZNDodHAPP7pdL66VlV3q%2FrhfaXI4FZOyost4qnQpvCqKZ8BdXv5fV9FqzvFnQ42w7x1YSK13UCq5FT1l83ieP60xnx8fqeXC753jAhLwMHD%2BgOrHJ9tULweUkbEkgm5RO1GOCOx40uo3LX88VyQnpFuKoyWsaYqq1HmOq8Q6sYQiAsWhxPZVTTdElPpTmRQlNVtp7F2XIxMhhj529R9BT2gu8IKUoxERoBpoLjhRXdOoqBZqIqcZm9GRIYmy3HjPvPZQO3HFE65AjApcKMqtQb1smpq7XgsbA7NI%2Fn1hSEbSVzaXbTrmeg1XJIJHSZTk9qVxD6uGsilMKn2q84GOqUBxL%2BGmovDA4yr7EJdfrwfusRX6SQn5oTdI6qZVi6vos%2FXP3HCSz7loyc5Vy2Ay%2F7JnqsZgEPWJVQIl89fiCRM%2FMJ49CPF6tbIypDf7NVb%2Bzc2eouOMJ0I8OgXZLrogdcpYIVUpq6fObeavhXayHsEppweGxr%2FvdwMoM1aKp6JBuomJVoF9zH1i7d89Sea85xDasM1wsXBjA3aBAvd96OzQjeh9JFo&X-Amz-Signature=6643e0e62b6b76bad891edb013e4de0bbca7e51bf31883a41f0d8637247bb436&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO6E7ADZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIFS%2FwBpu%2BGItyOokOsayjrpyKLTp5ztjeNAU8sXkL%2FErAiA1IV4DHk0skA3bwpG18BcSjV0z4aeYoNdi08WFpfS6zir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMRehPG%2F3BRrnH%2BQm%2FKtwDJOb1IaizMhcuvWDDlhNQpo7ZHCREVD1MIdYrGEFAzpT3reGBkXLwTeLr1%2B32k0cMbuBIMM0Z%2FZ33sYC40fZQ3CquIVSL0CL0vTJNoS4voc5zxdS3MpC4Imx4ZzSHu%2B%2BDIbvs%2Fr7T70Yuux%2FMIxCj3Q4MPMHwm0nG6eXe1Nj3WT%2FdJjlB830gzjZ5KcyQNu5LpwVG%2FzHjWAav22D7xLORYmIbstteppry0LAC3kwVvfmCxnU2z4gmrX1if5f9POjx8aVU4fZ1A%2BgokGQwODXBsG%2BPhgZq8HTBeRXzcjLHAM7AQcEH683rNZh%2Fr%2F%2BawOuC84fL7BrjCOL64ztEXk7u%2FokNRe9Zyy4x2CeTeZkUrZnr8R6IZPAaugzFyT6rEl3o8TvZOgzSBL9xLfm%2BMLhPBRzSfJkFIG2VwPUHTANjjt0JJx6vpXBnD8tCD9KN%2FVll%2FCcWHUrrUyku3I%2FuObEK62QhIErCEkqkNjVYQ8Fj%2F2fNZXqcUvUz06N%2BP6EGuEUhIm9QR6A995l98Llj7HmbwmuNr39EB1y4%2FCycCNN5l5qnl6oiCvunyNqGSY1fFtdGTMCeyPRzbYgJD5kxGlugKANZ%2BQR%2BF2o6il%2Bd6H7vyvmu5SAq9yNwkuQrZCEwpuOrzgY6pgHG3uogTiVR3LPt%2FvztPQh2O2Csg0iicnGULWL10DWIeWPLv3Vji970Nlo%2Fc2jm7FBD%2F5lOU37hyOim7c%2FD%2F1ImJnM6h%2FZns1ngWHaqZpGVCBjtDsGAmXESrXBoUI27HHDX9aaio6aFT11KwI44t18zDqrLIRtDnXM%2FTu2QuRoLwZF8ibL5Inpspnqka3W%2FT%2Bsnebg2jpwCX2bv%2Fml2aNGtcYmA4d58&X-Amz-Signature=3ba0833cf2d33668085188d130b2706d8f219538ee0760ea4cfafc2808105728&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO6E7ADZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIFS%2FwBpu%2BGItyOokOsayjrpyKLTp5ztjeNAU8sXkL%2FErAiA1IV4DHk0skA3bwpG18BcSjV0z4aeYoNdi08WFpfS6zir%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMRehPG%2F3BRrnH%2BQm%2FKtwDJOb1IaizMhcuvWDDlhNQpo7ZHCREVD1MIdYrGEFAzpT3reGBkXLwTeLr1%2B32k0cMbuBIMM0Z%2FZ33sYC40fZQ3CquIVSL0CL0vTJNoS4voc5zxdS3MpC4Imx4ZzSHu%2B%2BDIbvs%2Fr7T70Yuux%2FMIxCj3Q4MPMHwm0nG6eXe1Nj3WT%2FdJjlB830gzjZ5KcyQNu5LpwVG%2FzHjWAav22D7xLORYmIbstteppry0LAC3kwVvfmCxnU2z4gmrX1if5f9POjx8aVU4fZ1A%2BgokGQwODXBsG%2BPhgZq8HTBeRXzcjLHAM7AQcEH683rNZh%2Fr%2F%2BawOuC84fL7BrjCOL64ztEXk7u%2FokNRe9Zyy4x2CeTeZkUrZnr8R6IZPAaugzFyT6rEl3o8TvZOgzSBL9xLfm%2BMLhPBRzSfJkFIG2VwPUHTANjjt0JJx6vpXBnD8tCD9KN%2FVll%2FCcWHUrrUyku3I%2FuObEK62QhIErCEkqkNjVYQ8Fj%2F2fNZXqcUvUz06N%2BP6EGuEUhIm9QR6A995l98Llj7HmbwmuNr39EB1y4%2FCycCNN5l5qnl6oiCvunyNqGSY1fFtdGTMCeyPRzbYgJD5kxGlugKANZ%2BQR%2BF2o6il%2Bd6H7vyvmu5SAq9yNwkuQrZCEwpuOrzgY6pgHG3uogTiVR3LPt%2FvztPQh2O2Csg0iicnGULWL10DWIeWPLv3Vji970Nlo%2Fc2jm7FBD%2F5lOU37hyOim7c%2FD%2F1ImJnM6h%2FZns1ngWHaqZpGVCBjtDsGAmXESrXBoUI27HHDX9aaio6aFT11KwI44t18zDqrLIRtDnXM%2FTu2QuRoLwZF8ibL5Inpspnqka3W%2FT%2Bsnebg2jpwCX2bv%2Fml2aNGtcYmA4d58&X-Amz-Signature=8ff0302044ed370fa863f6a437d95b128ef03e38906b5b6ce82d15308637e783&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635BK2LTM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQC7fLQ3byHg90qHfO3MJde7YPYr885W3zo9%2BMv7x86BhAIhAL58UtkX1tt8sCoGhd%2Bdk8CXpVXbZwmI%2Fi46bqx1iulBKv8DCC8QABoMNjM3NDIzMTgzODA1IgxaF7op%2BiRh3xCTIsgq3AMylgXUmKg%2FXxGz1nf7dwLdwXnQw72uwBMANH%2FWul4mP9RHiHkg4c4MbIRxTu8HqCdR5lqnOJoOKvXSbCrG8lTDUjpw3AglzAIf%2BWpf1gzZIFsFKX2q7erAvl8yNFIAJDULcm5LrPHzFNyyhHmOXmKryITIEWjjjDtMumIP92zjy6H0W1FjZ9G5lEXLlwOcecqmpuAcEWiiy8HUj4Trs7GY0v%2FvkZvONSIGELRP798yRy6NMD0CzjvDWkpDvcxxc0%2BsqZ%2BEQmFatH3NmtxJV7q573Ft%2Fqk6X8YEJmEKeHGaRgM26kVCk%2Bj%2FNvU5XDYRaVEkIXSADKWSeiWhd03LUvyPKfTtvXDuTgLWi6j3k8jrD6njP1w1SPU31qP%2BzSGceMrNmTGT3ZW9llY%2BgAmYuakKda3w95SLdelYdxoqf8ZtEH8g4fGXZPMutZvBqPXqxH5epG5nGD0xgrvzEiFmhayCwbEPbU5rIlmP8vwTBRAQ2kk3exWhE8Ri0QFGJ%2BX8dp9GC144rWX7YetMaGFD4%2BaHgs5OmNPDtPo45wc9a9%2BusDl9tzfEUVJDWwW%2F8hShZ6fovsTcuEa0vOuzMZ1JEnznBicqsMNvl%2Bn7Kc6E9Cv%2BK5r1mG%2BVqTQB9xq67TCK5avOBjqkAYPqPUhgNbY9%2BJ27%2FIWjin32rpsE3Q1xoUcF40vMRV0rTDkOXRbm%2BvNktcrUMEh7rU6Wqr9prGNYhkCR%2BAvwWmuNSwVbRV4Dt8QYirgI4Y68KT4fGp5kSFCvWwOKrYqno7MQom2SgEI4ipE6LFQmsJv5TQ21TwqRowluzzva4jU4LCcDba%2FWtHjNUWx7OVEgRY%2F%2FtdsfMhYBgLj2ud1ORb98Cj2j&X-Amz-Signature=f99f55073cb8f2d89f4e4f96c586e5081eef07cbc0f2f05a01eab70899410e4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD3W37BB%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIFG8hZ684OicG3Qvvkd%2FIem6eEQI3dZe9Rz%2F6YBQvUAXAiAjlQPU4AQ%2BlsHW5rSePoEJC7bZg4EtjeLTMH4qWCYZjSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM0A1C8KhqrR%2BAyLtmKtwDR90TuW9YfZkAQMmGL8XqMBjwHQgxpDUxu9Qc1qoJSinm9tCYCxXO804Uw%2FX6tsljGNno3%2BLDQab8Vb7bN5Fqq4JRDXEf4kLHJpHQ7GXe2B1lwq5VyEpQM39nsASoM%2Fsc1p%2FLZN3HBqgib9NzRBXuUyqH%2FzEvbBTiWe4raloWZSLeXsblz2a%2FrkMNRk%2BsElA2iC3vbNfp0PGjtL5VDhCsi62AFT2LUYv8qwMABQi%2BlKmimgCKGDBfHgV7GVRHPgtApS%2FuNl5OG92OFEus%2FUnkOE31W%2FsRBC1AxvDLayWFUUaJ0o4rW7LoO4GkYjO3Ps5wCb3mV44UJSIaIboqAic7iQ1cctjJcMygGdPgct702cyrGwRte%2Fe%2Ba00KwqWRl5Tap02x3fesRQqGGXfZNtWB79CXcs%2FX%2FcWAsrKuOOeIsch4GydK3Ehz2lL0Yo%2F6UM%2BlCL45YLjv79fl9xBSpntGDSCgZJt4kypYCQKKUMiS73cGoPHLmcvpnbTB32IAtQbcX77teBDefmpuzno160F62GtCmJnmb5y4r1FwYo7CdJhYlSFUtQZk2QtN1cu1yJ896vRcAkKumlMP9jatnpnfMyQ3kHWEwQgxXcQxorLqo7hmSGVFfH9UZMYwsdEw6OSrzgY6pgE80ejrWRVp22pHd522l%2BiVAiARSWCeWXK9sByrQFWpsObLnlR1Pmecluh5XJOJfU0BXvTOPO9x8Bb9KzGSM8noNw7KRoAyHH26ApS3dtaNbIHaYo56EhbiYRDr7yKuQ3JiTVBdC6mEWOPGLLqIlUEJwQH2EmX%2Bdt60qAg7Zr2SCUM4SxWy8CyTFUocPeVMUIinSVTCcCGSRcjZk1H%2BzMi4tAYTdVC1&X-Amz-Signature=4b6bcdd1308feb8d53924533c9ee139a474b7707ffd3a61ae907cb1cfaedbc7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD3W37BB%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIFG8hZ684OicG3Qvvkd%2FIem6eEQI3dZe9Rz%2F6YBQvUAXAiAjlQPU4AQ%2BlsHW5rSePoEJC7bZg4EtjeLTMH4qWCYZjSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM0A1C8KhqrR%2BAyLtmKtwDR90TuW9YfZkAQMmGL8XqMBjwHQgxpDUxu9Qc1qoJSinm9tCYCxXO804Uw%2FX6tsljGNno3%2BLDQab8Vb7bN5Fqq4JRDXEf4kLHJpHQ7GXe2B1lwq5VyEpQM39nsASoM%2Fsc1p%2FLZN3HBqgib9NzRBXuUyqH%2FzEvbBTiWe4raloWZSLeXsblz2a%2FrkMNRk%2BsElA2iC3vbNfp0PGjtL5VDhCsi62AFT2LUYv8qwMABQi%2BlKmimgCKGDBfHgV7GVRHPgtApS%2FuNl5OG92OFEus%2FUnkOE31W%2FsRBC1AxvDLayWFUUaJ0o4rW7LoO4GkYjO3Ps5wCb3mV44UJSIaIboqAic7iQ1cctjJcMygGdPgct702cyrGwRte%2Fe%2Ba00KwqWRl5Tap02x3fesRQqGGXfZNtWB79CXcs%2FX%2FcWAsrKuOOeIsch4GydK3Ehz2lL0Yo%2F6UM%2BlCL45YLjv79fl9xBSpntGDSCgZJt4kypYCQKKUMiS73cGoPHLmcvpnbTB32IAtQbcX77teBDefmpuzno160F62GtCmJnmb5y4r1FwYo7CdJhYlSFUtQZk2QtN1cu1yJ896vRcAkKumlMP9jatnpnfMyQ3kHWEwQgxXcQxorLqo7hmSGVFfH9UZMYwsdEw6OSrzgY6pgE80ejrWRVp22pHd522l%2BiVAiARSWCeWXK9sByrQFWpsObLnlR1Pmecluh5XJOJfU0BXvTOPO9x8Bb9KzGSM8noNw7KRoAyHH26ApS3dtaNbIHaYo56EhbiYRDr7yKuQ3JiTVBdC6mEWOPGLLqIlUEJwQH2EmX%2Bdt60qAg7Zr2SCUM4SxWy8CyTFUocPeVMUIinSVTCcCGSRcjZk1H%2BzMi4tAYTdVC1&X-Amz-Signature=4b6bcdd1308feb8d53924533c9ee139a474b7707ffd3a61ae907cb1cfaedbc7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BZXWYVG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T232321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDvWB1UlwqyTYdXhBs%2BlHxuZHSLqT5eq4N84%2Bj3QCm%2BaAIhAN3GN6hHdAmx3p0knGCNhNfmtli%2FFt%2Bpo0ju7JLz0BDoKv8DCC8QABoMNjM3NDIzMTgzODA1IgytR5sqvqscner5aZ0q3AParghHtzCPQP9eNBsFXvofunxq8X%2BDZvrhSMDHmh2EjN%2BbWH93ib1pfi3qFlWGoNKahQBzr9RyFpGMlDr6TdmLeSAcwA4i2ANc9EtciwqfkC%2F44QBVCzEHc%2BA1vZ%2F4twR5SbX0svuc84NB4DzyF8HNJoz2aoVxb4QJZQG0t3oG%2FiHCsvAwWhuKQFdnNy%2FjAV%2BtUKZ6Om2A%2B64AyEVg%2F4n8s3Kfl4r88IL9mRKqjGXQgdEeIv120pXc4ZuqZdPB2ScV1FQszfKstV%2BwW8XFYvDeaD1N92fz7lY%2B1D552IxbVJli2wIfI82%2FeFboduKyZfdxyR8w8kXnfhXuseksqbMAfV%2Bv%2FX%2BGEg%2FQMH261oHnt3xZJA1pkXDFCtmL64x6iNPmQEu7HiDcbTAxiYM5iqYXJhCjVjY72gPOjAQP5PBPS%2FLZjKlPLTGggoLV9aum2FMbDFdGxIeh9Yt3Dj%2Fn9X1fqgmSTlrCdig8ZG6BrE%2FHIMWOFfNuCZFTB7kd4wYacktuc3UT%2BX6Z3nZ47OvfIzUrmR17bIreQFQVe%2BdbUEV5JhxLL2ZRKoPjrhDPpscLESUK%2B5HB1neT6fOIvF97KUwGM8FH1lAr1c49fAWycXZ%2FrBetQ9K8RYvGvsVTYzD75KvOBjqkAeVCfi4WChxqJtBmQMs%2BJhwXfOZdAGCYnv6sr1F8xZsaX0CauEFNhunzuJ3NTNrdgcic3j27uxL1L%2BOqiVPmVteeAA5v70jp%2F%2BQ1yhxaMEptKsO8RW7MkYTO1WJLKILqum6CsksGXhczg3Rvz1O0nSHlTG%2FHP%2BRr8URXhb1Fk%2FYeoEktLStX%2BMG0bisyBI3uANZmhhTCeCDtF9OpCdewdAsuADyG&X-Amz-Signature=ce21c775c724279f2561dfe0ac17b867029a1ed1cc25196f63427d059aa79875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

