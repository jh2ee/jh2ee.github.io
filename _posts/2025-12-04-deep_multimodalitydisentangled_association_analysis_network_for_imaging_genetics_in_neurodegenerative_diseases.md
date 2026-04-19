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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673HTSRXM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIGkFmSacOczeLPj4en5Ag%2F2gStdKn04i03bf1CDUffycAiAKnOB%2FyyOFLq8eXqn4Hp6080SfsQ9LFnyLG2Xl6C1%2BtSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMEHhCHeI4m1%2FoUOXhKtwDtusb%2FxnRgqSuVtWNniPgleVH72RwQ5Ir7QlmwMeZ5BDPHdOIsxbyViqay3N%2BLvFBsn2gPnIxATiSg%2Bo0lrBryR8vU2TEvizgG9LlHK2IeEJt%2FqxFOvhiJIQHw02pM6xhb0lQk9543zc2o2GlAQRechi%2F7uFdJS26gx8iL0Ag%2FKa2oDI9vEAKiumGgbD%2B4v7q7sXtgis%2FiSvdAy5naxlI%2FDURfGu282wSPstZuQIHMvml3IR4IoX0sjA82BpP%2Bl4cfnM5kXFOH03WFzQhHE%2BN0DZBtNbgONEkL8SmveysA5SG6WYpKyGlPIbcLVD%2BkHWlZeyOKXslwPGBLMhP62r9mVpLTacsBBGDF8flnOK0OdQNHwxeLMZq7cL7cijAWAXZdoWgHTE9lVvEQHCxG4YkMX2ww1ht7oPfhYh6jsx2wyqArzo61ApOdKpfQZ0szofyWxgAygd3I3mo6HbD4fLAa8xWrKsG38Vp8as6TwKce3W1FLjQ2V41vd1CG%2Ben9CqvFvIAr3My6c1K1oUIaF41aHHbqhePE4Drdonpw2D4zclCvVod%2FkRjvnCEjM6aSQ7okLLJphJCurlSmqzfGjKD6slbrQWOE2MMR3y%2BMPGgqB6UdjHrAvC8WxwLR14ws8CUzwY6pgFWkBOi5gvE%2B0oVpzDJEAscZbU7bnS6Ugh%2FRcPPyC8RGf4Vj5Wpjk4CY6zPZqr1sAbKTDBfrzqQL3FPO0i%2B%2FfD43UFPMWC%2BRKV%2FzNg9xD7PZzmB5y9II%2BtbVMZ%2FLawUxAXUFq%2BYE6tTADFlowbqFOksSTSbQRx7AA1wnY%2BirTAdBoLHVQJBfHYEhRZTmkLJgm3BdGor1eOAPuKJHqHUi4qGsugusBPP&X-Amz-Signature=31368092f63d0af794b892ab376d35da5afd015af7ed25e269e32c394103ed9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673HTSRXM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIGkFmSacOczeLPj4en5Ag%2F2gStdKn04i03bf1CDUffycAiAKnOB%2FyyOFLq8eXqn4Hp6080SfsQ9LFnyLG2Xl6C1%2BtSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMEHhCHeI4m1%2FoUOXhKtwDtusb%2FxnRgqSuVtWNniPgleVH72RwQ5Ir7QlmwMeZ5BDPHdOIsxbyViqay3N%2BLvFBsn2gPnIxATiSg%2Bo0lrBryR8vU2TEvizgG9LlHK2IeEJt%2FqxFOvhiJIQHw02pM6xhb0lQk9543zc2o2GlAQRechi%2F7uFdJS26gx8iL0Ag%2FKa2oDI9vEAKiumGgbD%2B4v7q7sXtgis%2FiSvdAy5naxlI%2FDURfGu282wSPstZuQIHMvml3IR4IoX0sjA82BpP%2Bl4cfnM5kXFOH03WFzQhHE%2BN0DZBtNbgONEkL8SmveysA5SG6WYpKyGlPIbcLVD%2BkHWlZeyOKXslwPGBLMhP62r9mVpLTacsBBGDF8flnOK0OdQNHwxeLMZq7cL7cijAWAXZdoWgHTE9lVvEQHCxG4YkMX2ww1ht7oPfhYh6jsx2wyqArzo61ApOdKpfQZ0szofyWxgAygd3I3mo6HbD4fLAa8xWrKsG38Vp8as6TwKce3W1FLjQ2V41vd1CG%2Ben9CqvFvIAr3My6c1K1oUIaF41aHHbqhePE4Drdonpw2D4zclCvVod%2FkRjvnCEjM6aSQ7okLLJphJCurlSmqzfGjKD6slbrQWOE2MMR3y%2BMPGgqB6UdjHrAvC8WxwLR14ws8CUzwY6pgFWkBOi5gvE%2B0oVpzDJEAscZbU7bnS6Ugh%2FRcPPyC8RGf4Vj5Wpjk4CY6zPZqr1sAbKTDBfrzqQL3FPO0i%2B%2FfD43UFPMWC%2BRKV%2FzNg9xD7PZzmB5y9II%2BtbVMZ%2FLawUxAXUFq%2BYE6tTADFlowbqFOksSTSbQRx7AA1wnY%2BirTAdBoLHVQJBfHYEhRZTmkLJgm3BdGor1eOAPuKJHqHUi4qGsugusBPP&X-Amz-Signature=31368092f63d0af794b892ab376d35da5afd015af7ed25e269e32c394103ed9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PERQYER%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIAavoPKz1%2B1QOWbg4UW6ZlJpUW%2Fx20aCgdYrswap699MAiBGN1p3W5BUqK%2FCUsDn5wRIz9QJaiqdRP22XnFO7gQQGSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMMmBXNSy3AgEezPkaKtwDRBs%2BrrzQ504BflSQUSUG6eagHAgVEd8M9hUqMkU2GdOPSsVmCfphoY7snF6vtehGRzss8%2FXLJRirdhqEVOMitBO8vQS%2FujJvNnmn5RCjAuWdRDHGX1PmBmgZN4tzfm0spanFPpB3Yu95c4TgE%2FGE7iWw2aiOcMzfENemcTqVP8rKXB7%2F1EhjZ5a%2FEZJEeIh9wGTP1SFHxd8%2Fc37AQGrPMkGDrV8wfofTN5PqEcni2l9u8vsPOnnSC4guuUkmL6FxIpxriGujiM2xhHd6vlvQN5%2FkTnU4a1rJ2s%2FN4xCatE20wHxonUPEYzcQzo4Mn6oJ8zd6sx7%2BKWYOvI4cQkdInyo7zT0GAOwowcHXbx03MOzHt87NBpJlbfCI%2BXQksB8XWqkfgsJKHBrwDNrAbWMPaZ4FzWLKhtM96N%2FFf%2BzuuRLPz675AYgsOrdXJm00Bv5GtU5qSXz%2Fvk3cBTo2eoaQ9rsdRXYstMyA%2BYUNJctf2z2Laf9RINYcQ%2BiYqX5y3H9t0PyhhwoOGfE3F11JwGGckhoGJTexFv9uQouS7TB5wZ6UkGDl846%2B03pYih%2BQr8e73q%2F%2FYNPlQayhum%2F%2FB1deJk%2Bjko0EGJYeNWxAa0Q5qWenNK0VT2uQbvTiPcow7MGUzwY6pgHVGdxBzB7%2BI%2Bk5xjZbDYVh%2FP8S9gD2FePQonpf9UfobGZ1QTeD%2FIdI00rewrsMkHsmClXGGknCpfjivG8fq%2FHmeu9k30%2FRwg1gBMEu4XelCNdOAYTktUyRmwFYkupw%2BNp1yuzNaHgeKNiV4Es8LPSC7qYU8OC9juBIK21D5KGv4AahC5wWJto3ASyILK986Zha76hmZd56oZ8jpaa5bdvGOz3UAEdD&X-Amz-Signature=75c3a77840bb0f3701916def5d595b78b92357a3f4dfe0c04f35a26cbeb389ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NZ7LQ4X%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIDmuVw8dYXLlF%2BfQhcB%2Fviyi9ZXErCi5aIaXtu8B5wprAiB1XhQxEa56luI5QDDN5ypnGeDipRwS5NFPAYde2771air%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMEwbftUkYLwPiI3%2BuKtwDq6eUDkLePcYzAti1%2FgVFA8kTs2pJRJl7uk6C79qRGjut7cz0f%2FHWBhe9BZgBM7XvffWRVmQsL659aKBL1bJtK5izm76urrzomhbFrIKUQC38NfpkFtcaQkd%2FlS%2BqTYvSTKFfwUIa27NiyvkNSMM3VOjzjyrY2v5rjQxVZVoe78Q8Q6y663ccszp7LY4oS7GZ5whBKLg4esJZNAIXCr7fwK2QLBiM4A0SMcdPYXR3kOO85r3WW1CcRn3ENTXDtajDU6ba0jnXv6wBJDjYM2SmiR1eyjnsflukYPLm7C9Y9W%2B%2F3ZDYU99PPWOlRJ1BaQFWd74VokkC4L6C9MfK7MKGEnAM7aCcS8mCsfizfDicBd4dZnO7JU4FNiL58cwkjizCQUOTJ8VCZzZsjoLOE6tfkwCJw%2BiRDV3wDFVbyFxDAO%2BwwuzGZM%2BBCL%2BKftZ0ZMiY8de1BuHAZRqrhvwb0dhYF9ewWNSpKVnHkOtyM9FYEnWwNP6j9SxDqqA16K%2Fy6SX%2BmPTJ1x%2BMKP0ie4ZPPVfC%2FgBRlmgy3KOq8p4BVp4PEJ%2FLzUl5kY5vS1J7%2BCfjbihrkfSFbmRqAc4x1EHcCBJNJr5oVeYe6Qj0TUmPCruuL2HtwkpFMvPNwY%2BxKn8wqMCUzwY6pgHMaQK%2FrBgfZf%2FKcUOZsYph8WTpPNTL%2F%2FOHWqFkZ%2FQlGpz8sfWYceeeEdefX7ngcPDI91rFSC14SNpDOwv5e9fPleldR1eIo0uDqwWMZFapn%2F9adQcZRH2goi4Zgvw322gcvJnFTEhn1EVwcRjY4kI2UxkYlKTxOMT1oTuvdTGD4b5tSFBpL4OxBQJHUkMPqNRCIOF3%2BJBRvNnH1jLbjZwcgYrbfaul&X-Amz-Signature=7d4dff7a553ffb2bbc98bfe9750d434bb9520707b41ad5581cff3d6961ebc797&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NZ7LQ4X%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIDmuVw8dYXLlF%2BfQhcB%2Fviyi9ZXErCi5aIaXtu8B5wprAiB1XhQxEa56luI5QDDN5ypnGeDipRwS5NFPAYde2771air%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMEwbftUkYLwPiI3%2BuKtwDq6eUDkLePcYzAti1%2FgVFA8kTs2pJRJl7uk6C79qRGjut7cz0f%2FHWBhe9BZgBM7XvffWRVmQsL659aKBL1bJtK5izm76urrzomhbFrIKUQC38NfpkFtcaQkd%2FlS%2BqTYvSTKFfwUIa27NiyvkNSMM3VOjzjyrY2v5rjQxVZVoe78Q8Q6y663ccszp7LY4oS7GZ5whBKLg4esJZNAIXCr7fwK2QLBiM4A0SMcdPYXR3kOO85r3WW1CcRn3ENTXDtajDU6ba0jnXv6wBJDjYM2SmiR1eyjnsflukYPLm7C9Y9W%2B%2F3ZDYU99PPWOlRJ1BaQFWd74VokkC4L6C9MfK7MKGEnAM7aCcS8mCsfizfDicBd4dZnO7JU4FNiL58cwkjizCQUOTJ8VCZzZsjoLOE6tfkwCJw%2BiRDV3wDFVbyFxDAO%2BwwuzGZM%2BBCL%2BKftZ0ZMiY8de1BuHAZRqrhvwb0dhYF9ewWNSpKVnHkOtyM9FYEnWwNP6j9SxDqqA16K%2Fy6SX%2BmPTJ1x%2BMKP0ie4ZPPVfC%2FgBRlmgy3KOq8p4BVp4PEJ%2FLzUl5kY5vS1J7%2BCfjbihrkfSFbmRqAc4x1EHcCBJNJr5oVeYe6Qj0TUmPCruuL2HtwkpFMvPNwY%2BxKn8wqMCUzwY6pgHMaQK%2FrBgfZf%2FKcUOZsYph8WTpPNTL%2F%2FOHWqFkZ%2FQlGpz8sfWYceeeEdefX7ngcPDI91rFSC14SNpDOwv5e9fPleldR1eIo0uDqwWMZFapn%2F9adQcZRH2goi4Zgvw322gcvJnFTEhn1EVwcRjY4kI2UxkYlKTxOMT1oTuvdTGD4b5tSFBpL4OxBQJHUkMPqNRCIOF3%2BJBRvNnH1jLbjZwcgYrbfaul&X-Amz-Signature=b1489f957015940f55cc055c6585e5bd8cf81e9c7ca0e6cd7a850b25dc1b9c55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQXCB3R2%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQC8FpFO3%2FrJlwPpdea5rVB9bATdaUg3mmDuv8Lp83t8YAIgFRPReTYmLTI%2Bk89X7eyg2rIOYHFp4TIZIvy0CEr77Ksq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCnSODUXqBpQCACbnyrcA44p3qHYplHUiXt5H05WHLfZgrZVs9zUrz39oTgEL%2BKGqvH9Xwyn%2BXMcWlbT%2B83rGojsKY7MUPzgO30bpOXuAUo7FwfewJRokS%2FNVM79tv2lG1T9FQthuSf7lwPb0cc4VLhaeheuzgEZmQewYMlp1brrzOWZikRq0LiB1oHiCVMAIWD1cyI92oJhYlQ1UZNlGe6Zdc3aNS%2B%2BJ9sVhYZL7%2BVyo5GoGmDblWZK40OQSeZBkKrHWiISo4KDHTFO59Kj4xSwEx%2FxuZklml7I25oPuaiYUpcUXu9Zmk6A1bvskVbttf0ujgJmdB9y1xS2B4ZplT7X%2B869ITPl4tFVz430SdNHg31PMzVtpOV1yelAvcHYiTU9mkK4LSTTfZjg8JuUw92xyDb7JPlSaGf%2BBemX9NSycg0CuQ0xUjjXX24TxE24BG1uX3K%2FctsFGg44umuEQVH8x%2FGLDCLq5EfGYBnNE85QdCvSBUScTOrBReX5rYo4iM1Ci8CoiNeKZaXre%2FK%2FRq1gdXBtCl7QAJD09svUOD3ihgQY%2BlJV3GSKI8y4UuMWebhmKCAVJqGC4d1fVXoInF5OAmRQJKliiVpgppklSLjL2Q8MMp%2FTiK%2FU8aLzuzJWEU%2BU6o8Qx84lS8WjMNrBlM8GOqUBGjsNg0a2Hp%2FDTb0SVY7Lhia9zv0Gddmrhva7blE7JaRCNXmkbSPsqAmwVmVgx6bEGfgNeIKP%2BAc2C%2BFyRHdqG7HqoL62FZ5Y6ZKLJ8q2yMB3xSplDpY%2BNltFE1bEA3Dkbnln4bFF4znPeUg%2Bt%2FNcv153AWiMUtatC7vbC4prue3L4gvDJ8BBpapkrxR%2BlVxYNel1z8UJ81zJRaneo0oNF%2F9s1cHp&X-Amz-Signature=76fa8a4c856dbe33ebea78f59f60fffafbc0d90c80b20f66e10a6688f1532d0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTJ6OA3K%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCLaC20Xbh2DXV4ZlgmXzUqZXiobxZ3Dj%2Ff6k%2BF7f7yyAIhAKV%2FryQgFfbQXdUfc%2BNNj8ZQwgZU1kq%2FZFZ5%2B43G0FRBKv8DCAwQABoMNjM3NDIzMTgzODA1IgyX1Kfa0JYCbcZvo4Qq3APUWuLA4n%2FTFMGRVHqdtX2Dh1yCyKhK3KTdzzcyTfv%2FiDzcOZz6xYr%2BA9CJXO8ZwhI9jR6QMLl3wryoCmXr3HJTMq3%2BOohVsPr0U%2FZHoL5TJPKDPHGmZJpaEUWW0M1F5Qih5r81T4nylAV5WAbPfVIZcw9EwVw4SrSo%2BCiRdZJYr8CrzeJ0CfAXyLkli6lm1AwOrXwmwmCoIELmFRifPSkyTpUjc1CJBMF%2BXlg%2Fj8EidP8WxcMk1oLhav6c%2BAvR8VI2NZXBcT%2FCQKP4lcnyKjUCcrGBmhipqrfRNw0bSbwkSkuOqdFLvURYmu%2Fsiw79htwCUkGNATRKcKJ7AXCeU0k6ly9tx1MYAwFheIy%2FodH90iRyFDBIEyRslo1rEjE85h5AUV1y%2FntDJ6HDsi4UjnWoP0f57Sh%2BZvLu%2ByPZyZccj65ob3Sre1uFoRHi7ZID819mreMcUyPorT5aTIn2XcYdP7b%2BOMYjGhqcbkHhyiaFv7iw2Y8fzFhQtXXK7YHz3zHGeIaeBAuft0dSzg8%2BNHCtHCpj%2Fl5y%2F8vnu4YDbQYjtoLvsAZbclStnXAf61VErpSIsh%2F9mxZgWuBn1RwqgEUUp7ljvjP5602%2Fycn1FNWVnuCiuhhPD%2FFbdf69pTCVwJTPBjqkAStmzGFUZldzZp1TRTg8aW7eK84Wxqok6e%2BTohDww7IX2fFccKlNqe7fQQi7O712jg4%2B9rWJEEt%2FxM2FFi%2F%2Bo6IdI6DiqnVut7OBb4Qj9fEou0rs97h68OBxdmO0duNhKf0LwCjoMqEU0Fb5CVwD96CuL3q8BSC1MqdfhRysOfOwFevgQx0lfnlBIzycaK%2FCWeu6K%2B5OfXWRY3Yh%2FoQ69yLr3jom&X-Amz-Signature=f7ae49ade2648f77eadc56a035df0db6cc3e27a76a9bc10edbe488fa26878582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPPEPWOT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIFrdl5JEcH3W6S52xB2Ly2q51v9Jk7EadlcogIqFCGcEAiBkb%2FuXQgaDgY363xv9%2FzK0W80KGEajDMIsRj98K5msXyr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMbMvBJUmkMaFgOlyxKtwDD88LAmqweUj5AGil9AcedDlh%2BdrJ5JtW4m8FvC%2FxqlN5AAYwcUS8iXfv8caCUDNg3q9Hf%2FtqR3M%2BUYjowCcjc%2Fn2Gkolcgv52lJCNxmdQRNNq0kFHD1IB%2BHoQbSsHUS6tfSoBff%2BZi9fVwCBXxGOJN8aaZZc%2FCKOzciEqP2OgssYXABu%2BuZfQT%2BdhlA%2BiMM64QtjhWZePvKq%2BN%2FRDcNA%2FCAUYlGXYbAyg9g%2Fakw8WNq4p3XfjF1Rz3sQMRY7gPkuLHM8W%2BWJdsDXQhR1KN3KK8Gy8r2CmxG%2FB0BwA3VTpMiRMd9TOUXOzZIODZh2%2BLMtQW9QR%2B%2BW8OZuybJ96P%2F89mcLbfTCLHNdelaKW39WQ5fXm5QeyNWl4VoJirHnkdDH9vZMWCE3vYKTFtNeKvFb41af4nCKEegoAL9mlr6NKZnABO3MnZE8D6Yp67JzhwxFdpZ2YgJo25AMf7JCrEfMzpppNly63lqnv%2FPakP%2FN64lFZU5AQmwUlH9vAF2QmOfjgBizFdrCcg%2F9z2HeVGl0uXvzghNmlZVFkYWH42kg8flTAM56fenLFGtXSYSUlAB9jNE4QpI8QB%2FdQQ6Oy1iWyvkPhvHzSj4VwSezGwYOyPhFG1c4u6ZLNn0%2Bghow%2FsGUzwY6pgGVbBOE%2B1I9rW2tYGWGX4KEk8YZCNfy9c%2FsMc7whwilOs%2B9xcgbdzNoFwCZU1lNpTmJQ5huXBhOtVGP%2BYVJL1WkE4yDXOnzFf5inLV9URL6SExxqPKWF7KBfIUBmhpr8oeL8SIdHw9FdCfF0auzidQ22OpoKDryzE8FEmes0jig%2BK%2FJq9omSbK4r2C7Nu5uZ6dRB8mJuHnL8qhQJUWlzinWYRF4tYEe&X-Amz-Signature=668744f5efdf396f6c247e50476d9dda52e0d7f62c8467612e3247ca146631e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBBHTAFI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFY5D1ib3oo9i%2BIWu9igIxSjRxcPditAQF7rrF6M03snAiEA8pM%2FUt3jj4A0MXeJa5TXdULCcezD8V4jVJrdxUt7tjUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDJadqA6RHJVKWD4qeSrcA8IomD%2BFhJXSq67U0M%2FOLsA%2BJbXBl7inJDu4npSNnyY6wfKCRThAdfqzkqIGK6XnpIsb%2BE31RSWhlevNbli1HQ5N%2BepBGIl%2BV6EFVnXJRAFeBFHsbGNmV9ALZICCMob3PMMl%2F8PSlhbpEZc2P3gbs6Rg80WaH518RVuvuZcVQWax8e2Q0udp1CINj8n%2B7D59h7UvuvsZdHulC6sOcfl4V%2FKhKtksXfqwRS1RYh8aEPK6zMKtH0sqXdlkR%2BzNAT%2BqkeDmWxV%2BkkmdNmPL1%2F8HG4eIH0uCdv4yx2u11NobLfp7%2BKk%2BdNH0p4vdE5Z7ddbqcCeKv7jkPtSJeqluGC9VZ0hhJZTiHtvHeyWHi0XjaGu2vTPv8BB4clcfxnHKSyDzCsj3QgvW%2FSmmIo1SdK73fMkNhRo%2B782Q7Gg0lDNNwqCB8NIi5HclREr54Klua1L0yE70e1CX3YNpfgIzxph74LLIyADDyCgJQg6m4xsDRor3%2BCbZATH%2FJiiZUZy4NaHlO2syK%2B4teDVQH1ahJGyo6Xx1oOLw8IAseU3irRyWgYx%2FbdrZXfx2DKFAO8hMtFTBloVTku1lnH6BKea3V1n0mMVvySj%2BojFhrktmCBvlUAK0WGByM9bvUXfU0TGeMNvClM8GOqUB5iin%2Be8oQ9jZCKY5kB55iFrjEVjoztIwjey2yID%2FrnMu0V7CXDD4Zx8zVAaofOYOKEu9gC4tXUEobhb6lM%2B4ORaT6LV7ZXG8qnFuyx9Qlq%2FKsliOAOfY9kRrS%2FdzDT8G7E%2BvLurELvvfl%2FAWfY0D7C1fXYHHLKHUYCeKvLzDbgOuBs4pemSen0bE4vJ4Zyx5wm3pI6g%2FJBBGkWmBCLkutNS0PGYJ&X-Amz-Signature=e6deabeff778f342d3832e410c2580d232fdf6a8d28b8f739d1860d8fc9ec335&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBBHTAFI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFY5D1ib3oo9i%2BIWu9igIxSjRxcPditAQF7rrF6M03snAiEA8pM%2FUt3jj4A0MXeJa5TXdULCcezD8V4jVJrdxUt7tjUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDJadqA6RHJVKWD4qeSrcA8IomD%2BFhJXSq67U0M%2FOLsA%2BJbXBl7inJDu4npSNnyY6wfKCRThAdfqzkqIGK6XnpIsb%2BE31RSWhlevNbli1HQ5N%2BepBGIl%2BV6EFVnXJRAFeBFHsbGNmV9ALZICCMob3PMMl%2F8PSlhbpEZc2P3gbs6Rg80WaH518RVuvuZcVQWax8e2Q0udp1CINj8n%2B7D59h7UvuvsZdHulC6sOcfl4V%2FKhKtksXfqwRS1RYh8aEPK6zMKtH0sqXdlkR%2BzNAT%2BqkeDmWxV%2BkkmdNmPL1%2F8HG4eIH0uCdv4yx2u11NobLfp7%2BKk%2BdNH0p4vdE5Z7ddbqcCeKv7jkPtSJeqluGC9VZ0hhJZTiHtvHeyWHi0XjaGu2vTPv8BB4clcfxnHKSyDzCsj3QgvW%2FSmmIo1SdK73fMkNhRo%2B782Q7Gg0lDNNwqCB8NIi5HclREr54Klua1L0yE70e1CX3YNpfgIzxph74LLIyADDyCgJQg6m4xsDRor3%2BCbZATH%2FJiiZUZy4NaHlO2syK%2B4teDVQH1ahJGyo6Xx1oOLw8IAseU3irRyWgYx%2FbdrZXfx2DKFAO8hMtFTBloVTku1lnH6BKea3V1n0mMVvySj%2BojFhrktmCBvlUAK0WGByM9bvUXfU0TGeMNvClM8GOqUB5iin%2Be8oQ9jZCKY5kB55iFrjEVjoztIwjey2yID%2FrnMu0V7CXDD4Zx8zVAaofOYOKEu9gC4tXUEobhb6lM%2B4ORaT6LV7ZXG8qnFuyx9Qlq%2FKsliOAOfY9kRrS%2FdzDT8G7E%2BvLurELvvfl%2FAWfY0D7C1fXYHHLKHUYCeKvLzDbgOuBs4pemSen0bE4vJ4Zyx5wm3pI6g%2FJBBGkWmBCLkutNS0PGYJ&X-Amz-Signature=85889d6d822de525a8bc09103930695a197340d2c3defd86a4fb904bbef3431b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THKK6L5G%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCOzcf1o8cy%2BKya%2FbD5LejBTIY5Inmrxw7s85EucXD%2FmAIhAODylA45ZC2Pehr1P1CrwSMxMdNFKk0S20fRvGjDS%2FDOKv8DCAwQABoMNjM3NDIzMTgzODA1IgzJIC%2B7%2F81EMkeR86Iq3APAvWnkuGG00NotLITbJzcpf2FpI%2FsoIlm3EKEAD38oLrcY6Ejr8kU8f4Vu8QqGX3QueJFyz%2BEJB5HulNhoOVy1lS8748OOC2%2Ba35Jtovml6XcdRo%2BmzH%2B3lMIkWckhLZa5GXc8QuUWCaCRn833f7mC5Ty5c%2BSEwgR3x9HcVXdS953lxAeaTdReBDKcFD7WZMYqHaOpmjEwweNOgFImSJWKJkG5M1SQ%2BIQndieoh0JhdwmKldiJDMMgq8NvII4JCeF11c53DarqUKGdg1IWxrql3MKVOc7cWDkzm1eoMB6x60%2B1JqxaytY9frYJiRKULvIj2mxuVBJNq1EYePB5dPd%2FmbYGl3V6XNQ272SV13SeOVHfktSq4YLEiicGL1Wmg8UqSXUw4%2Fo7tPsYGTvRrOr3B%2FwZRsvmOHMl8Atk1r8NxnuJ0%2BNbMKwZQw%2B4tM2JzbR%2FxSwHl5ISLd1VW0VWUZGX%2Fzsx4WMJZixizzIwRTnu637NenPUzxuV3pnsam87Jlv9fF6p5bdF%2Fqfj38EQSZ%2BVaDYaznfA5Zcswek%2Bh0ity51mQ%2Fh7AB6SVca%2B%2BoufdGrtgKACAD243rK%2BzD%2FQa%2FCAYd44guKqfQ%2F7FA44u8hDGpHR3mFKoNCqLhJk3zDXwZTPBjqkAaNFAS2uwnawPtyIcDBPtA%2BxLEs6SJrnGP5PPud4zzQM0UmfMrR%2FPD7NlyP9wYoNeBeJk8LnuuElT1cwR6t5eePnfgLb0E9WX%2BjjSKya9CsAU%2FDb1DJsi7TenFTgUnyDjMB8%2FucB9uHjkIp0girTh1yIOdAEAHyQIRb%2BMdF1G4sdTHKsnEJlCHW3iwITP8xcjOPibHxuKsuF3M9KiBZ1Rb75c1kd&X-Amz-Signature=b9c8e2968532b28b67cb072b2e9e6e6e30dedf3a145bbd4594824b2f94c73881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QV5MQ7D%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIEwn1ELJVfUeLEtIvhNoJhsYkl5JK6MyJvRX2lCR4PZLAiADEasjjEHclLMFD6bSu0jDKJ0UoN0y28LJ%2BiMym4ZKryr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMP9T%2Bcme8nF0jK4m9KtwDIj%2B1lZN805to1%2B1H5tDHrzYs%2FQ2Y67socnja9ArFM9sIGcUdNX0X%2FPCVFmTCjKmgZ8Muu2QqikkHIsWwYLu57lkqsCJ3tGk0nyGOJ5nu3RU2G85AP3YxOitrulp8pmQtkXkYFjuK4Z4udXEzWiCPFyQaJXZ3Lv%2Fi%2FPyGZx40XhU609obAsc1CNfTpqS62km%2F7fJZS8J1rWep5eoVpyUtm7gHZFH9hiS%2B1NtJmCdv0xOzhPLxI4Mg0SuV35AcufVN7JKy4XLH5FuFtGZzUwWlV%2B93DjMreTz0QeucguxeAqfaK4KBrNpP8QDo08%2BG8VspGi5Zfdg4CoQnGuPtFq9HpM1oEdc46O7UQ7eZvrRZiV0XuRydeufFxQhE2dNfnT1rGE6TH8t5Bl1lJMORJbR5kyj6L4PgjjTzz%2FhxvqrwAHXyGm%2Fa0N3HE%2FeNvbgDDUuBAqa%2FrjCwMFAVLF8xjUGVZfmelApDorPukZBCopLmrgWNyKesdBc%2BDp3TZFhgaNGsPk23PjA0%2FBJpbrsNYdGSIONIR3KgRv0O8YJAtXADwoPNPLH66bsSsWsJtIsMv1OjuJ%2BBCPl%2BT5%2FjFN6a3VrhQ68cAb2aX74JB3Il2QI1meti%2FccHZp4kaKKxZ%2F4wycCUzwY6pgHqF5JTM9NYrAaszesXsNC1hpmxfvMBqot2LZX9g1qe%2FiNOOpkC1ictXUlXnJHBddnRmHvRZSnCLD3fRSerD1ZAssLp0wa8g8Y5oewvLeiYwuCjRaUKMLfo%2Bbti3LskPJKgI9dVeiko5d2%2Flaq2SEnkK9fAVxLMzcdj0squzvtBM5kir3YZ%2BOKaUEbzGQbuF2LeTk8FIPSgzOek%2BRoeLoCXszNRIMW2&X-Amz-Signature=a3572a40cbb837cc20e8f1b82a225c29ef5b017bd0f7c072719013a9de79f64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QV5MQ7D%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIEwn1ELJVfUeLEtIvhNoJhsYkl5JK6MyJvRX2lCR4PZLAiADEasjjEHclLMFD6bSu0jDKJ0UoN0y28LJ%2BiMym4ZKryr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMP9T%2Bcme8nF0jK4m9KtwDIj%2B1lZN805to1%2B1H5tDHrzYs%2FQ2Y67socnja9ArFM9sIGcUdNX0X%2FPCVFmTCjKmgZ8Muu2QqikkHIsWwYLu57lkqsCJ3tGk0nyGOJ5nu3RU2G85AP3YxOitrulp8pmQtkXkYFjuK4Z4udXEzWiCPFyQaJXZ3Lv%2Fi%2FPyGZx40XhU609obAsc1CNfTpqS62km%2F7fJZS8J1rWep5eoVpyUtm7gHZFH9hiS%2B1NtJmCdv0xOzhPLxI4Mg0SuV35AcufVN7JKy4XLH5FuFtGZzUwWlV%2B93DjMreTz0QeucguxeAqfaK4KBrNpP8QDo08%2BG8VspGi5Zfdg4CoQnGuPtFq9HpM1oEdc46O7UQ7eZvrRZiV0XuRydeufFxQhE2dNfnT1rGE6TH8t5Bl1lJMORJbR5kyj6L4PgjjTzz%2FhxvqrwAHXyGm%2Fa0N3HE%2FeNvbgDDUuBAqa%2FrjCwMFAVLF8xjUGVZfmelApDorPukZBCopLmrgWNyKesdBc%2BDp3TZFhgaNGsPk23PjA0%2FBJpbrsNYdGSIONIR3KgRv0O8YJAtXADwoPNPLH66bsSsWsJtIsMv1OjuJ%2BBCPl%2BT5%2FjFN6a3VrhQ68cAb2aX74JB3Il2QI1meti%2FccHZp4kaKKxZ%2F4wycCUzwY6pgHqF5JTM9NYrAaszesXsNC1hpmxfvMBqot2LZX9g1qe%2FiNOOpkC1ictXUlXnJHBddnRmHvRZSnCLD3fRSerD1ZAssLp0wa8g8Y5oewvLeiYwuCjRaUKMLfo%2Bbti3LskPJKgI9dVeiko5d2%2Flaq2SEnkK9fAVxLMzcdj0squzvtBM5kir3YZ%2BOKaUEbzGQbuF2LeTk8FIPSgzOek%2BRoeLoCXszNRIMW2&X-Amz-Signature=a3572a40cbb837cc20e8f1b82a225c29ef5b017bd0f7c072719013a9de79f64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2APVHE6%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T202155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCFe%2FrrqqpkY9yzqgCsgeQu3M0ACrk%2FXjObDpz%2F8CcYDQIhAPk2xB0PTv6DCExEQMzF45QknoqDyp7QY%2F1Q1Xz7VIi%2FKv8DCAwQABoMNjM3NDIzMTgzODA1IgzWquCK6zc7%2BSg7X7Yq3AOPsivRR6rs4qfH2Wd4tTgOS5o0qlW7V%2BpHPSKfoQf99p%2BqAFm6ZMw8fo3MxdDxZYuu3KhhtmxVC130c7XqmEhqx0wEqSZY3b%2F75Mmk%2FIngEeeY2YCL6fADUqbzfleBYXD6VgCBHA6Ies3tg9xaq7Be%2BX7Gto78cPt9HpwGwcfHsWEaRFdmmsnWgZi1pX%2FtUUYYHDKqIXG%2FG0JGVkbxZ78gH0peylMmddepgwe6VyLxlc2DWvz0yeSTXoGAnzU3EkOlzuFpuG2MPouXrR8AK1hSaBoUQ7mSt%2Fk4IkMtPrQUZsEbBNaijW7Uzs4UmvQ87d5WIk%2B5KU8BV%2Bj%2FfJ0BZpgLKs0TMjdhixXVwUtXJvJeDY236ECllMzTYzzljEQWUIbF20WtZn2PhySpNPhYbTmG1quDsmBRs%2BtX%2F0bwVhfFtCWDJsA5VWwJGDNmpu%2BcM1INjQOrRhKBq4gOri5d87oCRHczBhfIewLWPXn0HnNq0zbAUAcN18mmhwrBWmciB%2F4F4Jww4P4MVhnP17xB30JM96n9U47r4kBYDaS8OvVx24lnXqthFOGuhAinsGJ1B4g%2FQ5qdmx6NZ%2Bco6nigYGGsTHH533aq9kJpohSMHUmy%2F47vv7JdZWnNNZb%2BwTDIwZTPBjqkAX5dsKvayKdR5LwrSDzxUYTdEVk1P%2F99zqwaU1RMAStUga6Unmwa1fMuDkXZDUR9Ne85Cr%2FctIS8z7fhmj9Cb6TrtAzuvki7n3QXBM13ULM6uM5SkuB0wamuTu2gvgK8BE1OZsitnTEZUjJLJ5C9LRHKfHQcihIixp9fnVaWrgP9%2FbTb%2BwDVO4moT3xuAc%2BUR3GKNZ%2B74Utm5JhL7p9zR9KagSSZ&X-Amz-Signature=a828899a1b1804abcb5f0ceb60420b63dd7e9e4d4fc00e13172c9b244514529f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

