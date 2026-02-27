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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXIVYMYF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCICmLXiUOXbolutqOO0AuQWeSlB%2FtkLilq5RoyGCeb7KLAiBjPsf8nGW3L38f4dNFgOKAfZKQULH6VVtRs07pT5lBxCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMWAGGl5093Mb0E%2B%2F%2BKtwDr7gn4HWyiuSAYVCaf9ScVyR%2BBzOK2YMUkqqB3XL%2FFLEh01D6gz%2BNt1jFMWHJJBPpCgYn%2BkP3wvrU15Qfhqdd40YjAXNbGPF94%2Fx4SGHgXypXB%2BQV%2Fv3i8Nk%2BNs8ySCK2VCd60XLVDEPT9OUwD8N%2FnYqTPZ181ew79%2BBiNlXIvKqov5Glbsik8vDMEroAXsZpBErN7nr0F7G3uOVvN5TNbAK1HkSTcmPoAYXq4nAyyXvJx%2BeJdlJXNas1B6v7b7IVVinW3QdAx9GZ5Mj9tYaIFxcu0v507lZDpehQi2aaOuvR2l3SSAN3gQy7wbvJkC6Xv3cynDbjJ3odzO73drMU1Hd%2Fh9uIdWNd0Ka9hSmyzHDjKBJJ1SbJ3C5jgIYRiW1WDjBzDGBQwntcsapyD9bH%2Bph4bX0pnFwRsGWEdKkI%2B2DdqIv5JgBLK2BdJVFMobX0mEXp%2Bh15Q93CXJVinoWhXnRYqZi3W5L2szUYDwVkauJuxP1gTaxAIQrMgBprlGIDNrC0Ic4pSW7P3v%2FLmPIULaphA%2B5lWYe%2By7M%2BwlxhNrsRcDjD0fOSXX4ISfxNI8IClb5k09eY%2B3r5vMp9WW7If9Vka%2Fr6Im8Io4IA%2FR4pe7O4rb2mOexwmjqd7OcwnvuHzQY6pgFiqfWSbuhk7xVQYvoe9OZ8crj9uYDxlm6ZWACKUKArUQ%2FS6J4xODGXzcl66PZ2XTJ5DyzNZJ7RlMsRRJGOA3h0aIxB91hgUBk42ziDieNaeY%2FkuT1MkVnOPaO1T%2BDPow2ielfGbpWDZp59D4vo3lL%2BqbKqORl3YdxLhXAQi8qxs8eg01a2MPte8gG1VD0%2FEor%2BJojSColD8mhNbmENyXXj24TE5N3J&X-Amz-Signature=38866307ae5b295c77df48256e4e757e70a5b80ca04ec601c91b27ae2dad0546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXIVYMYF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCICmLXiUOXbolutqOO0AuQWeSlB%2FtkLilq5RoyGCeb7KLAiBjPsf8nGW3L38f4dNFgOKAfZKQULH6VVtRs07pT5lBxCr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMWAGGl5093Mb0E%2B%2F%2BKtwDr7gn4HWyiuSAYVCaf9ScVyR%2BBzOK2YMUkqqB3XL%2FFLEh01D6gz%2BNt1jFMWHJJBPpCgYn%2BkP3wvrU15Qfhqdd40YjAXNbGPF94%2Fx4SGHgXypXB%2BQV%2Fv3i8Nk%2BNs8ySCK2VCd60XLVDEPT9OUwD8N%2FnYqTPZ181ew79%2BBiNlXIvKqov5Glbsik8vDMEroAXsZpBErN7nr0F7G3uOVvN5TNbAK1HkSTcmPoAYXq4nAyyXvJx%2BeJdlJXNas1B6v7b7IVVinW3QdAx9GZ5Mj9tYaIFxcu0v507lZDpehQi2aaOuvR2l3SSAN3gQy7wbvJkC6Xv3cynDbjJ3odzO73drMU1Hd%2Fh9uIdWNd0Ka9hSmyzHDjKBJJ1SbJ3C5jgIYRiW1WDjBzDGBQwntcsapyD9bH%2Bph4bX0pnFwRsGWEdKkI%2B2DdqIv5JgBLK2BdJVFMobX0mEXp%2Bh15Q93CXJVinoWhXnRYqZi3W5L2szUYDwVkauJuxP1gTaxAIQrMgBprlGIDNrC0Ic4pSW7P3v%2FLmPIULaphA%2B5lWYe%2By7M%2BwlxhNrsRcDjD0fOSXX4ISfxNI8IClb5k09eY%2B3r5vMp9WW7If9Vka%2Fr6Im8Io4IA%2FR4pe7O4rb2mOexwmjqd7OcwnvuHzQY6pgFiqfWSbuhk7xVQYvoe9OZ8crj9uYDxlm6ZWACKUKArUQ%2FS6J4xODGXzcl66PZ2XTJ5DyzNZJ7RlMsRRJGOA3h0aIxB91hgUBk42ziDieNaeY%2FkuT1MkVnOPaO1T%2BDPow2ielfGbpWDZp59D4vo3lL%2BqbKqORl3YdxLhXAQi8qxs8eg01a2MPte8gG1VD0%2FEor%2BJojSColD8mhNbmENyXXj24TE5N3J&X-Amz-Signature=38866307ae5b295c77df48256e4e757e70a5b80ca04ec601c91b27ae2dad0546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXDIVCNG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCICMhtPBK%2BHcE0JfT0rpDFqb0BZZUSZNmm4Wjtn1AjcwyAiB7gtrMCro6NGrl8VgoNnDi8FWPbcVbfiQsCk2csd%2BD%2Bir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMdHbF36mWnkRAgD4CKtwD%2FIp3Btbxx2lztc3ZMK8xal%2B%2B2HxnbmjKiKSiaYkgBhB850mlGdPr1HbnbZF2uXqWWMn126jE7jqkM1Rf620Dai1fbu2l7qXTdN1HacGCnFm%2FwHJuvvasCRChVn%2BplWttojGK4VVDpDiC1ffUnscP5absJYP9RtPYoJFv6Pa%2Fm1kbScvCTY3Kr2AfzUzbmulMlPxg06P8gW00mqDQ3byiJQhpWpcPi3lZ7TFrugujkahtdo186KFDnab77l06oc9hMMOcj8mqyXI%2Fu8Dxq%2Fy7jm1mZO2lpcfnkAchHrzPY9tNSYR%2F8aEciATlMsd0fLnGTDGTL8Mx5bbs8e1eWAzx2Ou6P6HMipCiNEotN%2BQtqVpiR2s25oAXNBu5yByLmfNy5CFVGIJnTBSjpaQFNTr1KZD3HR3kULUaLfbvfVFcGRMfgXJobdmgl%2FQH%2B2C%2BV2ER2WqUi7gNTf%2FiXjnNIH%2BqoB64BuouSrnchpm5J4guCQ89qgB0hzB7os59VWZrDfhe3Yhprwn8yPppRFjwGl%2F8hfcZ8CGzUS9rZfF4gHiAVnUKcEAl5mx1P2cpYRvoRJ4PNr7EWNrsumJ5UYRCNSa2MVs8eazTIPH2TBl0bws8gNcFC1iOux1kT2DN7ygw%2FPmHzQY6pgGiY712O1WkZiWgOkRAEvvGp%2BET%2FjsmG9%2FSF%2BLGkeEUFpVv1J1wGQGFN5jaqgcd4njC2KQTmZb2lQ1Z9R6wizk2tZL5rOkCyfit1EQuiWu0avHHZ%2BOCgnkKSevBQyN7zZgW4R3yeNuIGfuLqy6IUMYnIdyQtxA7R4lj%2B%2FLTY6nHwP845hFOUDAS%2Bg79Czwv53lZIsLfYdedLS4unalxDfNEvUzr0oeB&X-Amz-Signature=9e1cc6bd2324c3ec643354c5e6a392967152bb1e924d9b98c597c728ec8072f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6K2RM2N%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQClIe0qQhBNRvvMDIWfAoulEMIgRzaaoxj36ZahrTL3ygIhAOLr2oQAJNEQdDmLjH64BW7eMBdBCumTmHlVOs5C574%2BKv8DCEYQABoMNjM3NDIzMTgzODA1IgzTMopBljTCZ%2BQpbqAq3APVBQvk25JZh3G8%2F%2BbYZ9%2Fy4Ld9ImaclbxbchCzpGWYdyUTl9yepW%2FH5T3DS9N63O875AW%2BJwe4R6IR8yXbz31JmtseHFmpr5lkbyyeZiqhlyti1bu%2BGbc%2Bg1RhDfvdlU9%2FbPJzGY2Y7gT2UGzUURLE5Xg7pZZBp%2BKgGIumRyumrgYX%2Fff2T3xDJDTTf8lPpLPrx9sDwIHwdgqNOGduZtfkitUczm%2BXOPGzw6HUfVwncdP6FtvTCIZyMDpTMAcFjEkFLFvImjAMU7vsREm3X%2F6dcsYsVcYzU%2F5pZyNIzuv4Ocs0IsFK8dcbr0ZSwD7lx3ZKx5xlE5QZR0xcNjWlp%2F%2F2MIzoxrt%2F94DaPFp1Hi82b4bIjIu4%2BghXzp0JYVmeazCmZJMWp0h50jjClEFak1V6BMWpj87Rh1EDEu6nlgGHa6ggrnfoHe3WsNzLFd4kQlkaXxK0x54wF9fsf6Z425S11Jz10dLhLR6GtDty3wzeGKDnyFZ3ZgxrNnt6cOlJDTGmU%2FO45mRGouO4GzKVIrXZu7h44IFlHXiFqBpeScVKdyYj062kQWU9VpG4rDP%2FCr%2BBcVZZ%2FEt%2FTLE6foc1hpCkpj0gOninQgZJQpirQIbvguoKZ0tSMuZNoflVjjCq%2BofNBjqkAX%2FmtT9yeQKit2j2KuuhnvhA%2FGICXasDyn%2FJ5XuuIvqll6pdD1EivWSFtMWi219RCt3%2FrS3V9TTVKuqAli%2FMIW%2BXGuOQF7kCt2kdDC%2B9An5D1HQPIhQx7FEUbR%2BMuiYbbuxyN2JkvhRHKyWQ9Qc1yCSjhm%2FaYp8mYovX2EQHckA95VQ3Ghbp3ktdGpCxWLtx8YveuhqdyJBEEakAZHd5YzYNWNLb&X-Amz-Signature=c12f6ba1ddb22f088a2a27f36a0d43608549003912fe0986c62afe320c82ef6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6K2RM2N%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQClIe0qQhBNRvvMDIWfAoulEMIgRzaaoxj36ZahrTL3ygIhAOLr2oQAJNEQdDmLjH64BW7eMBdBCumTmHlVOs5C574%2BKv8DCEYQABoMNjM3NDIzMTgzODA1IgzTMopBljTCZ%2BQpbqAq3APVBQvk25JZh3G8%2F%2BbYZ9%2Fy4Ld9ImaclbxbchCzpGWYdyUTl9yepW%2FH5T3DS9N63O875AW%2BJwe4R6IR8yXbz31JmtseHFmpr5lkbyyeZiqhlyti1bu%2BGbc%2Bg1RhDfvdlU9%2FbPJzGY2Y7gT2UGzUURLE5Xg7pZZBp%2BKgGIumRyumrgYX%2Fff2T3xDJDTTf8lPpLPrx9sDwIHwdgqNOGduZtfkitUczm%2BXOPGzw6HUfVwncdP6FtvTCIZyMDpTMAcFjEkFLFvImjAMU7vsREm3X%2F6dcsYsVcYzU%2F5pZyNIzuv4Ocs0IsFK8dcbr0ZSwD7lx3ZKx5xlE5QZR0xcNjWlp%2F%2F2MIzoxrt%2F94DaPFp1Hi82b4bIjIu4%2BghXzp0JYVmeazCmZJMWp0h50jjClEFak1V6BMWpj87Rh1EDEu6nlgGHa6ggrnfoHe3WsNzLFd4kQlkaXxK0x54wF9fsf6Z425S11Jz10dLhLR6GtDty3wzeGKDnyFZ3ZgxrNnt6cOlJDTGmU%2FO45mRGouO4GzKVIrXZu7h44IFlHXiFqBpeScVKdyYj062kQWU9VpG4rDP%2FCr%2BBcVZZ%2FEt%2FTLE6foc1hpCkpj0gOninQgZJQpirQIbvguoKZ0tSMuZNoflVjjCq%2BofNBjqkAX%2FmtT9yeQKit2j2KuuhnvhA%2FGICXasDyn%2FJ5XuuIvqll6pdD1EivWSFtMWi219RCt3%2FrS3V9TTVKuqAli%2FMIW%2BXGuOQF7kCt2kdDC%2B9An5D1HQPIhQx7FEUbR%2BMuiYbbuxyN2JkvhRHKyWQ9Qc1yCSjhm%2FaYp8mYovX2EQHckA95VQ3Ghbp3ktdGpCxWLtx8YveuhqdyJBEEakAZHd5YzYNWNLb&X-Amz-Signature=d836c00770b52f3921f963f1308be11a625092fb44b43687780489d600a5147f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUKD4JWL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQD%2BwTJbW4v9HPrZNlSVEx9YaYMbZ%2BhDklQ8z8Kic2L6FgIgaeGz7NsIlYbXgwzcMX4v6oa0FW8hJL0ezqpOw49r5PEq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDFlNF%2FIhFle85rvgmSrcAyW41dgXuWdWKqDvfDzl9GLtNnqj5UktT7WAhAQtFn0zVEqEqnhXerMsmG%2FIZMluBx1VxZ192ZiVvw%2BXAhJwJ3dZfDtlDGj7OvMKxMSowp6gFnIV60Tus5540Bp%2F9%2Ful0naRVtxpyvWjB%2FFIsE0O0xIKc2SP3rJb0JmO%2B%2Fv%2BmB7ACQb5e6%2BJ7STcyWqUlnLxf0ksam4WfFiJX2Nd8c%2Fz6EKHhBbvwVNjkbG94qVdz9znC0x8xbZ1jt5qINOxyn%2BU4tMcgdYXV2UUrZb5uuZk8FUFBKbJzoVw9V13Cwa8ZbKMU9RAktv0PuG7qJe3E7cislCVnFxqt3HohVJFaBCFkxeNwVsL45r71672gPJUYV28akbbbM6wiRjYM%2BcagPiztIUqb1Il6mxpQWPri1ffCJIU9UMaBJXHfbSdlq1E02wtZIfOGVRwTveJDTOla2djC58Gwp3YB0eJ9ka5APHRlEiDeRc1Lt2PRKMFLcIyvFhUhBOPNLU%2BF4INmDMhWAmqdVIa7gQBp3h%2BldRphmFcShQdnRIfDqGk8L%2B4dcAWAjsDMB529EJn%2B%2Bjev0VU01v9GM%2BzHX0zqJ2F7iCA2uAlt2uwIgacGI6K%2Fwr3EAhD%2BSOmeTpn7TtZQAst69lcMKn6h80GOqUBbseBYQqH4wvXrX48CKw%2FUjneaR5ouitAAx%2F3J7RCUWC8IXdXcEn9zLFr%2F1QoycmUauBcaFQYkG5ZHJFgDrwRTklemStioKBaLebA6xVPaqNKGebajMov8nO%2ByNFpfwxnyVuXG97Z6fqeNvIWBK9Gema8vzHwEu1tHiuGJ4rR8VoYLBNEzbLeL6i%2BiaGSI3g1Kkix3ysF5NdTXBF277tVQycv3D5v&X-Amz-Signature=121cfecc077b5a37ee6c676ecb55ba9073e8ac3f6832769b97439f82e942c551&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOF7A7TT%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIHTnZ%2Fbvj0erNsWATg2WIJeZYI8unqUPYPTW7Iku2LntAiAnpRu9fxLUIUSe7L%2FXEc49pgrO8MjuDk4xyPiWZHphmyr%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMdKrVNlHgBvV3smwnKtwDIDkbtH5qWg5yNzSgVE2Fq3ATxWnHKb8I%2BB1E5ktUCO%2Bz6jZ%2BIu6wTwf1PQsC2EPLkjgIqUdvf%2F8lG%2FZxQeEkJZK0qhpwwp4D%2BR%2BWISLEfo9OsRNIL%2Bjb7v5tRcXzQJy9KXdrqv75zsAPUN1ykI48eP%2BZxD7VtECC1xg%2FoaPclD3StPeYGCCLd7ev9j69dVOdEle6f%2FpwUfRWYgppvcRFCZssWmU522yDjbiNE84i4RDlpkf6MbFJ83CY3JhuMQzE9ROrGYXylC%2FdkuyU2XTRuQmxXkg8eVI3j%2FUt677mFjPyoKs5SEpsfdTTNx55lreyD6ptE8B9r9CnodEf0wVF9wBURi2Wah24pdB%2FTub9WSLk4UvswhXSkZFBTXh%2BTw5A0DfU3%2FrpSEmsodkZXRgue2VjwW19oR1crNfGg6JwXwN5gSGJocwNwPfPV9wkcKPzSKTG9tA7FUARZhkNsALCX6TBnbWIWCCKZ%2Bf%2Brn1S5l505duY9dFIr0swXYsOAJdfwOUNTZdzTK8vAvYBZ32rX0zxLc9LnJ%2BEnFqovo9Hekx%2F17B9S3tS7JVwGV7bsR4w86U%2BFcX6Nz%2F3MCLLGBQFFUqy%2B1e8VmYcebPZ6WKQc%2BrsZia%2FShlg6OAOy5kwmPqHzQY6pgHD2Vx3y6X4B%2BbxpsGu6kt9aKUGfk1bDRunO7HwT7PbiZoY0vQMCxlejSESR8vd6qwE%2Bhek61DHKugXjNKVxVcmF01937rSUvVCznv55opSZH0eQjpqJna7l2PyLP2LnsCWWgIGO%2FmMZjTCbv3vDcVrixUG20HfFO%2Bosr6yYi3vHalENUzAa%2BOonKlhbIlc7VmsLgM7ZwYuE2MH7uFmMpNhomU64bdI&X-Amz-Signature=483c867b3de9a69ffe1ead2efe8ca938fcf09e38e72cb25a0d90d1aebca3f2c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZNPJY5X%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQC6KjeDBZnIXKrAkZoUxMld45uM%2FkEb8D%2BmEKA%2FRTvj8gIhAL9zZhWZXS%2B9a1Gk4jyNL35CP6DiKqdDKRW6oHw0qGq0Kv8DCEYQABoMNjM3NDIzMTgzODA1Igw7G6MYZdJEUDldHVcq3ANnuOchqQjvTTd24DfpJE1nRZl8NT%2FmLmNodxUsF4luKZfoYif7sqBjfMFXWaXUkdfBHCB6cX%2F%2Bq%2FMeaaf2aOp4vJClnXjuDy4ptsT9MQAFzpaHh7%2FAHTUez37Ror3u1ECKB0Zga1Q4%2B%2FlAe0SEScmYc9vZGLMnZrTdh9VpfTiUxo9fn7EFJgoN4es4Wle19zpH1Sn7ipK%2B6zzsSh%2FoAwa8Cg%2BNv%2Bnj6isdfhDnEiB%2BL2nXCByXuSiOlAAG4x2QpchZQ5hZTsNoTMXFOH5FS5Oe1MNi%2BO0nL%2BIulR1X1XWcvLZL719p6sQUsdMglNFZvkO45mPHR9yxUCqPCG3QddSFbolqT9jo3T0KQATzxh3S%2Fp%2FAd4DZ4vZ3WnHgdxbK86PQ9zlV3CfigP%2Bwcc1pkgHq97YI3O%2F95H6aTeEPgp5Ku8KE%2FTXkbqaOXhsVq08Ue469x654%2FKQZwH5TeRISjLlEAVhm9OBwzeiG6B1vX6zRfSh%2FY%2ByXElUPb0uKHEp77%2FNqmMf2DiEV9rZrgb%2BDYfme58Sqovr4speCScxc4eMuj%2BYpzMuZZURtWzmzrLLeufwiXYe6Azsz%2BKv5EppfxVcrXWAA28QVS7EUxoiQtEe9JoGfDMDTOChtd%2FrqKDC4%2B4fNBjqkAeFKfpSqLQrKLtaNzEf8cBgpHXP3uk0mtqF5aRQWULCjaRYw3NEI4ksA43NSaRPTV0xXpQRCkyjF9chr%2BlhGtYvgje35psDD4%2FWoAC0tKJWzHPm2B2T2HeqGAqyDvprQ8Qo%2FxYw477UzwGXMO3GGdX15z7W54Jx5MWFGPXbR9TnfDOwvZARUiBThpq8dAVnq8uZgEFrp75672FANgzhnZjQdntgp&X-Amz-Signature=83113cfeb215e8577adda86004f1170699982aa69b86992b5473e7ad8a1d9742&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U37BUHCL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIG3IyqykIw9%2F9SKGLpWwzi01GrRmcdcRl%2B8bTGixuqDjAiB7ka6jtv1%2FnTD5MnvYTEb1jDdVr8xn2K9AI6dt7b9V2ir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMZ%2BX38kDESDEq8lsnKtwDFbxfZCFNWySR%2F%2FQxFq5ihsx0q5t0xwzodpo%2FwUoZgSwP8eD0VPZ1KLODZNS18huf5BCIqVLUeIgZQbaFuH2UdKmiEN5wlTpUIO7upYgQndLr%2F6qDT7P3N4xOBREbG%2B23BXNXM2yeUPrVKAIUiUs%2BIZZ4FTS0vuwghbWK6Fn4VDpqmqvns5kZ%2F3KdriiXYBN5Gtn%2FM8SRpF8TIdZORm0i6dXBDA9Ps3gR8tsexgx8dC5UppIhRxvzDwGYNkuhoPtR779IOjKE6IEbD4uMa2PZqbG1%2BSQcqH25l1S0fCaboVSltP8SfA8sYiRvChD1Fc1AFIy5fIfNY7UZw5pprflP5a4LzqTMtx%2FVs7YBVQlDT9syvG%2BRp2L0FA2b1X3YWL%2FOA3CFEyhb7AI21CW2nTGQNS63X7ZtMk5R81zgeDtges0k3KkZDU5Z2efzCKIMKJ9RmjkC3BZN43eoK3gRcOoE5IK4DI05IQn%2BnIQYZ8rfaQupwH3VrHFk0BlHry0lL0q7afzBkhknEqiQqLcWh6VWatP8RrzEUM2NbijJ0dpCiFn%2F5A%2BktPUdue%2BKUSMNwFBlbOf20KCcnwHi3dDuPPqdyidF7J5dkhuMGRqt0uV4BIL93BsybdembmFv9xEwgfuHzQY6pgGvim%2BtsjUC9AmhTA7PT4Gg1HqYO1YQOCF00HZ9k6imMGJKfbKTtv4PpYCNpPuaZNeVmZhwwIBa6HuvD1KVF3H4XV8wyLcf3vDkeUCpVa%2FJUAuN00PTzTYyj1eJs06zE3zGSuBLqE%2BSq4BFJrQzPrYZAE%2B2%2FuQME7JYO2xPT4VlRhD8hj9pozA%2BYobZZdC1%2FM%2Bt9ovGKF2XLdscImIwU8ZzXZFALr%2Bt&X-Amz-Signature=ee0883dcbb14d7fd7c57d71a403aa933c003da3932936a85751be6276dc4a026&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U37BUHCL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIG3IyqykIw9%2F9SKGLpWwzi01GrRmcdcRl%2B8bTGixuqDjAiB7ka6jtv1%2FnTD5MnvYTEb1jDdVr8xn2K9AI6dt7b9V2ir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMZ%2BX38kDESDEq8lsnKtwDFbxfZCFNWySR%2F%2FQxFq5ihsx0q5t0xwzodpo%2FwUoZgSwP8eD0VPZ1KLODZNS18huf5BCIqVLUeIgZQbaFuH2UdKmiEN5wlTpUIO7upYgQndLr%2F6qDT7P3N4xOBREbG%2B23BXNXM2yeUPrVKAIUiUs%2BIZZ4FTS0vuwghbWK6Fn4VDpqmqvns5kZ%2F3KdriiXYBN5Gtn%2FM8SRpF8TIdZORm0i6dXBDA9Ps3gR8tsexgx8dC5UppIhRxvzDwGYNkuhoPtR779IOjKE6IEbD4uMa2PZqbG1%2BSQcqH25l1S0fCaboVSltP8SfA8sYiRvChD1Fc1AFIy5fIfNY7UZw5pprflP5a4LzqTMtx%2FVs7YBVQlDT9syvG%2BRp2L0FA2b1X3YWL%2FOA3CFEyhb7AI21CW2nTGQNS63X7ZtMk5R81zgeDtges0k3KkZDU5Z2efzCKIMKJ9RmjkC3BZN43eoK3gRcOoE5IK4DI05IQn%2BnIQYZ8rfaQupwH3VrHFk0BlHry0lL0q7afzBkhknEqiQqLcWh6VWatP8RrzEUM2NbijJ0dpCiFn%2F5A%2BktPUdue%2BKUSMNwFBlbOf20KCcnwHi3dDuPPqdyidF7J5dkhuMGRqt0uV4BIL93BsybdembmFv9xEwgfuHzQY6pgGvim%2BtsjUC9AmhTA7PT4Gg1HqYO1YQOCF00HZ9k6imMGJKfbKTtv4PpYCNpPuaZNeVmZhwwIBa6HuvD1KVF3H4XV8wyLcf3vDkeUCpVa%2FJUAuN00PTzTYyj1eJs06zE3zGSuBLqE%2BSq4BFJrQzPrYZAE%2B2%2FuQME7JYO2xPT4VlRhD8hj9pozA%2BYobZZdC1%2FM%2Bt9ovGKF2XLdscImIwU8ZzXZFALr%2Bt&X-Amz-Signature=4c0293c08bd2907495e756e88653e68710d2760cb7738a9573e9116d377c94ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6X226AY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCcNdD39r7DtVUcBp4Cj4w3xVBsEBOaTtJmC3UNPQTNIgIgMOyTCAiI5wnHBvfuCkQQP%2FP%2FfD5QbFkzecDIqd57HcYq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDOWuKgr3SyivDvjPGCrcA5%2BIxyIZSRIHKfaaWWWISHP3n07CcizOAMClygsRQDFg4HHJy78yhOBCWLIubTqxOLuxfP9qn%2B3DmoLtIhB1aPQoYLbuS%2FJT2qrhgNhhM4UOfQp%2B7S0eR9lTi15tuyjC8%2FbL9AwBY0FY8WR8Lp3ZBU7g4rEFhHrb6r30slcmhEEbaHZMeBDb88Tef%2BU08cwcahJYmD5MuVLLQpuYbDsAznjAtwwwCZDJ53y26BXipRvfjMphlaGCjjwHISb%2BeDCX8wxhm5hg42AlZq7nE3MzNtR2krLe%2Bhdiomn%2B2%2BylnF1ZyqLVh5GNy1q0wylzKywI6MCJ7BQFrPifRSOGgmyJpe4Pri6lV7QJNCLeV%2BYzYLs7P1KKfdsEEiWzFxlluKLHAd%2BMP8xvTA0bh%2FhOdv61IkG8RgCwnclAJ6Oz88Dnd5AsxDOeKZ5VgZDj5bpZMJjpWrt2aCzOEmjeVVI63kLm4CQrG2HUaW1vTXcWFd6ArX4IoVqcImLML7Wdjm2IKjgzhhlyy5jUltTX2WkHuTjCDTjN6LPJ5pBZ2h7w%2FNXPEHCTFYekXou7%2BQNn9hEbJ0HHJf3yT9d5742xdS8WDSZhPlMrFfPZ%2FpLsfhYgcr%2BeDKyy5qkyFegsL6bubr1iMKn7h80GOqUBYptFrck2G%2FuUKJ9gfSaZXnHA2GA3othAPpkywHPNcY%2FNlr%2BMkqnfwZYgNKNdAlfeWLrx40YKIs4xccq0pYlFZBfZrGkXw%2BZLtWrFyXeA5%2F%2BHyuKB0qC8qnD9IrAjPvOmv1QBFQAdnsLkzHldWgWjtWD9rLc7dcRamMT8%2FIM3GBP1ZxW5Qu0vxZf9%2F%2F2YAMz%2BekU1FWBKvLTpCcyUJfd94jEmXwgm&X-Amz-Signature=0ca344c32dd6989ed134c8569bbb3735e9587a55f18138f17673948fb5f6cb69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYOWJ3B4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCMKCKzauiJLn03Ax%2F4K8LMI81ygwtIjvibCtGyNF1o5AIgC7tUH6EzsoxHVfte3NFEdKZ%2B7dHl1nXD1SmMuHAUWfsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDI7K1svm%2F%2FYHQXdFgSrcAzqU3iTDr3xWkTEPc8KlhTyKlC6pPlzYbtHJv1HsSwQLTEn0SElczceNeYRblUpZiX9idIL8mPBdG9SMXa8BkQ8CuEWzAGoMJ1xgrLjARm0kj3jnL9iwx25dEb4%2BgNvWpUkbWLxu7E9QazWs%2FpyuU1ta2HywMhCS27Ii9csJDaJsNBjHNLP2CcdDlN6N0IbmPXiBNWLhABPmVHRK6NT2okTQrgsYCWhBLA9wfb%2BFwYPj7wHR2WfW6AfEYtZbDDzlr5%2B7KFojs7fYFnRjRNkCh11ADECdS57AV9pfDEsGMOtAaB6HNmZilfdtexWxBYFSSE69fq%2Ff4%2FT9tzHYmLz3Ro17sTVl6jsXRYdpcempSNsnM5ZZN0SEPjRuS04X1fEh3gfNAc5%2Bi05a4383TzK0Q6VpxzFIHw3Cwa8%2FTBuE6C7KksEFNgrT3HYkd5DpXmMvH5QTYGUjsF4i04fzLvp7DYNp4WY4sBl%2FIypLEoDQqoBTL7G6NuQ3EPT0wOSUH93yPaYNapvDzmcwEN8aRCr2DwvZU58T79Ayl5Oq3Np3qAuupCjcp7%2F3xt07ZYiEfiSOH040EEwZ%2BaooJtXSGjeJNGuwJVARVDxhgCwoFRIWmYrjT3ubrkHPrJ2cAvYfMJn7h80GOqUBnxy9IGl6YA9R7BLGXvV6l7uixL4PzdwQ4OMAi46jvQz6U%2FGM2I37PvDdRru%2FrEO8Tt8ddceuGtxlKlOcdZmIpMEZN5u%2FrlfXs4ESKLw%2BEtHwyfKjG2jYe9UDwJ6DJnIuGRDxVs3ji%2FsP8QrmuL3VNvrOLsVESEGTIeV%2FgIxuyn%2Fz6%2BdkV%2FOc%2FlE7Q79C9BW5nZ1nYS4ZJ3n9dmav%2F%2BrR%2BUTpj1uz&X-Amz-Signature=986c33585386e6f9067c8f2b00d9b4135fa282b1cd8cbdf85788b6cc94f6751d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYOWJ3B4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCMKCKzauiJLn03Ax%2F4K8LMI81ygwtIjvibCtGyNF1o5AIgC7tUH6EzsoxHVfte3NFEdKZ%2B7dHl1nXD1SmMuHAUWfsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDI7K1svm%2F%2FYHQXdFgSrcAzqU3iTDr3xWkTEPc8KlhTyKlC6pPlzYbtHJv1HsSwQLTEn0SElczceNeYRblUpZiX9idIL8mPBdG9SMXa8BkQ8CuEWzAGoMJ1xgrLjARm0kj3jnL9iwx25dEb4%2BgNvWpUkbWLxu7E9QazWs%2FpyuU1ta2HywMhCS27Ii9csJDaJsNBjHNLP2CcdDlN6N0IbmPXiBNWLhABPmVHRK6NT2okTQrgsYCWhBLA9wfb%2BFwYPj7wHR2WfW6AfEYtZbDDzlr5%2B7KFojs7fYFnRjRNkCh11ADECdS57AV9pfDEsGMOtAaB6HNmZilfdtexWxBYFSSE69fq%2Ff4%2FT9tzHYmLz3Ro17sTVl6jsXRYdpcempSNsnM5ZZN0SEPjRuS04X1fEh3gfNAc5%2Bi05a4383TzK0Q6VpxzFIHw3Cwa8%2FTBuE6C7KksEFNgrT3HYkd5DpXmMvH5QTYGUjsF4i04fzLvp7DYNp4WY4sBl%2FIypLEoDQqoBTL7G6NuQ3EPT0wOSUH93yPaYNapvDzmcwEN8aRCr2DwvZU58T79Ayl5Oq3Np3qAuupCjcp7%2F3xt07ZYiEfiSOH040EEwZ%2BaooJtXSGjeJNGuwJVARVDxhgCwoFRIWmYrjT3ubrkHPrJ2cAvYfMJn7h80GOqUBnxy9IGl6YA9R7BLGXvV6l7uixL4PzdwQ4OMAi46jvQz6U%2FGM2I37PvDdRru%2FrEO8Tt8ddceuGtxlKlOcdZmIpMEZN5u%2FrlfXs4ESKLw%2BEtHwyfKjG2jYe9UDwJ6DJnIuGRDxVs3ji%2FsP8QrmuL3VNvrOLsVESEGTIeV%2FgIxuyn%2Fz6%2BdkV%2FOc%2FlE7Q79C9BW5nZ1nYS4ZJ3n9dmav%2F%2BrR%2BUTpj1uz&X-Amz-Signature=986c33585386e6f9067c8f2b00d9b4135fa282b1cd8cbdf85788b6cc94f6751d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PYY4INE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T211558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIAWI5yz5rCsAlXjQYaUrjqQZ5EpOwMbcYQENpStDPOXwAiBGAuh46Yj62sUevMNV%2Bx1aASk3aoHRacgOe7fYu30jeSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIM7zXJD0wyROSrRkSBKtwDGQZwiiZjjJG3dprqAmey0pyCuqvhaAEGooHkLoXy24BFVYQRdTITVDRIY%2BnviogTXB%2BW1M0KT%2FJn4Y7o5oPCZriURwYgEyqDHyogCI0fa9ko2nzcCf3bR7I%2Fnuu6mTgw%2BKirMZAFVuCu4NmZtqjvhVmF3iDwOqoW4Tld0KOsjSdDnNgv0RbIky3e4TFpx2d%2FxhKbLweXh29xvzEzUPVsYJ1ausNam88t7Hh9CopHGVuUFhVctXABO2Ww53S1Pm%2BRCWB71bRpZINug6UWx%2BMCMrfnmLvW50HdAPOfh6UD%2BwySoofwzhMIXUZvJS4RNFENl6kVzOr0iIsrbdvTI9PJUzIPbWr9y1dg1SkUbXf7ZaccW1kpPNRCNmdlhXYol%2FROlYvLDdzEAJlRnGXW0ViIB6zEm6HnyE0VrV1eM5WNv7kTuo%2B5hWAXrfeqbkdf5KyLGe5W8CEFOYj4AAJFeGeSeDDmN1PcIfCY%2BQrySvvkeCA4%2Fo3EcCYjuEXhwIkV6fkCZ1o2ZJB0L5K18R9WUfYRsXAcaEC23AzfyeWWy%2FVeJnLepGEgXe1Khx6Al8PY4mcI9ejJf0jz1Nu%2FdJpXkzSEDQpoE3cCpQToVCp6GYidVZCwJxMUBMIsD2em8tAwk%2FqHzQY6pgEBrWuZjAkmcinST6bPwNUx8wMfmzWUHiQGzpoJoowyjAmkdA8xIX%2B7YmvRTD95dhN5TiM6eSC2p4sz9ko%2BG%2B7g7a8ht9rmPTc2iiSyXqBTNGOBJraYvbb6C%2BJCq0RNaYorh%2Bw6COXznAgsmfaeHMspOQBLpCKgv%2FrfMUeOQorZQTS1xPe%2BkMHTyIiWInTcipwv56Mvri%2FPKkbz4PikgN%2BNmiNltIFO&X-Amz-Signature=510d76b4a84936b9fb76e459f6f65c5a140d00e15eee1d7bea127e04a99847b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

