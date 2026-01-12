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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMZN7KMX%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQCsCLAG8emwspfELwItoIeuw7ICvkVI4Meey3xdKHeTFAIhAJK2pEucLI%2B4raaXNMFyGDtqD%2Ffh8d0IVS8SNT7f%2B4ZjKogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxSCPEfLMxRIXs56TIq3AMc3PBhhWOzBf1C8WAyDBo6jofPyd1WgaaPBUdeO%2Fagzf484cH4gThotAVPrvtQapQacFbGI0BIdjx0BkcwObFjicDy2gn55RFMAPJHBZcL52ua9wd1E43FYdaGbG8s4fx5Y%2FlLcWhQ2bF683zfCIflEU%2FeSk1%2BLcagWFkV7kSOUU9Ye%2FFmnJ3MGf5RXUF2bhgTRb9lpNrw8h8SxfWcpFzRyK5xYqpWwu6oXiTWqqwKuLsneHPPsWmCVNJUcwJdBPSAkaS%2B3TBi0MwKRXNahnZ6Jps2dnFfIpOgj27wd9j9kMib%2F2RGWDF0YWt9oZWKYXJ98hLkh6fzfiOk0v2Evt1ijGdk0912NIJccaCln6qo805pPAxzrW2%2F51GdQhijpr2ZlemjZp8%2FrZm3HV5CgNzUHXWj9fRPnhPV7bTAP5pB66eQ59DI1toIUnCMIY1nPrLmgcYxo6KL9h2WiE8maw1RX3z9stGLxInFn9%2BionvdIxqBX%2FKtkN81t%2FQoIqZYuVr4rNguDxWeNh6SrXoRC2Pfstx5tFxUQsmFAaTA3A84ALPw1N28bpmFSLG1%2FydqiedMg7y7P7uoKuqCIbQZDl6nmOMIwMuSFfAdTW2k3i6pnBTVf%2BZtUjM0nZH7BTDI5ZDLBjqkAc5RctIxXs3VwgN7a%2B8zS8n%2B%2FVPa2pQ27WkuTr70dO7hzvwndNEFuljwkheQdjzahGuk4tqPWc0vzQxGRjM4QLSdlR%2Fu1dUqr908e9i5af5LAFpm9xtrj%2B9z0LDD%2Bq8Tyj60hAaCQkmV3jcYfd62jpwQtF2%2FE90WGKhtI6A4PngyeOLdd9g6bGIAGB92ELHM5BdNmB5PW8LKMG4mEjW9iM0Z8IP%2B&X-Amz-Signature=654a653ad14a041ca859f70c80c87c14902ae29f6495f43fff4939c150048794&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMZN7KMX%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQCsCLAG8emwspfELwItoIeuw7ICvkVI4Meey3xdKHeTFAIhAJK2pEucLI%2B4raaXNMFyGDtqD%2Ffh8d0IVS8SNT7f%2B4ZjKogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxSCPEfLMxRIXs56TIq3AMc3PBhhWOzBf1C8WAyDBo6jofPyd1WgaaPBUdeO%2Fagzf484cH4gThotAVPrvtQapQacFbGI0BIdjx0BkcwObFjicDy2gn55RFMAPJHBZcL52ua9wd1E43FYdaGbG8s4fx5Y%2FlLcWhQ2bF683zfCIflEU%2FeSk1%2BLcagWFkV7kSOUU9Ye%2FFmnJ3MGf5RXUF2bhgTRb9lpNrw8h8SxfWcpFzRyK5xYqpWwu6oXiTWqqwKuLsneHPPsWmCVNJUcwJdBPSAkaS%2B3TBi0MwKRXNahnZ6Jps2dnFfIpOgj27wd9j9kMib%2F2RGWDF0YWt9oZWKYXJ98hLkh6fzfiOk0v2Evt1ijGdk0912NIJccaCln6qo805pPAxzrW2%2F51GdQhijpr2ZlemjZp8%2FrZm3HV5CgNzUHXWj9fRPnhPV7bTAP5pB66eQ59DI1toIUnCMIY1nPrLmgcYxo6KL9h2WiE8maw1RX3z9stGLxInFn9%2BionvdIxqBX%2FKtkN81t%2FQoIqZYuVr4rNguDxWeNh6SrXoRC2Pfstx5tFxUQsmFAaTA3A84ALPw1N28bpmFSLG1%2FydqiedMg7y7P7uoKuqCIbQZDl6nmOMIwMuSFfAdTW2k3i6pnBTVf%2BZtUjM0nZH7BTDI5ZDLBjqkAc5RctIxXs3VwgN7a%2B8zS8n%2B%2FVPa2pQ27WkuTr70dO7hzvwndNEFuljwkheQdjzahGuk4tqPWc0vzQxGRjM4QLSdlR%2Fu1dUqr908e9i5af5LAFpm9xtrj%2B9z0LDD%2Bq8Tyj60hAaCQkmV3jcYfd62jpwQtF2%2FE90WGKhtI6A4PngyeOLdd9g6bGIAGB92ELHM5BdNmB5PW8LKMG4mEjW9iM0Z8IP%2B&X-Amz-Signature=654a653ad14a041ca859f70c80c87c14902ae29f6495f43fff4939c150048794&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVO7YIJ2%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCIHrvu%2Bdf6rf5MYzyybNjwXD1WfGNx3Pk4IrGGuQr53GaAiEA5BsyyMnRHEEwjDBeF5NLnowWpUmH4t1meULULHS4vIwqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLEuYRAdAIYaWr7%2FRSrcA2dcn5BlhTC4W846ZQi5x%2FLr6TovfWGKBnAevx460nJq9Fw1MX4zazHij%2FiaMXwdsp7gwegg5dPW5buJDp5HM6QvRYJVEkCKo79W5cRlcMYCbNejrJrOQH7pvqr3jR7IUdYiLyO%2FvXwECKkm30PyW2w6t74W6dWpP1NIU8UufOu5Rz2qGjqG7enRkcp29Al%2BVD%2BAi5XXCdUhJmFWgph6N07vvuAB1TEftqVdNkzELufyfNn15YhnkPo2x9qJcBqSeamKaRN8P6h08RNFuDWjcifUCuoovYeHybbUEwXCL7tQYCYKndHVfwOxgLFkrp2bElAt%2B7AUmeJRbTRRnBHCWJt%2BGuv8OKFSvl36UsQWSV3FBIYGVydNmaUIgQdTSEzNEys3jpPOcGthxR4Z1nTlsLO1KyxE4jjHcN3HXxQ02tvoew%2FJi6YuE754xv6N2CS93I%2FnV%2FoquZ4%2FlL3EOF00Y9cZprmThI9mfqEOS3gbwBgkkTCe1nF93Cf1S9waWrXKO3%2BNZ8%2BbZV4%2B5NUkFnWCSHAA%2B4F6niVjM%2Bf68K4Y0O97U2GzUxZxXVWWjtFj7lc3z3Z7HmAfB3GKReX2g3YrgecY%2FPMdlOoybq04mfHRolwbrcfPS48h%2FPW8l9MwMMjkkMsGOqUBZ0kDVLo0ClibCbVpwgZIAwmnshGBL3A8X9q2ouX6xly5B0ZGFhYNKqI%2FVXSMfPzrdM4CeBDrhYFAEfGC6MZR4B%2FQP0uz%2BxSDesfJoTNHIvIO8OZCSh14tnJY1AmAtpxAbbtlahPDIeus%2BVRFIz2ub0qRfDzFCCaVUFWjVD6jG1iCv3sUvlO4KlYQU%2FGQ5mpTH72fx1szCszdvl1%2FiDkb3ZcuLXAK&X-Amz-Signature=24c83b0b64ce68866d2745dab23acd23a86149b79fe9d30302d8f421edb83e8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVBPQVNV%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCIQD2czbny%2BUErsjTLZyPRIwJK3gWuRHULMvFe1yvYGyeoQIgAZILkuN5kISJkhv9jE4Ex6vf41v%2BwkkEFx5w1obgGOMqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPphGKw6Ge57hEgm9ircA62MYxgyCe1pyuUzE%2Bst7aGeBmeLC6iLYWfZfZHD7qqGF%2BocaOquqoWdSo3e8nz4lwY%2F80e8itkfEFc7Rc77Gr4ETl9UITH1IZOBPAUGxng6dMbeG7izwby05nDusqo%2BHs9NtpWU5OSGQ3XRZZf%2FA8SnvQpgwg4Uz19O5n7IwuynO%2FBYNq8t9SBsB%2Ff6zll1uzocGBN7isgObAKiU00KhVO0QMShhKtnsTUC5hhvSqT4azzp4iSl%2BJb8byciCV9RqgTm%2FKm0RKBLx0w7V4%2B%2B1uvkJc78j%2Br%2FUy1GqAaQTGSfz4DaFuDOWoLyhMv838%2B%2B3d4L1XjUSww%2BSzlt3zb3E2n1yWDyJuw0mmw9tccyDnPC9ynETWXYqeYHxdXgbEaa%2BNwTm7bCqYfE1YA5Mlw4MipNwCnxQ8nh%2F%2F9B4ULDcphkDcoegsLlVbHepwOR8TyrK79cdvRZmuh1urwXayVjfTW1OcH7HuP3OieMC0pZQDEePKOjb3aQRzmYg0YfIIzRFzCb6jyf4ZByCQKc8rTwnEXMHp%2Byrgil6uYDeWexGnwEMu3fiYsN4mPZ9dHbefYXvXRHZlgWZDPR3RFuX0WDcsnDgJGT8qz%2BBmXA443a%2Fda5BCiWGT0dKCClnZwxMIXlkMsGOqUBkk9MT2WdcqxrB0%2FMD3t7a6lCB5lC3Sxl01LyVTLOIGQatik4M6sUQp1YtlBPjlcZp%2F5132uoSNPTWxtDiz6W2r1jyyrVdSQRfQ%2F1Hu1w1REgrWmXfjhPyil%2FGAOgLiJ1qWAPt%2BC9wxNkWvEMqb6%2FP52N89ybZ5CBBmPoaDk%2Bt8dR9Br5OEVZ1Lnwrz%2FBUJ1XNJnNVbIne%2FQnTR699V99I6D2ruBJ&X-Amz-Signature=9401bfcac951363c2fcc562604b69fbdb56d917c5e25e7c0caff70cb87118f64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVBPQVNV%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCIQD2czbny%2BUErsjTLZyPRIwJK3gWuRHULMvFe1yvYGyeoQIgAZILkuN5kISJkhv9jE4Ex6vf41v%2BwkkEFx5w1obgGOMqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPphGKw6Ge57hEgm9ircA62MYxgyCe1pyuUzE%2Bst7aGeBmeLC6iLYWfZfZHD7qqGF%2BocaOquqoWdSo3e8nz4lwY%2F80e8itkfEFc7Rc77Gr4ETl9UITH1IZOBPAUGxng6dMbeG7izwby05nDusqo%2BHs9NtpWU5OSGQ3XRZZf%2FA8SnvQpgwg4Uz19O5n7IwuynO%2FBYNq8t9SBsB%2Ff6zll1uzocGBN7isgObAKiU00KhVO0QMShhKtnsTUC5hhvSqT4azzp4iSl%2BJb8byciCV9RqgTm%2FKm0RKBLx0w7V4%2B%2B1uvkJc78j%2Br%2FUy1GqAaQTGSfz4DaFuDOWoLyhMv838%2B%2B3d4L1XjUSww%2BSzlt3zb3E2n1yWDyJuw0mmw9tccyDnPC9ynETWXYqeYHxdXgbEaa%2BNwTm7bCqYfE1YA5Mlw4MipNwCnxQ8nh%2F%2F9B4ULDcphkDcoegsLlVbHepwOR8TyrK79cdvRZmuh1urwXayVjfTW1OcH7HuP3OieMC0pZQDEePKOjb3aQRzmYg0YfIIzRFzCb6jyf4ZByCQKc8rTwnEXMHp%2Byrgil6uYDeWexGnwEMu3fiYsN4mPZ9dHbefYXvXRHZlgWZDPR3RFuX0WDcsnDgJGT8qz%2BBmXA443a%2Fda5BCiWGT0dKCClnZwxMIXlkMsGOqUBkk9MT2WdcqxrB0%2FMD3t7a6lCB5lC3Sxl01LyVTLOIGQatik4M6sUQp1YtlBPjlcZp%2F5132uoSNPTWxtDiz6W2r1jyyrVdSQRfQ%2F1Hu1w1REgrWmXfjhPyil%2FGAOgLiJ1qWAPt%2BC9wxNkWvEMqb6%2FP52N89ybZ5CBBmPoaDk%2Bt8dR9Br5OEVZ1Lnwrz%2FBUJ1XNJnNVbIne%2FQnTR699V99I6D2ruBJ&X-Amz-Signature=573c5d16e1fc116f31555af26027958d2541ab4438447d45e7225311dbeceea7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FPU3HQL%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCIHeNOzntcWlkGb8UYFqtsftWpaNeYjsnaJ%2Be8ua2zI0rAiEApp4meX9NTcC5CVmSQwImArKYae%2Bbrb77eZMptdLMTTwqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMPShIhOJ2Gnt9HflSrcAypJf9JC%2B6Oc9%2BJpnfOVJHiz3lALGlM3UmfrtAZ%2FLvzKiIPmnhp11jxbYeMKirsPH1%2B5UNxMRR%2B1NW2e0RDoRsANtpKhCgHF4R6%2FBpaux8wHWHkiWD0FR7j5y1QFH%2BIWRy5HTYJAYANSZAXLD408xvF2YUN%2BcKf8RPmEWhALm%2FCJ1NE0nJItcraEjqADjalS0%2FRXEMWuoAuClNlpLHqZHgMELfvKELEqLVGlNuPjMrHPEPYEoPPPDgAIK0cbFwArC7iZiNSzybw18zaEgAJGYmePx2nmkN1TmbLIUn%2BIUoqNJpS%2F%2BlBM7juUT3ks9hVOmerqJkeMAsS2AZY%2BTSyoZLyVy0kE4U1fimBRE32q%2FfHo1RWaIl54Dk9jU8Ox4e4yRG%2Bk4TiHGe%2FwzHeqHtHdMTtRa4fq9pg6ewI6%2FxdOn8zxitkOLJodnNg6GfN9RWfbc7qu45LNMAkf7FytKBbLr4hYJVPXtQn9lVz1R%2FhvM14v73yG22cYNe3aKh16SEC7DAen2owZj2f4Ll55mf2a2M2RMss87Caubc8feY9ZzW25FgCVaqt27ldxDG7lRYOO3FPoCMTzgjETq7Yfz7gmjiJjdiNez9vMFYtwsNhDJ4Bf6V5OhXbZQXPN5AMGMJ7lkMsGOqUB6GLf1tigSXSJPtID6sJ5dBpResNwg4u%2Fu4Vure%2FbcYqgNXiazrXty%2BnrY88MoiBjvOTai3lhDDgqMef8ajyySDv48MNLVBikj3DMKeQxqTuI4FIwov6%2BU1JBEU6DJYT0%2F4zzvUeKWstsobAbTutAGVZaO%2BvGjw0IYRtVUKud0yAw3cXTK61gmTaPipKAB0AG4J329BY0vF%2FkaSnULxAmISg2PCRf&X-Amz-Signature=cf2d787d6d98da34cd12d543d53b963a74c404c8e0bee62408ac2d4182f423ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JU6FWGY%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQDW%2BIz6%2BLFST7SdGV7iveweBMrowh1htullKcpLH1eGigIhAKjTDkuRmxEVBXIrjyQlmOM7jDn07Nq0T%2FU%2FxeFt1ziLKogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwUDdTDSKtyATV7U7gq3APRFT94wysa6kUp0Xdab%2BSRKfgZ6VXH8DsfPjoTfNtmUGcFZc%2BbtcmGLeKT1wvM24WD88laDOTj4QzLSlC7jrCwuDGTpyB2scG7knY42t3ae1C3Sxd57swDGpvKQRZ7Zd7s682zFmzpcDFwMtn8vCr9r38Sn%2Be3R%2BoeFzjCzSClfysK%2F791oLwFTskpHpjfVzUtAJAsgh1%2BEphD9NnxJLLg%2BBTh6SnFilhH238ee0F7WPfrQhrGwuRXJ4AMjUoExK%2B7IhOFlLuh7TvAWeYlGqcVLqLxNodaRaz%2FFCMC9IA3xD5wTNKd5V5EQblL%2FzBf42C%2BEvvOL47Nbyq6K2txw99Us7NL0Xmmxb5Z2B8aju5A8Jantl08okaZm0QUye4J7lH2gbeZPXRRMuLcj%2FxhJ75OApMQ4NiQcdMEi%2Fnhw1gQioKFJVbm86g%2BXUJDGkhSzz8NPDg7tkPi6h45BI2K%2BBesIzJ13qOuvuGj7Yw7%2BOT6jlnKZocuMB9IT1QFaXxVwx%2B3aTz16to%2FttU03SKcJjSMo3QKhJ1WAktUHGRqBbBhh1fHNLGXSH2lK3dppQZddtVjP46RZkywZhdIWpV8KotGrZ1yKw8spxAFUQJqQX%2FT4hI4NlsBCcNDCcvAyTCN5ZDLBjqkAZ5zjHSVo6qBpGkxX75Vn7%2BnS1BmAExe%2BmaV6BIeh%2B3%2FWFTQoLzPrZb2uPnb6GZtwtDMLUAOGbuecMbuil1DaIL1dWswLLY%2FQ0AkCgbTpks5eOxL8fGq1QxwrGvSokuw0jUnaUe6l3mOcXKoeQvlDw1QoqfQ8RSaCL4JUXMjZyUKvVu%2B1MhuirNP5RlMJGKGH6bgpViLeSBXT6tM75kEXE%2F4I%2FVZ&X-Amz-Signature=f61bc4d259bcd30d8501582ddd61212264b1684e182372d09c73ded3119c7dbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNBAWY2Z%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCID55LF5UnUWNVlIMtKeOQbflODLrctFVFnOe%2F07XE54sAiEA1eK32LVdhrV%2BdthYnkdhHAJtVPd4jgtF65CkVXeMNSkqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDca1XFsdSGaJBd2SircA011%2FWa88Fh8%2F6enUX2rw8r3UAF6T6Et6BsRcTZliaj6cSdE15%2BdBc%2BPEttYxZGELyystE0x0E%2B9mOkYd6KGZ5gJHfbs4lPgMVmfFi%2Fmy4j5bxUpXdeIXZUv%2BgRY7Of6Eix6GfAZNMDSnK5X120akwMEp0aj8vC5o2baDUHkU%2BAZ8r8Z9Ct8Fo0R%2Fl2jodoltbghMubemd98AwU0D9ozeyoVv0UTEIByhf5hISAl0PxstPs%2BCYW0gQDm%2FHqbORV0jcYMxCZ6lp01OywgmB4szMXqhhagamY5s10IxfWFWIU3cwJFBipsqIqQInzb9HZas8qUYPsQwUW44y40LLs6IxgUEUV8thL1BY6EqCYADn3xMch7i72hUeujkNIFOHOS%2BN0pPGlS6gRyPKgggz3sPYaBaDq%2Beq8etfRrW3FyZxJtdDivUDliymhxBmnJsp0aij4%2Bq84CcIXpFRx%2BE1wlNNXorabxuma6G%2BbpeLtCymXGtMyOoZg3wYDqPRXiQqPhLM%2FqDgptk5cDG4SOZqB5p4ZIf4a%2B31xWK0IuDsTUu2eZuvkKjCeF9ZX30UZqWeut7arzwirfPwDRoes9o31fX%2F23dt%2FGVqt8fVuvy0gy2RjmOCeY3z3QzL1T4bxhMKDlkMsGOqUB3JxB9F%2B1ll1rrowDY41gm0mbj2LgaKXYvajoC%2F9%2Fulv7XDzW0m9Vi206lFSiJ5mZ2ZSyxZ6GB1bAX9be9k6AZfeLR2US9MH7TyNwmJ6t4HNzdOza93uB7SX5RLUg8wAX%2ByuMSROXzjdWr0GdDcm4GRwPJPy033RsRGas3j9tfnjAT9sr01wf%2F9OWvPqJoXbIHLgMAW3%2BOnOyKLjdKS2cWrWwlyzu&X-Amz-Signature=f075bdc17692ccb5c8da0bcf57201122638329c1b03bcf8d0077b274527308f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TH3XF5R3%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJGMEQCIC72FrEG2t3Bg0maR6JGowA%2FygLPl0nVPk%2FH628IRX%2BsAiA4hEbekUWUtJbJpAqw8ft7BCZq40m6%2Fvy8SkzMXEyxlSqIBAjh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqchW1yKzwvEo%2BaWaKtwDGp6Z5JVzNoY31pLQml95XQ3pTIUWjofFEifTkh8cqg4Fkj2Vp8OnjECtHiwfm4w3YY6%2FdiSPnreqbIVt%2F4PQD6u3Q%2B14NWshJCBceI1iadujuLGM3fjXj0sYXZtoVrHJn1tONDy%2BbbsZneJLcI2c95P6ZquHf0ad560c1Z5QpMnIT3aXtrv6jqn8FdnfMc4wl4qyr%2F1Tf9NXcqR8c13OlN7Q11KMPEVTBWcvcRVhqwrWAI6y8Ciau1D47Obm9NdA87HNpTlHT3vLftPezRCFrXa5N53XqAp2%2Fic0p7JlhHg%2BbIofJmtGzoZzvkO2s8ZZf7pebTepsxIcjDHFdaqNarQhE354EM2sJcb%2FzW0s6UgWEa%2FA0xaN7Q1X6LAXYH97Ti3%2BKLFuE2wnCDyQZW5l5UMXugKirauBNuusBZubumjQ5om%2FzB%2B3wlqDvtmVnbOg%2BKSpN1rhIMzgQz6ES6uNK0gWWedWAese10iK6iLSQxrSJdTDIS1ADD1Nd4mEghLFsmhZtfH%2FDVvArH5udjH1GkCEBwUEvPQMxa4YJ6Enqa1p9eimDFhQE%2Fxz3AL%2FIB4om3KTPGQuA8UeH4Sz%2BMbjaCpAJKIIOafHMq4BLdcAXsNmkVWZv5XdGomzilAwvOWQywY6pgGSQeTPxuXcnPZLzjqoc%2F1TtnwVK1lzYuQrs6wOeFOJComjuugT%2BbwFZIMFb7F7E6pnedI9hDWaMxJsldTHDbUZ8yzMgNPvJ1USJLCkuIPheRg9424WufbVUhPOSz4g4gRPkVCfopLJXVB53YvHNk%2BEZo%2BF5oRLine7JRpK8qMugpIXmm0XXFbTKAJZmv146J9Cmf0JRkIn3JEyMXKPC33niQxYjYvo&X-Amz-Signature=01c3eb641d284681c5aa750e817ed40e4cc5f8e93b15a1dcecfb80b8ccb5fa25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TH3XF5R3%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJGMEQCIC72FrEG2t3Bg0maR6JGowA%2FygLPl0nVPk%2FH628IRX%2BsAiA4hEbekUWUtJbJpAqw8ft7BCZq40m6%2Fvy8SkzMXEyxlSqIBAjh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqchW1yKzwvEo%2BaWaKtwDGp6Z5JVzNoY31pLQml95XQ3pTIUWjofFEifTkh8cqg4Fkj2Vp8OnjECtHiwfm4w3YY6%2FdiSPnreqbIVt%2F4PQD6u3Q%2B14NWshJCBceI1iadujuLGM3fjXj0sYXZtoVrHJn1tONDy%2BbbsZneJLcI2c95P6ZquHf0ad560c1Z5QpMnIT3aXtrv6jqn8FdnfMc4wl4qyr%2F1Tf9NXcqR8c13OlN7Q11KMPEVTBWcvcRVhqwrWAI6y8Ciau1D47Obm9NdA87HNpTlHT3vLftPezRCFrXa5N53XqAp2%2Fic0p7JlhHg%2BbIofJmtGzoZzvkO2s8ZZf7pebTepsxIcjDHFdaqNarQhE354EM2sJcb%2FzW0s6UgWEa%2FA0xaN7Q1X6LAXYH97Ti3%2BKLFuE2wnCDyQZW5l5UMXugKirauBNuusBZubumjQ5om%2FzB%2B3wlqDvtmVnbOg%2BKSpN1rhIMzgQz6ES6uNK0gWWedWAese10iK6iLSQxrSJdTDIS1ADD1Nd4mEghLFsmhZtfH%2FDVvArH5udjH1GkCEBwUEvPQMxa4YJ6Enqa1p9eimDFhQE%2Fxz3AL%2FIB4om3KTPGQuA8UeH4Sz%2BMbjaCpAJKIIOafHMq4BLdcAXsNmkVWZv5XdGomzilAwvOWQywY6pgGSQeTPxuXcnPZLzjqoc%2F1TtnwVK1lzYuQrs6wOeFOJComjuugT%2BbwFZIMFb7F7E6pnedI9hDWaMxJsldTHDbUZ8yzMgNPvJ1USJLCkuIPheRg9424WufbVUhPOSz4g4gRPkVCfopLJXVB53YvHNk%2BEZo%2BF5oRLine7JRpK8qMugpIXmm0XXFbTKAJZmv146J9Cmf0JRkIn3JEyMXKPC33niQxYjYvo&X-Amz-Signature=4a8cf2299dd4272cb27edab18cbc01c56748c3a70080c8832be8b57931b0cf7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNFCWXMK%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQCIsBj%2BUrkVvLzmXOX2g0ApjVUiBSftUDqAj%2BCOegilMgIhAIsiXs94vroZFA9pvj16q3HBgmBbS4X1CMBo27bapzVxKogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwJK7KeNXBVPdHh39Eq3ANG2yv0F0RmhrGwqoyBaPGNIfbQ46TWmgmZHT3vA0%2BG4U2LrzjjKrJlLfLl3j4CiMFaOOxkEtRMMb6O0EZrtZaxKsGeGAZ1%2Fbt7RYWCiGkkw1CsvgQcVFHjIRpyhJpAsf9vq31sFm4ZY%2FXLNCDtkuV4zx5%2B%2Fr2HSSswWo5iHzrPkHbGss2SkVaiqKBUISaQxTRDGYr%2FgKQ9Beg9qWOKbaCraT5vS17ByJqjGw7Zgl0VmjBh%2Fd5Y%2FgRvpkbjVgW1LnjY1nqHCkNWHpOTy6Xsp84tLLNT5BU38WeC04Yvc%2Bnk0RUvEnRwLs3xJJE9KlaV06OduPAdN%2BO8hTQ5xRQF6vs%2FoyxwGpxUolD6U4KbjqIfP75itmuUX0ArLtjRPIzO%2B1jcCquOySkWfddatI36TtN8%2BfaUopmwJPDOaPPba%2FL%2BbvQIuX034c3xt4UKcX2HzHeF94T3aG9aRS9TrrGhcp28oxwFOKG3npLgmoNGqpWTh4u%2Fjl51o1XEs86tImELDahaUof%2F9JlvmfJpXPLEvt%2FutFQwfDQ%2Ffk%2B7IAlzKisggmAyv9vwBspfqQsb%2B7uCbgbAbyjTl1rfENnMDyoj01%2FyWym0M7jnTmUiC2qnqnoEOtGT%2B8mvuQ7WJHmfuzCs5ZDLBjqkAWGoyU3Ux%2BQy5RT5igQCLoWhvey%2FJw2jla41lF%2BMNFyDeZGNWbCkNVBkjmRQi3wh9sIoiUvz3ZICFkTRCmt9SKhdvqRBSF%2BjExmlYpyzx6cj%2F%2FGb6J8cSjxpS7pxhGSHJ8Q9w%2F11yq1s3ieCL0rHXDBhpuKXS7uZVg%2B5At0MNsYXz5oMaICFWAl5IPhcnmMXmG3bhKYZfrTg8K%2BtNQ395sQWr9GX&X-Amz-Signature=cabf6724d8b8d6b3d115909a899561d091668fe6ba91802a5aa8cb3daf87cba2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D5MAJF3%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQDcfvGKsuWtE29Zra%2FPED4NR4x1D%2Bv9pOC9GUXwR7OIQQIhANQYZrU4oWpZanhmCjdNhTts5Gfa6t1Jq8hApgNCyxz7KogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy74jsqSlmrT7cYB3gq3AMqz%2BnC5HhSXwFvnhK9dD3ogY2PIBe%2FSyL73J%2B4jV6kA3HU5l%2FIkd7271jBITKKPLrQaHY6HMMvQJIxLcOBMcXslBd7lu4SiYefQGlCDtWW%2F0no4fvrp2UvQvPWD40XoGvwKWfiNwuY9G3K0RwKhelKePsN3fwYJjCTM7Sor0V7HN2YEikeNdC7ebplBGQE4cVcl0tlOQlkQtLVhqZvh%2B3Xrdd9VCDMAbIIr%2BDoVhv73BQf3VoUQnlm2PhTH60YkANGKjUXL2AAtKkRN%2F2SYBEfZR3ymq7YohnVHdIOjQQbWqJuQW8SEHQdgRXGOa7Qcy1sNyeiEDxy1XI31xeqSU%2Fji6PMXRr2o4NFfZmfWkAmIwGNKM1RJo%2BLcgM8SPAS1koxl9SQcJe8I5ZMEsjyg4vYaQUCgjx5hcz2zqMGaaTOhjdvNfTWZv2MMbAalrYbNDjTxu4%2FcrKFpZHxBbJFCBnfRsp0pNeXsvWDzo6zAVLWxeMIQGTQaz8Yy5KAd%2F9jIUSYPSJtRj4HU5pa9t%2F2vJ1MeXZwZ%2BsFeRL%2FUzIPiEwtIY%2BOjRLd479YYFvMUqKVtm88%2BpkevLc1ZAx3u5slxoP747gM%2BEx3rtqyC6el1fj2w%2FAv528NSCriWe8XLTC65ZDLBjqkAfDMvjdbNDvLVTEo9G5zN7abyXfGgZDMKv%2FjM9hCo3aRrk4wSP7RB7Gn5uKuZMjFQPHuiH%2FYEQyD8SUhnGHcFuy5Grp5afYWL11DGUb3Cr9lqUL2ZBlWtQHb4%2FaSciFP1o1507kKFvU1IQDf0XItvFqxkmln6XXoiCn0S48vOZ97XInJOLbcDqDhaZfZLA%2F4lBMXmd7%2BxvDjF6QdcwyHlPw00XbB&X-Amz-Signature=6d1f6834e88fd11b057e77bc308bf0c416329bbae055b2b2d7cf26765620f40f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D5MAJF3%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJIMEYCIQDcfvGKsuWtE29Zra%2FPED4NR4x1D%2Bv9pOC9GUXwR7OIQQIhANQYZrU4oWpZanhmCjdNhTts5Gfa6t1Jq8hApgNCyxz7KogECOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy74jsqSlmrT7cYB3gq3AMqz%2BnC5HhSXwFvnhK9dD3ogY2PIBe%2FSyL73J%2B4jV6kA3HU5l%2FIkd7271jBITKKPLrQaHY6HMMvQJIxLcOBMcXslBd7lu4SiYefQGlCDtWW%2F0no4fvrp2UvQvPWD40XoGvwKWfiNwuY9G3K0RwKhelKePsN3fwYJjCTM7Sor0V7HN2YEikeNdC7ebplBGQE4cVcl0tlOQlkQtLVhqZvh%2B3Xrdd9VCDMAbIIr%2BDoVhv73BQf3VoUQnlm2PhTH60YkANGKjUXL2AAtKkRN%2F2SYBEfZR3ymq7YohnVHdIOjQQbWqJuQW8SEHQdgRXGOa7Qcy1sNyeiEDxy1XI31xeqSU%2Fji6PMXRr2o4NFfZmfWkAmIwGNKM1RJo%2BLcgM8SPAS1koxl9SQcJe8I5ZMEsjyg4vYaQUCgjx5hcz2zqMGaaTOhjdvNfTWZv2MMbAalrYbNDjTxu4%2FcrKFpZHxBbJFCBnfRsp0pNeXsvWDzo6zAVLWxeMIQGTQaz8Yy5KAd%2F9jIUSYPSJtRj4HU5pa9t%2F2vJ1MeXZwZ%2BsFeRL%2FUzIPiEwtIY%2BOjRLd479YYFvMUqKVtm88%2BpkevLc1ZAx3u5slxoP747gM%2BEx3rtqyC6el1fj2w%2FAv528NSCriWe8XLTC65ZDLBjqkAfDMvjdbNDvLVTEo9G5zN7abyXfGgZDMKv%2FjM9hCo3aRrk4wSP7RB7Gn5uKuZMjFQPHuiH%2FYEQyD8SUhnGHcFuy5Grp5afYWL11DGUb3Cr9lqUL2ZBlWtQHb4%2FaSciFP1o1507kKFvU1IQDf0XItvFqxkmln6XXoiCn0S48vOZ97XInJOLbcDqDhaZfZLA%2F4lBMXmd7%2BxvDjF6QdcwyHlPw00XbB&X-Amz-Signature=6d1f6834e88fd11b057e77bc308bf0c416329bbae055b2b2d7cf26765620f40f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVNK7CC7%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T004730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMiJHMEUCIQCSryPbZ47mOwyBQ3P3G9c6hJoqfd99KjWQSlQv7JyzHQIgdht4x%2BSCnsKqj%2BoYYFyde%2BDcO40nKQK41dDVFcQPxDQqiAQI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKMbyQR9830QTH0O8yrcA2feCQukcgKsa1Ur1APY7NF1ZED3jNxD3I%2F0dG3DSe%2BC3GYX8YygUMGWWbscGVbODGz166q%2FjOHrD83F%2B29RC8IgQpULzk6sNEXIMo%2B8ENHQx22xUpNI%2Fk4J1c7vpeP30Sinv4ZnN%2B31IxcOcK77kjqOxj6Ym96FS%2ByXUcE9hMsvPmXlpZJzGCkMMGYpJYygGh3BHSN5fR4WHZNuVvZCR7gi8%2FFSnM9Wl1GJA7xbeJviSYVyThrnfVpD5wg9ic%2Fn3BlJiWvpVCAeS6OI6AlLc7KE0DfX3q%2F80ICnzmq0UOqu6fbnybiVICRPbZJxWqMgYkaXbJG6SVGC8099l%2BLkFDgFJBt6VpdzqNb5YRlDC47Exdlv5WKeZHidGPps9EWl3oIQQkJrsd%2BfD4rvAe85uoynx1cjxxfaPsM%2FXlM54yi5VBoD18FvqecxXS2Vl%2BltMknSCNBk%2FQ0YD0wb9jCOA7qaS5LoSFqrFO4rbkDgLT%2FNy64FjcVSxSamxkcV4BRpDzuZQPAEW1XtL6sgGFMuBr3JpWB9zrue03h%2FN2EkpRxaQd8dYb0K4ThBP1XIdyF30AmPi4jNcO11ZN8M9aHWa1yE1T0qzAIgKWOpIUFYar1OA%2F7%2Bgx7SciW5rqc9MNnkkMsGOqUBOhUjYEqOWRZKZX%2FY%2Fh16UnSjXdKgKTva%2FTUJdT3mCdP6eYzO2CCGFKRCqlNRpN8dcynn6ihQRSucSdZ5KhZEYqKZucxPsU2WGZ5k8lvwPmss%2FdIekbBTg0YTZNGjdlRcZyM1AMlu%2BJRO9H6A7tMSKPtD0qNdKcpJrgEqe4PnZ2Qnn%2Bqt0waQ7GZU%2Fhie86C2B8KhQjPnvVp%2BZRKqW8oFg%2FYRCTE8&X-Amz-Signature=34cced48ec490e653ef0d595590b0ce1160d3803276f4c40ac5bcec00df687b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

