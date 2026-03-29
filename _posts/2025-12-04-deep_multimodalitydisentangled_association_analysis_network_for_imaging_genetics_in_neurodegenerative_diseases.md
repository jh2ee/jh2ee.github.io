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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXQOBVFS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCh3Mx57Aykkp01t5LnORqT0Fv0ulOvno6dSy2UZcRwFQIhAP23v2gzHLmv76JkQai33Pk42r3W7SJscsqRyks2Sj%2F7Kv8DCBQQABoMNjM3NDIzMTgzODA1IgyHgNa4h6f%2Fvxn6nL4q3AOAmE0txSZUgxRwduA%2BBlVXtVKZm2rJMfToDa61vguNvcs6NanXw%2BzJPcZFrvxAz38uThauj6AbfgQHIsSfJ%2By9TNHOT7U4wweJHoYYtveDv2Fctx5ORapV5G1wjGhpKeq%2BEnaNp2A27seiMTvXONH8PUm1Qb10nfuTWUxh7iqXHO%2FMA1KBmMFM8dsRhjeOegLlhLppUthW3GchTOL5qjYl8lgL92iSbK0kTdCy7jsT2132GWmynAZj16u0dZk8Ho0jcEAbBbit0JF5tDsAbvXLOSmL5FsYSV%2Bc2ySYBMLsR5UMXTZTUzErxL%2FOnb4hl3T02n10OERMAc8S2RJ7OWh8u8KRemuyBZl3M42NYhHCdoq15F%2BRr59DnYTVQQEsTQvUQwIe8Uxad4L9Sx4eEFU%2Fk8OmVfYhcY5opzwUWG55FKt0gc5n5BZ1OgX9VKFGlYt7WOCir6Yv5cAJeDcgv1AKPOikoUJFhBCphl6D1ipi90Bg8eH46ejSo93hikad9KDTMouYl2hjiBE6kthon9IYBRNVdpqrGnf0VOrV72P%2Fl9prSNYjEom6C8rrCyUhl%2FWzQHWIWBbPMSu8cipVWrZh0ThxVC3CsVEpIyeDeWmolJyK8iIczeXPkIwZQzCe5qXOBjqkAZfQjst7yUf7AD5aMOT4NBGeUNWYBpwNCENAE6mt4u%2BSTyvjZI97QqGBjpXOhvmgODSb2ny1%2BxnPaGSpTLG%2BBjlOnMZb3qmVsgR2ri2XdXG4KqsnTyxACg1ML5YL0%2BB%2Be1Sd2pINV%2B3UFXnvkn2hqus8n4u8s3kJMOMMZYUb94qAIHApUxYU0SBY3E%2BhE3WMJDGYMZCJD29iWhjBZxPidG921qXg&X-Amz-Signature=fabe3125a676a0d1be3981006dd33f49ce4a9ed2f0e9fbfeb1a03b40c6d244d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXQOBVFS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCh3Mx57Aykkp01t5LnORqT0Fv0ulOvno6dSy2UZcRwFQIhAP23v2gzHLmv76JkQai33Pk42r3W7SJscsqRyks2Sj%2F7Kv8DCBQQABoMNjM3NDIzMTgzODA1IgyHgNa4h6f%2Fvxn6nL4q3AOAmE0txSZUgxRwduA%2BBlVXtVKZm2rJMfToDa61vguNvcs6NanXw%2BzJPcZFrvxAz38uThauj6AbfgQHIsSfJ%2By9TNHOT7U4wweJHoYYtveDv2Fctx5ORapV5G1wjGhpKeq%2BEnaNp2A27seiMTvXONH8PUm1Qb10nfuTWUxh7iqXHO%2FMA1KBmMFM8dsRhjeOegLlhLppUthW3GchTOL5qjYl8lgL92iSbK0kTdCy7jsT2132GWmynAZj16u0dZk8Ho0jcEAbBbit0JF5tDsAbvXLOSmL5FsYSV%2Bc2ySYBMLsR5UMXTZTUzErxL%2FOnb4hl3T02n10OERMAc8S2RJ7OWh8u8KRemuyBZl3M42NYhHCdoq15F%2BRr59DnYTVQQEsTQvUQwIe8Uxad4L9Sx4eEFU%2Fk8OmVfYhcY5opzwUWG55FKt0gc5n5BZ1OgX9VKFGlYt7WOCir6Yv5cAJeDcgv1AKPOikoUJFhBCphl6D1ipi90Bg8eH46ejSo93hikad9KDTMouYl2hjiBE6kthon9IYBRNVdpqrGnf0VOrV72P%2Fl9prSNYjEom6C8rrCyUhl%2FWzQHWIWBbPMSu8cipVWrZh0ThxVC3CsVEpIyeDeWmolJyK8iIczeXPkIwZQzCe5qXOBjqkAZfQjst7yUf7AD5aMOT4NBGeUNWYBpwNCENAE6mt4u%2BSTyvjZI97QqGBjpXOhvmgODSb2ny1%2BxnPaGSpTLG%2BBjlOnMZb3qmVsgR2ri2XdXG4KqsnTyxACg1ML5YL0%2BB%2Be1Sd2pINV%2B3UFXnvkn2hqus8n4u8s3kJMOMMZYUb94qAIHApUxYU0SBY3E%2BhE3WMJDGYMZCJD29iWhjBZxPidG921qXg&X-Amz-Signature=fabe3125a676a0d1be3981006dd33f49ce4a9ed2f0e9fbfeb1a03b40c6d244d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LT7DPS5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIGnxzvTYXT90xDGYdaUmY7hPxR8Zj%2FNCYsie7KzmS6NlAiEAr6xBPwDeWcgioWm1EN1IaGK0sia37aNHd%2FloCk3A%2FyMq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDCdaQx%2FLaOXyGVvlmSrcA5gkCBMpCas1v4WKjrjEuqtXqbtLXzRtIuxo9s1jv4yTWNYYNQvJR5ZcugNfRL6%2BYmJGP9GSSwjgrZyydkBg4ePDoODhuFjc%2Bg8%2BhGUpQkntWEBqGPqkq9CodfdFkzK1eMHZ0OSJXjLK2mI1bNQ7CH2b3G3v%2FvWXig%2By173HgFnVLjpB9FNeGgpUUOMECznUgaF%2F2YdjTw87p89cELKqYAb7I1yf0pIx1aZA57dgYw%2Fr1jzWKM2vLip3CmjXloT12sIQKTzxu9y2doSG85I4CXOKXrCGVn%2F7zmrB0VqbVBjQsd0SZHriSp16m7MWfW1c1paAahqLJFiiiskbyNVcu4b%2Fu62wWeArLA7v9OQIG4SiuBxAZShHxA2JJpXrRn8vb2JtbTh3wMyZdDpbjv%2FVcKCkvU3t3y6oRKw0FB3ntnnv8Fd4XU0Kc%2Fq5Maz1RWmTSf2jh6J7tbc07rI%2BuPrhBwzJXyO9EQthAeXu4r2gyLbecWAte%2BxPivjqJYoqjJPIjUA9SM31%2FHixv%2FmHgPEaJ5h3QNMC62Ar5djKlLySxRYHyRVcJJQ%2FwLTYE%2F2ovQzRinTI9E8ZCAvIEXMXWsLicyuOVJTK4pmxWv%2BlAzk5tw%2Fbit%2FmXm5UVGwv0N17MKn1pc4GOqUBY3pIe0tcPBZCIz5sPuJt2r%2BO6sJAzHIUlMbMtDhXPBMoNR5kuxtFidhVk49QPIu7Xyb6VvgKgH6y3Bk3L14bdPrUi6s5EGb0GTSU4bdWl%2BAqfDCUkLjdg56P%2F73siMpQrMCh%2F8%2BRPf0CSYT5W3pgoz1ljCvJaGYja7iDjeWxqkdPK00MeUx1vbQY1dDRbAY3a1OAv13n0i3luYpRssTWVb5BcqiW&X-Amz-Signature=290d60f4ef49b275ed801b5acd6d4311f518f297a12af4328e42433f3e81376c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHK42KPM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIGpDpCS2mX%2BOD1xqrAD1pvcPvejOhSjY8U91j%2FxG%2FqslAiA3lrWgidu6FuOezI5%2Bl3uazMdRwfXNibC%2Buuw4U%2BN8Jir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMMn94TIc8jM13WDVhKtwD1rcXVKAoneWF9C%2BLX%2Fejk%2FalblZKnQnpoFAhVFBX7ahaBjfj5I0sAQIGZh4oxENxpqKEMGU1AaR3d5BjJOiMBGux%2B%2BDNRZvPUrY%2BslikfJRd5cKoehegfOt%2Bq54p9xk4vivjw%2FBYujXmhA7cJ95v13sdfd2SWA373JAo6UA6M0ECybfTkqlFeM50CMcGkpQBxJQjF7JDxEOLT0AGRrsD5DGF46UWlQq2gjHXgECyPUnPLicJDku7domqBALjBw9Zr7VEKyjs0smb7eowlMGxcVcGCtnce5jHQMVmPHDBLu24M2a%2F4vnwI1cBVz7o2%2FHsnMKU9zuNWXZT96EXEwTmniW5go4%2BDEFVKiwRg7dNdqH5AZbq6%2FB93swG2m7ixbFgWrHwce1iiLWiOBN3pDRqGAmK7u1XjE9LTfMfMYJtLhCxQfzOdJqpB%2FBO43F1cuyPjQZo3CvQo9kEOLm0DEwNZCeqwO8YgUx2YKv7FZQAW10kxQJEaozOpHI9%2F0Pd5l5oD4BCFrT3oxtpYAZzem3xwwys6pqaPoChaPlOQ%2FTYiXLJi1N7xnSCifWAfaVAKzSebySg89vbLBEAXZ%2FtfSaLoaWMO0Kw9tTnSzrM4ajzxkMXVpmoJCf6vtjVs48wkOWlzgY6pgHbTQQJysrcwGHxrieLCWUbwZs506YUEykMs609%2BhIn2joWHlhemL6f76GZ7oyz2znGcPPdeYBOgQqH2HQ384RUK9khImOI%2FaGwfo6V0DXfhGLNlvszjFkvKrc4inhXRWb6NZCaPkOkJfzV3JON61dMtbNOx7FkrhfzcdShABGsQnX3JNVY0Qu4kCsR%2BD0KjXak1Xrf4vXnkxmyQaWw9Gpv4yNwVAlF&X-Amz-Signature=fdd476ea24091e3b8d5a4a62636239cce83957a8b194c2045995edf6806a18d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHK42KPM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIGpDpCS2mX%2BOD1xqrAD1pvcPvejOhSjY8U91j%2FxG%2FqslAiA3lrWgidu6FuOezI5%2Bl3uazMdRwfXNibC%2Buuw4U%2BN8Jir%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMMn94TIc8jM13WDVhKtwD1rcXVKAoneWF9C%2BLX%2Fejk%2FalblZKnQnpoFAhVFBX7ahaBjfj5I0sAQIGZh4oxENxpqKEMGU1AaR3d5BjJOiMBGux%2B%2BDNRZvPUrY%2BslikfJRd5cKoehegfOt%2Bq54p9xk4vivjw%2FBYujXmhA7cJ95v13sdfd2SWA373JAo6UA6M0ECybfTkqlFeM50CMcGkpQBxJQjF7JDxEOLT0AGRrsD5DGF46UWlQq2gjHXgECyPUnPLicJDku7domqBALjBw9Zr7VEKyjs0smb7eowlMGxcVcGCtnce5jHQMVmPHDBLu24M2a%2F4vnwI1cBVz7o2%2FHsnMKU9zuNWXZT96EXEwTmniW5go4%2BDEFVKiwRg7dNdqH5AZbq6%2FB93swG2m7ixbFgWrHwce1iiLWiOBN3pDRqGAmK7u1XjE9LTfMfMYJtLhCxQfzOdJqpB%2FBO43F1cuyPjQZo3CvQo9kEOLm0DEwNZCeqwO8YgUx2YKv7FZQAW10kxQJEaozOpHI9%2F0Pd5l5oD4BCFrT3oxtpYAZzem3xwwys6pqaPoChaPlOQ%2FTYiXLJi1N7xnSCifWAfaVAKzSebySg89vbLBEAXZ%2FtfSaLoaWMO0Kw9tTnSzrM4ajzxkMXVpmoJCf6vtjVs48wkOWlzgY6pgHbTQQJysrcwGHxrieLCWUbwZs506YUEykMs609%2BhIn2joWHlhemL6f76GZ7oyz2znGcPPdeYBOgQqH2HQ384RUK9khImOI%2FaGwfo6V0DXfhGLNlvszjFkvKrc4inhXRWb6NZCaPkOkJfzV3JON61dMtbNOx7FkrhfzcdShABGsQnX3JNVY0Qu4kCsR%2BD0KjXak1Xrf4vXnkxmyQaWw9Gpv4yNwVAlF&X-Amz-Signature=87b1bb7a136a6ea6ac47882ae06e8171a1fda2338b665f2e95b78a138be5d61a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHFJJNFK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFj%2ByKgIMpODMUroZerzhVoAsMbN59clhsv5SKXQuSxOAiBieV2Zzqy5Cy0VDR%2B77SkuOsdinGEeJ6bdS4FCBnJGpSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMroWzUVN4IkaY0aJpKtwD%2B04uit0QYWABKRDTI7H9RbwsVHheZMcY%2BmDtNXOBQuzpztIJrIjTt7JA%2BT%2BtylNoILoHyCBAClsV%2F4Rtne%2BcbVjAfbAehWIwF7whaoX0eeuNiSkvNywUPDm%2FXiRrMqRhg2ZechI7Vq8YhH8XdolJex6Dq7O1EHOhhvZMFlylDyzXCpN42wpHUmMeKMj0NpTqpnwNu%2F5HNYwLfeqdqHi3BEu6yV89God41qvlrY%2BvDP445GOu%2FcWfaBsTiQnugOB%2BpuMq3G%2F%2BGaUEwPhhn7ggxt0KDb5OUPbxrLljd6i0hoJ9DapU0jCxw6D05Wyl9KAQLx9%2BEpAbEUBZgt20AgyyhTV2PK31Mn55Rz9VEBNyM9Ku5%2FRbHX3vNBvEV4RTTZSscck%2BdiKRWXw6eLL43rzXTzP0T2QykEGT5HIcPPelgzjSnEcDKWAUZPd116kyduyMXIG%2FtC%2B2gf956Ycq5mrmDEnQqr0Zkc1kxug4NTn1%2BzgV426ODVhGrsYqE4V1tUBLtToAqss5diwugEaFERIEeMh%2FoKUKDp8dbwNKwMyJkxAXeVMKINQOth4jBObkc1o3LmPDccyGIsE73vNCDLxC6sbJgfXG6e58SYUJIZ8H3aO6ckkbShW4Opvc1q0wpOWlzgY6pgHTgfA697QBuQ4V3Od0G3wioxgFHe1dTvQSG5ngcDRjWu5egXH4eGqTTdcpHaYAvzZBwlotiYAxM3ShjcHn4%2Fhodl6F%2BGI1qHK%2BQxLypm4QLToTgPkhUrBg6skONkdfUIXVDHwRR8DILjpabvF%2BckPnl1iSfu7DHywo4h4DgiMt%2BFR5v6Ct7r0qHC%2BnZw8HYsciyr%2FwnbmS6ChMiPB%2FORc%2BXIkSGpFS&X-Amz-Signature=d76ee34cfd091d9e758bc07cf4db6da86d6fbeaddfd48414a7a345d23def9316&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M3ZYJVI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQC3ZXLoat78ql6s91jEeQfANbpriMQSTSGyqCoQGtk1VwIhAOhOYMq4Q0ijkga6fYm30LmNwDANh%2F4prDKDnHNa29M8Kv8DCBQQABoMNjM3NDIzMTgzODA1IgzOdO7SwauPTZZ3bHgq3AONo7D1rMB%2F5abvhobbADSO0y7jMPfh4pP8sEuFfuZ9eMB4WNfjA927szmtMXujifUqdLMQTSs6SBKeqpl5DmJPPgsc%2B7%2Fi5ooP3EAWdxbRed5bne2Pv2%2FbLjgfe%2FgHCFrUz1lrpdvKAU%2B5QfU%2BFDzcSxSyG%2B%2F%2FkD%2BOjPnq1bkZURPgyRYl4Cnoi7XPhPLtdteqeubFaT%2BOhFKHDdFBQBfmOA9quFFF8rD1VsNzvHOLLTU5Eiamnoyg4hbiEHJxDuVRWFZY%2B0WS0Y%2FIX8IGnLNwbFu2vb0WJV7jbYyjX%2BPkUQH2N3fZ84%2F79BisBovlu0IQMN02IK2qmn7JjhWVBrvO%2FtA8F1dcsiy%2BB4cINAAFVMkbC6ZDDTdvtz%2F347ja6kXJyDy0iGZ8JUZrqbyB0DEZR8aXqnuRdvkIGmXRaovCMx4kVQoWAiHsr0UVYzf9TRbkuzEYN978sPz6mmycq2f7wUHpodWLf8yxqk%2FmNFFl0UgbZy%2FRyL%2BrVhD%2B59b1OOx79fI0frB2LUqtV%2FNH6vg9kTr22ziRB1sAV9BdQsBPEjA3ipTur%2F1NMDPR9x7m6%2BwZJ98opmlbY5d6wYTE47%2Ff%2FFuy8jcWd6s26bhqHf3Rq8x7TqNpMW5LQbPOmTCd5qXOBjqkAa%2BC7ul0JEBZrqIgkvvKcSenbRuE6ClmrEEJijD%2FQShpZONERvXAPE37zJC0WLeAJqldX%2FXth6jHF6spC3dF7KfL7WUKLQ0XHCNrRP2iwNyUJ7X4CMOfiZyI6x2plAyQ9w3O9apcqW3dVXN73EKJATj4IteVaQfzkFsN48nPmkVfND%2BD5oJvmJ%2FE4GaHguOsnmvZyM9yhsj4hKw5ezffic4TdGKX&X-Amz-Signature=cea3a3b5e05a33b2ac03d8e9c94c29cac538bea04b18f30d2c82e848926b8999&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJ3JRHP6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDc2iRFSZDkOEx7UyU%2FlUQBNX3q9MoOBtH%2FlsaSsa6VBQIgKXdx1n79P48rHBzS6Wd46LwiJXn0kqCea51hlSOcpCUq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDEsh1%2FLb47Lf%2B4%2BWnCrcAyyi1kaDCYzt3PweWYxdkzTecORVvPWpSFQRNqy4reE4nwU9FuJGTnuwmB9Ht161bqmsyVYIkKP7Frz%2Bv9vPQGkApchImCjxZM134P2XKt5YkThTsxsgpoLSdF%2FMZRjF1dH7bYoL0i9KcOZjVSle1604fLKQ57l%2FIKi0vnpINOliPqxKWGxsS1TBf1PTL2kJIQWkNe5cldlXqgpQ0TvJMPx7zKQWnyXJQgLXDQ%2FIPD6Dk6ml%2FHzyqn1J7YZN8W5oidFj2gV7pwmqxBbY1hJqCODuC9EL9MrHgv1v%2FKEtsFsurEyCCUdw7CwcTWzIZI0qtR4nmVcPcLhxRB%2Bc3QfmNXK1LPtdKM%2BY8ZjpFeVaPwl2kpiqwwr9a1dACF%2BlawSJ9qFeAPLhYExT88QZaTxcPbzISZi0h%2F1iadRD%2BXNFMKItzL9f%2FcAg1l8LcNmuBDr1VnC6%2B%2B9O4vMA7en8N2ZzSM91IG%2BLlwApCtjGe%2FiqpMYJPntsq3LlYrmL8hCuGP4BNovU7To5a1fmE4PgEsL1a2EYVaQx1%2FFkHNBfJkWwV9aIEQL5brmMLIcD2dXVDWKjmOt1HyfQRKDM5QplgTO2LBIWFaHt5rgtQfURqlibOf9Uc%2FdqlA%2F94521r%2F%2FeMP7lpc4GOqUBWhGuMzEwFes38TtMpXZPFtmHETgA9XhhOGEf%2FHG1Yhl7PI24M%2FBrQiiy88PeC%2F5U1Wym%2BvWnvShcOFzMP09%2F9IKiMmBP88tsMD1wEBSGUbuc2wH3Jkye5u7gHxQi8htgdLPqxC0l4j2HgNW9d3DjVUE8ug66jqS6Hlld8pgfor4yvNOpKdrHLF7U5N7Q%2Fzqc6bHtKqaTTPGsQlreC3cf9ZYO1o3Z&X-Amz-Signature=73c183357a68adb487a8e5be745efe1bc204dd36268db4b72200a97ceb031feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PZQYYHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDum8FqPhVR9Q0GBEXTHYihIOd%2FQWbMYrPCvPJMJ%2B0vmwIgRaDXJ9jVng5Km0zoXTiFJGXuWy%2FDVqLPOm4ZhvP0Q%2BMq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIVquXxZ99oqUT1jlSrcA6qnDekoWXPe1Vl1ycrandYrcIu%2BgIIAeEhvL8zEf0VnPa4fCgBCqHr3fskmXhx0pWGx6rJg2oRpKiTkofozXaXyHV0OHC%2BVvKhdShgsK%2F8oFebD6a3PnAIdTRqYHqt10trGl0O57zepbL%2BuvpVcEd76%2F4Qq8hHwtnQtX4BuBRrB05DYcFmE0eJ2Phke6yJe6PyVWlHGP3GJIjaCt0K8bhcQ0jJKPqM0hrlofdl%2F17Em7EZiV9MPLXE7j4QIGT%2FmoD9UmjRD85Fyr%2BB0969Gu6S3e204OLOusjBjAYZTKvCEZ%2FZk1hU51A4bsAMnB8DImN2AV2z%2BPuS3aZg7DBIOAnjLpijYD0V3FY8aUFrtRE2TGYxqWCxyXzMJhgylcSECH7vPrJyXy3ErY8%2BMLJq9N0GyRk6F%2FuicwjaEtsbzIQ1FqtfGnvSL0V4KkBKtuxw3NU3sG%2BN65jZ%2FOUGaQpSjb%2BgtdnshTBsmS3UitH28vS4a1dfP9dvfxpACnNY2rQ2Sd3zcayEyTruoRYPBjo%2FHAdiIxK8SBY%2BblYkAFvscph4yaRFkI%2Fak9DUkPqVCb%2B0kkwz91BrpfA1UPvmwkEoUHW%2Fthdt3T%2BoxeImT3bJP%2F4I5t6aDY9o3fYF7Mi57MN3mpc4GOqUB%2BMpsHRilF5ieuOnUS3Uq%2Bl0MpCb5X2mejXz8djtOA7GVbNGcRF2ZPZeoWLnIqspMBq8KIlTHqI2kjMEx9DnKpelVw6dGIzpK2PihU9mk1vOo2T4SRg9EGIzTKI%2F354yJ3a8GEX5sc4ZOmtivMC3qvz9OooUg7doLR9FzsCYCNEYaNNcQqrOFymYMBMAOmX%2B0u7yrNLue6PDqQaQD3lhj6i3st1uw&X-Amz-Signature=cd7fb97b726de540c0a7bf445b3825ead5aba9eee67d2c8872fa16b7aba0413b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PZQYYHY%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDum8FqPhVR9Q0GBEXTHYihIOd%2FQWbMYrPCvPJMJ%2B0vmwIgRaDXJ9jVng5Km0zoXTiFJGXuWy%2FDVqLPOm4ZhvP0Q%2BMq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIVquXxZ99oqUT1jlSrcA6qnDekoWXPe1Vl1ycrandYrcIu%2BgIIAeEhvL8zEf0VnPa4fCgBCqHr3fskmXhx0pWGx6rJg2oRpKiTkofozXaXyHV0OHC%2BVvKhdShgsK%2F8oFebD6a3PnAIdTRqYHqt10trGl0O57zepbL%2BuvpVcEd76%2F4Qq8hHwtnQtX4BuBRrB05DYcFmE0eJ2Phke6yJe6PyVWlHGP3GJIjaCt0K8bhcQ0jJKPqM0hrlofdl%2F17Em7EZiV9MPLXE7j4QIGT%2FmoD9UmjRD85Fyr%2BB0969Gu6S3e204OLOusjBjAYZTKvCEZ%2FZk1hU51A4bsAMnB8DImN2AV2z%2BPuS3aZg7DBIOAnjLpijYD0V3FY8aUFrtRE2TGYxqWCxyXzMJhgylcSECH7vPrJyXy3ErY8%2BMLJq9N0GyRk6F%2FuicwjaEtsbzIQ1FqtfGnvSL0V4KkBKtuxw3NU3sG%2BN65jZ%2FOUGaQpSjb%2BgtdnshTBsmS3UitH28vS4a1dfP9dvfxpACnNY2rQ2Sd3zcayEyTruoRYPBjo%2FHAdiIxK8SBY%2BblYkAFvscph4yaRFkI%2Fak9DUkPqVCb%2B0kkwz91BrpfA1UPvmwkEoUHW%2Fthdt3T%2BoxeImT3bJP%2F4I5t6aDY9o3fYF7Mi57MN3mpc4GOqUB%2BMpsHRilF5ieuOnUS3Uq%2Bl0MpCb5X2mejXz8djtOA7GVbNGcRF2ZPZeoWLnIqspMBq8KIlTHqI2kjMEx9DnKpelVw6dGIzpK2PihU9mk1vOo2T4SRg9EGIzTKI%2F354yJ3a8GEX5sc4ZOmtivMC3qvz9OooUg7doLR9FzsCYCNEYaNNcQqrOFymYMBMAOmX%2B0u7yrNLue6PDqQaQD3lhj6i3st1uw&X-Amz-Signature=7d03fc047839ee15e1ebc1c6f6b588f60e201b6f5bd73bea1babdefe59e4688c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GFYHD72%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDv1BRfiWDsZZmtrC%2Fjk%2FqkjjV6W9AQ8rdf3GOGW5JfOQIhAOCgOp5DMaHyXRm8amH0qR030Co2AODhXCnaBlB%2BKua6Kv8DCBQQABoMNjM3NDIzMTgzODA1IgxH634%2BovD6rM%2BtH6cq3APeK8GNvrs1sKdGYMmYnd0%2Bj36H7zqb2cvUstpIXJw5ynMnfRqCcxDmwWIvlX9ETIgwDkXx3773EkB4VfS7Aqij3gj8J9FGlJbTLQQgzuwp1Hi3Y9gjerN%2Bfq0PoXjnCykng5ReUG96YhahpKp9MdxLxCwk9o%2Flycca3d4%2FftdCFS2neKcXz4%2F0cYqYz9PkK%2Fr8mmJKQVIL7MwDosM9tngaxuRVDHXl%2F%2BTTEEV%2FGQ8lTCnHmvd8Tpf3jKynLBxeAunKwZ11c1G6fv6x601Slp%2BWHWAtM325a7WpDviQLfajfL8jD1D9DXR0ldVHhsBw0ibCrX887coBeFGKlRzPfHlofv%2FipczB0Pf56sqs2SntWgvPGbwo9hS7aux%2FUfVGO92wGSO7qcQunotm69qw0NwcX4fL7IUMxFU39tcqIdLxJPWiIr8dL1G%2FlZreJ836R%2FCIwGF70YegW%2FjWTEEoriyWkM3%2BTV%2FaLLMIAx%2FpJupW17t9D2GgCsk0C96LKosnIVhuYK%2FlphdWVh9joRkUMYPs8eu2cdpcyPOgcckDwxVmROULfS2%2BBrrG%2FB9kNpYp%2BK%2FxkFVppZKdxoQr4kX2%2FGBxgFgHjHwEgdfe64FdENd5Rj8FJwb32NXw247odzD%2F5aXOBjqkAX7QhIb1l66ZZGEYU295wvbcsPWrna1L%2Br48A%2FBzZVF7KQ%2FSbD6%2FrBhQgTcCPVL0NCpGqa8Kc88yRSYsL6diOR0VXVdk%2F8A%2FW%2FEJAijCMsKue8O2pbq%2FiYbwnMInS%2BXveKdnDDgW0et8gpz6NENS%2BOKvPS43aO22t08MGaiA9wSWe8lVgKCDfPnsio4OFFEEpq%2Bzauo2t%2BvpH7iUq9aCxLBycPqq&X-Amz-Signature=7453c4c654fc12df4ce671b1b523d8142355e3abad83f19bfb3470a7d35693bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YDSHJQJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIE2PXVqh09XfVAS2XaQAgqYWXSMTfFfL37DolklwG3JrAiAcmKxCninCzgJm9bKCoM7rmoeVvlKXBwsc2VCnzCaYDSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMbEe9OCaZkZHKHOemKtwDToXSX%2B3FTyrSrwktXA97Om9JAd2P%2FqM4H33czlwHLOJDtKFLVT%2BXeckg1xo9xAZ%2F48BGUVJ4pvyDT4XLJ2qhumOYCBnqaIaPKgnDOXTKPNEfwKW6QhrG8r44tPVdqiwho1%2B%2FOzj4g2HaR2f4uBY4gzWA6CUY1ZIRL0xy5fVQFQBmB4oDDVxG1YlRpH0MUu86d28orMgvhKdEQod5QsLHwhoxD1nrZyIKCNVv%2BW%2FlSxVIWFjFgPS3d4taE0e%2BEfIc2MFP6hznIrvqsjY1pQFikIUnKHZGc4EV2T6NWdl9OAUn%2BqGGdWbXLzHBVmSfvg68lu0ArOG6zd%2Bet%2F%2BZH2lGFM79sKQWOuK4dwCv7yQ8HoILEcdwaHVjNY1PT5iXD%2FwFyAhQBnaXmk0nFIETwCbq4W7nyuIwuv7UmQMJH0UM3ybRfOOfSV5ygf%2FOBMEfpnSXffLjRBH%2FnLYrgwMs8NdSsGopC8CTcpEUC%2FscHPSd07nhp%2BqaMmnoxuKwdPlO0IEzj6iohfb%2F%2FNGJx3NTa%2FL0yECo5gamEVQkyVzaWirBIZkn5Rh%2FJuDiF7PRvIodt%2BqFtySfXIYEAVegYXWVepcd6dcVb%2BuX%2BViFrmQni%2FAKzbFDLrVR4kMOiB3ubkUwkuWlzgY6pgFGMhxbStAEcODIpYJfKKbhOtSEdJW0EoZio8%2BIsoyD4UJ24LFpsKrCA1tjBZ7fcKxDyzhsGqCDfra7I6Gs8hqANlNXjKd%2FY38nzv2litwi7FCCOqPc2EQld3idxgUSopUsljOLw9YS3gD%2Fh49vrNOU1TeDlxfymyIXrCg7VdAsDd3ePExRhf6RkJPTjiIwVSY8Jj4%2BixbY%2BULPVnf7fxQYoI1KECwE&X-Amz-Signature=c7d74d3ee1d141d83fa90479bbc4c5ded55972945ca30b2649b128e8b4d76dcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YDSHJQJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIE2PXVqh09XfVAS2XaQAgqYWXSMTfFfL37DolklwG3JrAiAcmKxCninCzgJm9bKCoM7rmoeVvlKXBwsc2VCnzCaYDSr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMbEe9OCaZkZHKHOemKtwDToXSX%2B3FTyrSrwktXA97Om9JAd2P%2FqM4H33czlwHLOJDtKFLVT%2BXeckg1xo9xAZ%2F48BGUVJ4pvyDT4XLJ2qhumOYCBnqaIaPKgnDOXTKPNEfwKW6QhrG8r44tPVdqiwho1%2B%2FOzj4g2HaR2f4uBY4gzWA6CUY1ZIRL0xy5fVQFQBmB4oDDVxG1YlRpH0MUu86d28orMgvhKdEQod5QsLHwhoxD1nrZyIKCNVv%2BW%2FlSxVIWFjFgPS3d4taE0e%2BEfIc2MFP6hznIrvqsjY1pQFikIUnKHZGc4EV2T6NWdl9OAUn%2BqGGdWbXLzHBVmSfvg68lu0ArOG6zd%2Bet%2F%2BZH2lGFM79sKQWOuK4dwCv7yQ8HoILEcdwaHVjNY1PT5iXD%2FwFyAhQBnaXmk0nFIETwCbq4W7nyuIwuv7UmQMJH0UM3ybRfOOfSV5ygf%2FOBMEfpnSXffLjRBH%2FnLYrgwMs8NdSsGopC8CTcpEUC%2FscHPSd07nhp%2BqaMmnoxuKwdPlO0IEzj6iohfb%2F%2FNGJx3NTa%2FL0yECo5gamEVQkyVzaWirBIZkn5Rh%2FJuDiF7PRvIodt%2BqFtySfXIYEAVegYXWVepcd6dcVb%2BuX%2BViFrmQni%2FAKzbFDLrVR4kMOiB3ubkUwkuWlzgY6pgFGMhxbStAEcODIpYJfKKbhOtSEdJW0EoZio8%2BIsoyD4UJ24LFpsKrCA1tjBZ7fcKxDyzhsGqCDfra7I6Gs8hqANlNXjKd%2FY38nzv2litwi7FCCOqPc2EQld3idxgUSopUsljOLw9YS3gD%2Fh49vrNOU1TeDlxfymyIXrCg7VdAsDd3ePExRhf6RkJPTjiIwVSY8Jj4%2BixbY%2BULPVnf7fxQYoI1KECwE&X-Amz-Signature=c7d74d3ee1d141d83fa90479bbc4c5ded55972945ca30b2649b128e8b4d76dcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XIKFJGJ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T201704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC8chVwD0rYZNu7YwzujLgy3h1mQWdFGZLpQP0Bc5PUzQIgb7S%2FU7uofKsjv8aYgDjFakhENDGalakgA%2BqJiXh9iYoq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDOnGaZ0tLk%2F%2BanwsUSrcA%2FOsXFeh60HBLvL%2BVexNieCEX2q%2B9J6jp5BDe10cOrp91vqWxk13R2R17il%2B%2FrHYMQxAtiF5yQt5v22mWYixO0WzaKWBHoQoTsaxbX2wXh3FeZWKg4e0UAldOkkaH%2FqIzcyplFxEuih2iTtNV24Y6PQL8OGpmAniQcs3a0k%2FdYyYHq4eEWVEj%2BuK9K8wdZ9wjJG22svFIt3gCxyLTGpnmNidQThBKT%2FZoC7BTmPjtPhrJevjZ2buWaIhaSbu4mYq8bV6JAgW3i%2F4bQJKqnB18ZTALPdtvbiHls4wMg5NcGi1fi04XX2rFhmDFGRfL5PYPvNmXmqE9V%2BfWY0mbXBVpi6WWb1pD6e8lKhpssIHeNnyrG68SIrm0wafnKmx3OSJrI%2FJcciCuZN3nVHly3QZBzWX3A4l5rOILDBPOCvjDHAGP9eIxsFahqQdYrnjSrmwv1yoBi2VC4fmh2JMRxoPRn6B6o5ZfriotkmbtoORQeSov2tIQdy5UKSzvni4pUj2UbvHKOGBafyYreyHZ5RM7aI%2BHV2pRpG1Q%2FUJjkWxURMQ6yFF8v4kwAkneFEaL6jvjYZ22z0qmWpdmPE8gLLBK18BXMuY61JkMHU91YTphAyS3zcDMM%2BPVwjqVICKMJDlpc4GOqUB81dmZ9idqLW3NNstumYhBF5qcucOctm9BcpUgT1Rs%2B4pDU6AD4v3Lc61qlljoTmzec3pSt%2FRU0f23%2BFbcf%2BdouY9f5f%2F%2FuLxPA9kvOsjQ00HBB02ODygdIfUK5Q9bQ4ftkMgCviHhg%2F19UTdkR90Th%2BeE79DXYzQ2x6fh%2FzoAGbTH86WyRXbL29%2BZ32Rv5KAUkJchwJxzMIhs0By02Q8%2BffxYF06&X-Amz-Signature=2ecfe7457f01ed1ca93ecd3477330951b67306562d1849b03cd9b0fc8e101c32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

