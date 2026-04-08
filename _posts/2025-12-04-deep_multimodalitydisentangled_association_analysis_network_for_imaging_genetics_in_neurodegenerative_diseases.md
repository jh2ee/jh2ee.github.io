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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHLL5AZL%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXbJ%2FGAIReucF%2BrT5awVinr%2B8k4BG6MwBoOwwkvYFYeAIgTbw4%2FJ8P9187gteXlFJWujDFtLKATWMn2X9DP6n6iCMq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBC1B8bf3f4On4IUUCrcA4u7W8ssheG%2Fl5F9ugL9SErYhSjlyxM10uVqWvTGqhq7DG%2Bizl7%2BnhW0EW9eo90QGEXeFcj%2FnzbZbmVCyxwz74%2FxmPdIfWrxlB3dTma7nUB%2B86%2BNxUPzg9rur74%2B4He10XWwcseNymuKbM%2FPjJ5rkaUPg22vaONbgBeQh38g44x1ij8mxZ1glv9HlAmqfD%2Ftj5E%2FoD%2F8kwrz%2BbVVNPCv4FlZ2R2VpAWmfGHqVXfy3ix9h1Sx74JKcrGHjD6RQw6Wb0u2Smr5d648r5xHPMzVvAAeOcMxcGEPY1qdHRqgRmBIfCIrslztYBHS3JbZptExNwbzSR6kHBUBoQqgRMnMjkolHGNDVuPbpuOpvLVkXJrmaU8C0kO0CLEwE7ePYCHQV160xLcKap37Ejk1Bni0DheiG9uqvpoxPAa4lcf1K6B5CpFy%2Fx%2FnxSclsaJ6LkLWlJntg5V2Cm6N0FyWDF%2F06iTCLosGQsY1Ayygxt28Z8K%2FQuxF2M6rdWTME7mfQ%2BGPZii14akdP6bgqPrKIaAiWYpy5Yih8I0lX2L%2BpYignH3ByAqnN8Mgll88TgtS8SGEVun6Fh1bxTEI84t42a0vKGw%2FH7rwrn6jZf2Dkf8pT%2BveKEi6FC3scpZYOby4MODU2s4GOqUBlw9N%2FukFzPfk%2Byu6zmtkzBNQhKrPTMMXmpJKJTgqGJPoI5D1AurldEmP%2FMNcFr33szf9X9OVqAdS%2BjvczOCBho25M0%2FJISNTyWnhUAlnHYJdh3Gu%2FakDvHcs3a3trzVML%2Fv9ljAS6T7RCaqJLDbhC4UR6bQ1%2BF1wtYu9dVWgK9RwiATEJ4N1tq%2F0z025lOMGAjp7nJS5HRTLbJjmd9XliRm5DrpZ&X-Amz-Signature=0d5b66787577437d7dc35ca3d7fbf6e78c86fb2bf2fb55532b9b32ec5a896c21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHLL5AZL%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXbJ%2FGAIReucF%2BrT5awVinr%2B8k4BG6MwBoOwwkvYFYeAIgTbw4%2FJ8P9187gteXlFJWujDFtLKATWMn2X9DP6n6iCMq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBC1B8bf3f4On4IUUCrcA4u7W8ssheG%2Fl5F9ugL9SErYhSjlyxM10uVqWvTGqhq7DG%2Bizl7%2BnhW0EW9eo90QGEXeFcj%2FnzbZbmVCyxwz74%2FxmPdIfWrxlB3dTma7nUB%2B86%2BNxUPzg9rur74%2B4He10XWwcseNymuKbM%2FPjJ5rkaUPg22vaONbgBeQh38g44x1ij8mxZ1glv9HlAmqfD%2Ftj5E%2FoD%2F8kwrz%2BbVVNPCv4FlZ2R2VpAWmfGHqVXfy3ix9h1Sx74JKcrGHjD6RQw6Wb0u2Smr5d648r5xHPMzVvAAeOcMxcGEPY1qdHRqgRmBIfCIrslztYBHS3JbZptExNwbzSR6kHBUBoQqgRMnMjkolHGNDVuPbpuOpvLVkXJrmaU8C0kO0CLEwE7ePYCHQV160xLcKap37Ejk1Bni0DheiG9uqvpoxPAa4lcf1K6B5CpFy%2Fx%2FnxSclsaJ6LkLWlJntg5V2Cm6N0FyWDF%2F06iTCLosGQsY1Ayygxt28Z8K%2FQuxF2M6rdWTME7mfQ%2BGPZii14akdP6bgqPrKIaAiWYpy5Yih8I0lX2L%2BpYignH3ByAqnN8Mgll88TgtS8SGEVun6Fh1bxTEI84t42a0vKGw%2FH7rwrn6jZf2Dkf8pT%2BveKEi6FC3scpZYOby4MODU2s4GOqUBlw9N%2FukFzPfk%2Byu6zmtkzBNQhKrPTMMXmpJKJTgqGJPoI5D1AurldEmP%2FMNcFr33szf9X9OVqAdS%2BjvczOCBho25M0%2FJISNTyWnhUAlnHYJdh3Gu%2FakDvHcs3a3trzVML%2Fv9ljAS6T7RCaqJLDbhC4UR6bQ1%2BF1wtYu9dVWgK9RwiATEJ4N1tq%2F0z025lOMGAjp7nJS5HRTLbJjmd9XliRm5DrpZ&X-Amz-Signature=0d5b66787577437d7dc35ca3d7fbf6e78c86fb2bf2fb55532b9b32ec5a896c21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RXA4DWA%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCICZSq5KP7ARtGS2yMk0n35yyan1M3ppVTx44xEubCpPcAiEA%2F3w95PYkq63DxKypyLLRRh5UzMf22HlbHoxKIhi%2FUx0q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDJluO0qw4SLf%2BoX4GCrcA2zcqpZpgJdh5rXqXwfoW7WSKm2C9Ax%2Fmr%2BxriiX62PWi5pyZGpeYW3mHUG7oOZhLum3vxelQTY675jGfVsR%2BzbVGmIytkAQIn8C4hRFtSMXnY5OvW4AxgWDsbKA4j77%2BxmXdlnI7NYVT5ttygSfFwEidWVa9bevp10NTLYrNwbWqe%2BB%2FW56yN6GhAJ1ZF3ORwbvwkftaH%2Bx22eLBvNCySh6YavabRpUz1L242IqtMqAOvseA2upOrHNqT7yHwqcw8cEVOezd4ayh8ENeHbEZORPXsEt%2FOBfIZf3SLMiYaC4rFs7SUQHHpcU%2FkqyYR5K97KJvLvB%2BwJ6qPC9kmpNz1ZbSRoXtk2Q26rSx%2B1l6Mb7NO7%2FS7EM7aiVu9Bfp%2F6VAX%2B4SDMwAqoI%2B8zSfdZ95OW%2Ffj0STi6hLECRUDBOdNB6za6jbbg9pK3zH4UUonpAGh5JtmHFQvtUkmedB8bASrstd9WP%2BqMA0VcZiYzpBVZJj0NkTvCnHfLZ541tdhdWxYG27AFhj19LzaBpBut8fBHB0tZ3Q%2B7z9lj4Uz38O39P9Ra3JCAkBLEv5bGZg%2Bf0kui1L2e9uN7QlczPhn5XsHuA7aIIAjJuyrrdDBxJtnMYLigG8ZrtTnKHgbDKMP%2FT2s4GOqUBD6geuPsRzjKG1X1TDXc9J58KnfGZ3srdGswyLf%2FmtBhbl8xP5wr3Rzpuvaj6sPTtcdrJ83DX7v%2B25PzecRADLSJgu3MANgi9my03Mb%2B%2BgvV8Yh3tiNkhhHfzY%2B3GPfTFTozV%2BnIEN8b6xYgMWezSOPednFKM65UaoppLpccx2H7E2xLXvMtpRIXa1HArsg2Lze4cNrzx%2BT0zMzB4%2Fsz4UgqGDxNc&X-Amz-Signature=d61e69f8a8dedf211a5389d46b861092e65d21d31d6f8d678d1a467b14a93f21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNLQDRM6%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIDa0TP88eFHKH38%2BY45wDuNmhpM9%2FIlXuo62PnqF1WTYAiEA%2BfLzdYoxB4AWVtjtze3bZQFwva3gbEb8V8IxIDiAsPsq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNV4HfceYujJn6XX1yrcA%2BD9e049eJF%2FmhkFgDyS53OUNDRohaSv9oq0OdZp58fSYVNgEWIjFi5JIjVc6JSaT0vd5%2FY4MzWPFPvuZaI6UwNu6ldkOEmI71XCvHz4wEyBqT8MMXUfMXpMIuQXVtv%2Fk0yu%2B6SgydCsKvtlNTq2%2FSgTQbQh%2BP8W3QO8Me0l4k3SgdtTvxelnWtosQqiWgfW%2Bkz9jugy1iTKP8xEfXiNZP7ex7dVQIjIyxL7dwtEaZk2FJzs6EA4SU5bXFKNmkpuX3%2BP9IJiPHpoCUCCLsKhEfKH29fli%2B1O8u0jUqHdpIU7mvkvssrxTOcSQK4AKlVcTbfgIHjwZmX2AMSL0nje70t4GGOAh0D86ABxqJx81kYijfnTzCPkQ3Nby938ZuZ2VwRiZjcOoBpU2kUzcPw2l%2F%2Fzu3vFODlsuriidC3%2FNjiDd9XaeUmo94vqoenw1wT1itNLssEmMQAsqF3qAQzFcyM9rVOR%2BeC3KsHRM%2BLtrqReiGLE4gXzmA733LWnjU4HFpA0aZfNt8rvuip7Gd6SRDWiaKNHaBbqSMoScY9RLx4n3hv0xeHasGh4ubfTzbn%2F7c9AYFBluGVCIIOFPNXpwoHSMdEZk7M5pLVk7cMAhG2lywL5gEZJlvyerk%2FbMKTV2s4GOqUBo942spv95H%2B%2FTWFp0Mzc0sbJNOA%2F4cD0par37K008uuhTDwkfvyhTi2gqUGyAZzspQy%2FsM7whde0%2FLQQsff5ZmKAnBhxuhWK9%2B2OQBtZ0Ja%2F3OPTJkwDQoax4RbBNAdA5Cw0ZbLdTMAyFN4nOSlNNXrca2ugDS2gBQGao9g10RkkYhz%2Fzmu98a4GfPDp6u%2BowslYNBOXQfDqupPEMBLID9vjTs1c&X-Amz-Signature=0e8e5e09ec51753034436b817e633f45bce3e2d9941bf07ed68e9ba157205a4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNLQDRM6%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIDa0TP88eFHKH38%2BY45wDuNmhpM9%2FIlXuo62PnqF1WTYAiEA%2BfLzdYoxB4AWVtjtze3bZQFwva3gbEb8V8IxIDiAsPsq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNV4HfceYujJn6XX1yrcA%2BD9e049eJF%2FmhkFgDyS53OUNDRohaSv9oq0OdZp58fSYVNgEWIjFi5JIjVc6JSaT0vd5%2FY4MzWPFPvuZaI6UwNu6ldkOEmI71XCvHz4wEyBqT8MMXUfMXpMIuQXVtv%2Fk0yu%2B6SgydCsKvtlNTq2%2FSgTQbQh%2BP8W3QO8Me0l4k3SgdtTvxelnWtosQqiWgfW%2Bkz9jugy1iTKP8xEfXiNZP7ex7dVQIjIyxL7dwtEaZk2FJzs6EA4SU5bXFKNmkpuX3%2BP9IJiPHpoCUCCLsKhEfKH29fli%2B1O8u0jUqHdpIU7mvkvssrxTOcSQK4AKlVcTbfgIHjwZmX2AMSL0nje70t4GGOAh0D86ABxqJx81kYijfnTzCPkQ3Nby938ZuZ2VwRiZjcOoBpU2kUzcPw2l%2F%2Fzu3vFODlsuriidC3%2FNjiDd9XaeUmo94vqoenw1wT1itNLssEmMQAsqF3qAQzFcyM9rVOR%2BeC3KsHRM%2BLtrqReiGLE4gXzmA733LWnjU4HFpA0aZfNt8rvuip7Gd6SRDWiaKNHaBbqSMoScY9RLx4n3hv0xeHasGh4ubfTzbn%2F7c9AYFBluGVCIIOFPNXpwoHSMdEZk7M5pLVk7cMAhG2lywL5gEZJlvyerk%2FbMKTV2s4GOqUBo942spv95H%2B%2FTWFp0Mzc0sbJNOA%2F4cD0par37K008uuhTDwkfvyhTi2gqUGyAZzspQy%2FsM7whde0%2FLQQsff5ZmKAnBhxuhWK9%2B2OQBtZ0Ja%2F3OPTJkwDQoax4RbBNAdA5Cw0ZbLdTMAyFN4nOSlNNXrca2ugDS2gBQGao9g10RkkYhz%2Fzmu98a4GfPDp6u%2BowslYNBOXQfDqupPEMBLID9vjTs1c&X-Amz-Signature=d0131607f0e00163fb4391ddaef1deae44fada81a4886fbcc97229c8c38cdad7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLAFF2DP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIHkx9GWjyhc%2BNLAbqvTUswIBoyBrWb3sP0CFikU0kTfIAiEAnUfBYPa2d2ExC8p%2Fj7P006M9bFLPqJQHtTGvHxGM538q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDE3dN0ZYJOiuTmj4qyrcAzXg0VPdJnmZfMVq6o7QHDcujBkNe2fN7oEt%2Fxn%2Fnh8NVogWpEY%2F2Y89INN%2FPMDranGuiqiM0kT1Mlfiv21oexpztI%2FSH4VseqKcg6bVHC0NVtTYMqM%2FQ%2BqO70i2bjr6o7kfzBo3PGSzFcsHV0f6PZgkiQF%2F2RpWEkVS7w0oOe5tOOSzTj%2ByzDbCgXlElvhY1sqQ5gfIfL%2F8SmEd0%2Fl%2BVpwJLZpLyPCK0m3tFEOVMpAKhN1QGe2IrM7HeRpjnPbBzFlADjnjPt2KA1%2BxFEfT3UdlESuMTwkcVYraNutvV5ZUH0dCMK5Xqvx1eVo0i2D%2FKVnTz8sWHxdNYOaAiE7RkEdxb7LdoCxX1ZjBjdBaw4GJue6lfhWPX7RQML5wdoT0sRC68Xzv9jvZl4SJpRmMF32bjqj2%2FwdEBECEqyX4dllZGA8b%2Fr70I4bCIW%2FZZ2xxdQ%2BiTAguPPgsN6QthTqfs2cr09UKvHYso22YBDXtxGl%2BdL8y7gdpFMC9%2BD2q0EAN18YlQJmvHKhcbTgQqgI9jfgcPu%2FZj8dJvGb8TYlYDK%2BOBpb7%2FPw0rrHksl0C4uJGWZA%2F6KV1ppfd7posurzSV%2BEOABneax8HYDuVAozibHxknI7bSKyY1086YMWyMNfT2s4GOqUBqBiRkqJuKfC6VWYHymKI5Tg2TWKJEycEHVCjhBSyqJn37r3p8kkJJK3Tl5R%2BTeIc8ueAt759pz1aIXAuWwQ4EhB1QzNQ5GrvUzPpkebea440jHzdX2armwi8j43KEwaYnqYXxlYPFuIruMUY0OWFtdmijhm%2F0hlTuQVlQLY%2BPeSA1A6SFgiRjqC4lep8xRjLYSKiN1GdU0DjseFx5M8xA8nzyrPz&X-Amz-Signature=b0801c9aa7ba42a93100cd7fe9407daa32dd89dd3fccae3ab5000c8a002e2d7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWKPHZB4%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIB8D9rckEpuFFvc8xBHKH%2BCR%2FA6356OiJlCSGEXkhAUWAiB5KRS5%2Braekh9U61GJOUB8c12Rw6Ptv9VSBg9vEww41Sr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMshZG0MzH2KdyrODpKtwDFC14D4V14Kc6lwLvalgHe4RHGjAuuL6l%2Bidkni71mCQIATOpPER8%2BRCVhEtJMqsACvv%2BW6j6iBIGArLPzUlPlaMUS0jLtuptoDX6Q5ZhO6PgSZpTMeNRbOtw6DgQofDbHWM%2Be77o9b%2F4QCAQpH%2FRnUcptUrpQhE1i5Ib1esDrPRF4WvC9HCQxfMph2hvxQTSuZRg0%2FoMSRPFBJ953kwvFoR%2Bs8fL5ZECi%2B1bCOkUnpmzuwBo7cemXrMGssrXQUgiwALtsGB47FqhpfwZpgI2SB%2FI4I2%2F2hmXTVmyuCYLbWeQ5qMC1rZU%2BQOGbckZ8Tdi0tqa83sep5Jq8unmmtbaO%2BHqsSsWh9LiVAKTdQV1TZKiHODaFmBDZjAMdFkjLhpkJDk%2BlQr1CdUswXHQobxDCFtc79fI5rI%2F0YJZXEgRF3N60Wx05SxjUafZ8Y5S6e6a10qqCRFjLtbPxAaSGamC9ifzadAPHF%2Bld8IBQiWTiT3pgSoSK6dhFFoyLKr%2Bp5exSGf1F4x5W3Y9dZ1i9TXYPSnUXXmBoScjmZ51Qt0SvuUJ0pQXbV3pQTwPefgrp%2B4DvhjvWGgB3mDZO5F6C1DZ5qIqQbs%2Fpl5b2e9GHBEgdcbiI2Nk%2BQlK33DjIrcwmNTazgY6pgE6L%2F5kVMYH13wI7J1bd1e5hqMXwg7fdlToC0yiVLk8GHFb14dpGn0lpSJ9tkEKPzKt4wOdvD5DGdHg4rONx7HwDvjsrt7lN6u3EKQjfjJDFc21Vc7Zt1aIZ8mpP77xo%2FyYsuKC10v5MRcQzEg78X3TwkO52ykzQ34wzOAHR0DmWsOlbQdMBN7NZvhoHKqVy3sfHwrH03Pyyqn1gdaC6B21yxdsqZqk&X-Amz-Signature=320c6c593a49f06b49e81576f6b60c7cf92bfb2560949115874797e1f39c3cfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TULH4G3E%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCo9vBcIRiDNFhTZDDX80mwjhi0LgMQoSb6RNIUQysYoAIhAK0Y8EbYcrifofQe4Kj1%2FufKwAN5ooGjGSICX4UVv45BKv8DCAQQABoMNjM3NDIzMTgzODA1Igy1AyT6xqR%2Bf2UWsQIq3AN%2Fb8wMZC0N19sD6tQOJ5ZwkZWCmo9yDOsQzmUxA4VivCvZfvaXhmA8dwNUGlG2IT4UcmwzUsUXc96X4SmMQj%2FIicExDD6mBElDYJhm4jBXQ7SuJzLz%2FevQIGW3N9vSbixPIp3qmR2TmQKMHs9Hv8ic6Bjvr6UANqgb4znXDmgEz556NmGf5Gzar8zEAbIYNFi9JWRzh9vHt3%2B8WoSUNzj6uqUETEJswbf4rrU%2Fm60r%2BJD9PvkSDclGnAwI5%2Bx0BSEcl6wpStpwFNDEPyoBV2Fxi5Y4FsEzuOQ4NNQtyRtrYONG%2F23L3tHTufxfifM%2FC%2FrB50zk8XrK6OrkUubTgYgDfLX7ckv2dTv0jy%2F7ujbbKxB%2BtiloNFlitWNqxV52negEF%2BR6uExpXBFlWt6fzGatY6S8SGe4HDew3v5gUFDJol6%2B%2Bf2LwzRbCeyOGwVQIAGRY1W6vEssyJ8%2FdsNwcEYRxDurY52hcHm1prpTkGplRI5VZt1r9uIbEcTz%2FcNDc99HoDvDiW9ykUgm%2FxFTuUMe%2BKXPK1vMsWMhcTk0C87AC0P15Gqo%2FpQqRnObijLzOlMEBlHrW0HpTBlQudh5Sqp4s%2FghRaXjhvxC9D6ezmUiyFFiKsobKAOFqXrCMzDT09rOBjqkAUxGteHLZdF5g6MNWhE3vBHwpkA3oFOmjsZaIvedSkrQ8TzAJSFMFjIr12SLBcDwMyGG8BdyPEVLZ7IUryJCfqOm3cBZ2Cb07gMovDuOYWkZIwbS9JuT05J4%2BFrsDVhRyE0enqk2eVImKd3WfRwL2%2BkyzfglwFovlu7kr6%2BltwjxK8NkaYbPXUU4FHjZ%2BkXo1r8Rd2zXEIt3zBBPL8TXYbZn5iqp&X-Amz-Signature=39ab95e0713e14d35adeb4049e3020c217f39ff77a3007ab6093360f946d2703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLRHEYZY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIHXaaFw4EeMLQqduPlMD5LCAPE7Tx9zWdACKKLcUwTrpAiEA8md7dENehnLuW1VIkLjalXraGEMJsT1zZkVfv%2FTvhFcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMQoHnn%2BiBnHwbUw6SrcA47XFA7GjJzQAYautImL1qHeUx47w3K%2Bd%2Bo%2FE%2FRcYr2rFFxDrghkZpxm%2FL2uDXymegeuQQz%2BTQSKqLwHzbZPRNJ6VG8dNa7LlRtNS9hxLHWa5%2B%2BsfBZ8RlvHftnKL1IGVXaOXmyIYlL4PCMVlsufRC2KN6neKB%2B4zE2V22PLA%2BHQbDnyHd0U3UXFJIOVhU%2Bl5%2FUpAwfWyRupYjM%2BjOtU95CfQ1HH8z4KtNUagsZ9t3ZaAvQMo9TL6%2BaXEifHL%2BqQUXy%2B2lMhXN0KPvDAjBHjG2KAhEyRxkc6ahKbl0ErhB%2B7ZXAedi2FG7Z9gNpkOTs7fwpuuJfR5MlEK8yEcU%2BBg27wpew9maBdwCTT0KxNB%2BKCa0ECkcVEd1GB4bsapq46PU6Je2%2B8aCYBhmtosJ1yf6AXizvBq336CYFtYw%2B11qIin%2BqJof3%2B1LYhYLYRM6iQ5TLdRMCejbDnhBBDTIoniylHN5vXn7Naeh0H%2By3%2BGRcwNSS5ZL49PHdNGGcILOFIrH1ibPDiEJPuct9JwRfMTwKNwDKpCTOg3vTuoka5ak8LQ2%2FCuZzLaBG%2Fp1OZBitbkeGMIDVtx9oolmeLgvWYAm%2Fy7bOHZ%2BKBEmGbesWfDJL3xIQsI6bQm2IneR9bMJfS2s4GOqUBDSxyeuBACbWu4fW9WNctRdSqlb6CoSGeK0abqLEVNjdUSyLjW6aFCiazYXll42ZKsU1h9wX3cSWlvpwAFTZrFFiME91Llz5poVAINYJ1e9bTFG1Po73vrTz%2Fl%2BBu4zMpPkqGEelc0CZfUFisbnEoD4gOr25oH0SqdcJhhTjZQySyC1WQhIXCdDVoJ5UWyNNw3FsBGtf0JH7fQ%2BN0iwaH%2BNSyO4wb&X-Amz-Signature=f4d241bd3f9813bae39f3304f9b60ce9f13d2e08624a548e617a7a692ccb26bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLRHEYZY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIHXaaFw4EeMLQqduPlMD5LCAPE7Tx9zWdACKKLcUwTrpAiEA8md7dENehnLuW1VIkLjalXraGEMJsT1zZkVfv%2FTvhFcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMQoHnn%2BiBnHwbUw6SrcA47XFA7GjJzQAYautImL1qHeUx47w3K%2Bd%2Bo%2FE%2FRcYr2rFFxDrghkZpxm%2FL2uDXymegeuQQz%2BTQSKqLwHzbZPRNJ6VG8dNa7LlRtNS9hxLHWa5%2B%2BsfBZ8RlvHftnKL1IGVXaOXmyIYlL4PCMVlsufRC2KN6neKB%2B4zE2V22PLA%2BHQbDnyHd0U3UXFJIOVhU%2Bl5%2FUpAwfWyRupYjM%2BjOtU95CfQ1HH8z4KtNUagsZ9t3ZaAvQMo9TL6%2BaXEifHL%2BqQUXy%2B2lMhXN0KPvDAjBHjG2KAhEyRxkc6ahKbl0ErhB%2B7ZXAedi2FG7Z9gNpkOTs7fwpuuJfR5MlEK8yEcU%2BBg27wpew9maBdwCTT0KxNB%2BKCa0ECkcVEd1GB4bsapq46PU6Je2%2B8aCYBhmtosJ1yf6AXizvBq336CYFtYw%2B11qIin%2BqJof3%2B1LYhYLYRM6iQ5TLdRMCejbDnhBBDTIoniylHN5vXn7Naeh0H%2By3%2BGRcwNSS5ZL49PHdNGGcILOFIrH1ibPDiEJPuct9JwRfMTwKNwDKpCTOg3vTuoka5ak8LQ2%2FCuZzLaBG%2Fp1OZBitbkeGMIDVtx9oolmeLgvWYAm%2Fy7bOHZ%2BKBEmGbesWfDJL3xIQsI6bQm2IneR9bMJfS2s4GOqUBDSxyeuBACbWu4fW9WNctRdSqlb6CoSGeK0abqLEVNjdUSyLjW6aFCiazYXll42ZKsU1h9wX3cSWlvpwAFTZrFFiME91Llz5poVAINYJ1e9bTFG1Po73vrTz%2Fl%2BBu4zMpPkqGEelc0CZfUFisbnEoD4gOr25oH0SqdcJhhTjZQySyC1WQhIXCdDVoJ5UWyNNw3FsBGtf0JH7fQ%2BN0iwaH%2BNSyO4wb&X-Amz-Signature=7b2657451369a55d5aa6b3934a86bd5e5d2c9ad4eaf00e1e314c22e23df8500e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQPAHYHY%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCDsRq1mG30hV9VKJ69pL78QRQ64sj%2BeCqOMhIonZrzHgIhAKQwcykmGb26tv4hWWTgCwTMFTbnj%2FwaxHyp%2BQPtD6KmKv8DCAQQABoMNjM3NDIzMTgzODA1IgzHOzV34UjPPFjy9bEq3AMqpyGHobVVqSWKaFOu1W9tmQ8i9ryvV2uY6Axf3OyPeFW2OUVxZIPi4Mc3Ww8cmtEHCafzxefMcoxwIjaBKmvohImNoUI5UsK7B5Ne0E3ZTsyhlqrCmxZSIwGiww%2BtdiNnsWY4abwc8vQXKdagyoJcTxk%2FNqFIA36W5%2BxwKYvpSzHha2IPsrTO5%2F62H38GnNZQKuu1T5J1sfhSmKl3SgEJDPXECzaQjuu%2FXQTlNvaAtxQpMXyycEH7cqYJWGfWNFWMnFQcDocPHcvRtDbZ3kKKjC7p59VuT39MrPgVbCaU04g8QostVYeNd3sRShbe6qpORytxgZAUQFkM9C8Uhi05%2BtUcQP5UqBlIeUcJ0yk6Ng4T2RrPoMKiWDS%2Fe%2B0%2FlC67Jx4ggKWTKSPX7qIKcn6pZlKExy0XTp%2FjNvnqZiOfTX288V0cGgiPHRse%2F4mR540P7SBk1UxIM9T%2BpuDRX8cC1MJU7jfRs3%2F%2F0G5U7CMKIdrFnu1nr%2BF35l%2BgF%2BF43b7tBVLzfPfM2s5zidolo9O4%2Fju3MDdqjK%2FuMT6UtqcgYMOhLwwItwQyjk0YE9cs%2Fe0S71yiVRUXfpPXIDX2kM54Pi6vwNUdFHGZXKVplSfpfiMSiIdkvrP26EDcFzDz1NrOBjqkAZG%2F2F4WqfGxOR2HDiosiM%2BrhFdQ%2Fv4EFQ9r%2BlLsAMUzgIriIuruX2E1Ou2iqh68H%2FAF2Zov2OmI44%2FYVPi%2F7UHBc8FpzoetM50YPQOt9%2FytFWKiVRKVzgw3FnGotKPaGhlUGFhAQyrX3Vx2NzVP10wkRsU8AQDQWTMh4LylXq6gdORrP%2FOI6MQUed%2FFgc7wqQBcNKfScTN5RvZ%2Fk70mSI5QYw6x&X-Amz-Signature=40f52552cf8710915a05b7e14bd101ba9ec9abed859e261fd000edaa7807b4fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S24HTNKD%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIGEBECJRorQegcw84jUw%2FHYclJRmmIyAB1vJHH1zBDpaAiBZig9wbVMGOdshgkcJwoDFtp4X%2FfsYPKY4GFkRb4CE7ir%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMo951seed9BOua1qIKtwDHbYAwXeaU7tz6flhRYdJe%2F9zk9MvgmjLEkV0%2Fl%2FE2%2Fpq61QjjlDD6ULzPnSlkXmkHLnYHWKHdEev90vegs6XCO8%2BtZlun4fe%2BsvHPM1z3weBlBRC7SSCOc3GbBN%2BinQhWJvy%2Bt6zFXS7rL8TxwJawn8WaCPTA1WU%2B6t5C184ST3T3e6%2F%2BSxhwaUKM22iYAFtpUQu4TLh7%2FZVetuyev4uzOxb1rqzr1hE1gcdoYH7hZBCOb6cnGGlOGv6FRVxEsMLVOWarQXQW9kWnez7BICpy96tVFRhWNsEnM8bBHEZPNOuKUpRVnNlbKc80u3euEVP95RMHUdA8eKxkIdLUEcP6V4NzyTsRuGOd%2Fp5bwOspfWb3ckjDIZ4CTD0BqfB53NowDN66PZfuDCOxT2XEHs9Jj9DdfLmI%2FYvTgkYbyPPla9ZkLHaugYbYPu2AUBdWhkgiVcX%2Bk2S%2BT4M2VRXqROyGaDBOzJNCKq1uPsQwdFXLszZzf1SWEBmcxHHq7SzjMFukLC86deiiBDdwJD3M03s1v8ZKpNDbzXPYkAzpRS3hLEF0T1C5BrWXPH2t14hvZ%2BjNpJf%2BSXXsAqKoVe33bhwEJfsU5njqclQCNrQlZvpkUzJZKMHJPeYi7PXTU4wn9LazgY6pgHMcgbO8GAqpNV6pM%2F6OHI0jJx%2FnYvvfhmLzYFEZIxoKHdn3RHnuUS0IblRDe0RgH8ZREd5J4WCrVU3R260J%2B9kbCqVXp%2B2fbJig3r3%2FlO7i%2BvJNHAuSnoBVY0ZU2oOXMUk8e17bpbjxcRWmLxCkkq9%2FuiLa6NeEh0SWnpHjMH8qLVMQvVvlz1Es6B0fqxfDBSq2TXvRbKfLvsfKpPC%2BBIwQUNLBieR&X-Amz-Signature=c46fca2432f48c418af3c8a46a95cb5be152c494ef8c8eed2145625f0c35cf4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S24HTNKD%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIGEBECJRorQegcw84jUw%2FHYclJRmmIyAB1vJHH1zBDpaAiBZig9wbVMGOdshgkcJwoDFtp4X%2FfsYPKY4GFkRb4CE7ir%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMo951seed9BOua1qIKtwDHbYAwXeaU7tz6flhRYdJe%2F9zk9MvgmjLEkV0%2Fl%2FE2%2Fpq61QjjlDD6ULzPnSlkXmkHLnYHWKHdEev90vegs6XCO8%2BtZlun4fe%2BsvHPM1z3weBlBRC7SSCOc3GbBN%2BinQhWJvy%2Bt6zFXS7rL8TxwJawn8WaCPTA1WU%2B6t5C184ST3T3e6%2F%2BSxhwaUKM22iYAFtpUQu4TLh7%2FZVetuyev4uzOxb1rqzr1hE1gcdoYH7hZBCOb6cnGGlOGv6FRVxEsMLVOWarQXQW9kWnez7BICpy96tVFRhWNsEnM8bBHEZPNOuKUpRVnNlbKc80u3euEVP95RMHUdA8eKxkIdLUEcP6V4NzyTsRuGOd%2Fp5bwOspfWb3ckjDIZ4CTD0BqfB53NowDN66PZfuDCOxT2XEHs9Jj9DdfLmI%2FYvTgkYbyPPla9ZkLHaugYbYPu2AUBdWhkgiVcX%2Bk2S%2BT4M2VRXqROyGaDBOzJNCKq1uPsQwdFXLszZzf1SWEBmcxHHq7SzjMFukLC86deiiBDdwJD3M03s1v8ZKpNDbzXPYkAzpRS3hLEF0T1C5BrWXPH2t14hvZ%2BjNpJf%2BSXXsAqKoVe33bhwEJfsU5njqclQCNrQlZvpkUzJZKMHJPeYi7PXTU4wn9LazgY6pgHMcgbO8GAqpNV6pM%2F6OHI0jJx%2FnYvvfhmLzYFEZIxoKHdn3RHnuUS0IblRDe0RgH8ZREd5J4WCrVU3R260J%2B9kbCqVXp%2B2fbJig3r3%2FlO7i%2BvJNHAuSnoBVY0ZU2oOXMUk8e17bpbjxcRWmLxCkkq9%2FuiLa6NeEh0SWnpHjMH8qLVMQvVvlz1Es6B0fqxfDBSq2TXvRbKfLvsfKpPC%2BBIwQUNLBieR&X-Amz-Signature=c46fca2432f48c418af3c8a46a95cb5be152c494ef8c8eed2145625f0c35cf4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVLPDEDJ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T195356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIGH44%2BqPf4E%2Bd92GbLaE3vNVpcM7OCUPgCkWsfrUKhk9AiEAzqUOjD%2FkuRv6PvzjFZSx%2B1icF8JedDggCiB9H3UZuIYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDDSJyqVM9XjUl3dEMircA6PPz6bZVjPXVxhhxC%2Fy8JvOp3ZXR6nG%2FNWZGu5APBc%2BJt3E%2BtfZwnZc3OkD%2B%2FLbAuEM2kZ5woHC0F%2FiSaGbeDgQfw88QgufsdAGqr8DQ7zFXP463rbQLjNTIybShze4TfN0rnVJz0n2MoazjRRZBpDIPgGEnSwfFkcltVUyLPe9B3O87g0G8QNpEUEolyefw9JbktJAgezRjRAUEKG8ciWNN5zi3ZwgbTpjgG5PwavnEGem29T7cE%2BGGADIotyExR7VIs9iNOWMiEvNdENWWbKHWuUAG8lf8ATRQLhZN6aALxoWGbPVQzavO3OeG3hz3CNJSK%2By7sJe%2BHa3D3K8D6ctpQOMRus6Y70PKNmB8d0ZtVR6wH%2BbVIacpKmOXFBkVxtXp23ojOIQi90jv5fYnRVkhQ%2BkaJZ%2F1ru7VM%2F9Smwoiu3upvViXWwZKL7ItzrVOb9L%2BZhYzFutVkXRZii8BZZ0Mirve8KbuPKVjVWGgEYa8TFnSRv%2BEnGqO%2FxTRrNpd3KWUF9gRLQ7xH%2FkRFHJRS3ncAshvOdLdd5P6Z4qM4t4ZbvnD8Isp2%2FRIZFlcRANfjUpixEssOsuOm9GzLVFB3FrqFHM6F2wX2zp7owK1SDoRl8t9fL4ZxWUHa9RMNPS2s4GOqUByvHdiQSHQIB%2FS9oUtsiFaQev15APHI0x28nTI7EB35ddaXP3wT493ZMpdoJnicRPbz4n7l5URT03UMtv%2BxEqKTWrc9tEJHWEpuLh6qYiRBz1640yeSuXl4J3s7UmXcVuwrKhFVs2AphEl37iAtE44RXc%2FUr%2BtJaeXZsXPTtgf7TEn%2F78zJLjRjP0csI6AoEDUbsX2Vnv23vzFdT%2F6eSGHs7ulqVr&X-Amz-Signature=de253de08c518593428807ae2e50bc9125174b3df2663d7bc0972111107040e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

