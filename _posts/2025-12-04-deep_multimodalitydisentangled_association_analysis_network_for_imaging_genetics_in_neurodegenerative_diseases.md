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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZTK6CX6%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIEiOThfdYmYdvYQFGMEJpk5MghXxbe18ZJ4TEL62oIWhAiEAsmICUP0zgB0BDHKzcH%2BrAQd49EgbF8uYcz8t47jdi1gq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDFlRN9%2FiAq%2Bihh%2F75SrcA3dXmvDzEgUFMHcqEepyq%2FUuP%2B33dK%2FLeaH8W8FOruS5xrCP3sP6PdFIp2yoOSbcVQ9kCbYfnnPKosK2Jj%2FwcqEFxptv2XA5fSQt3a%2BCYlA5rfSxJ6adBbQQ4WFZM7l%2F0LVPDJ6Z%2BMqpxPf5TE9KyTCItsLznH2KYrRJeJPtqvJYEW2rY7qAywxOAyN2YlgXMjt6r4wkBuPGvJ6GK%2BXVY8eskqeJu7g0VaCoVGPMY7JsiAbgZijFo14RwVRqzwShsg0wfxxc6fFnbZ429MLTLX22BJnBaqvbDtIIEjoUqUaXzYwiYw%2FojK0fdH4cwmjijGUoClmCpBxUv5shgWDkormKUJ46wJssRjRwaqP8ZwQ%2BRzJ3bTt%2BTs6pIzWA1LTPLD7erSwR3MubRsYOABmiEFsFiyPmTVcaC4jY7QJ%2FEkWaNMRCCxpjHwVzDwzzWKrqT6dxi4JvoJVv0ANPOGjC5zs3z7lRrKXuUGdvGgU%2BxCHik8xyAbutjrgT55k4U3%2FU%2F6MPUnAG4asV%2FPF8FASEQosyIfVrjCdM0djkE679VY8SCaS%2B%2FZUtsa2DzjX1NXTUITpjj964U1z7xyA3JSHoxNFLTZ2ozLVvhvydamUblMeKgnMb9g99MJ53WnnSMNrY88kGOqUBNt5PLtxxW7%2FqgbjW5hctwB6jaX9B4SbyJ%2FzMxrE%2FVtB7xCKd4IkwipJs7226QFGoHKaInt%2FwqRM%2BzU8D0Pt2zmsKXkRIoCtqRG0l6HBf8shP4rpRO7vZY79t%2FBEToIotkw09sBTMDJ5pL5VnZCFC%2FIXPTCj8EeAaeYEOW%2Bp48AR%2FHheMV79e1clTcxHkC5Z74X%2Br4HwDgXpX%2Bdw49m16xvW3SE5M&X-Amz-Signature=cc53f24525880f42cc96d9a80974e91d475661561ebb6d2c23c32ac1e267fc9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZTK6CX6%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIEiOThfdYmYdvYQFGMEJpk5MghXxbe18ZJ4TEL62oIWhAiEAsmICUP0zgB0BDHKzcH%2BrAQd49EgbF8uYcz8t47jdi1gq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDFlRN9%2FiAq%2Bihh%2F75SrcA3dXmvDzEgUFMHcqEepyq%2FUuP%2B33dK%2FLeaH8W8FOruS5xrCP3sP6PdFIp2yoOSbcVQ9kCbYfnnPKosK2Jj%2FwcqEFxptv2XA5fSQt3a%2BCYlA5rfSxJ6adBbQQ4WFZM7l%2F0LVPDJ6Z%2BMqpxPf5TE9KyTCItsLznH2KYrRJeJPtqvJYEW2rY7qAywxOAyN2YlgXMjt6r4wkBuPGvJ6GK%2BXVY8eskqeJu7g0VaCoVGPMY7JsiAbgZijFo14RwVRqzwShsg0wfxxc6fFnbZ429MLTLX22BJnBaqvbDtIIEjoUqUaXzYwiYw%2FojK0fdH4cwmjijGUoClmCpBxUv5shgWDkormKUJ46wJssRjRwaqP8ZwQ%2BRzJ3bTt%2BTs6pIzWA1LTPLD7erSwR3MubRsYOABmiEFsFiyPmTVcaC4jY7QJ%2FEkWaNMRCCxpjHwVzDwzzWKrqT6dxi4JvoJVv0ANPOGjC5zs3z7lRrKXuUGdvGgU%2BxCHik8xyAbutjrgT55k4U3%2FU%2F6MPUnAG4asV%2FPF8FASEQosyIfVrjCdM0djkE679VY8SCaS%2B%2FZUtsa2DzjX1NXTUITpjj964U1z7xyA3JSHoxNFLTZ2ozLVvhvydamUblMeKgnMb9g99MJ53WnnSMNrY88kGOqUBNt5PLtxxW7%2FqgbjW5hctwB6jaX9B4SbyJ%2FzMxrE%2FVtB7xCKd4IkwipJs7226QFGoHKaInt%2FwqRM%2BzU8D0Pt2zmsKXkRIoCtqRG0l6HBf8shP4rpRO7vZY79t%2FBEToIotkw09sBTMDJ5pL5VnZCFC%2FIXPTCj8EeAaeYEOW%2Bp48AR%2FHheMV79e1clTcxHkC5Z74X%2Br4HwDgXpX%2Bdw49m16xvW3SE5M&X-Amz-Signature=cc53f24525880f42cc96d9a80974e91d475661561ebb6d2c23c32ac1e267fc9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JPYVPXA%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCZlgHGVz9ssijw5ChedKde3Q4QDxFDryRdFXMZFlLhWQIgWorD2VHA3lJ68XwKS1%2FIl8DxJX3D2E1lrp9wmDPX65Yq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDDR%2BXbA2ZkYx68btISrcA6dcbiFoEF%2FjWXGSVvRZ3jSMBqY8LGMnmKOmG%2BSLJamtykoLbN000xzfB8lPW3vWnUgbIhA5HKpZQr1ejZVFAFd1J%2FfnAi5u5ddbGPCtxSr1XXzGLkHWq9D2cBLgD9agnZ2H7G%2B3IXxa7F46ob%2Fc4U2ImSRm9E0KTPxG7ANrDysl2FV%2FumbhEnRyFb37U1AiVY1JYHBRJnHaO%2FdtsqtbTmoBmZfCb2L5pvhJjo2pmuHcSkzgkQmHRKnnSP7TE7jc4%2BIRauWbD%2F7PbFlL%2BgsiScvNWTPgonweoSZkLRUm6AAeXdXfcBoTy%2FxbziJBhvCSqzSJ1ashU4tfZcmW8begYbctjm6Ez3rVogPWEyagWzHx54az8244r8cM8DgM%2BHGB6jAZiHuCjaLQpo%2FBrcGYGkNm%2BQSAnS%2F1Y%2FGQwSkdvKkO4f6UEUCjQ1GeeWNu9BdsaP0En5iiYaLjyoyZtGZKmzyW5cWoP30ia1%2FjwEth4WD3I42SPO9QWL9robS0nNYDNZ8wBkJM5V5Zjv%2FyapBjHvdAa%2FMQR1wYICnft414nmIRTDg%2FLNM8x7EhbcVfjtrr4xNLy9chn0BxWqxWFLehxoFPFsPN2Wqo%2BZFtehcuGATcff5FDdyfEM4P7qb7MJfZ88kGOqUBZ7N%2B9WFyZGSNtZKzIDpN67%2Fm9%2BnzWJPHganGN2xpjJNL3WJigPdob18GKcgEMOihWe67OPQoKpVfAMGS9Vc8zEjoUly0S7DPjqlsP0VpcbiPbF2E0XbV5fUMAZZWiiRSfv9ap1%2B4znorRsTovPFSX6mysH9mqD%2F7byylr9wIcMj37J97XnXPvTzz93dHxjvPe%2FOzuO2S4wIQ%2BQv7UvfGKUXyNfKP&X-Amz-Signature=85df7a2fff81f880d1b60ae2317a3d62c8f26d9f572e992fc9bce2c7fa7e4d3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGMTEU5Y%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIDy3251yrS4knqPkDMJRsvIQ3YKQX%2Bl3xCrZFDO9bBosAiAbCDExN49p2v2BWEN%2BGa9qDA02bSsFNQHyKE5d6ATHPSr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMrHasDz7z3tk4lUaOKtwDufeL8T2%2FyTu3NDlTAaf%2BVQdVaju2sso%2FheUJvLWSkRjfxm69CW3a%2FHY%2By2rTSebnw6NIBOJBPsPXnVboRLHZxXSEAo%2FklHJfS351aVqbcBMVitUI3HbqGzz1bBTzp64heaiVhAMtnM353wgkYd2W%2BuBycZhMLjQc3l9V8N3RG2jAQtzbRfXMsd%2Blo19agiZuMY0CiGhbgEYeswG%2Fi0uT2EZD41eUk4ubK%2B%2FkC5Arc3%2FqRtL0MuQG9p0OjKGe7F8F7ZCA4OGhB3E3Pc0kjaWKAbPdcJ6Z6%2FSm6KKQ4KMJhfY6rOwoI8OewHHGiwr82zoh6EcO2UODatd4K8H%2FzyMS51G%2FSecJFxEdcWFyUWhBKhngoPZ09w9XfqfZ6VWlitT%2BANeMS3suabqpO5QyRQ1OHqe4ds97su39PR3IyCbVoLqRN94rcuLxDMnwQ0tH%2B82L92D%2FbHEV8CYBa1yXO1AqXXRJuLEDYnCHTp8vEpLSHYJBmo3Ud4dSS8fVYBy%2Bh7TAQ5eBJ1NSDy1qRs82vtYQgMrYcJz0I3PnHDoXIZ0c81onTURbcPP1N%2BNpA1b1gkrLBvYI5IkKdWNPxYjs7LQTNTrfNau8trptDaysigcW%2FlO3VBQ%2BA8G137ET%2FBEw%2BdjzyQY6pgF4NALHqAT6TldgebLzq2iG85ezoAjHoqXYlKznLHkoprEF24qPTRiX8H1QwB8N2RUIDu9FfJwcWjALJkpsjX9BuQMnA2oQS8msmDObRpHM54EzHmO0Hb4bukAg2Jax6NRg60LLN1Uj%2BEF4u886Pl%2FUzxYd6teIGOnFmHR9y9ELWjFZoCMDhaiRokkPyIsf3TqTtBMygWvpofL4SnYBnNXGn9zPBLLi&X-Amz-Signature=0a48e23fe587d3a0a083306b86b59eee04da8a57075d414ecedbd3afa5946a04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGMTEU5Y%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIDy3251yrS4knqPkDMJRsvIQ3YKQX%2Bl3xCrZFDO9bBosAiAbCDExN49p2v2BWEN%2BGa9qDA02bSsFNQHyKE5d6ATHPSr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMrHasDz7z3tk4lUaOKtwDufeL8T2%2FyTu3NDlTAaf%2BVQdVaju2sso%2FheUJvLWSkRjfxm69CW3a%2FHY%2By2rTSebnw6NIBOJBPsPXnVboRLHZxXSEAo%2FklHJfS351aVqbcBMVitUI3HbqGzz1bBTzp64heaiVhAMtnM353wgkYd2W%2BuBycZhMLjQc3l9V8N3RG2jAQtzbRfXMsd%2Blo19agiZuMY0CiGhbgEYeswG%2Fi0uT2EZD41eUk4ubK%2B%2FkC5Arc3%2FqRtL0MuQG9p0OjKGe7F8F7ZCA4OGhB3E3Pc0kjaWKAbPdcJ6Z6%2FSm6KKQ4KMJhfY6rOwoI8OewHHGiwr82zoh6EcO2UODatd4K8H%2FzyMS51G%2FSecJFxEdcWFyUWhBKhngoPZ09w9XfqfZ6VWlitT%2BANeMS3suabqpO5QyRQ1OHqe4ds97su39PR3IyCbVoLqRN94rcuLxDMnwQ0tH%2B82L92D%2FbHEV8CYBa1yXO1AqXXRJuLEDYnCHTp8vEpLSHYJBmo3Ud4dSS8fVYBy%2Bh7TAQ5eBJ1NSDy1qRs82vtYQgMrYcJz0I3PnHDoXIZ0c81onTURbcPP1N%2BNpA1b1gkrLBvYI5IkKdWNPxYjs7LQTNTrfNau8trptDaysigcW%2FlO3VBQ%2BA8G137ET%2FBEw%2BdjzyQY6pgF4NALHqAT6TldgebLzq2iG85ezoAjHoqXYlKznLHkoprEF24qPTRiX8H1QwB8N2RUIDu9FfJwcWjALJkpsjX9BuQMnA2oQS8msmDObRpHM54EzHmO0Hb4bukAg2Jax6NRg60LLN1Uj%2BEF4u886Pl%2FUzxYd6teIGOnFmHR9y9ELWjFZoCMDhaiRokkPyIsf3TqTtBMygWvpofL4SnYBnNXGn9zPBLLi&X-Amz-Signature=f7859074e91f21d3d3bff41533e68b121f958db41b9da7d95b8e518c4f77a09c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJCMATZD%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDb1s0UEMQvDoT%2B2xLzP0dJWQrIDESTGsmOlUfhGzqdDwIhAOxx4BDFN3uHIO9gGNGsOGovmxKlXr7neRceudnfEm0cKv8DCBYQABoMNjM3NDIzMTgzODA1Igw3K8QNWfGQvLtXB4oq3AOMicItjDJeEWaF78jyyku1PEvrOC2Vsm3yfzKtIMAzbrtytkF5SQz517R84nuVsURIHbTIIekHCXVzN3Vj9wXL3sbb7%2B%2FOpj2OThLKU2KncTDCDLbW9VMbjRq0wP%2BmA09MS%2F%2B%2BnZIlK8wJTMW8Bp%2B607n%2BDA92KZ9E2IgKLEBcadI%2F2FJLr1otHPDsNEgnESm8IsrLHl2hHJJC7mf6euLOY0jFh5hoTEL7AusDX8rfkqZr6yWzwyWStCd3scjKvINmSU4bUs%2BnMWSBV6RvOqfcSqJjItCSY4fINZDW5FiRHdazsOS1qRWr%2FxY92ch3RwmT0WA2Jn1Ev39DjJpi9O08pGB4UKXfW0InLbycuc%2BYhYlwrd%2ByS98zFJvNYv3%2FB%2BarDs%2BQxQKA%2FUXEyBtI0F1sQl2ncWrhDvPo3NdKM%2FrlmPSDQ8RILHEkoL91nSKRVL92yxheoTr809sE3a0mf4NEg4XnOdxNaK9vW9xXfGg%2Fdo%2B9zZjm0FFOQ3jWJVAYMonQ9uhAAJmPih3P83%2FrclzohPUkZ9BZWGDbNp582T%2F5mx2O0dp3VrdATqdBvB%2BGFdEgflJD%2Fau3sifvSHI7Iakc8meN0In%2FweACi%2BPOGnUp0D%2FF2wtUD0WL3tGcuTCA2fPJBjqkARhsWMDsYQv6icsTmnAyP%2FwaaAfsHh1RbF8npvfBwLbgR0PwDvT0ilNJkP0i56gX8ORa9afr0uw21vuVY2ltvKKQxnLED08S1y%2FOzatnkhsA5le8xAmEYkc5Dhz5gsJRKjO95xhm9O1anucPeQ67fXxrVthJi7ZPyUllXjCE40UTwGFbPoez3flW%2FpHh8BOk5RJbADRNwDABq%2BkQ6lsu0fkT8AQk&X-Amz-Signature=bc3e17a3b2ea41b9cfee35a83db974f002d4e3528911a7d266e6cb4215c55054&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TA6GKFE%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIFBdrNauFkAxqkVpfDCE8Q2jfgfCUb%2FMlL6OtdS9%2F%2FWDAiA%2B8sUI6%2FTUc0G5donwi034ZnU5H5EB7s6HUhJuPw%2BPtCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMQ34EGW%2FfTiFJuBKiKtwDdD3e3ufQNmgHXUDeb2uS5ZXKI2BkANBibbKrzctu0fcJY4Fp%2BpFDhWS%2FXP99lSNxBH80XMfHVsZdkbMR4BBCSo%2B7AVEmi6U3H81bG9pp7js1q7wQml5fBOItztIS6X%2FM3p41rOJkmu5A84PWw0qKaq3uiihguC2%2FFIbXWW3fZWY%2B6XiS2fW809l6lPCT58H0gBwk9ZQmc8tWNiAmVgHEi3SiH0OnQ8RDH5U7JZugll9XfmIXc3o2MwgZCPxPLxVySUfw0bPXZEw6USkFohaTb0RmuC2hMIcS3E2KIfG8IHdS6ffu%2FrKF8Jq%2Fz1%2F9YkohKz74KPo9oWlxwPxlVb%2F3MZ%2F6lTNH4dyvoLEMAnliQQmHqacluQfQ%2FaipJnyH%2B0PaCoXJClyYEi78Ovxu%2BrXpziHWM8ouU91dUTflNmD%2Bu4NI3fPOPp10fN%2BP4Tgj4fkRCJ%2ByJdJnwgxCoSBFD7lOGFb7EhK2tkF%2F7LxL4zDHRx2KdlYrza2Z%2BbX5Lub97YzbfxJ3ODtnmEFEGlc%2FWd1hulTQClAnb94lJYVM8YOqz39vuO%2BEOdFXxwbLGB23xva3ptanGhVW%2F1qpnTCkw92cK%2Bd0luZWxTw%2F3WyGqMHv6kgCw%2BKZy1PfXi1gG9gwh9nzyQY6pgEbLaXv4nFlMKOiJ7XWIkpyChIiMMR%2FF9Jalx2XBmX3O1wGkQAqBT82ECADIQL1CpVJs0BBlgpRZSKLVslE1VcqOxiBmGBS%2F0%2BoW0C%2BsBaoZTCZLx%2B95UXN5mrUtDor0xLqs7LJQORDsN%2B5MFxAom6dmVNxa2RfEn8iVFZ2gnjzJlgoN4JoGqMXQC%2Bm4YAx%2FMhokvfz6gOPthcSqVDPyreQ6FVprM1s&X-Amz-Signature=4cf60128b08d3d5d5baec7a55a6fb1689f6e88e4849df9edfff838bc76487527&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JP67FUJ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHXbjkaAw9m32mbfk8B69dh9b8Hdaj21iR2r30%2F28ndmAiBvFnMabxjMi3uKCh5fqlulV40olPF7XzZcHllqOlTLpSr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMUqkq17Ifprc1b2%2FyKtwDy3yQPhaToCqkYQGH6%2BqOqXra50%2FEWseOlwIuxJxzcUM%2Bn8Kqm7CYVOavw4FL1zjQLGYLQwPUNunL4mKZaoVgkiWxu6hUI0Lcp3Lb3NaGCTie%2FZnUKfl%2FCNh5aKEZGi1c8hcuP4XeSjB5JbvA9vBvtbo9Zs6mnjOUzLzv7gB%2Fqs0Erx1235SJ5Wh4DiMcWCxkVquwhIgo1drbQHfNW25mZ3KF5TtRo4qRF3ID9ikFavKtPfIrL9hAIrfo9%2BjEEvWrUMuxMSmeS%2FISaOWK%2FN89LhVXaQiblOnia9bWKSkN%2FbQvPmMIJ3sxY9JBDHJ2TSY0GwdgLcX%2BxbNaTo%2FKS%2Ftf640PSbke2dBtN9E2ikJ5Eanlsf2ErAA6x%2Bir35Upa7bwXT6UzIGth0w2Q5Lcn2w4zvRITSZUmt%2BvreMkbaG16oxeeKbOYsLt13sWLLNpuZPt%2FEdzQ%2F72MqkqYBMM149%2FWZ1Diy9mK91Ls98NHTblSX2%2FVV6S9qtSo35GVda4zeuFAlvwQHj60mr%2F%2B1S3Oxn8dz2YVXpesZD0eS49Agxm0SRtLYbgGP4TS9t%2F1aNFskzt4dBnFYiayuY2oYucswRgp2MDrknRjWjbNkLNkdIjNntwGgvLk9y0npeHDE4w9djzyQY6pgFUagzTI%2FO%2F3rs67V6nw%2FjqghNqlBLWS%2FaeN17SEnAYyMg%2FENgU5RM0VcroxgcV%2FkpP8O0DBIcMfpvnGrHFWgJkzXKSfRuCD3%2F8VDYyfXB8TJc5dUzuI7adVR0GSU9rxIfnJ62Dcq44JQdLd20s66Vnn4el8lnHr1b2TFtGwGLrW9Og9%2FiXu7l%2FK8eT1qceOeglbHnujQrIZWT%2BPYALtBrszSL%2BboXc&X-Amz-Signature=bbb249fa568d53a258b999ec02989d1434ad8bb59faff620ac68114c8e4c55c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOEX6REZ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIF9jBAX8HTW%2BoGP8N44RUvB3Pc%2F5KcCd28WaaYsvpOkEAiEAk8M03ypsJOWB0h7SeNqQ3gQ37%2FZAEXevCdpYxrXNuMsq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDNHMip1zq1pvvNI2MyrcA3gsTNQJJDJlvfe93n0SF1XmUDascVcaVSKPSMrYC%2Fejx5tFehJIM7hOw5JHVmkHOwDBhX1G631%2Fk4IUvBE01627tmXvROtmhznSNloaatTD36Eepes%2BADLXdBRwRS%2FwV%2BCnggfHqbgbgWbwrZMHuB5Pgxju4zuyt39nAfBvSdVf9ZdGV%2BixTDSOg6bzE1a9oTAB19OSCgSg5WFmDuAFnKbiL4XMosKo7g9kpKW%2BfcurPZnMD2Fro6CTBk1EwE6TpeRO7ZvOuFr47Y1KAQYAtiZTdBglwkB9%2BrraM2UIS22h8ug8cLh0Ia0NRb9B0uott38ycCYduteiCZcGlVk%2FecxtZ0fZoyjm4u7YupIYLn7I62n%2F7XJ0WRCXlhziHOWJ6YYComhkAL6qlu1P53eHERH%2BjRq9tWvKkapHCP2CnIrzPyb%2F6e01c%2BpT5MlW8GQpgxZv9VDUlBNN%2F%2BWnqvYRkQ2GBHfAXExjrT8gl0kA14LJ2vVU9qezTT%2F0A8Crrt680cP29K%2Fiup6huBY0%2BQheXK1Iy0A9ybDMdE9VReF0FGJnjS4vztj3lV6ZNkh70DY1Oo6hXttxIiml0KWWhfcK3nRJDOu1W%2BWRTJQaC%2Bqaya82sx8NYWC6BupZOWgCMO3Y88kGOqUBIcD2S%2FoJemciZ39csBO%2BaWncQb6phxW5ABkFmW8vLMltHSQ26ZVuJbDKoFXqf%2BG4TqlhGxVp6BJnS3Hg1fS%2FP6oJchQmjfjq4yWBV8%2FLccBl0QDk1jqnHHnsftjOMD8zYPocof60bp7sYVIDfbEVJcyTgUzyYb8dozAmTnQCrW7PkEb%2FNxUzIss8GnasysxTx1IIfwUgbnZDHkDY28Ki7M%2Bl33Kt&X-Amz-Signature=ffa50e58e11d69ffe1112c2913ef3244b47ebd4eb8e091c0dfba8759b496e498&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOEX6REZ%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIF9jBAX8HTW%2BoGP8N44RUvB3Pc%2F5KcCd28WaaYsvpOkEAiEAk8M03ypsJOWB0h7SeNqQ3gQ37%2FZAEXevCdpYxrXNuMsq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDNHMip1zq1pvvNI2MyrcA3gsTNQJJDJlvfe93n0SF1XmUDascVcaVSKPSMrYC%2Fejx5tFehJIM7hOw5JHVmkHOwDBhX1G631%2Fk4IUvBE01627tmXvROtmhznSNloaatTD36Eepes%2BADLXdBRwRS%2FwV%2BCnggfHqbgbgWbwrZMHuB5Pgxju4zuyt39nAfBvSdVf9ZdGV%2BixTDSOg6bzE1a9oTAB19OSCgSg5WFmDuAFnKbiL4XMosKo7g9kpKW%2BfcurPZnMD2Fro6CTBk1EwE6TpeRO7ZvOuFr47Y1KAQYAtiZTdBglwkB9%2BrraM2UIS22h8ug8cLh0Ia0NRb9B0uott38ycCYduteiCZcGlVk%2FecxtZ0fZoyjm4u7YupIYLn7I62n%2F7XJ0WRCXlhziHOWJ6YYComhkAL6qlu1P53eHERH%2BjRq9tWvKkapHCP2CnIrzPyb%2F6e01c%2BpT5MlW8GQpgxZv9VDUlBNN%2F%2BWnqvYRkQ2GBHfAXExjrT8gl0kA14LJ2vVU9qezTT%2F0A8Crrt680cP29K%2Fiup6huBY0%2BQheXK1Iy0A9ybDMdE9VReF0FGJnjS4vztj3lV6ZNkh70DY1Oo6hXttxIiml0KWWhfcK3nRJDOu1W%2BWRTJQaC%2Bqaya82sx8NYWC6BupZOWgCMO3Y88kGOqUBIcD2S%2FoJemciZ39csBO%2BaWncQb6phxW5ABkFmW8vLMltHSQ26ZVuJbDKoFXqf%2BG4TqlhGxVp6BJnS3Hg1fS%2FP6oJchQmjfjq4yWBV8%2FLccBl0QDk1jqnHHnsftjOMD8zYPocof60bp7sYVIDfbEVJcyTgUzyYb8dozAmTnQCrW7PkEb%2FNxUzIss8GnasysxTx1IIfwUgbnZDHkDY28Ki7M%2Bl33Kt&X-Amz-Signature=34d5ddeda45211112e920565df0b6fa769c141159183620cb6d25d572043cc7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXR34END%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHOQ4IwvOPNjMqMr8opuBqvFQi%2B8cLU7Owho9%2BfOOFzBAiBxFtpd7yKP2xHuMvb80tamspphomiKX5dlzX0f%2BrCalCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMQ4U7OCl4CkzeUlvqKtwDEmaUVe3q9E5tDKObo0Z2dfPKckL9fXRMYZg0BpZ8fu01gUAIpnUMCXrfhsswX9bukQgRbrQkL3RCmLDNqRlDdPEigNA2zwMVFZMIeWjWuhtJrE71t1lEPD5nGSm52qc3RPt0uJ9J%2FXuCLTcinNdjnfjtGMvAhyQmJ5Bn4uyeBq97NMO%2FUZqJs1IcaUyDMuUPCbXbsKTGU91fuHiX4RFrqL5LJQ3g2A3%2FTAkux%2BanUD7eqoxOZZBt82sCeUzmL0aAVtU6feuOhiDifK%2F7i8b3jhNO6TWrYjK2nUiEQpa3ZIwaJUa2rZLsrUBezCF34uBpyPiU%2BrRSm%2B62wlkGHGW6Vbi2IK3hY830i2uLDRQFgQgnvstX1iwDoriP6TI4OKlm311z%2BjyRplZ1WK3fLDK4FsYYE772ruVeVFaHY1%2FGXN2Aq5WPtYrNaf6kTT%2F2flhytpa9%2FnKhQClb49HmUN%2FnJMXcunLtDtWsdwrRDUzr2yDAE%2Bsdsi0paDNMJs6D8cvLi0Fite55hKe%2FLwMCLO2MPMrqL%2BFfvtuSi3kZElN3mxtOzueIW85g7633pC%2F0MVUa337FiY99%2BgQ%2Bc5omUilRrrYR1Z5fp0ERdNhMQPhPz%2FQqd44uxwlh%2FENx9yww9NjzyQY6pgHVbmpkOqrQvZKFAfsDxVKedcDU%2B5hCkBeQaXx%2BMUrWTC9%2FR%2BiAupgS5T6w849qYip9G%2FYwmu%2FyaKY2O9rx7W8ALkv4lhGd4cjsPV1GKF6QxC67x%2FitsLXjreMOuBiFYcl2f%2FXoqI8Xz528sYIhKJT8CA4k6NtMHRlNAh%2FPV86KjO2cgku6Ht25cfCej4HlolVMb3qPs8RsQKtMOjS9pulnI3JQOhvI&X-Amz-Signature=a31c893f5a948e79672628953d45e0ca770a1b6c7dc2a9b50e00636af864489e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZARAZZFH%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIAS%2B1AXRKY7kdo3RbZjoI5EeqmXp33f1kSZP6LyNGcxVAiEA0cM%2B50HVoGQchNCzJoYFgSsbojAO1x64h0%2BwsJyY3i8q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDLFOCF9hyQVQUGxEECrcA2NoFtFqlDRfLbcXC5elI9Q0zsVYrrrA49lyFSDi0Tx1M6SHl8%2BZWnhHa4l6GDWbhlIvmeEhB022ZAw1dxv7gKx%2FopaOXeggVMM%2F1iHKiT%2B01Z7Csl37PAn2RbOTduPMF508V6uONR8BECoceOZYiSOdMioi2l4%2BNvoTUhea51NZrIDa5cGXoW8pvKXgALSlEjTqTfJDv%2BJHgJNhQK3pIzsWyHK3h%2ByCuaEESXswMoeEdkc%2FK9C6hrXxk7TYXAiDO3DLtInQ%2FCLZF7jycB%2B6D8mYKdQDupzicg3CNvCPzQzVFZjYyYtXrN205gjK5uLQL%2Btw8nS2r4BCJ5HXPMB%2Bf8s2th4%2BlpOpXrUrwvSlAkRh%2B9EcwciqCWDgmEzAWGXaU%2Fghsl%2BSPSiQ6tJWWWjY8dxoqj46%2B11fKvh%2Fr05TibLP49DVw0QfjLSA16m%2FbTHMxBqeJPO%2FGkn6o1TCxJ0DuBpH4p%2BQncLLDrk7b0iLCJ1zZtMAsHVG5rX9sWtp2wEortvX0Uw%2FU%2FDOsgNCn9tXJUb9knbIjevJXbL3N%2FoCQxV5CDJtqvNyTUwDSr%2FQjP7l8ojk8B9%2BHf2D0pIkYsuNyeG%2FJDzczmrM1pCcS5zX5x4%2BzMsel1ujjTbctVQAMMTY88kGOqUBc2O0Ov4XJc%2FqAlMRiIs1JQrzB74WzZqcDBnHINSYDBloqa1u3ubQyAmhvMQW2AuhLCJD9KBmwiu28RZUo8a1jCC02zlXa8i0B0FFzZVAJ1a%2FdHXtVeMyQZym%2BngC%2FY5JDtJMb1tgPPCG1%2B62tlVigHORf0SzT%2F3aJxc6QxURzo7ObI00QdsZNEt5cYODX%2Fm8PWdjWa0qvna3yDlGXdYiuecfQU6d&X-Amz-Signature=9311fa3e5e3e583e928e3fe2d8d7e6b80c41a7cd42e4ba83ea9a946d5fbbd50a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZARAZZFH%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIAS%2B1AXRKY7kdo3RbZjoI5EeqmXp33f1kSZP6LyNGcxVAiEA0cM%2B50HVoGQchNCzJoYFgSsbojAO1x64h0%2BwsJyY3i8q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDLFOCF9hyQVQUGxEECrcA2NoFtFqlDRfLbcXC5elI9Q0zsVYrrrA49lyFSDi0Tx1M6SHl8%2BZWnhHa4l6GDWbhlIvmeEhB022ZAw1dxv7gKx%2FopaOXeggVMM%2F1iHKiT%2B01Z7Csl37PAn2RbOTduPMF508V6uONR8BECoceOZYiSOdMioi2l4%2BNvoTUhea51NZrIDa5cGXoW8pvKXgALSlEjTqTfJDv%2BJHgJNhQK3pIzsWyHK3h%2ByCuaEESXswMoeEdkc%2FK9C6hrXxk7TYXAiDO3DLtInQ%2FCLZF7jycB%2B6D8mYKdQDupzicg3CNvCPzQzVFZjYyYtXrN205gjK5uLQL%2Btw8nS2r4BCJ5HXPMB%2Bf8s2th4%2BlpOpXrUrwvSlAkRh%2B9EcwciqCWDgmEzAWGXaU%2Fghsl%2BSPSiQ6tJWWWjY8dxoqj46%2B11fKvh%2Fr05TibLP49DVw0QfjLSA16m%2FbTHMxBqeJPO%2FGkn6o1TCxJ0DuBpH4p%2BQncLLDrk7b0iLCJ1zZtMAsHVG5rX9sWtp2wEortvX0Uw%2FU%2FDOsgNCn9tXJUb9knbIjevJXbL3N%2FoCQxV5CDJtqvNyTUwDSr%2FQjP7l8ojk8B9%2BHf2D0pIkYsuNyeG%2FJDzczmrM1pCcS5zX5x4%2BzMsel1ujjTbctVQAMMTY88kGOqUBc2O0Ov4XJc%2FqAlMRiIs1JQrzB74WzZqcDBnHINSYDBloqa1u3ubQyAmhvMQW2AuhLCJD9KBmwiu28RZUo8a1jCC02zlXa8i0B0FFzZVAJ1a%2FdHXtVeMyQZym%2BngC%2FY5JDtJMb1tgPPCG1%2B62tlVigHORf0SzT%2F3aJxc6QxURzo7ObI00QdsZNEt5cYODX%2Fm8PWdjWa0qvna3yDlGXdYiuecfQU6d&X-Amz-Signature=9311fa3e5e3e583e928e3fe2d8d7e6b80c41a7cd42e4ba83ea9a946d5fbbd50a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ346TCF%2F20251213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251213T070114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCz2Ah%2Bq4z7mvMsRVTWvsNRMz6GMktcuob3I7%2Bp60pM8QIhAPQfft3jpjNalIJ2Lg5uraiWlfLQv2bRNBvXXmMMWnrVKv8DCBYQABoMNjM3NDIzMTgzODA1IgxxSGhB%2BTiqoa3E%2FFgq3AP835ePE8EM4Iwnz9wdJarXJyJS4VVYyIvb9pkBC84gXhPFgEUlnfYc7niKqI5LNKP8TuaYlSY8Xx6t2QNpisl1AOfSBjEhRkPFmSjq7BxJGJVDdNihVTkvr7omxAKG2OhguoU1bR5RboemprwJyKTjtNuzyL7TkFU8uJqkNFcHw3g2%2FhnOXXP3%2BW%2Bn2RRYupvM%2Bap%2F88Sw%2F2k10s4I%2BFo%2FhfUiqczsNjaGnd987dZVv%2Bv2WmzqUakYXaPRV4KwX8YOZeYxO4EOmloAo0YOGmYKpnJ%2BZz2FH6kk0H%2FVXEj8%2FTcOQJsqFvk6bkJM%2B39Aiu%2FsrEuMqZVAkVjSxpja7pGiKyNiBBM0xwYcdVjhvPky30no2tLWcoR3%2F6Rf1hbNtCQ%2Fr4L1o7Pgy0Vm7GyZTlgcqghf95Nnpelm0bxVYL6C9e5vJaQWAX9gi1Vlnil17QmzocpwvfE6FepLJHd03Zcnj%2BtUIV4dOneLa6Fpmt1KDCaAxbYdWwSWgkBS%2Fv4OMLxuCAfAxfCGg48ePlb7Uc%2FODM1lP0ADkdHKl1PQkByJGb4A5XtloYCBN30yVct%2FDvFjNVi%2B%2By6rVysbl2M1gIH9jPAFUpC6BdidP2DQuKukJXcOowcJF99Upv%2BKuzCF2fPJBjqkATSgKSX6zYQA%2BO6OyoTNBAufZ97wv5Abt6KaOu8p2Lwg4ReH0mwbEYnOu%2FSZ3byACeGJPuJPTXooW%2FKxYz36%2FWWSD3mxTxdh9VBWa2XQBn4X8JyZ%2BdTaaE7tE3JYWvYXj%2Fyok6yMjpjeOuJ2GCpurTtFMG5mdANHaoIFIDq4SLxpux%2BBZydzC9f92PYkRFxZxfe1WhV8uKQBB9HjJlJqPDQM59zW&X-Amz-Signature=496afbf263aa6d798d36190fcf25afa1a734387f22c3d1f857634b87dac49dc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

