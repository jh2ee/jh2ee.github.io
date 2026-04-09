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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCGWIZ7D%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIF89F%2FuMgqDYiwvOt7HAQdHEWyetKM%2FeVwJtKYLQ3%2FS1AiEA62S%2BstThNNDblMPruCBHqiPGEfuy2JbIGkYssj3WIR0q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDFN2ziyqrvpDdzfbKyrcA3qi2cEw3U2Cfaoom9j341RlICarAcf97vUjO2F5%2FqcWibFqQQ70eXWzWBRulHaG1RxKCC6wA4HfdRUjLtaa35OE4KFLP8p3CCzKXJnS8KaqYizhG4tcDB0GAHNT3JpuNoJ5gaML9JMHiHMhhKWQJHIuv1cAKFlllwVT2CLO7Yjbn%2FA2Brz9HIF7GG4jFlNA76PqpVgh9tQMMujS4r%2B%2FRTwIIDCLZbLYVjo4d4OxmZKujsFeQlHAuvYgYi%2B7xAU9c0K8lzsE%2BAQKvw6BM9ED15nuvDaITKgCMdQyxLONHVdfi3urHdewV5kxeaVQI2kgc0T4rGiP2pmboa5eemp7tiYWrHSODIAIS%2BE35rff1LXbbkKlWmN8eG733JzHeq%2F8z33d3yuwbq4fmv4VMHkI222C2hf2rfLy2IU26YU5COopWSCbwzWIk4ioKaca5OTQotXflRHT%2F6kJadMVefFmKors9E02LdJ7mfWxmwqAS5620MLV0aK68zmPgZFWjWMSI4A6zWI78lZeY%2Bv%2Fkkck4svM1xrrGqk7tkjI8WN9PlnfZhtuMfKa0BGgLhamAqe0wleKlXqM5rx0U6N1yEezmzHv5JfkaL4xwbYWjvismnqSewimUpdnaiWc034UMJK%2B4M4GOqUBBMLZ4ITBTcpId6Ie922MuMm5ZO1vha02t0BIQUQ5SJrQpw4kcxb0zvRfsFw%2FSu5mYSW9bGv%2BfgfktIsSLj%2B%2BXkSgjTi0LEiTkSjXGLcOtwZNAQVCuAzGEv82tCeeEH1W%2B3bR8OXKW%2BnPVckw08f5jyhf5qF8M6oQds7MC7N9nq4KdXMykQQ7TUMn3D2koRUTO38BRN6uGVfZRtsG4q66zRYY898m&X-Amz-Signature=fc878f6004520a8d27b844ae651abe13d1a41a1a9fe82c31457e9e3ae4907537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCGWIZ7D%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIF89F%2FuMgqDYiwvOt7HAQdHEWyetKM%2FeVwJtKYLQ3%2FS1AiEA62S%2BstThNNDblMPruCBHqiPGEfuy2JbIGkYssj3WIR0q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDFN2ziyqrvpDdzfbKyrcA3qi2cEw3U2Cfaoom9j341RlICarAcf97vUjO2F5%2FqcWibFqQQ70eXWzWBRulHaG1RxKCC6wA4HfdRUjLtaa35OE4KFLP8p3CCzKXJnS8KaqYizhG4tcDB0GAHNT3JpuNoJ5gaML9JMHiHMhhKWQJHIuv1cAKFlllwVT2CLO7Yjbn%2FA2Brz9HIF7GG4jFlNA76PqpVgh9tQMMujS4r%2B%2FRTwIIDCLZbLYVjo4d4OxmZKujsFeQlHAuvYgYi%2B7xAU9c0K8lzsE%2BAQKvw6BM9ED15nuvDaITKgCMdQyxLONHVdfi3urHdewV5kxeaVQI2kgc0T4rGiP2pmboa5eemp7tiYWrHSODIAIS%2BE35rff1LXbbkKlWmN8eG733JzHeq%2F8z33d3yuwbq4fmv4VMHkI222C2hf2rfLy2IU26YU5COopWSCbwzWIk4ioKaca5OTQotXflRHT%2F6kJadMVefFmKors9E02LdJ7mfWxmwqAS5620MLV0aK68zmPgZFWjWMSI4A6zWI78lZeY%2Bv%2Fkkck4svM1xrrGqk7tkjI8WN9PlnfZhtuMfKa0BGgLhamAqe0wleKlXqM5rx0U6N1yEezmzHv5JfkaL4xwbYWjvismnqSewimUpdnaiWc034UMJK%2B4M4GOqUBBMLZ4ITBTcpId6Ie922MuMm5ZO1vha02t0BIQUQ5SJrQpw4kcxb0zvRfsFw%2FSu5mYSW9bGv%2BfgfktIsSLj%2B%2BXkSgjTi0LEiTkSjXGLcOtwZNAQVCuAzGEv82tCeeEH1W%2B3bR8OXKW%2BnPVckw08f5jyhf5qF8M6oQds7MC7N9nq4KdXMykQQ7TUMn3D2koRUTO38BRN6uGVfZRtsG4q66zRYY898m&X-Amz-Signature=fc878f6004520a8d27b844ae651abe13d1a41a1a9fe82c31457e9e3ae4907537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C5SAECE%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCvCaIwsx2bI6yxSB0BlOyQJffuXF6cgDZE6uyzNGSPtAIhAMt6GHSRP0WTr1R8IedpkmCU3D4eH6KrInmzelMl%2FUPwKv8DCB8QABoMNjM3NDIzMTgzODA1IgyAutbKyKDWslnYGIAq3AMEEQwvnOz3qR%2FK1Q4972z0PAoPDfhRxV9k9rpJ2ZOwyi2FD79Im8iAyF3BLjPp3p4c3W3XPh7h6dZFfc3ymsgUEUKrBEbmiZN6Y4aseZQFXI%2Fn8Omjkp22kh%2F0jmRkOikASEosSwkUFa0w8VWe%2FWuAyFhf2SdfAyiYvrylzy%2FrewJT3h8KBOYLatlYFC%2FshxRd0rZX644jVmNvUfpumy5MkNsP2G7omawcNiIE5NZkZwilleUptiZWA08S4qUDYI44h6OE7jKsqLvkMWQUfpqKY27V6unVyndyx5x5pk8qmVGjLAFInZft8pd%2FRH1wB6Rj3mTe8G1lbjfI3ynOTBub8%2F303sO0CjNN%2F3DThUHiJt%2FmwF6IlcJauW96y3TB2EPR9zPsJTWlftaJ4X7%2B%2FiTCRrQtwsxW3VV1LMyDm%2BdCkX125CrZpOAFqjL4232MrHTBbSUfil61PXTBcjUZW%2BrcndEfNXhQ8zuB8OiWJgInLHIWwWn2BZ4cI7zT1%2F3O3ibCqVq3rztYgksnD2q8lnway01aLt2z0Wp%2FQ6Lp8tFYmmfzsdQG%2BNEAj1%2FLF62pNKoHLlFeRLXOFC2b4zZNgjcYyPvDV2CXz6NWNi7HBc5B%2FfEmCDVrCB33tYpatTD%2Bv%2BDOBjqkAaWzdSkJY1YCoMTpjlR%2FfvCyz8urwexd8PoXsdr9e1mdXXpY9vc9CxFlnB7FTuNPR3GdzKV%2FQUfz%2FLNZIhNCx1C9gN30lgx10LOB8Mckisy91qAQ33rRXg6w1K%2FrVm%2B3Eh7pY4Klp19jUPwBOtPqNa7igxz61uKXOLx4V4Q95z%2FWivsvuDS2fGKrjMOvlhFPqt7FfhjSevU3Zwdmp5b2FTHwZWil&X-Amz-Signature=113081545e69aac4f1e984977651c0d8c36c44c502635913ab4bbb24267213d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6IT66PY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDzF1FK%2FBPT4DSFYiS3UouyVy4rA1us0vmbLiLEIJHVoQIhAPHEuzcI%2Fu9PNLOpLLWPkOyXqCu1qRgrtq9BcagldxRzKv8DCB8QABoMNjM3NDIzMTgzODA1Igz7N7oq0qLgtjU3nh4q3AMTAFXYMRhwEAtR6FoeURTu1gf705Ws0NgVfdPmMoaBWHbuF960OaDjleS6%2B20I1zmEkgFlOVldOP%2BzOr922TpwMZnQwZ9akunUaF5M6SJzeQZH55%2FSFKL257P7tiHt%2FiDS1Pme82x6e9feWV8Nv8gOLTPotWsneESjNhTBedX6gYC3O0E1emILnJmHOTecznO4XF13Nf8sBfOMg%2BIQVrJL98%2BYHZdq9roLD3iOTT6NP%2BahP7wK%2BwllIt0sqYS37528tWsYBVgHfaraLYfRM6%2FX%2FTBtmsVRmANVWNRQwrP7QfyblGVEtVTjCLq9wzVudsqbKFWs%2FCMCC5sFJqTxATZuPRLAVeBnvQBbYJwW8Iuivwb%2FUe7aFn3KgzeM0Lyzk5y8SBB%2FIecSdLHqOaLAG4gcSqeyQt9SNP2XqC0p%2B%2BFYk7nfjPIfR%2FUusInTy9lflvGiHzs1akEhfnKPVWiLKsjV5DKYraXIF56xn9vraYn83CUv03FDjvdjN8jxZCUV%2BLzShE8fbBskUGyhiEvjH8zMG99rNfevufuhF%2F4ODuRe%2F58nPxyENuwcvYWguTi1%2FnHRlU6cbeRMjr7mE7xymQmTaSCkmC4fj%2FgKomWPEqt05C3EAnX4SINcKGkl3DCZveDOBjqkAQXP1UOEtd79Yv01dllmFz3mPk5MMvy65UpNKFXp0h6CrapdAiro3Dz%2B8g7jSAYJsoFGIRlzbq%2BlB4zM%2BLS9rT09ozqYa8W4UgsVPbzXYVpUGbs12EG0wZ1laeW7I65U%2FUIxBrhzKlEpvmTyifollP4svksHfmNUDHU7kHU%2BiKF6B03pQewNaAEQGamh8cT8YxHNIpOxGDXlwSwyY5n95GxZJ93g&X-Amz-Signature=89a271cf19d2ac21ec155185295736389a77191c6d9570ff9593da2e76cc2725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6IT66PY%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDzF1FK%2FBPT4DSFYiS3UouyVy4rA1us0vmbLiLEIJHVoQIhAPHEuzcI%2Fu9PNLOpLLWPkOyXqCu1qRgrtq9BcagldxRzKv8DCB8QABoMNjM3NDIzMTgzODA1Igz7N7oq0qLgtjU3nh4q3AMTAFXYMRhwEAtR6FoeURTu1gf705Ws0NgVfdPmMoaBWHbuF960OaDjleS6%2B20I1zmEkgFlOVldOP%2BzOr922TpwMZnQwZ9akunUaF5M6SJzeQZH55%2FSFKL257P7tiHt%2FiDS1Pme82x6e9feWV8Nv8gOLTPotWsneESjNhTBedX6gYC3O0E1emILnJmHOTecznO4XF13Nf8sBfOMg%2BIQVrJL98%2BYHZdq9roLD3iOTT6NP%2BahP7wK%2BwllIt0sqYS37528tWsYBVgHfaraLYfRM6%2FX%2FTBtmsVRmANVWNRQwrP7QfyblGVEtVTjCLq9wzVudsqbKFWs%2FCMCC5sFJqTxATZuPRLAVeBnvQBbYJwW8Iuivwb%2FUe7aFn3KgzeM0Lyzk5y8SBB%2FIecSdLHqOaLAG4gcSqeyQt9SNP2XqC0p%2B%2BFYk7nfjPIfR%2FUusInTy9lflvGiHzs1akEhfnKPVWiLKsjV5DKYraXIF56xn9vraYn83CUv03FDjvdjN8jxZCUV%2BLzShE8fbBskUGyhiEvjH8zMG99rNfevufuhF%2F4ODuRe%2F58nPxyENuwcvYWguTi1%2FnHRlU6cbeRMjr7mE7xymQmTaSCkmC4fj%2FgKomWPEqt05C3EAnX4SINcKGkl3DCZveDOBjqkAQXP1UOEtd79Yv01dllmFz3mPk5MMvy65UpNKFXp0h6CrapdAiro3Dz%2B8g7jSAYJsoFGIRlzbq%2BlB4zM%2BLS9rT09ozqYa8W4UgsVPbzXYVpUGbs12EG0wZ1laeW7I65U%2FUIxBrhzKlEpvmTyifollP4svksHfmNUDHU7kHU%2BiKF6B03pQewNaAEQGamh8cT8YxHNIpOxGDXlwSwyY5n95GxZJ93g&X-Amz-Signature=d008473687f19584836c7a6d58b1d3b99031450c471b2a638bfe086fc77c3936&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HZ24S5G%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCaFV9O9FMAv%2FtwOl1mLMOIm%2FuAwKQLbBg9RuxCGUo8QQIgc0u6jOgA2gEJKN28%2FUNOujFe77N2j%2B8DKD9eQrF%2F9yYq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDCOcABrxs30tZ1A8RircA5bez3Sgk%2BzEw5hcqXC4ilHVWazmIY0aYgjW%2F5Ot92ExsKK00k%2BzHZPo9%2Bm8lnyAuIq94i%2FUWfWx2BbFZE1cr00zNNFxKZgWDmlns1XHtSrM2bVwdsdUgaUAFEktSMoexSZGLcjyfCs7T9NbKdzBXqM%2FCegn3GYjlnzO6Ux4CVH7YRaiaVdn30Q68eVGq6zm4PJKJflIGVC%2BHZLuPUca2FaKch8efS8YEnCi19UbZavGjpvAhJCGwhjgr29lo%2FdzEImm%2FnttXJUSsdSl7wSW8bWL%2Bvm7nRuTGI6ihiBRc%2BMKocRaF4Mcu62qxVrRyZj6hBFfwz7ndQ5okSO2Wog3ZhLsaP%2BknxbhezzrGvJtpDTjt51Vd9nDoVt2SBPXa4h2MBry7Mryji1p1TugmtnfJDVtFGqEVapOrZSmsn%2F4Zj4sWumNoBCgBaAVf34h080%2BKcFVx4D1WwpIntQk0Cx91jqtdeb1e70tCQSJ5%2ByNQoP0ptifOai0k%2Fiyh%2FzXEnZu%2F4mcvFrJMTm80LAOf1x3ksPEdE%2BcphaLBhWoi2BK5cl62pKjx5T%2FaddZqUaXPeTmfUv943Jasrwilecy9F6w0mcQknrEhO2qGQnmSlpAFOG5PFCMIvyY7NYpTmeuMO2%2F4M4GOqUB%2BvBYbfNDWft8vzrFINFQSdvDFonhHcedVPsgoNjcdvHVs16NDbX%2Fh9B%2FMNOzc7uzyipAx4ST9hOWdlaiupgcQgRF0g2C1miO%2FWDBk7bLkxOsDDnuzXAc1iK%2FtWHgEQcC6BCkexQtwk5qPkiKZ%2FPhts8GlvbEi78XawXLG8h98Ji1v6cd4aqMIn0MarjZSEIyqSXITj%2FlWRa%2FQUKpynASgeMbCxNP&X-Amz-Signature=a993cc7fd6c433560e1c0ef9c1d3a3f7eb94fe4831641e6f0a66b84b63a4b918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXIMT3XJ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGHU3C9JZXDoh3He2ot5mKVLk%2Fs9tDgtrbNBiWo2%2FyMuAiEA6o%2FDElIuQjprN9oZ93%2BvW89rT1rXS%2B1vid04lmTe0TYq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDNL8KjkRAeZPq63ISSrcA1Cj9w%2BlrG8fwy6CFO9QOssULg63hX6aOeWG7qJNGaw6C%2FadpySrB5pCE7C4q4MnjSo6T6lzy%2FAKCwqp2KNGPmA6L6teH4iYRsoiogVGE7NXPvkqM28D2nlK5SeJxWVJr7zNasvS9sQfJoID2eiA8fkACCy1ZbbaZU7Z7R6Wrh%2Bx%2BpYBsfNWlqjD8AwW1hxB7BAAH8D0KYmBxNWEnzQLHWZ25vdCaxdlrUx%2FEBoX52pls0Pe6Xh%2FAR7VG%2BMLojG%2BAQHgTmcIauexNvl71idLKz2Jn5JlXJxtvr9HBB1H57xKVoKJNZMFR%2BQfNmDQZTlCtHVIVxTH31%2Bev9JA9X7FENM%2B9Of%2FvkWpnnIQ7vrl85HPbUG3wWOD1JhLvi2JHumGBn8c1ISUS1ZQ9zoZXJw4BKH6hhFvtny9j%2F7WG7Tqnp%2BlkGA9Ghkty53bj34rjorQJEgIXwyfn32hDmnzByJONDgVF4J4UP2BKLH5p0Og68whhoee5OMGMopv57xfngccVPti1Zlgtg%2FfFdcmM8RKAU31gNzxDm4KZjOBfUo%2FbhfMiGjcPAIqtLyzAzFsWWnvp3qr5mDCejWmQxlPgyMU3TSHF%2FoDj3mRKKb0rnYds8jO%2Fgxddq3441Pd0P5EMOy94M4GOqUBpGxdCU32eGITS1B6VRad%2BdTP0KBzAOAonS1tUeWgpYYKqoTy%2F07jF7ffR90a%2BTIfk5V2jzPRXwYOfBhOV0r6sxvEi778ScH5VD0Z8wcgUtxz5VfoaMYhyF4ezYSYBtUE3Q5mHqintcVlqbkuTK1Yk8cu6zHjug9VLfrYCVoP1%2BlEqrmJppjhpPRhUr89idraHz6kNPNakRa9anN1nin7VWKDp1gQ&X-Amz-Signature=ea6df904bd8cd4267fd49b13b053460ab30a66161a7f968de1478beb90d47604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCO4QLXZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIEyRvlYzIFcosbzf3OGTR1Em5FlZU1enmWb4KsZ33U6EAiEAn070Ewaf%2BO06rJpIjZfWQKHqhpBzbt2yv9OVJ9oCTjUq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEpIAQWzHoeyP8vJrSrcA9XW6EKiMgf7XLWh0JaV1tyEiReGnOf6DqnV5AnHV%2BEkdnfmpazfnwcT68Gm7Jp803D9pZAzJkguwu7Uh%2BzL4l8wgHjcffZIONJc9zZNKJvu4zHc55Fo9kUakrH35IMxJ6yyhDwaCovsYo5Ti0mfwmypnOwaFO4ONmRRyFMQEx9O2wecxT5UEgJp6TH92vIUGSWxrOqM8TD2fU1GlKbL%2BbWMHbeNOLt%2FBYm%2FHqbINKlAlYmjkkq7xb%2BbbbU5lq8mRd%2FkesvCkaSlqv4NuWpZKUu6XbZ9Noaw5jX%2BVOWjQDzJJF2XZOIg%2BjXxl5K9R6U2GH2lgA9Wsk2SnzBVBktLq0BPDSYbt6wdVPzJlrHUv55tVjLDtiJkMvERGTBF9iEHCZsxTkp4v92cYM88MacF%2FrHLhl352w7Y1h4vSCLmz9Nor%2FaO3Cx7dxsUp1GnC5jp%2B%2BufGebykDJbgY5h6ywhVm%2B6HgOPxQFiBRgqLrkNOyDPxzyZ%2FjwIOR58CpYTQp87ThW6cnEnt8lt1zdADTbPK%2FKwgJZOkiPxHZsRQ8OVJFFWCJpaTtbG5w7%2B9NxXrz3%2Fsq%2BtuR9O4MO18j5d5Tmwfotcvb%2FE4X5BiLfv0mfAa%2F%2Bb6kIxG04Lw%2FxbJxsmMNi%2F4M4GOqUBilkcp4chFAnm43q3nWkjNPVBN1JmzFi3o0%2F8woknZ4JDU%2BZQTpuE6DRWNp9nV7t5r7wRv1OKbi3sMa1XgnpzDSqWMvBBTYhlhAbP9v7D%2BdvsTN4LxGEhswPx3FIQEeUrggJpZmuUlKq0v52TysslIWiP24ThV7xa4SYHO7f14RQ0qxdlIBv3Rr7QLw0Od9RWADH3%2BEKG08yY2sXp8YDhaolxqKU4&X-Amz-Signature=be291698a9a6baa36faca355ee5e5b3b8944e6ed4147f391c8fe2060f270950e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TGEPLJZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIA2zEx%2FEJ5AbeAP175YSzDJe79DZkowRKEPJJrBFf5TUAiBKPRRBw%2FMy%2BCTijOt3zN2BGE3%2BwvYzHzoGBtB4iCLaxSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMcWWiKJ8EGqGAvVGhKtwDBMCWjkYNZzUdMzZz2kfC02pfXUTu9%2BCs1nH8HM%2F8sMTye0QBce8RZW5D1%2FWiG0samf1hkWJBCopYhOliV9QFOJrxUc2WIj119tdYY7uRh57k7hfCStOHTBQI21ZMtKPpQBN9gR83HMjKMldUzzj5yfwU%2BI8631oOf3Ooo039pkJaFkgWeCyuFN1T2PHfm5pOl4gHt9kUSB82L%2BDt%2B3slgD4jOheylvTz7qKJOOrn3Qbevxr0gfEXHAhY%2F7Nay1aDMDMlPUQ9X72ml3lGzXXiKaquu%2FcfOcbu2NWJC9r%2BsA95xPDDFv6Ch7BAjmS%2BoMRQvOj7BfCxYG5sOO6phsOwxWLOXEnXPnmtkJxd5mB93waTIxeDugEqR6CRhsc9fLQJqzfEyzs9ZrzCL9JwFB8TzgGC6uReUl94Au4hi6x1ABj4bimjPrAr5guDMraWCiXR8BJU%2Fuim9tDjHVdf2D0HOn2zVFps8EKjSw3bqKfCOMRtr1BmOqs9qc7UXZhiuhWdjXkehiq0hPWHx%2BPwG3q4ngA5Hw7eiazbHALrV%2F20km44cR6fqZqqL52KnQpeKGLtW9wMhiiGoCwjuD2QIULxVMpa2Y3akdZuA%2FbYPHArMPekT0QVxF%2BtoxA2Ve8w%2BL%2FgzgY6pgE6FfPCeoNryH%2FRZmHgf71lBgEC5ebl3g3uP%2B4yPsTwa5i0DKEyqH6DZjbUakx1WpYPw43tUzLode1zrZsO8YiKCq5xUWh5VxbSslE1DjIm%2F0CGLMBs5oy5pSOyEfCtIpcyAc328Mk0fI5x2SzCVzf4Ad002YtgX58ZBMZupmYCeIobVzH%2FJwX%2FIW67eCmdJMHCkHriBhRCcweMCxjxEvkzrqYg0r6H&X-Amz-Signature=8ee884afd80a2f02437f5f2040a050c54869ae65c8c4aeb82847181101c2723f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TGEPLJZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIA2zEx%2FEJ5AbeAP175YSzDJe79DZkowRKEPJJrBFf5TUAiBKPRRBw%2FMy%2BCTijOt3zN2BGE3%2BwvYzHzoGBtB4iCLaxSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMcWWiKJ8EGqGAvVGhKtwDBMCWjkYNZzUdMzZz2kfC02pfXUTu9%2BCs1nH8HM%2F8sMTye0QBce8RZW5D1%2FWiG0samf1hkWJBCopYhOliV9QFOJrxUc2WIj119tdYY7uRh57k7hfCStOHTBQI21ZMtKPpQBN9gR83HMjKMldUzzj5yfwU%2BI8631oOf3Ooo039pkJaFkgWeCyuFN1T2PHfm5pOl4gHt9kUSB82L%2BDt%2B3slgD4jOheylvTz7qKJOOrn3Qbevxr0gfEXHAhY%2F7Nay1aDMDMlPUQ9X72ml3lGzXXiKaquu%2FcfOcbu2NWJC9r%2BsA95xPDDFv6Ch7BAjmS%2BoMRQvOj7BfCxYG5sOO6phsOwxWLOXEnXPnmtkJxd5mB93waTIxeDugEqR6CRhsc9fLQJqzfEyzs9ZrzCL9JwFB8TzgGC6uReUl94Au4hi6x1ABj4bimjPrAr5guDMraWCiXR8BJU%2Fuim9tDjHVdf2D0HOn2zVFps8EKjSw3bqKfCOMRtr1BmOqs9qc7UXZhiuhWdjXkehiq0hPWHx%2BPwG3q4ngA5Hw7eiazbHALrV%2F20km44cR6fqZqqL52KnQpeKGLtW9wMhiiGoCwjuD2QIULxVMpa2Y3akdZuA%2FbYPHArMPekT0QVxF%2BtoxA2Ve8w%2BL%2FgzgY6pgE6FfPCeoNryH%2FRZmHgf71lBgEC5ebl3g3uP%2B4yPsTwa5i0DKEyqH6DZjbUakx1WpYPw43tUzLode1zrZsO8YiKCq5xUWh5VxbSslE1DjIm%2F0CGLMBs5oy5pSOyEfCtIpcyAc328Mk0fI5x2SzCVzf4Ad002YtgX58ZBMZupmYCeIobVzH%2FJwX%2FIW67eCmdJMHCkHriBhRCcweMCxjxEvkzrqYg0r6H&X-Amz-Signature=ce3098287ff630aae029ddda8a883e9c613428d89cc06279442f94592e946c03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TE4ATN3U%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIDMpD%2BUFlmJ0LVfk96HP4mbTApX6lxo5rcpjD0FMbuYTAiA5w7P%2BuVANLn13hh%2F59%2BGJgVKJKZ%2Fxkg%2FjZQxqy73LZyr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIML9TfyVgqx6CDs1kpKtwD4hbzhIsFwAdK9VZqS%2FHT%2FZRlINbc8wmsUrzI7XExuJ79tz2qYwkjsiocHvVFmxcVQlIWjbb1nfokjnFTr6RiC2m0kXBXfWDKAHgOcFOdh4uHfsuCtB6RMkD9YpQvowWRGExByJeq6QUpl019v8yhUSgrVEnAromo1woyZlppjVS2GUhzBDiRmagIpeRxvUnIubssRk3KzpWvjRjxuUM9OKECmFVbtcDy64L%2BZYtFg7b4242VUpNUq22g36G%2BQ2iPU0ELDKdPfau36ldv5t9ACE7pj7edn%2BAI47Ma5H%2FzclIW%2BciIaGmNiNxpRmwo8H1O4OHfrsIm%2F1UdOgVCpYK8PnCal9tDwrdEqx%2FqVsCGlsfGx8YmONVlwU20qRKEUKQ%2BcZDZnxqLoOUt0zXFwES5TSqoyVCusheaRH%2BQHW31cWl4xoKempfcRJcGoJ1e5rTNUOawYWLyHsnlEW1Cnu9lzpmTUH9o85MaDaPSkRH75HXB994w0qJvGLpuLD0EGgbMhtyjl%2BndnvRAyxH%2Fw705XtD7uRJ53YW6zM5%2BbkI%2FdugtSsbSbZbOigQ0MUhynaOl%2FDIi%2FDRZwh05zbBgdcx4d8%2B%2FCGYn2Op5oVc%2BHsCNc%2FvPPRKq0QGeh9YESKowiszgzgY6pgGqJgJvHMl%2Bh3DHDRS248I1rLOZOiR8JPQyiVSsQdWPDn2wDOsbNuUG2qZNqYJhjgbGm4xbMg7AJJDOl%2BBZNhO0JrNpy1m6gpBpJbGsEGIoevE1e3zbKSBeH1G%2Buo8t%2BLfKuNH8qgettnkSKJ6jLSNTAHHA6RnB%2FSyGUrl9I0HZDUWafq%2FN8qibDqeMAJeeTT5ZFj5jq8glaXdnC7mozQtF2RJL0kit&X-Amz-Signature=106fbeea989ffefa8ca454566c1584a6f56f96847fe59146e177b5b182d84f71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNI35OFO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGx4wbJBZcfNTqgITIVjIgl48ZZoxjpOoNlCZ2CY6MKWAiEAzcnLuxdlGQMvPz%2BHlkpIiIq3BS0nPvBUI1sDZAj6zLMq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPY8ZPkjhyQT3qsTFCrcA5IbTogyHyuLHaQpaOj0PMqvndYZsvUTZdeaDpni8stw6U2BZiEm1QWG9EBGYeW%2FzKKRb%2By2dqfZDGN2DZUlWxMat1AnQGFfe4JgCaIjS8YgPXOJ0950%2FAKH8pwmr86xa6%2BmSbZifGBgqVYeNNsFRAvSvzzckLK6QcIodPhgWt9QnYwI6MZ7burHSIQqhDskFZ6DG90xpLCgfGS6orZJ0HVUFLEL%2BBQRT17VXWgEKgtZN%2BflOWuRngiMQBsLDoOXJrnENgI5XGijUc3SrVUSJ4LpzzipZf%2FQeUDA0Oep3W%2FJVvb6wDCkKSLtOTRvw5KIJ6xWyX8gQoXGNJ%2BkbeyRDBt%2FU5wvAkcBkXXvcCnxxb8k8qNKBp5okCDzTvcgsX6%2Fm94oOTI4D9UFDeDqidjXIMjLYdss8yycgZ5ezzcYnDKdiPVM0tSo6t10yH7JHbadTxb7Or%2FGj1sDq1NmuzEZJ2tucaEnHfo92GMc%2FWOdv%2F3Cmea3ShDjyHYR5tIiFKSRffVjECpmn2iTIyb9SiaYRuEciMKZnAVnEsRvZ6tbCBef8devTVF%2BHDdUOUIX4%2BVnCy007xspoBj%2F8AH9uAdootQIfe3DrJJjrdrrBYsxIZVfziD0O0fbZcbpos2XMI6%2B4M4GOqUBSZf5XxYfI9prFw8Hk6e%2BX1CJtlQNdMmiAcduX6q1zapIiiGuaNvZ%2FISbIYfONuMI1D1xvZHj9DhXbiNuIFHDTKblTrLHvcdZYlf9Z0DoiQe2TUWJ3gGGpktOQodixEuQGEw2%2FNP3BdYF%2BjbX07FIDxA2qJWSVXkC3k1hXZ2VvFGeaTdBsRnRi63Dd9LcNUOgz2%2BbNIya4sBQoqf8p9U30ZhXZvzc&X-Amz-Signature=be20c66ec1eb52d149f8e0914a0501305b46335acc9ac3f273a258812dfbbae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNI35OFO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGx4wbJBZcfNTqgITIVjIgl48ZZoxjpOoNlCZ2CY6MKWAiEAzcnLuxdlGQMvPz%2BHlkpIiIq3BS0nPvBUI1sDZAj6zLMq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPY8ZPkjhyQT3qsTFCrcA5IbTogyHyuLHaQpaOj0PMqvndYZsvUTZdeaDpni8stw6U2BZiEm1QWG9EBGYeW%2FzKKRb%2By2dqfZDGN2DZUlWxMat1AnQGFfe4JgCaIjS8YgPXOJ0950%2FAKH8pwmr86xa6%2BmSbZifGBgqVYeNNsFRAvSvzzckLK6QcIodPhgWt9QnYwI6MZ7burHSIQqhDskFZ6DG90xpLCgfGS6orZJ0HVUFLEL%2BBQRT17VXWgEKgtZN%2BflOWuRngiMQBsLDoOXJrnENgI5XGijUc3SrVUSJ4LpzzipZf%2FQeUDA0Oep3W%2FJVvb6wDCkKSLtOTRvw5KIJ6xWyX8gQoXGNJ%2BkbeyRDBt%2FU5wvAkcBkXXvcCnxxb8k8qNKBp5okCDzTvcgsX6%2Fm94oOTI4D9UFDeDqidjXIMjLYdss8yycgZ5ezzcYnDKdiPVM0tSo6t10yH7JHbadTxb7Or%2FGj1sDq1NmuzEZJ2tucaEnHfo92GMc%2FWOdv%2F3Cmea3ShDjyHYR5tIiFKSRffVjECpmn2iTIyb9SiaYRuEciMKZnAVnEsRvZ6tbCBef8devTVF%2BHDdUOUIX4%2BVnCy007xspoBj%2F8AH9uAdootQIfe3DrJJjrdrrBYsxIZVfziD0O0fbZcbpos2XMI6%2B4M4GOqUBSZf5XxYfI9prFw8Hk6e%2BX1CJtlQNdMmiAcduX6q1zapIiiGuaNvZ%2FISbIYfONuMI1D1xvZHj9DhXbiNuIFHDTKblTrLHvcdZYlf9Z0DoiQe2TUWJ3gGGpktOQodixEuQGEw2%2FNP3BdYF%2BjbX07FIDxA2qJWSVXkC3k1hXZ2VvFGeaTdBsRnRi63Dd9LcNUOgz2%2BbNIya4sBQoqf8p9U30ZhXZvzc&X-Amz-Signature=be20c66ec1eb52d149f8e0914a0501305b46335acc9ac3f273a258812dfbbae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRTGYVFK%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T232754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIFpSeknXHzsrAFCjHovheDiAgO8TX%2B3S%2B9t9j1K6WeW9AiEAuXah5mE4%2BdgktdAxSLWovFlb3dNdv1uXRp%2B%2BcVK0gL8q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDP%2BXFC5fY0UrBOORaCrcA8vOlQZq0ILloLu1eFsf39SxWDhX2vifzJW3OwD1EvHZdB6Pp4CbWnIIB2sy47sPiBm%2Be7qSNMvjohBqTyW1hQ3k8TDP%2BEMBXZQXb9DeqR8RNSzwUUwLbyBOW6frOp%2BND5HWE92hUYqqmqO1oJf1r5CrJ%2By0Bkzdf2Z6rn36ATRo4KMiQTx8N8PxaZYZthfYdIDwQdRFeDnzWp0lL6HJKdqwUtn3nH8D4l62tKORL6pAUibiEFkDgCzAW0ZFOy%2FxRwtBOUbBqFBX0fNXgZw7Uh5P3fsh802cWYHEJ5jey4%2BSOS1AtGpR2u%2BsSmyikV6J5FTIi3sl3HyiKgdT%2BO6pMI%2B2Cr%2BYmmmcA7jMrp3ggDxww%2BjirzvMUD%2B9YC07xFwGhzHPypQQkkwP13Yoe01lECBzB5sRsGBD5QqXIkp%2BSd9CcRbGlMI3uHpF8PtITL%2FcP7miAnNqjK0ygLMIscB1SOMtQVzOIyq9GvAG%2FAHZ84jnQiChukhcIqgbllISe5%2BBBnd%2F6RUPoauvRkvhSnG6Gv%2BX%2BpyOqSO4hXbsmTPALZpOKmzJSbMRvqqnBFTgrK4fxDZPrHlB2Xjq0TizY24wgFjI8EoV7x4NMN98y4iAn2zTJ88uxnHuepOQfPXRMIPr4M4GOqUBJv9B4II9OStABPIPe312O5hCvwBXpgtG20D38cc0X8%2BwQ4SmmxTAm0pIPZ3o5yVRWoowaGcna5jZ94%2FA%2FFPc6GLwHiL0Kq0BsVwpPlX1AtSsM%2F0PYaJudPDGGNfMoIoH2qVyKR40p0Ht4nfE0leqjVoVuQrkRgv56tbxlfxwgS5t8rsQHgt2WX1l%2BWhp7ElAkQhzpx97xABPKa%2B%2BEBBikjiLI6OL&X-Amz-Signature=59c0b1fc934e6773d28e9eb83ed9df77d12bcd59349068bad7914216f49ae2ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

