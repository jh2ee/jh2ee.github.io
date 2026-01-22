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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3BRDWIZ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDAwJRupmDLSvewG5Mb965VruR%2FFo0%2FbXaifZWualdlzgIgfV0s%2BJxUQvJoa6wZWyGioBVvFSKZbOJdWueE338SfYAqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPM4Yik%2BG0JE%2BkzE0SrcA%2FrOtWMLjYRoF8Knp1S1JTbG3Z6aUvzcdnLLjpSb9HcSI3BWiVlVvkMD9P%2BaFIGmjEP59XTZtinDzK3FeKb2K3LtyHgEzSyFsPaUQhsmkGpcinr1Q31SZWT83wSVnJkqH4AIpNEOSiDLZJQaxE5gHJ1E9fr35Mwkfa%2FSYK7vxu98ifLpnwZwXrxBKHPlzvTjJs18RSCdjCGz9nxwuWr3j5b6P9pj1rvED3ID4yqyVDSa4npLjdjYOsbXq1zDVWCKzUzzXYTpPa6x5YzffsLceKB46uMVuSP1fJTtkC9edaxdA1zbZWkfvUCnPuvyzWCqlTa0gt6nrsXtM0VocUEEOFsm%2Bf0WLsa5ShLtM%2F2uSwWVhCSJEWhXUd9kT%2Bq0rWSOGEOuda3efI77DP4GLeKnu7qfdKP7wfIDvlK%2Fpb%2BRRd6Sah1J%2BiBubnJCsSI%2FQZcQLzysRAOqlTYMCFeUKxuIkpDhrReNTRKtCP%2Fq0S1bP9cyI%2F1rb2qY%2F2at2LOlYYZr5XdIsuAXGMM1qgv5EelDcER0eT1ALaEoBJwTj5s07c5tlgshD8hMeRnAXrIqrEApK2J4DYQlobPMBkIzTvK5qne3TuEtVhHKdLqkkyIJEzqzGjAnojNmWu%2BXEydRMNCPyssGOqUBshImqSQt7VaneHi5ZjvdmcwRDyCUuDhYpD9G8WBYNEDeteqwmvLikeWOr9Vgmza5s4yWt5CPMpGwzE8O5JcjabshVxHmCRGUYVF2LDaVjDpRH%2B57WUuYLEfz0bf31kzrDZxwlRKV7pGA8DutSo77RKpmBHqHtL6iAYl8DCIbmvw8mOQAZ5pioPAif0f8EgIBc%2F87WBsbyzLkYkNfqmVLCEGsRLY9&X-Amz-Signature=e258cde50d08376aaff640cdd07f4775da41f36c98cd233c12b1e79d6f195c43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3BRDWIZ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDAwJRupmDLSvewG5Mb965VruR%2FFo0%2FbXaifZWualdlzgIgfV0s%2BJxUQvJoa6wZWyGioBVvFSKZbOJdWueE338SfYAqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPM4Yik%2BG0JE%2BkzE0SrcA%2FrOtWMLjYRoF8Knp1S1JTbG3Z6aUvzcdnLLjpSb9HcSI3BWiVlVvkMD9P%2BaFIGmjEP59XTZtinDzK3FeKb2K3LtyHgEzSyFsPaUQhsmkGpcinr1Q31SZWT83wSVnJkqH4AIpNEOSiDLZJQaxE5gHJ1E9fr35Mwkfa%2FSYK7vxu98ifLpnwZwXrxBKHPlzvTjJs18RSCdjCGz9nxwuWr3j5b6P9pj1rvED3ID4yqyVDSa4npLjdjYOsbXq1zDVWCKzUzzXYTpPa6x5YzffsLceKB46uMVuSP1fJTtkC9edaxdA1zbZWkfvUCnPuvyzWCqlTa0gt6nrsXtM0VocUEEOFsm%2Bf0WLsa5ShLtM%2F2uSwWVhCSJEWhXUd9kT%2Bq0rWSOGEOuda3efI77DP4GLeKnu7qfdKP7wfIDvlK%2Fpb%2BRRd6Sah1J%2BiBubnJCsSI%2FQZcQLzysRAOqlTYMCFeUKxuIkpDhrReNTRKtCP%2Fq0S1bP9cyI%2F1rb2qY%2F2at2LOlYYZr5XdIsuAXGMM1qgv5EelDcER0eT1ALaEoBJwTj5s07c5tlgshD8hMeRnAXrIqrEApK2J4DYQlobPMBkIzTvK5qne3TuEtVhHKdLqkkyIJEzqzGjAnojNmWu%2BXEydRMNCPyssGOqUBshImqSQt7VaneHi5ZjvdmcwRDyCUuDhYpD9G8WBYNEDeteqwmvLikeWOr9Vgmza5s4yWt5CPMpGwzE8O5JcjabshVxHmCRGUYVF2LDaVjDpRH%2B57WUuYLEfz0bf31kzrDZxwlRKV7pGA8DutSo77RKpmBHqHtL6iAYl8DCIbmvw8mOQAZ5pioPAif0f8EgIBc%2F87WBsbyzLkYkNfqmVLCEGsRLY9&X-Amz-Signature=e258cde50d08376aaff640cdd07f4775da41f36c98cd233c12b1e79d6f195c43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIVWDAC2%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCY9MoDVz3WNaqMFfIYYYt6usALE5IXvpbkw4I2tdX3%2BwIhAPsMAjDGs2SHVwff4MUuH9hEOG7grmZ2uXKF9Edi72IJKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzminx2TH55TMz%2BGVAq3ANS5Up1er4tl6fzCEiqIPcBRXdxbqpdfs4qaN8RZlUnABi2h0veZ%2FgDoeRPVlxaAmASmCLLqEpI6E3S1AvLgDFD863hrniXNAO4lRembMhQDV5ykHqsqC4Pw0bxnmxU4pTTNRyxqLPxvHt4zV6kdnceF8VPw6CLTzl%2F5IMqTK8vq8WsbLdbd0EXKcdX%2BMb9chyG5b1qRbDLa6dK940MTmNQwJHfZj%2FFDE7P3OVD6ep9Oxg31K5Iwx0x6dw0cgb3fTZJXXq1ELDncbb7suHJMkOlE0rVA%2BtnHZYE%2BE7yrYNoV5nnt9cQfVpzvfrE%2BZdmQJebPT0tmtR6BUEj2MNOTBFWuipWmUU%2BcQ8T%2BmkZPBaoCCOVdNTJV6dcqTg%2BM%2B5IJYwJNukQgbYiMJIsWBEAoHFrscg8Du%2FyV6kKssnzPNgqZLRLvrwOLFLWSUnfcetfEHJwZf7ba44VkL2BsXgDCVN3GXT7cfkySRFDiKTPpRU6cFahkKLLf7HQrV8GnTtrHNF%2F4rhXgHc4MgD%2FMFNoSuuT72SoMCfdrGpQK9LpcN%2BI2EVXr1B2mGgbGywzlMpwpgAOIEVUqe7oAAUZZNkdF%2FdqE9pdOyZCms5HrzqDny%2FcuZXM20pNpd6BdG4qKTCLj8rLBjqkARkEEGYvdxDyjtpeWwavv4H6tKETIRdtp%2F6zWnzF6wvdJUmOrsGdhlUQvU9Yr%2BL7ADNc0bEnBRfwly941%2FtJ1dwd6oIKCXOr%2FPp85wNLulajnxxn%2BZL6wpf0GV%2B6peEm0AzEcOe8qOK0Ki8r9NW9rR0T%2BX40tK5ssQ2CcsXMY1bij3c648uWkIzRk0aZsyI7Ot%2BbXEBv9IxCm5FBf2JroS0P8NC7&X-Amz-Signature=9387a9fd56813c82fc5db4ce1400df7c6c435de0eae050b3d891b2eda4f07732&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW6JAYJ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCSXX8sug0HZXyh0teXCJJ9r3zn%2Bddwvr0yolEVEszmuQIgLvdRIo0RsERwBujoqDblxDG%2FV2ggiHllrnnVG4NglPwqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC9yJ5q8BwOIRwxlHSrcAzxdrzKhYrvweb4u3gjfcqSrZFrd4ONq%2FrlxY%2BLHEQzEvmL1LVdyc%2F1K7hloHHjeW3tssiKGCmX02Sc7q6XMw2CLqjLfPTQzUVksgSmUmkyPsMh2g4w0oeEtaKgkBPl2n1Q4XGLqYNnDVmvZNeXrIaIu%2F7UDxff2USQrpzIp4fuVzp%2BWpWQYn%2FGSBAXRL0E6TN%2BPYoZGQ1V8KpQfnwVQZk1Wg0pkbd%2BLuJQhtuO5lpWKphQ%2BOTzEhgzAz6bkm4IqJWVW7BKfNxqK9XrIFulUnoGMbYnnTn9S1sm42UamcNfDuLUP1vaIAVREeyeNCnwvs25ND%2BpBaMgAcvC5flfAwhwFZWQaXUiFTz%2FPGU1XxIe1R7cVsZS5X6XquAPZg22l7gry4xX6gccp%2F1f282HCGD2UNbJ76wkpNJX0nc6AJ4Yjuw707ELozlDZgVagtZsT7DmhM6jKdXFF3fFp2Vlx4PaZzV7yAYWrqVDePrHY9JaWQQJORipppXoEZNY6TcOE8kXYASpJMx7BsAzZFcWpgbrpqXnhUhoHyCtzbtTmWOaiI6r%2Fs8cKpLjtC4e7iSmOnGJyAslptioldSp%2FefAMfSTGVIvwJM%2BHzd23CA2p1%2BxKOFvuF7AXBwsowF4QMMmOyssGOqUBZmM%2FkjnG6EmyyfutjfMuDiwCOJtMPbzqM%2BG8zYs5397VkBngh4G30hgKUOkMEYrK8QH%2FMqBNo33dAhKWyMoy17wL%2FEtSY5iOkuRxUFe50MDJ57szDgJ0DTM06LYKOEYGESAZCH54DKzx6r2TaXJy2RBiFZcZj1X9heDh%2FZ98dc22g3421WXPBamFFtI%2BjScO1VnJfKHwchjRmEwURSVnwiqwfYJX&X-Amz-Signature=329781d4cf77208b87b4af593a41c108751d8afd4142f868b3a6843086d3a659&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW6JAYJ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCSXX8sug0HZXyh0teXCJJ9r3zn%2Bddwvr0yolEVEszmuQIgLvdRIo0RsERwBujoqDblxDG%2FV2ggiHllrnnVG4NglPwqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC9yJ5q8BwOIRwxlHSrcAzxdrzKhYrvweb4u3gjfcqSrZFrd4ONq%2FrlxY%2BLHEQzEvmL1LVdyc%2F1K7hloHHjeW3tssiKGCmX02Sc7q6XMw2CLqjLfPTQzUVksgSmUmkyPsMh2g4w0oeEtaKgkBPl2n1Q4XGLqYNnDVmvZNeXrIaIu%2F7UDxff2USQrpzIp4fuVzp%2BWpWQYn%2FGSBAXRL0E6TN%2BPYoZGQ1V8KpQfnwVQZk1Wg0pkbd%2BLuJQhtuO5lpWKphQ%2BOTzEhgzAz6bkm4IqJWVW7BKfNxqK9XrIFulUnoGMbYnnTn9S1sm42UamcNfDuLUP1vaIAVREeyeNCnwvs25ND%2BpBaMgAcvC5flfAwhwFZWQaXUiFTz%2FPGU1XxIe1R7cVsZS5X6XquAPZg22l7gry4xX6gccp%2F1f282HCGD2UNbJ76wkpNJX0nc6AJ4Yjuw707ELozlDZgVagtZsT7DmhM6jKdXFF3fFp2Vlx4PaZzV7yAYWrqVDePrHY9JaWQQJORipppXoEZNY6TcOE8kXYASpJMx7BsAzZFcWpgbrpqXnhUhoHyCtzbtTmWOaiI6r%2Fs8cKpLjtC4e7iSmOnGJyAslptioldSp%2FefAMfSTGVIvwJM%2BHzd23CA2p1%2BxKOFvuF7AXBwsowF4QMMmOyssGOqUBZmM%2FkjnG6EmyyfutjfMuDiwCOJtMPbzqM%2BG8zYs5397VkBngh4G30hgKUOkMEYrK8QH%2FMqBNo33dAhKWyMoy17wL%2FEtSY5iOkuRxUFe50MDJ57szDgJ0DTM06LYKOEYGESAZCH54DKzx6r2TaXJy2RBiFZcZj1X9heDh%2FZ98dc22g3421WXPBamFFtI%2BjScO1VnJfKHwchjRmEwURSVnwiqwfYJX&X-Amz-Signature=b16d969efd48020665a54a23bc7aff53543414db94e7c7871e4e6d8491b02168&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZZCHSBF%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIC3pMUlpTBl0TMRyAkvtHRBr2sTjvxfrF5NB694ibWjnAiAbT69r3PBQcmCF5V40C7N7OQMVW5kxJGt2GK0VwFUXOSqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2m3D1rIuR3%2FxCZg0KtwDHaaEm9OKEcGMBxjLOr1OYJdMEoJcr%2BQjzMjQ8WJ73t3how1pDxdJvdaZ%2B3ieRB%2BeWJGSOrZdDoDQUlXwqKHYoDYWh2TDlnNaFYZ7CD3fSUAUJJzJsuUTYJE5ZORokV7u27Ca%2Bv08DSiAUaFOTIKVqYkoTz9kR%2F4F7mWlkFAWlTXjfAYQvsl4xcp9MQPEzxtROdO3q9IfczPZb5H17J8WpKH2z2IvlvGziV%2FrJI56HHy98x0BqDhTBxPKmD0vrv0McoSsQdhidXMkKo8GYsDzcQaph%2FCFJI9yJq90bA%2BYlDzB1hPzlR0ukkzy8%2FZuqTH2H7ZzkIKaZQWcg9qndYgjFmjs9lzQkh2WBtB8BysZy9H6XsrafFbTVDOqOGaJSuKWFcJa%2BFgrMV%2Bn4W9r%2FjZM55A%2FRhePnAOhxx5YunnFrdYVBF7vpSefTkV4WQLshRATXBvJqwZUfNDzNo%2Bjh5sQYHPXPAYtE1mc1vWsYibHI6NTVeNbf9Aw7S6C8L2i%2B8JlbqhUBLExptrDQqO204GgUGjG%2BbxcoKNQGA1DmBjBLPz3yoCFsb0C6LHnLNZXBZzBH%2B0diF0zNW6nZuJJ4zTZbjtFzcajQCXrPVMQDo2GLQZ%2BuMTwelod7g5kMUAwvY7KywY6pgHpQPeufGmqWYJ6Z2jOJ8EWGeX%2FXPwB%2Bju6WDKFBZ8oHnJWhmy6sazDUD85OyV73oFkyCp2tOsth1iO53tIMJ21bDgJDIOZ7TnHtjD77zBzyRuwkMjDZHRuQLxLaRn5yrYEjrRskmqp3VXmzzssPF4olDHGhvlYZi%2BxFofSz1OTjzIG%2BXoWrzsKi6jBzaj0qhbyicFL6S%2F0XdEuPXVvDp8YcwG9itws&X-Amz-Signature=64f883ed5e414c47284cf8a9ad03d567a3e3cc6f6213a2c5faaf48b666716fcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCY7NWL%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIBtg6anfeb07WWQ67ec2v0qIXXg8PnrWzU3DnR4OEGKJAiEAw%2BITgj3JrJAtL47zOhxCoK67oKYEvsNZxAwObX1yPBUqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKbkWIdWe2fw%2F0EbuCrcAxecWa0GB2yG8vw6PWFPlBg%2Bw%2FWhHLDczXyxUA7p4bSR%2FSGoujVlXe58GvVaQxdyhxzsCXvzKRaHlk62VIO3rJG%2F1ZKNNH2Ns8vxSz372G7mK6ROiD3H80AkJ1G0KGZEu1T0qOzcOHXiY7oRkeFpFOUAYfEEDI5VjvhQN%2FyM16znpEGP%2Fbacgnt3SrRbCbkDfD0JmpyMa4zXRynbSrUAZ%2FHMAxbwpVMsEZZFjJBeld6vleqVq2qOmkqqRyeEgDmwYiMJSE7d76FT30d7M8mRefj8pxh9xvyXL8A3dQgYJI2y5iGq1mJ3P7EKkx9B6xB7VppbWYiUGBU8iSbRKJgz2G7bQw%2FeUxu1NlczuKnKVddKEZjdwzwRMpdydHOPtva0fHcE3wKw1%2Bk8S3RVnSOmZ7q4VclnThUSBO3L8GHrASg8asn0ZBbA3ocCeRyTlTIT2PB2q7qGDn6AecAI2PtZSoyQb%2FvbJIKe4TdXZl0CRXGTTW3MewcJRNptxrHUDj%2FQhMNcqD%2Bgbq6ys41wS%2FaT8BvBSDvODjOC%2FRl%2BJe%2BvgEsxc4Uwax3ntPgIN5%2B0ZRGd%2F4yUyv%2BCSwTOpv%2F1UeusUDnaFrGiiGLT%2By%2FgAt2MxJApmkC8BGdusdu7uV9uMMqOyssGOqUBpwn4S0vR4ravYIL8YKHA2FY3GjRoGDOzoAYs3xnZg%2Fr%2FtQbIFFEDHY%2B9nbb%2Br7o4JmUKQLI7U9YdmaVOnAoHjBiIruWjAnxP%2BvTBnArBJcI01aTWcIbHOIkIgZ4N7MYK5sfrPPS8bY%2BwllV%2Fuyopur5ffZYLBRBzfD2JXTzkWtmnzOw%2B4Nt%2FEBXL3vrM%2FI%2F3KDm9booaFXAzwb%2F8%2FHCpGWzxvLdf&X-Amz-Signature=61a92369b85468affe5cdcbcb53fab997ae683bf8116c5292dcc2edb0619fbe9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XEDQ46G%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJFMEMCIEff83ReU1ZovLBAzGUD1tgtBQui70frNJDzTwl%2Bu8nWAh8B4p83mhhe72p4EnWThl9uoSM3YsCfPcnSmMS%2BLXxkKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDOgLnR7JCu%2FgZWnMq3APHlPBPLZX2SHyqukOjUbql5%2Bj3P6Lk2F8JH9GEeHgFis8sBUW7D%2FOxF3G%2Flm8xfQi0k4j9C%2BnsxEhfwjzQMubCYKKidnWl1TXPzYlzXCRAIJci87agECaG8UM2u4o5Wpd1Ke%2F9eP%2B1%2B9dHDaF%2BQki72xrysEV3l95zNMLlJUM0Thney6aiO2e%2FDU%2BuqtK0cjAe3rv0HGOvbePpDrzB%2FPg3DID198fFFec5%2BfNIfD5lXJxtO1ZM6bAkhUTZLNGs8FBApdIILqPY2zH%2FEkxWxfkTKXxPHNBOwHnlcNvf04RD4wtq9L%2FyuZY%2FY8npiYZuNeDdvKUz4MlZWwp3U6UfBFCPjgOo0ODtUKD57qj7Y934W8cjhSH4D5LbX%2FDWM9KaJHiPBIZFKQ1JIeUCZnQqZFITJIRMPNYHGvszPdXhEZXgOlAhep6rDE7zhV7HVUf363zwUUOpYMmJAxEqj6qX2e31jwubqK%2FbqHk%2Fm9Qj1CGMN%2FOabM2CdTb2uJfnGDPhSPpWNAD5ziWIqfnpRNZTHj1weRUzC3S2zfqy%2F5UyqUo6xmeQpKAlACRO76B8Cppc%2BEVZBlxh%2F7Lxg3a5hYJ2fLf9RkpXhYkGriVK70mKLaf4boHUVy8c0JEbnysgKTCkjsrLBjqnAVAImYzDpLo5TIEhBMpUcR1bBq42cdQY%2FxFauPkXen0NLeHaK7IP7tsA0FedI8hJu7qP0hZYJwEfSp3kTNzhzvc8UVNlbq4s8ZYfa9YyZtYmj8h3a6zwEIcoZ65XpYkiEfZEt0G%2FAq8W0xfnzad8ksPc8DHw3G%2BX%2FS5GjH7EzIf6xSZ5AUNhYiDaXCYsl74TOp3LJP%2FO5OoWhuuXUAB3JirS0gU0WUCM&X-Amz-Signature=c2a925d39753086c524300d7370ecc222f4e0e2054392e57686e895648972587&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REGBUXOZ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCI3YrnMbaavhYOgliwdAKuj3tKsB3iN7jjpaWLUdJjaQIhAMLESZal1sRE9muwVCfZIOITSNwUrp3U7NwSSoQQPGZFKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxyqYjWxf3vFjfZqBEq3APmPVa3dk1ZhAlj9%2FE8gUMClkyc%2BFEUgg25KCb1wFO7UiJ0LE6%2BRecOEKd4L3wgSWrPXdld69LxasYcngttVs12%2FJMEBYeQ8rDtm%2FDsiE1htCS%2FgKmstvmQRkebzQwAFQ6DsjOjP4tK8wfJOwbHHlnwC0peYIIMn9HjbpuYvRmVyEASSuWa%2FqmbfwqmdpE23Ima13Ykf%2BOPjGfBLxrnZQHF%2Blme4AByX%2FWiKFJyEeCXefpwer7VDw6FPI2io1OLr%2BenKTM6NhLn05z7PRNHc5aBUhNJqGMxTLc1Olo3ezZz%2BJY2urMnrkyO012v3s1Er9ZCmcU2LoqNOg7Jbpvq6scIWFQBWD%2FCsLu8pOr72UQR8yeV9q5Ue8f8r3v9PK6feFX1vlXoAqYsGRoQLSZkOzFf0gdTPyTzA3NU%2F2n22%2F3RbNBTy8lGjhjFYm408i09gw0JefFwVp%2B0JkjlGXOgx35KcF5NSDi6pT8yrxODdyrqAlkRiGpBmjhSlhrpCuMp06EdptBFeMx7VeTMME3JsxlTWUhoKahnfzQIyVfMHAnoXLrm02WXpAQ14cByVE5pjRKTMUGGtLE1qTEWaDTEi1gEpkD1kph%2FrYlhtPUCpg%2BOXolhLbGXdupiSP%2FVJDCjj8rLBjqkAbLPs5Y%2BI6vKAAVL%2F10ta%2FGaggSeXRGQuxXyLQonUgEFWVpmssMeejVzniYTg1eYoZ1jpr%2BqBC73%2BGEI9kbc7q8IjEtO2ngrKL9Hvnyci5TFT0rBDLYRCtnFoSSrR99Dyun5Rhf7YcGoavz1S9bBqqnyXRMVP3clvQhGfTXLlEIwPYR5VRF0Z0Lj0SscBC6roKvpPicjt7Dsiis73nWnN%2BzEJ989&X-Amz-Signature=6c1ccaec29a65514b16a99bc10d9bbb7d1dea976ec9e497ffd007afbf415ac63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REGBUXOZ%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCI3YrnMbaavhYOgliwdAKuj3tKsB3iN7jjpaWLUdJjaQIhAMLESZal1sRE9muwVCfZIOITSNwUrp3U7NwSSoQQPGZFKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxyqYjWxf3vFjfZqBEq3APmPVa3dk1ZhAlj9%2FE8gUMClkyc%2BFEUgg25KCb1wFO7UiJ0LE6%2BRecOEKd4L3wgSWrPXdld69LxasYcngttVs12%2FJMEBYeQ8rDtm%2FDsiE1htCS%2FgKmstvmQRkebzQwAFQ6DsjOjP4tK8wfJOwbHHlnwC0peYIIMn9HjbpuYvRmVyEASSuWa%2FqmbfwqmdpE23Ima13Ykf%2BOPjGfBLxrnZQHF%2Blme4AByX%2FWiKFJyEeCXefpwer7VDw6FPI2io1OLr%2BenKTM6NhLn05z7PRNHc5aBUhNJqGMxTLc1Olo3ezZz%2BJY2urMnrkyO012v3s1Er9ZCmcU2LoqNOg7Jbpvq6scIWFQBWD%2FCsLu8pOr72UQR8yeV9q5Ue8f8r3v9PK6feFX1vlXoAqYsGRoQLSZkOzFf0gdTPyTzA3NU%2F2n22%2F3RbNBTy8lGjhjFYm408i09gw0JefFwVp%2B0JkjlGXOgx35KcF5NSDi6pT8yrxODdyrqAlkRiGpBmjhSlhrpCuMp06EdptBFeMx7VeTMME3JsxlTWUhoKahnfzQIyVfMHAnoXLrm02WXpAQ14cByVE5pjRKTMUGGtLE1qTEWaDTEi1gEpkD1kph%2FrYlhtPUCpg%2BOXolhLbGXdupiSP%2FVJDCjj8rLBjqkAbLPs5Y%2BI6vKAAVL%2F10ta%2FGaggSeXRGQuxXyLQonUgEFWVpmssMeejVzniYTg1eYoZ1jpr%2BqBC73%2BGEI9kbc7q8IjEtO2ngrKL9Hvnyci5TFT0rBDLYRCtnFoSSrR99Dyun5Rhf7YcGoavz1S9bBqqnyXRMVP3clvQhGfTXLlEIwPYR5VRF0Z0Lj0SscBC6roKvpPicjt7Dsiis73nWnN%2BzEJ989&X-Amz-Signature=cc329f3ecc5ffbb1ba77abaa8875b505433f7eea3b5a7814326e72ca9c5d8fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPIC3DKO%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIDxf%2BuuF7WrKPA%2BB1XOYufrXPCpJsHQxZRHieFBoOU9OAiACMDy7bpT2aynOoR%2FMNWOd5gMLHSr5w%2FSXLnHasJuVKiqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgGhYOEGS1WjpQpAyKtwDhpw3gYEK2oXXIjONGUg6e48WqzPpofdE%2F9f%2BjJS%2F%2B7JgqnIiW120rD3q22fvKhII%2FkpgfMYRH1p0wMzsEmZCyuPH6KjJDWzAY1YEyFtUvHc0mZsYslwmqBP9rztFGuArY6NP2KN57qLD2f95EWDFT3a%2BJjGyCUsytz545Nt%2BThRuy%2F2GWiCxSKVQtGhGheztwjEUtbdJzoNPBKiRu6iId94VrHautB02mq%2FIcLUfPv%2BwwHsK3wpEkyMqFN2Iiw8VEDJSx4A9vI127nV5JT7hcjLyWCCDfM54HzwuFNhAIM8WJLL33tAzqk8LJmxmP3J8xE9WZgej3BEFwRNdm50Syze%2FShe5FRl1SvHV7o8tmTN%2FfQYdv62wAQPkn%2BwDjXgeA0Im5i584Eq50BRKKKIx5YTr0fMY50Hx%2FLWvDZHbSzLuddf7TL2%2BUlxOIq5LDC5SHenO6Qiwa0nAnBbaQ1TJ6mX1WBY9wbN0YvnawfLKiWS43LX5NRzbqPkg3FV%2F5ITAhKt%2FNqKo%2FMTHA7m5beSzk0dNXS1k%2FXHJGlUwlZj2aVaaABhW0DFtcEfZxwbenihNRc3BkPlXDibG2X1Z%2BTKglfXdV8MYb%2BUx7DQ6DZGyt4lsx%2FjvWWoRoyuB2wYw0Y%2FKywY6pgHk%2Bxp6ZaNQFPvPKZi6QXkqAcWEbmBuv2oEe2jrRwrYbw43BAvo5kdCNSXS8ShFkBemOTknGB0Nk%2FGhdZmeIPJYdIu0Kpj0sSTpM80V8SQHJgb8ViJkRR%2FTQRHxLDHvvQVmMNk5vTSbdHdSU86gAo4GU%2FeIpE830DRGr2RCKeky7tXKJc5Yy2XO7iop5Z2LBuOWEYMMsTn4rfN05a9DC4POM5WAbaC8&X-Amz-Signature=6d8f7ad88dbd8dca1cd132cadc930ea6aa96d4dcc5e56da7612ac0fc682dc6a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF2BFIKX%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCICDjP5e%2F3Oe2cc%2Fk44upzocNcw%2BApoMVds1zAamyS7dKAiEA0Akk%2BfO8o5yo9swin3VZoWXaYaQbsabr8e33jPJer%2FMqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBrLv9L%2B%2FGvmTdteQCrcAyQaA8Jr1dxAp0vaQAMj7kmoDxdwpC3l1RjXc67qHOis8pwj15X4apR9bBIma4uNt6nrelCUrF7puul%2BRxGkR5xWmXNP8VC07U80lqg7pKhoV3aTq02sIdS%2Feaz%2FfZQ40RgNY3eFl025WeUUkgp7%2B1WcPk42nSMFXwfSfJONbBb3t4E3ePyl2OYBuos7IFn7rmrmDckqbm%2FC59t4m0Vv9X2J1JhOWqZGiSrYCpL9c9hyFJAl%2BM1t%2BbUsowIJx8gLucZRy%2FULLGdbf5w3XncV7yJFE1fZSpSqch5C1e9WLL%2BgFX4MBUGexDJ6NGvMMaoGz5HztnmGhxXUb6DdrGq48ibuD7NYFICZ%2B7M9du%2FmO56nM6km66b8g9y73xZyR8lI0MEpAbHMy6zeFx8Exr2sUQK6%2F4vV4Mq1eVPJNtRV%2FWT9m%2FR32cTfhwYvbcrvRkX1ZXdAZpPt1o0NR6Kq6%2B06DYgRmkhJ17oVezRngh0jOr7VrEFCwjtCvOGZAzPn9yHxwlNqc8oiamWwIuZsvC5A8EjiUJ%2BX4vWq1Iz6F4NDA0jzPciet3C%2BCruV9wjsks%2BaIn4046wd8EJL5SKUw0P90RNrzwpEtS0pTBJQxFprXUD4yHs1bvBUlaUAW0DxMO%2BPyssGOqUB%2FI%2B5o04hxpX56wtCEwOV8ikdhCT4uHXHAyAtE0yUPjGbYwIiDdpOMuN3oLWwpC032iclgx%2FVIcfngfefmFrVt63Q14xNjUsGP65L05qy19rB0GiMgIvXU5gUvMV0Q6MnJB4ARWmUHATQSmdy32MFMwrX6tNbTAIr8gf85q5atzbdpXRKFAlrcSSLhF6d%2B%2FuPFa8%2FRr1ltCiq%2FHOOWNU65iAbfekY&X-Amz-Signature=b5399495fdaafe2484ae5bfcb2694d698d43fc88f456aff5a29807e5ea3fcd20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF2BFIKX%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCICDjP5e%2F3Oe2cc%2Fk44upzocNcw%2BApoMVds1zAamyS7dKAiEA0Akk%2BfO8o5yo9swin3VZoWXaYaQbsabr8e33jPJer%2FMqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBrLv9L%2B%2FGvmTdteQCrcAyQaA8Jr1dxAp0vaQAMj7kmoDxdwpC3l1RjXc67qHOis8pwj15X4apR9bBIma4uNt6nrelCUrF7puul%2BRxGkR5xWmXNP8VC07U80lqg7pKhoV3aTq02sIdS%2Feaz%2FfZQ40RgNY3eFl025WeUUkgp7%2B1WcPk42nSMFXwfSfJONbBb3t4E3ePyl2OYBuos7IFn7rmrmDckqbm%2FC59t4m0Vv9X2J1JhOWqZGiSrYCpL9c9hyFJAl%2BM1t%2BbUsowIJx8gLucZRy%2FULLGdbf5w3XncV7yJFE1fZSpSqch5C1e9WLL%2BgFX4MBUGexDJ6NGvMMaoGz5HztnmGhxXUb6DdrGq48ibuD7NYFICZ%2B7M9du%2FmO56nM6km66b8g9y73xZyR8lI0MEpAbHMy6zeFx8Exr2sUQK6%2F4vV4Mq1eVPJNtRV%2FWT9m%2FR32cTfhwYvbcrvRkX1ZXdAZpPt1o0NR6Kq6%2B06DYgRmkhJ17oVezRngh0jOr7VrEFCwjtCvOGZAzPn9yHxwlNqc8oiamWwIuZsvC5A8EjiUJ%2BX4vWq1Iz6F4NDA0jzPciet3C%2BCruV9wjsks%2BaIn4046wd8EJL5SKUw0P90RNrzwpEtS0pTBJQxFprXUD4yHs1bvBUlaUAW0DxMO%2BPyssGOqUB%2FI%2B5o04hxpX56wtCEwOV8ikdhCT4uHXHAyAtE0yUPjGbYwIiDdpOMuN3oLWwpC032iclgx%2FVIcfngfefmFrVt63Q14xNjUsGP65L05qy19rB0GiMgIvXU5gUvMV0Q6MnJB4ARWmUHATQSmdy32MFMwrX6tNbTAIr8gf85q5atzbdpXRKFAlrcSSLhF6d%2B%2FuPFa8%2FRr1ltCiq%2FHOOWNU65iAbfekY&X-Amz-Signature=b5399495fdaafe2484ae5bfcb2694d698d43fc88f456aff5a29807e5ea3fcd20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFEAYPEG%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T211125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIDESQ7PwoAJqINKK9bm30ty6cm7KqdOxhHmaVJSvXKVcAiEA9r5XOjup13rX90zD6ygOxGPFtQMvXWN09LMnGpO%2FNSwqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGAi7UGL%2BCS%2FHP6%2BayrcA3VsCm95u3cwK%2Fa3WCFRIC%2BVQtlL5iLRWhckhcXIePCEMAGV5UiE%2FO1w0sFGRU3N5%2FFoirygUIyDNFNaH5CFgOvPmaUsKcBI%2FQ6ieSr7%2FGnECdHfKHn2Xar%2FZl67o925KhFkgshdI6QNlUpe12JjF0Jn6u2gQoRQgMOlJEZwlWurjcSOUYecLgT3S1Ukwdgnl6axV9zG9o5TVdFmSA0wvSUbt%2FQMKtePH5p%2F9NGlNbEzW9sliK8PpeUoGr5qUna%2BM46UjBZC2ssl2%2BbSFAosWBp6GFfinVCVuT0061W3xzZOsILrOcRArIA5Evs5A7Ky0ZA0aEd3tTx%2FUU3upEsMOMIeKvxrQaByqLOw4zK4k2WBzH0DNdFiU%2B%2BN2Bso2dx2%2Bp41mSZhsw9GTfPJsew8g5zzBavXj%2FQNxZKB3XBZiibpr0uH6DYgqm%2FW9FSA8e7pYze2gg8iRmpV%2B%2FIUpoEcMbE3hNE7r6LXwZzWPFonBYM62bWQF0VHTbddTxGJF3btJ7P6D5K7fxrZwJvEDJroA%2FXIYFQnNLTrjD%2F0BUVUfjLwZx3sGk2rstitIW15wlEYrL7E8WbGMdtDF2xK3kyshLF%2F0MQxoNfxm5KhvKsdbAmXlxGb6HIC7HZb%2Bi%2FNMLOPyssGOqUBjcd2FSom2wHxpC%2Bbc9A5R2Wa1vAqtJo%2B9sHH51GylJG70RuWHR6XI8j9NzO0xVMVdOrLTOydEo8akIbUk8Q2z0Mo0TDT1fkwSbH%2FcPcjHcGN2IZO9sL9PpYP7meFk30wtGQ5DNjvH6jP5xt4ep7Pxapw6Sre9063LhQ9vwhP1CDc42%2BBnzseHTIL%2BppWvx7X5H9%2B9IzmEjOTt%2F%2BNHw9dDssuBM%2BT&X-Amz-Signature=7d4990cc86b02a5c9b37eca301d6593690260305e7fca2b289f20ab4a1ebc608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

