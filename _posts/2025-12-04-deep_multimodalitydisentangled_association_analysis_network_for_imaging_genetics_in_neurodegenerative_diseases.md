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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCZJULD2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDWoUH%2BPrNxMlTxCsYGqDtKpS7Q2JIt0WRal5rsokANQwIhAKiB1xUbOg6ECR58Crz%2FrV2hcaFbjrePARKgf8qHA5pAKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsbSVVqqdaTNMwm50q3AMLxRPHZB0BlXdvgR%2FXEkIdTIHmA1VeOXfweuhOSddsRfQhtiscy2nw3PDh%2Bzvp7Qx5a%2F02ZuqE4ZZngHIJCCnrhQOoV6bp4lgLro6gb2wAhGS%2B%2F%2BTgQlwHcSBhHD5cHUrLSgojucKLDEq4X5NW2CKnVtQwSeA3dnYdH7mo%2Bj1uMUAecX60u8p73XTGGLWeQV4UYmrVFAXQLWN4ZNXsrTFGLdVxQtCWcbznYEzNYYXQrZ3OG5lrE0p2WM9dfExVnj1rt4tnf532y%2FYn6uRXPopOks6Lw4NO88HPU5HlzTSCqerHtbweYrfgTDYc5bsSQBRcVWjc0dPX55zSwTUjsb7aPjZgMcM4Lr555xTXGFkPCHobZub0gOZ3A0YoNG2nAU9CqOWFp%2F6U3GykdRirzMOAlfQP0C6KhLignCTmZOrOVPDRj0UnDOhz22EZy4Oznpmps09BQ5MWz7O7Ix0MODyo9SJEui7ySZg2VxX12NK9SBKpV1CyET5vmaHDLhZQ47Q8uQ2A7P8S1lSwcDsl5VPwm92i%2BO6OJ2loJ2LjnX4OIsmQbSi%2BeKwAY9lxZWDMt8ICGN%2FwuO7e64fM8z%2FcUOpB8N46lSZ%2BA1fjWnIYdvjCPWWn9WHiQsg9SgYbCjDivZ%2FOBjqkAQfzs18ZnTSxrSftaTMKukpdsLjVVXllkM9PfVVz3ys61cWke6%2FO9NrpyoOSNuZeQBD42Um4v8%2F2eCqOGS%2FYt0e3rDOdAyPAtgqrQqqtesWhKgvGgsidZ9cbQWWia66PGCkGST40oCBnJElZWJippdsCyX8SjI1B9ezLpEafBSO3%2F5258uJWHJgrmhtdWvd67Tb%2BWvVlP1WRqfRY7zrPcOTJCYad&X-Amz-Signature=cf8a66610063e768e0753711a55f7600f4130f5788315f31114ceb5f0d79ec0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCZJULD2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDWoUH%2BPrNxMlTxCsYGqDtKpS7Q2JIt0WRal5rsokANQwIhAKiB1xUbOg6ECR58Crz%2FrV2hcaFbjrePARKgf8qHA5pAKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsbSVVqqdaTNMwm50q3AMLxRPHZB0BlXdvgR%2FXEkIdTIHmA1VeOXfweuhOSddsRfQhtiscy2nw3PDh%2Bzvp7Qx5a%2F02ZuqE4ZZngHIJCCnrhQOoV6bp4lgLro6gb2wAhGS%2B%2F%2BTgQlwHcSBhHD5cHUrLSgojucKLDEq4X5NW2CKnVtQwSeA3dnYdH7mo%2Bj1uMUAecX60u8p73XTGGLWeQV4UYmrVFAXQLWN4ZNXsrTFGLdVxQtCWcbznYEzNYYXQrZ3OG5lrE0p2WM9dfExVnj1rt4tnf532y%2FYn6uRXPopOks6Lw4NO88HPU5HlzTSCqerHtbweYrfgTDYc5bsSQBRcVWjc0dPX55zSwTUjsb7aPjZgMcM4Lr555xTXGFkPCHobZub0gOZ3A0YoNG2nAU9CqOWFp%2F6U3GykdRirzMOAlfQP0C6KhLignCTmZOrOVPDRj0UnDOhz22EZy4Oznpmps09BQ5MWz7O7Ix0MODyo9SJEui7ySZg2VxX12NK9SBKpV1CyET5vmaHDLhZQ47Q8uQ2A7P8S1lSwcDsl5VPwm92i%2BO6OJ2loJ2LjnX4OIsmQbSi%2BeKwAY9lxZWDMt8ICGN%2FwuO7e64fM8z%2FcUOpB8N46lSZ%2BA1fjWnIYdvjCPWWn9WHiQsg9SgYbCjDivZ%2FOBjqkAQfzs18ZnTSxrSftaTMKukpdsLjVVXllkM9PfVVz3ys61cWke6%2FO9NrpyoOSNuZeQBD42Um4v8%2F2eCqOGS%2FYt0e3rDOdAyPAtgqrQqqtesWhKgvGgsidZ9cbQWWia66PGCkGST40oCBnJElZWJippdsCyX8SjI1B9ezLpEafBSO3%2F5258uJWHJgrmhtdWvd67Tb%2BWvVlP1WRqfRY7zrPcOTJCYad&X-Amz-Signature=cf8a66610063e768e0753711a55f7600f4130f5788315f31114ceb5f0d79ec0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNTCVIYE%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIA%2FjVGqR04EG3zpMnOYWsO6k4cmwwnu1PattlBioky7rAiEAzmQsD3sbNVofI5I0gP3TRHrDRD6HZPF12L3tsNXZSY4qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBcc6FRgK%2FxsJpAZeCrcA3DHJphGYnpW0NpmAQ0egPOBwkZNPuiga25ZbSYc6pdTbfbNluxMlgoaoAI5YEhH3sPSpuxPrbb9RIyKrWgQehbeHmN5PHQpWrHCVFtGin65XGLhBd77bEV%2BEsFPtMC9IpelHuzbQ3qap0Gci9Zq6e3quUVCG%2BRft7BKF49%2BLelOCvnNILVZ7XWmwfV9VS2FQT5FhMrWUQit18hbS5ymgSR2XxtssdkWw%2FNDhO5hdPhOt0v4n%2FmdZz5VPbozUWC3%2BepWtDXml%2FBveQpyQOWZfOunTX37bcOqE6N2P0etKpmfsb25cXMTvnG4GPNVsmRh396%2F7cdP0K2sDqqjKvMp4xRPUwBaisZ7z8P4j6NV%2BDhyEMcd%2FwWWe%2FnN2MOIT5%2BUy%2BVvhiIW076IT1llCK3kJKTILwFzdViaoJdwZgIXTs8KOEx%2B0LMrNcnZbCdF%2BzpDiDyJURAJIiHucV5Ubf4xh5mMp1oxPTZ6Ql%2B%2BUXyYofMJt1ORwBTZTkAVvz9hBzZq%2BL5Odw6meyc2FAxlhHVlS92fIau0vamwaYI4YdETGCMwEpqwlS2EZxDpx%2F%2FA4QXOugIa5dcNFPiD2%2BlXeTJXd5a6ovhlQO8jnCU0nEWkLS%2B1Q%2FC%2F%2FmqCPtaWKoMSMNm9n84GOqUB%2FIzhC9Xr9V5XiuHT3qRIo5p23FZvdF6npf6orwk0oXZtu2JQ14WLGt1QtzlCVfsy3NrdV%2Bs5X5wUgz6slJSH6O%2FkfAYXXDkVK5QFo5J43kt8V5xPGHfglQfydIrdRpasRwXf1FNbnsr2frHPETPnjdliyWPtP57HGYnUDvTKYOQKcK5iVe8UrMabRuedbGaMezJBYXh8QO961BWVzwmcHC7Lb5Dq&X-Amz-Signature=2c99d3a415ba7683a5c7731537fdd1e7bf9295128b65d67be9ab21c1d79dee96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHKN2M6A%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCvtrhTQAP1UVVGbfxTWKYFWE2nm7NYA4C4fCcqbpJffgIgPYNSZuL0lJJKJMRQltijwztI47yaeclIi3fBSmzf5RcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKsD7WYX4J8NKWSiiCrcA1vPkfLMYRfbijh9FWM4RT0kDKK9OoFa73%2BB921uPT1TeZc8nCcZfC1zq6nXVLt%2BFIf2SA79jydM3pxufIzbEbeVKbRhSj3v%2Bd7CwITUxW9CB5lJahKrfP19kYkGsaiE%2BOj4RkuRlFPxYBbLwT%2BQ8S5lnGJ45OGmk%2BaLNH3c3uGCakx3TWeP88B2OOt8NJBF4%2FWcKKe5wd0vdLp2tsS71Dan8MOIjEEACnnDlDbG%2FIFhwQ9FfFtmre8bYKzI1GD05NRI0gBLPxlVk9MRY7818yZIBdrCIYtOHwJ2gXLyR0t2e1g1wntS%2BUP0dU%2Fs0G0xKB9ODIWrzQ40MrSvpO%2BUPf8%2BnuXS9NNIzFlPIIcha0aW3af7t5RlCdhr8itKbkgHVys7I1fBr8klBonVk2mu8rGymWcqFmatOLJyHmqctV1QU1RA%2Fx27lqzMF5Z5wK%2FuVHhbiZp%2B3CzrMJKXMjvYeKfdlLHJN4ZRcRuO5E5pSg8Oh%2BWeCAgcSx2AFbgFivcpNQDGkPJX2hMQeQ2YZhOCKM7MjU1VJlVBhtVOgHs97yhiFNmAxL6LwzDTp6i4QuxJKeryVqK14GBE4NvyDBs6%2BUGUULqaV8kYnomeRCWyjDdgSY2khOlXHtTmoU%2FpMLq8n84GOqUBsXoVdxaAeeNwzY0GRw9cFU2o0rggue8rPcOxMaIf7qqSTQSI6R8QMKQPEo6tlJTkftaMF0JAcfLT2PFhVEQ%2F5Wt%2FDO9g%2Fr0NsmZJw%2Fd1eqCerSdL0E2ZIXQ6oQ44KnAHmqFuCfNqAvBC3iWtpnAhsgG8nCMF2%2FnKEcAVShODx25aXI2BRgTGKKRG%2BG3dHng%2Fd4%2FGDYDLkzQvCfxEb%2FGzJqgIZmFd&X-Amz-Signature=7c2b822b3ca52429ed7911d2cc5f89a8c3f23a7c801a35b6588b7203739e142c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHKN2M6A%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCvtrhTQAP1UVVGbfxTWKYFWE2nm7NYA4C4fCcqbpJffgIgPYNSZuL0lJJKJMRQltijwztI47yaeclIi3fBSmzf5RcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKsD7WYX4J8NKWSiiCrcA1vPkfLMYRfbijh9FWM4RT0kDKK9OoFa73%2BB921uPT1TeZc8nCcZfC1zq6nXVLt%2BFIf2SA79jydM3pxufIzbEbeVKbRhSj3v%2Bd7CwITUxW9CB5lJahKrfP19kYkGsaiE%2BOj4RkuRlFPxYBbLwT%2BQ8S5lnGJ45OGmk%2BaLNH3c3uGCakx3TWeP88B2OOt8NJBF4%2FWcKKe5wd0vdLp2tsS71Dan8MOIjEEACnnDlDbG%2FIFhwQ9FfFtmre8bYKzI1GD05NRI0gBLPxlVk9MRY7818yZIBdrCIYtOHwJ2gXLyR0t2e1g1wntS%2BUP0dU%2Fs0G0xKB9ODIWrzQ40MrSvpO%2BUPf8%2BnuXS9NNIzFlPIIcha0aW3af7t5RlCdhr8itKbkgHVys7I1fBr8klBonVk2mu8rGymWcqFmatOLJyHmqctV1QU1RA%2Fx27lqzMF5Z5wK%2FuVHhbiZp%2B3CzrMJKXMjvYeKfdlLHJN4ZRcRuO5E5pSg8Oh%2BWeCAgcSx2AFbgFivcpNQDGkPJX2hMQeQ2YZhOCKM7MjU1VJlVBhtVOgHs97yhiFNmAxL6LwzDTp6i4QuxJKeryVqK14GBE4NvyDBs6%2BUGUULqaV8kYnomeRCWyjDdgSY2khOlXHtTmoU%2FpMLq8n84GOqUBsXoVdxaAeeNwzY0GRw9cFU2o0rggue8rPcOxMaIf7qqSTQSI6R8QMKQPEo6tlJTkftaMF0JAcfLT2PFhVEQ%2F5Wt%2FDO9g%2Fr0NsmZJw%2Fd1eqCerSdL0E2ZIXQ6oQ44KnAHmqFuCfNqAvBC3iWtpnAhsgG8nCMF2%2FnKEcAVShODx25aXI2BRgTGKKRG%2BG3dHng%2Fd4%2FGDYDLkzQvCfxEb%2FGzJqgIZmFd&X-Amz-Signature=d1b782a0c9ba6278354e9949b701f3c7be76cef38aae44057682954b378908af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJZ5Y6ZV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIHl0cDz97MAQIelWZU1b1I%2F%2ByyJ3lmWop39uBLoifw4XAiBm%2BJjRD19cA6G3z%2FcAes5OTDx770DyjVid92W2ETJQTSqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT6YHqFp3idHWAG2OKtwDn8KZfijhspJStLqvPwyR1kzx7HgPq5%2BKvuPNxNj0%2FZe5sP3II1fygr2PQeAdM5rxSkpnzc6hJmJz6mozsc%2FDk6RnPOml7ZgYHdKi6%2FSnopSCU0ZfAuDJQOdEZGlSSaZWWZHgVTUjFv7CmFKZ%2FmMhFw01khXHBnOJTfRdmgh6sBwhhI9fCNfZcwTT7sHaTBlBq2AKWVZQaGxhIi0J40So078DOBjpdDryFZwyi7GtaAic%2Bd2wCuI2ABSsEGcntushrHrZdYakO%2FwDZyVE9WjQlQLqatyI8Xl0T1eMtopBtwpAnXUqXai%2Bn7HPkLBaOMtavj%2Ft5xK96yvLmxcjRPqHk7PJpjRSYhxR3PXo4QuCh78tBjWs%2FVrj2xkFAmywjwnyLZcARLPn836P5V2Tf8V2waWtYKAlZpGJDqTd2ewYTOCXn6wdIo1oTrRpGuOnddV6lbUu7XD%2FLQqXQeFHcrCaCfTHGzU8kiiQGl6beQGEU3FG8gQMz995dJ0UMN50w1za4QaI2Bn7ymSKaCos%2Be%2BnQINaGocitZaPr3E8ndoK%2F0oKQb86E%2F2DNhi75xVIQqIKP7Rm%2BzCldOgGwD7wAsTiV%2Fs433n8VEN9SrD7qU2Qmk6yRS4GTV2verJ9PKcw2b2fzgY6pgE9TwFUGWn4KXQG4PaGzPoxrjCsPDNYftoPTOgLiJr%2Bu2SIS6q2FY5sNXioZgWxIcjR6tIh2ENxjyP5G%2FTawu3I1xETaj8bqwlHTT8szI5WknE0apkdWC5dPSbeNCnYSCEf1Y%2BRIjKcE9eglVMXxPz8vvf7LW40fU%2FUOwN7xgA2ms7e6AwmnkJYfz%2BGKqVSeIx56ops1nmfCiGgErtL3YPBOWMqknZw&X-Amz-Signature=8e62bfbca2563010c5d9026e3cd11c9a00002c6512b0126e53b133fec24794b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666747IUG6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIG0kMDC4vo48QyekTgChu9mvYvyGfDz9C2%2BnHIMameGPAiEA1eb3wBUE4EUg8rbEsgI6U3PdzrrdqpQSVfFQ1qUiJ3kqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHKhjWFfH9Og1qEjOircA7Kl9Nr8DirWLcVmOO8YkkmIfxS2MKp74ANmtlyDkji4Q%2BuBMMKcdMJXyXx4sFmfyax4%2FSulZuKquEvwibo79Bo41ROWiMuxBYvXrCc%2Bkty4dSDynf7NACEclQ%2BF2Et%2FyfU%2FSBcWM6hvlI9g6UHTOWnByL1Cp1%2BLQ%2BYkALfzaeChEszzpQcDe5602BwTXCSKwbu5UvAyyiyPx0zhmvJjdKpVL9CwUwYnNPWOqYoOno2h9jeY2zWKXvbnyuZ5Mv4Fat3kUDODZuuuGH81aX2f78JjQbWMdU338oJ52XH67A4o2fVk%2FarHPk%2FHCoAdVu4QYTkZAghbvkyhBafBObX14mAQeh4%2BoEJCRFU40v98QnAPfmxsFjL4KNpYw3PO%2F9JSKcJlrBqP12QA5Uqg5KGAmLi4Ij6KpYUKHXG8kqzg8EvYenz0UV9K7viqjCp03VKdmsZ0C2%2B3jVzhnszxApAOx1ZWP1zd%2Fra605DYIj7X%2F8Y%2FaRxzKUj%2FfYpQa13tZ46vvvf4DxUExENqv%2BxaaxgXA3Nab9TZ1ncs4t7fZWaU%2BjAOV5V6J9DtYqNRVxBJjIhd7j6cKmkUutJquuGnzqjLjjXGgatwEa2bLMMgDqRip0Umb%2F21EC9i4r3zkC5bMOa8n84GOqUBZWp34FL%2FIzgKwBRZS67ls1g1gFn%2FLeYcA6OhRL0P5EOLs43nmaxQshFSRHMMSq5gJ%2FcXvydGp3eLVmKwTfd6l%2FQI%2FABJiX0ozH72q07PS%2FmOEGCiV6dDiwZb8HQ2bkdBVJ6hIu%2FWAc%2BQR%2Flx08TkGyP9kXlOzJGEdaFP9QN5hwpenJmpcXD0ODmwGIzL1%2FORqFMqQgEj%2BeP01g1tRdCyTogelK22&X-Amz-Signature=b2a65ea1af3ff8a1881190e1d0a3a2c449ecd09f4157851885091f9176bdfcf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3ZA7NOE%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIG2561rRUwxwVHjytRGjXp6xDxPCGUR%2FVA7nBUVfQM3rAiBRjHGs3dVrSK74dVKrACYIQRlp9Y8CjtD7U35m59BP9CqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaIUCoDMo04RBRWbMKtwDlMRXcwajsN%2BybBDm3HsA2fSha%2Fsur1pxqLdzqRhyZ2B8uzS1xAaZTt83OpDkxhcOShOJz1sCZuEqIqaw7q9OvbHSfkNPDD7iMZswz3PqukeFskqgpGOhSl9FBvsHgHiPd7JrRLDEu1n4vFkhuwgjF8d7TQp%2Fhq1ZxQQfPSa67b%2F1Aq8l2zY5T%2BFEAf%2F%2FG3AXVrZ1LJjc3C4qqhDw%2FgSLLf4QLFZyWQ%2FapJEHE1BjS9V8zpNIUw3PUFlqKlRnup42X5ikQgjj04dPX06OnEEiz1wf7%2F06VEdf9gc%2BTHvhGi8BQVTU%2FEk1Oz07tU2paRjgBu3dZT%2BwLFfgxDZjNL9OQtr6FFLKM8ov%2F38poU0wtmIlBsxcW3eNKuiE%2FGrIAJigGClAm2gHpNzcJGEib7esX4c5N1LHOv6ogkbEXoG3vUdeoAkb53NzhYKM1GXLKuKDgVwlRx8yKzHvNxXitgQba1Cuy3PkGG2Knm32khvNKTFSKai9O9r46KIk2vpPIn%2BbPlmPOu9JECePnrRHtHffA6OENRpa9NXhacw3MqkS34HNqe3K4YqxQ27hNntTt1EMciziO1wksT7jYFZwiaqgQqnFf2mVJLIFhBAq5l4vPolhoJGhRyuvUsoZd9wwn7yfzgY6pgHeNwS6%2BHza%2BuFX3m2fL%2BdVjr4xSr3D2EMKF273%2BolADmCgfDEkRGvnlmXRvg3y%2BU3HnUxJHeQOxOhh0drFqAoHLIW%2BNfIBbxdtO1HBwstEamLo%2Bo7j7Oe7jwrskZSq7YpRMF0s%2BGMisigNkdVJ3V099Z8LinTERDEFek39gVQdSA%2F79bCjByk2ifnUce56gGFk%2BAvwQN3oRAC2L6BDj9oU64dX%2Fzms&X-Amz-Signature=7ce635938616d5ad5516d1e0784f9212c9a46f82653e98bd8e5c6be7c1a55a30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBZOVTWH%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCckcGudgeW017GjOwB9ogbh4Cc9Kmeq5IpYyp1mxGL7QIgH8WHkh%2FZdZh5TD2IYGV5ahSnM%2FffjPhG45lH%2B0FflK4qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIcInDEJYpPY1VuGrircA%2FTqpMjlhlc%2FcKebJibNh7znCm08FXQ0lqThMwJ5takFxqp9bZ87fwcLtCMYFVxbOFkh%2FvYUnVPiANHN7Vu7Pwk08nCgVxXTWf1MWImEQe1L2Cts6mYd91YvFiVkfMigUOKYEO5fKXWqesRbN%2Ba4CxvFOqcQxi5PhniqxG2sBCiS0q4dCBQJq%2BUt818MD%2FdjMffkCJchYyqpMuzOY8OMQkDOxZan2GMvJwdINegMDuU7zIHOM5BUI9gjT0j2Q21weosJa6jwRljn1Ex1s8JDeGKAfKNLednJwPg1PZ7Xh0GoB7b2Y8aRhgge%2FrYdB9Bmwc%2F%2Fj%2B1YFQBLHJdjOCAsNs5jg%2BytHqbVbok%2BPel7VTrwqWYmtsEA%2B2t9ECg%2Fs6ZVVKGjyovLtSvtIo0JguHnyHzTQ6TiiDqnB6Qsyd7FHAsbc%2B5jX9Ca0J0tTvMMVJudFATR%2B8Ih6RUfiChR1bewhbTryNVkB7RCKoSbeAUZrvNFmrOMk%2BVcrTVsFR69i%2BlOW722beMa337JvnVu8az4XUIYqfx3tRgoQYqfHBaWjUzH3eHrmZIRZH7LNJmoQ9OVIP2kzzF60LZMOrzBH92LIcGq%2FaWM3Veq2KXwDc0UA%2BW6P1pdBGPoIFQcxKEzMOi8n84GOqUB9ib%2FeNQn3cPNCA1OlXLHjEsBCk0QltZ19RQ8VCDFGpP96ByQ6hOjEj%2FS9oumfuf6gVdStUdwoxjabdjq83kHPK9%2BPwBjGyFASn2YK%2BdLsUkt8MLNDXyZdMyBN%2BCYe%2F1u4QBng4n1NKO03Dbtq38NoXa6aN71htRfDv7%2FVwmWY5uUXqI%2Bqb8B5LIZsU0nOEe6Ba6MnzjjGo5HLAsR2HnT4phrdmzB&X-Amz-Signature=d304a2cf1ca09a7121ea08b86592c63b59e2aac70c9ca971092d6db9e38fc431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBZOVTWH%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCckcGudgeW017GjOwB9ogbh4Cc9Kmeq5IpYyp1mxGL7QIgH8WHkh%2FZdZh5TD2IYGV5ahSnM%2FffjPhG45lH%2B0FflK4qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIcInDEJYpPY1VuGrircA%2FTqpMjlhlc%2FcKebJibNh7znCm08FXQ0lqThMwJ5takFxqp9bZ87fwcLtCMYFVxbOFkh%2FvYUnVPiANHN7Vu7Pwk08nCgVxXTWf1MWImEQe1L2Cts6mYd91YvFiVkfMigUOKYEO5fKXWqesRbN%2Ba4CxvFOqcQxi5PhniqxG2sBCiS0q4dCBQJq%2BUt818MD%2FdjMffkCJchYyqpMuzOY8OMQkDOxZan2GMvJwdINegMDuU7zIHOM5BUI9gjT0j2Q21weosJa6jwRljn1Ex1s8JDeGKAfKNLednJwPg1PZ7Xh0GoB7b2Y8aRhgge%2FrYdB9Bmwc%2F%2Fj%2B1YFQBLHJdjOCAsNs5jg%2BytHqbVbok%2BPel7VTrwqWYmtsEA%2B2t9ECg%2Fs6ZVVKGjyovLtSvtIo0JguHnyHzTQ6TiiDqnB6Qsyd7FHAsbc%2B5jX9Ca0J0tTvMMVJudFATR%2B8Ih6RUfiChR1bewhbTryNVkB7RCKoSbeAUZrvNFmrOMk%2BVcrTVsFR69i%2BlOW722beMa337JvnVu8az4XUIYqfx3tRgoQYqfHBaWjUzH3eHrmZIRZH7LNJmoQ9OVIP2kzzF60LZMOrzBH92LIcGq%2FaWM3Veq2KXwDc0UA%2BW6P1pdBGPoIFQcxKEzMOi8n84GOqUB9ib%2FeNQn3cPNCA1OlXLHjEsBCk0QltZ19RQ8VCDFGpP96ByQ6hOjEj%2FS9oumfuf6gVdStUdwoxjabdjq83kHPK9%2BPwBjGyFASn2YK%2BdLsUkt8MLNDXyZdMyBN%2BCYe%2F1u4QBng4n1NKO03Dbtq38NoXa6aN71htRfDv7%2FVwmWY5uUXqI%2Bqb8B5LIZsU0nOEe6Ba6MnzjjGo5HLAsR2HnT4phrdmzB&X-Amz-Signature=ad3c479bb30773370401b867ef8e5234cfbccf7331bbf6b67bbc3d80916b1dd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWOD6GIX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDSKaXSxrC%2BDTy7XYTmMp0hVNequsIFr9CP%2BWDmUYQWnwIgCnEZFFP2lMetJ0un6TgjhImu%2FWnqQ7m5UQQ3Q2SPHtAqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCL8l7EYk1DSfsZwUSrcA%2FBazoBHo5J%2FRJdk4QRHmk21WKWoX9OKwphJnLDDY6%2BPjvO6uJFO%2F5Lhy%2BIowJ8likSuklpauNDmIY2Gw7ijXJ8uDPkWbprdqzMyapOin5gS3qWYB6UexdQtE9w4%2B4G32xexHww8ZC7QaKkcFghDRhzRXMUP1aCOZUCxjjzyBWw62mhJA5tHjbaFDPimSiLbtx7A%2FhPM80NLx%2BhISnQAmgeAgu%2BPGxHFyRaGO71Q1KkgMdt%2F90Qo7KMxQDmbhPi2C2%2B%2Fx4emapaMCYNWw1NZTS9g7T9IaSZodUS1Yc772jc4iq1J7FRUqaavYpbY9lu1czenjq01SoTXa7q%2BiLhSKZTa3zPF89NBv8FhDKOuqV%2B0BiZ646jYBWVJZO3EN0ESwLTadxMVVpipI%2Frzrg8LQIpEdbNgzWMK4Gvbf75hht1RHV8%2FW%2Bt6KPjmXlZbPixusmsTCmoiWYv0BY98BrdB5FkWyc8zrE08KDheh7v%2Bv%2F097JPGvqDnbxLIyq7bspgJeVg%2FBEkFXQQ%2FvNVE5%2F5LjFoP%2B8HRwKOveAwRhodVQntX2aar8xVcp8LWz9AQ87OR3tCwWmPTiVWcZMz9efW5dfsao%2Be29EqVKwzgs730ZozAhN5yYBAuGTv0%2FMOCMKi9n84GOqUBxAm4DWKHteOnK2cSLZsSE3NN2eF5G8lQ%2FjvEV%2FpR5t9V05l2YxbJCdJSM8O1MOv6JGzc20%2B1%2BMunafokuecxXajwNXOL92VV8PxfiLH%2FTkC8zht6NdLvtW8bwL1xGeerJADvKyUQZDfiq4hAVtRSsW8ILea12ECp%2BRkiNe1kZDiLIhZwYgMB0YpG9U3EasGEnqOAwa9rdLiVbZPDJ7bBxiFioInT&X-Amz-Signature=f7946128ad5e3d4c7a6af4bba0e0bfce1274087a36471f62f845c2bc17619ef2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYEIFHUL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD0OqeW%2BAi2Wd28ekB7GNi6fei%2BPXM8OeDNzOzPqcIRMAIgP7q8i9IGYPKluRUVLhMaLqUrKDJCkCcr%2Bu31JPPmQ00qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxsFt9EDkjs9KmAcyrcA%2BfpU7Usp2ujmHa%2Fq3mqbTnUBTurdTng6O1wQbgZMrR8x47u3Hjf4rQ%2B8vk0QrcWBG%2FvQHVP2jVZAppBt2EPxQEo19fpyM46VPuEQfSkF8vOK2wDS8Xmr9yZcXRsSadXKGlVHJ9b8pN47I92M56jBoajyyp5cx7kckps3tcxpAZ7w%2BxhmdWzHxDY9QfJGeA9AvrQMsqXxnLlCJDLKnASxLWVPYEu%2Biv75WS1luutN73ZsQMBh4H8wLJjYsoVWGEBS5uXlNDcIpVJ6EOd5YK%2FVOUYq5ERJJk2Zte%2BG4n8AkDvWJSvP1HvMtUkLEY9Ei5q9lcBg1iJwEsMqrXgXKn%2F%2F5VK1%2B1VAehKsF6BKC31vykvKzd7W12fQvFuvwr%2Bcnu8E5dsHXiIUz1MVD6Qt0DFOYzqIU9zAYJSUUOdNNKkRteYfQ8HIm47I3P19BMHUtv46WXThIsCFoWah6C9pFcgdcCoDRTYvllG2WMlnFyL%2BrfUPkN628wuQwbSJR8gso0WqD8kih9mVqDZC3HSKWUtcSr6x89wn3bWDcDHpgQYMIUDeyQPfWf64H5X90DCFxw40qtN%2FET%2BoDzhMtU2n9Diyd31UWPCfT5kHauO9dSF2rydxCPZ1BTSbHcjhSzOMNq9n84GOqUBrwpFI%2FKn5ahiSr9k0znA9p0iRtph1DgiHDNbMCk8ExM6MGbgcmO46F6Kpi%2FCgDnK4l6aeoFGGYkRcBFI8Ecf6ZjS8ZXrUCSCy5FA59K1BG%2B06UdqQLyKvRQYnJ3FNUEPgKtqKv3K1TOqtJXbKJHSvf77ND4YlpgKydwmH7%2B4iYH6%2Fo%2B%2Br7ecsJ5yWAUmhofL0cdp1XlQzSSnFcVycCBLH3CsTDdD&X-Amz-Signature=c61a3ba9928c9f3aaa3bc105e5112cb4e63f2ac5ba800554cfa447059f469acb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYEIFHUL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD0OqeW%2BAi2Wd28ekB7GNi6fei%2BPXM8OeDNzOzPqcIRMAIgP7q8i9IGYPKluRUVLhMaLqUrKDJCkCcr%2Bu31JPPmQ00qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxsFt9EDkjs9KmAcyrcA%2BfpU7Usp2ujmHa%2Fq3mqbTnUBTurdTng6O1wQbgZMrR8x47u3Hjf4rQ%2B8vk0QrcWBG%2FvQHVP2jVZAppBt2EPxQEo19fpyM46VPuEQfSkF8vOK2wDS8Xmr9yZcXRsSadXKGlVHJ9b8pN47I92M56jBoajyyp5cx7kckps3tcxpAZ7w%2BxhmdWzHxDY9QfJGeA9AvrQMsqXxnLlCJDLKnASxLWVPYEu%2Biv75WS1luutN73ZsQMBh4H8wLJjYsoVWGEBS5uXlNDcIpVJ6EOd5YK%2FVOUYq5ERJJk2Zte%2BG4n8AkDvWJSvP1HvMtUkLEY9Ei5q9lcBg1iJwEsMqrXgXKn%2F%2F5VK1%2B1VAehKsF6BKC31vykvKzd7W12fQvFuvwr%2Bcnu8E5dsHXiIUz1MVD6Qt0DFOYzqIU9zAYJSUUOdNNKkRteYfQ8HIm47I3P19BMHUtv46WXThIsCFoWah6C9pFcgdcCoDRTYvllG2WMlnFyL%2BrfUPkN628wuQwbSJR8gso0WqD8kih9mVqDZC3HSKWUtcSr6x89wn3bWDcDHpgQYMIUDeyQPfWf64H5X90DCFxw40qtN%2FET%2BoDzhMtU2n9Diyd31UWPCfT5kHauO9dSF2rydxCPZ1BTSbHcjhSzOMNq9n84GOqUBrwpFI%2FKn5ahiSr9k0znA9p0iRtph1DgiHDNbMCk8ExM6MGbgcmO46F6Kpi%2FCgDnK4l6aeoFGGYkRcBFI8Ecf6ZjS8ZXrUCSCy5FA59K1BG%2B06UdqQLyKvRQYnJ3FNUEPgKtqKv3K1TOqtJXbKJHSvf77ND4YlpgKydwmH7%2B4iYH6%2Fo%2B%2Br7ecsJ5yWAUmhofL0cdp1XlQzSSnFcVycCBLH3CsTDdD&X-Amz-Signature=c61a3ba9928c9f3aaa3bc105e5112cb4e63f2ac5ba800554cfa447059f469acb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRTLAKXC%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T161826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDGxELPQgAWzUPAVre52gi2MotABFixj%2F7ALiVCSgBz0AIhAPLA%2BcngYCbW%2BZnIaEQwjXVDIlD4PJgTyXluGMW1xgPwKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyU70MFBgQK85t5zGMq3AO0Nd6OkDqAsgxjg9pRvEd3viFanqkD6SM3dmMZXMjv%2FBKCVpDpj4r8LVOguBYHBUUBLJ62tMtKOFWGIh2diSzRmD4nYMmtg8V5FndYpYweJQQJxYYi66DakvZMH0oXVGlIbrtRC4ouC%2FMAs5sZAxOT6jCL5JI2NCHqYZDc3LMp%2BfhZWPzkMpeQMsFBdbde0m4T0wCAkW8SS92NoJsvrAGtB180rowoaEY0sMvzGzaF4Z0rIV6D0ZojxATZz7y6FaHzyzqXIK009X30q1QQ5dyzPOa7nvZg839aPUz%2FRh4dC2cM8%2FWUKgrcf9pnrsuqd3b%2BeecU%2BiLFMmv%2FH7P840wnIXw8UzKt6UW2GcHVZXffY9WtI9so8M3kVhz9bQScmRgL8DcyIzksTMCyzeY5d4VEsA2KO2pzkO6WF5r2C3BEbgeeoydmDmOED9wO7Ap2oNPCEIVuWPLDJbLsFlqH4%2Bb0wUBdNIPNxSLKXj2q2xkOBlbSoz2I3j%2FBeDKGlsXmEnzCMRY2rtyP%2B5BpGIGA7%2F6xfPBDv9W5FFrjKGRvitT7LQqOai3rPz9bLpGas2WKCNP2H2MsXMWcVIEFtgzSZK0VP6wXH%2Ft%2FfFYFYjJAtNv%2Fo6CU2nPtcDQxZj0vgzDovJ%2FOBjqkAbKuW2UFlSlNOVsWWIoVupXjeM95Vq7rRUf6CarrDiNQplUJzf5YZRWoByDhvX1kHSe5KePlQzJBF0c5JDIRsGFHb7xZIyvOnrpQxVW2g4DJKfyvmLMzqf2yYBwrzaQMMT23ThHrQGm5So4HRASfPFWttrYq48UQOV15natRMEurHiDbYJObKq3dariQ0ZZjWK9ANdMuXhiHXHdZMUVrOCKrAQtz&X-Amz-Signature=8b6b93729b11b33a68dc98068d83b5798c43b809c740746ef8a816fa6a3e4a29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

