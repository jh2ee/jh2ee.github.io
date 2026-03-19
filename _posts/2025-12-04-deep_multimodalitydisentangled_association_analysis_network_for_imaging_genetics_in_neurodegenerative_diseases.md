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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SODKEXPF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIDxYqMpaeNss1CkT6i652aTHoFK8jdu4MyPgJicA76aKAiA5SWiHnr6TWbkFdCBOEe9xezi7kqdlBLWR3xzKSyIDjSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMOnSQLHppbpClADU5KtwD9lFr%2FMByUBjQDa6NMm6zmIm9oRc4oJlKkettd%2B2FVWqATdPXrcym%2FIq05Erh9ZIqMvcC9%2FZcmRoDsqHApbal1CJhOCOAXAsazMswUdRoErE%2BJlDXI%2BVdbPt8coy4OCYyh5yUpeSPfH8%2FIzB9z3Qx7rdBJRZv%2FTcS9%2BFU4Zvjm1dEsr%2BBFcqoHm85AuXCuKWQo9PMyy8SOxEvgshihKRr4gR%2B4%2FEI2j6J63Sd5w1Nob%2B3PtWGBA2k6uiQLuScB9qUTWU%2Fzb6Yu0ayJIv1g1ApxWQ%2F%2B4dQtqPMZomDz8YHrwtjLLsnXbStuMEfSWAf6jntsoHU5khgSO7UhLvB2%2FCLLhs4zjvv0Ha%2FmzB21SSUFfT0Ww1tObM0HoLX0QVdKoUzSM5Iy2ZARdtZvlxfMmuXa5kAfXQcrPg27%2FYCkRiZBjTb6yztD%2BL9e6k7GgNsdqHrdAUbl%2FCxtxAQDm%2FNfPa0C780gFTGtOuhU0BU4YMTFpSWHNaoQzWrq9C%2BPWWakDqsv%2BVT8%2FvghU3ekOLKD3Z4P6jCMP8NQ9SxKIPxkVLKoQH%2FgphkqXsZrloipIFNIeyMxA8AAM3e7TkhoOZQsauOsUVDiACZlL2XPp6MFSpKJwFab1S%2B7tWsOkreAq4wiarwzQY6pgGv1hfi7nS7RFwa8uQM1NVpe%2BeFAEKvCQjZkrzcgAV%2BuA%2BeGPAz9tbz%2B0Yc6V7n19FMRwKzxBTpcBGTvjD8YJJclW3Qvf7E7mFXerjhwRU%2FmPf4spEsAm1GFPCr1qoIxFrMIXd5S4UNjvoG0I1UCdkeuME73s5lWeW3At647zzUnfTFl02AuiQ01V72Oo2DqnDPaMp9xB9bzY7%2ByvmNsT5TVQ%2BVum9m&X-Amz-Signature=b79dab1c8c631316adaa9253de8b4dc8323e935b8a666a1dd0680ed25b2efe6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SODKEXPF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIDxYqMpaeNss1CkT6i652aTHoFK8jdu4MyPgJicA76aKAiA5SWiHnr6TWbkFdCBOEe9xezi7kqdlBLWR3xzKSyIDjSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMOnSQLHppbpClADU5KtwD9lFr%2FMByUBjQDa6NMm6zmIm9oRc4oJlKkettd%2B2FVWqATdPXrcym%2FIq05Erh9ZIqMvcC9%2FZcmRoDsqHApbal1CJhOCOAXAsazMswUdRoErE%2BJlDXI%2BVdbPt8coy4OCYyh5yUpeSPfH8%2FIzB9z3Qx7rdBJRZv%2FTcS9%2BFU4Zvjm1dEsr%2BBFcqoHm85AuXCuKWQo9PMyy8SOxEvgshihKRr4gR%2B4%2FEI2j6J63Sd5w1Nob%2B3PtWGBA2k6uiQLuScB9qUTWU%2Fzb6Yu0ayJIv1g1ApxWQ%2F%2B4dQtqPMZomDz8YHrwtjLLsnXbStuMEfSWAf6jntsoHU5khgSO7UhLvB2%2FCLLhs4zjvv0Ha%2FmzB21SSUFfT0Ww1tObM0HoLX0QVdKoUzSM5Iy2ZARdtZvlxfMmuXa5kAfXQcrPg27%2FYCkRiZBjTb6yztD%2BL9e6k7GgNsdqHrdAUbl%2FCxtxAQDm%2FNfPa0C780gFTGtOuhU0BU4YMTFpSWHNaoQzWrq9C%2BPWWakDqsv%2BVT8%2FvghU3ekOLKD3Z4P6jCMP8NQ9SxKIPxkVLKoQH%2FgphkqXsZrloipIFNIeyMxA8AAM3e7TkhoOZQsauOsUVDiACZlL2XPp6MFSpKJwFab1S%2B7tWsOkreAq4wiarwzQY6pgGv1hfi7nS7RFwa8uQM1NVpe%2BeFAEKvCQjZkrzcgAV%2BuA%2BeGPAz9tbz%2B0Yc6V7n19FMRwKzxBTpcBGTvjD8YJJclW3Qvf7E7mFXerjhwRU%2FmPf4spEsAm1GFPCr1qoIxFrMIXd5S4UNjvoG0I1UCdkeuME73s5lWeW3At647zzUnfTFl02AuiQ01V72Oo2DqnDPaMp9xB9bzY7%2ByvmNsT5TVQ%2BVum9m&X-Amz-Signature=b79dab1c8c631316adaa9253de8b4dc8323e935b8a666a1dd0680ed25b2efe6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3Z7ZBXY%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIFlWcVkZNecjkiFof2IFBweXH6jC7c8GnhFZ2ls%2FQ3%2FYAiEAk94lL8cXbWiWpRUGv5KZ7vDutyCUZ8w7bYIvx1FUWUEq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDENd%2Fedc1FzL%2FTfqqSrcA3tGGYCVNGTfkZWJykrAoht6UowsdU47YoJEVCvT78XU73%2FCvfdKc9W8tJb890iWvG833EhvT8xBQs8xdkwol0Wkw5K8nzbxspFN%2FTNU7WPKtqNXLwcA6wfvj5uvdpGz1W2ozApghgfXC%2BMDjx8ntPVmCSz%2F%2FBmo6ok9SJCRRsB3amzpltXs7yt2vWAaUc5JRGxtmraj6f%2F%2F1y4X0ckDOKbLGVJxyq8fxaA75i7mbVSCrxNGPSOMOUWRKW9HNi9dWQ7zLmELhvspHFQXuIeDzyKTB7RR%2BpWyiHXq7g8vxfQvxebNcHMYFs8OfksBrT0AFEbScT3XK7XPCNQHGJ0vvRdWLrOIyFgkZ4EsZQkRE%2BUa3nXhIqrLTdxcAgjLx6Bon%2FaJ3PoHY89uEtVXqG4tHEvHnHy0j%2FDkt5loPxAPRaL7WUqP8gx%2F1jeYq0zSNC%2BB5EJXHc7lr3svWYw63KVZFEyMM7yURdZCMPnfTZbopMMtTSKdFa5KlIdjdb7cUGjDGsP21egAj5ir%2B2GzJbLvH4XTY4qz2A4Xk95KaWe8MC13NZ8I46dKgTQwp4cxm%2FNCDTqwp0WI5Njd1wCYq204iOvrMSVdsk3UxQZVdSH7a%2BHCK%2Bqmo5RIJR%2FtcZiiMNmp8M0GOqUBoaVJ76VSEEYYVXMdGdfOzCsdgpUxvoVxurBCTU2eHoiUDysdWNk98xjitAPqrVRg%2BmqZJvYGowLwicrMA%2Bh%2BaSVY72uVG3TOeoj2XCQwdipNIDICEKoTqj0yS5ODFVV56bhvmpD%2FiPQOpOfOqfD9L71z6kHGAjAuD7BGEvVtSn0S%2B5Lqf7hA9qfdFs1WMo7Dd6QKJNcpgTNg%2F9fKQQVviJqJ3Qmb&X-Amz-Signature=c50332dbf383842d5917347ff9e014f47a8cfc0db0e868e9880ec1f8201be1c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMM6TE5I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCICz%2FmH%2FFYWgl1zQcDXqb2puzQBZlB8O%2BsWaCIi%2FF8wHdAiEA4ilTHmhemv%2F%2B%2FQdwCKBC3XnynFovqfGD9edsD7WwL30q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDEUTwwIZyb8NLuu%2BOSrcA07oKTZ0cizrLx1AtHIFYMhTyj98CZvGUJhemOrb%2BPXpBq7Z%2BfTBS3Mbw2STEnqApGerKOkZNSeK3lo7uFhtd0EeMT%2BEtuw9RrCEIbj9BXT3MwY8aIaoyIZb1PSNYmjvbIpi%2FSKndNNOOYDy9qZDWoF0WTx9JNEq7nSDtv2VVgSDHJ%2BrazqW59RCpxWrGQkEXtZVLxpYTZr9eUZj5I%2FwQaghNh5%2FyqpRGAyIIpw4gUCiX%2BNEyWqT6kPA6tQCIMy%2BP%2FJxs3DkunfBEI3rrVcbYSsyTzCwEcjpeSA4%2FHJZ3j4D6UcUc9OkOptCaIPdL872dmvuyeXMLrFmAaDmAPYLpWXxdPRsPXN7GEIJtIpYM%2Fz5AUdyKsLKilDgUqBAbrpbgDz7A%2BVrEf81YTPzy5O8yua7xkzdhT2BAT4GxMbRTV6Nys6gDy0qS475e8gYoCD9yMWyL76q9jhkdxBnIyu5cakCEc87VhOvmhD6TDgP7HANJcVwU%2B6wJIspvStfHPPMbzWgS6NjoHcjaIkpL9nM2A%2B%2BpB1li1f59MBWDhE%2BHV1NZm7nR9uOT8%2BuYRoc7o2wGQjC%2FLZoWnZ40JjB107VnmpcrzIal9Ez%2BRCR9RmPurFNzKrQOFhk0kly%2FnsRMP2r8M0GOqUBy50QpQi%2BD6je%2FPHO%2FykZvyUUZgGwY9oqmp8Ve8F3rjdGkactVT098bm4wje8wiluaoKhgQWWy6sBGtKVoxrubM1HszxNn8NFcDgpi1M1WHm0NRxwE8naBRkPBdLd5Q%2BQ7UUDckccBgZlu5Y7THmeqI8Swafw2CXfDChK5m8uz7j6RN3Zqg1j36N%2BvfRI7%2Bm0p2xILPpA9BRp4jpHp2zYybSwKiA3&X-Amz-Signature=725dda24ff4ef6f91d23cf4c715da402428c95569367b3f4e47338382b141d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMM6TE5I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCICz%2FmH%2FFYWgl1zQcDXqb2puzQBZlB8O%2BsWaCIi%2FF8wHdAiEA4ilTHmhemv%2F%2B%2FQdwCKBC3XnynFovqfGD9edsD7WwL30q%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDEUTwwIZyb8NLuu%2BOSrcA07oKTZ0cizrLx1AtHIFYMhTyj98CZvGUJhemOrb%2BPXpBq7Z%2BfTBS3Mbw2STEnqApGerKOkZNSeK3lo7uFhtd0EeMT%2BEtuw9RrCEIbj9BXT3MwY8aIaoyIZb1PSNYmjvbIpi%2FSKndNNOOYDy9qZDWoF0WTx9JNEq7nSDtv2VVgSDHJ%2BrazqW59RCpxWrGQkEXtZVLxpYTZr9eUZj5I%2FwQaghNh5%2FyqpRGAyIIpw4gUCiX%2BNEyWqT6kPA6tQCIMy%2BP%2FJxs3DkunfBEI3rrVcbYSsyTzCwEcjpeSA4%2FHJZ3j4D6UcUc9OkOptCaIPdL872dmvuyeXMLrFmAaDmAPYLpWXxdPRsPXN7GEIJtIpYM%2Fz5AUdyKsLKilDgUqBAbrpbgDz7A%2BVrEf81YTPzy5O8yua7xkzdhT2BAT4GxMbRTV6Nys6gDy0qS475e8gYoCD9yMWyL76q9jhkdxBnIyu5cakCEc87VhOvmhD6TDgP7HANJcVwU%2B6wJIspvStfHPPMbzWgS6NjoHcjaIkpL9nM2A%2B%2BpB1li1f59MBWDhE%2BHV1NZm7nR9uOT8%2BuYRoc7o2wGQjC%2FLZoWnZ40JjB107VnmpcrzIal9Ez%2BRCR9RmPurFNzKrQOFhk0kly%2FnsRMP2r8M0GOqUBy50QpQi%2BD6je%2FPHO%2FykZvyUUZgGwY9oqmp8Ve8F3rjdGkactVT098bm4wje8wiluaoKhgQWWy6sBGtKVoxrubM1HszxNn8NFcDgpi1M1WHm0NRxwE8naBRkPBdLd5Q%2BQ7UUDckccBgZlu5Y7THmeqI8Swafw2CXfDChK5m8uz7j6RN3Zqg1j36N%2BvfRI7%2Bm0p2xILPpA9BRp4jpHp2zYybSwKiA3&X-Amz-Signature=91233fc328a36ce22fc479f65fdeecb4019431f7f80ee8a71dfa27b86b03afeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJOPWKV3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIATbnOzGZzdY2O2bgmnHyWHTNoByudCVW%2BYjkISy4TStAiEA4fMZK8MJlky0yzsxsZtwp6HCCqvVE%2BRfmChOXaPmViAq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDB%2BdCb%2BpbiGOiWi9FCrcA79E7%2BkGld%2FEZvnnis2lCkvWZEU%2FQgL2qSnLFJqieyoRmZkDsqyvXRMosFJogvE1NcpHswQ%2FR3qLXWe%2FjilXAuw7j0p9qAndGb9m07OMbSgP8qoghZl%2Bosoj1ym%2BRSuGf3yIZU4coxTDirClGxjYhTI%2FcQUKwTiuAFYbAtwigKK4eUL1ACegReAQwwfdhHzJYe6sHojTs9sUOGgFVN5iQdPdUsgfyecEAmKLLGwSUGC5vILDkTgiJ65TDGyErCpP%2FXguLPzsG3LR1fqQiR17cCXmmNbtwsyen1R1%2FTsuCqAvNxdVedi922kHb43wxhXp44TSW%2BsmNQpIV1q%2BLoCUYF4R1UpNHrOnQ0Z2LDrvfhjYDnc2AdBhOT5TTYUXXCc8rV76la7WV814n4%2BIaXmUNS5sBxPTu0PEFvYw1kw9rpHEaP5NpFELm6tcM3k0QW2zIBZdk1QJ8sw5tRJg30dG272%2B0eGAPTm4tEDwxwp1z3jm3OW9nR1s%2BG4NQHx9kXx2w2YZwwfCtjsHnXWfo6TXfeuyAxz16kTZoWhMc8ZPr67UWU5gOMQ6tGcJEGAcMeG27xJ2ctMxwmz%2BUSWyMmZ5ljwINvLBUXzoXaPVii0%2BcA2qc%2FnzBoCdsNdRdVHAMP6r8M0GOqUBnxyiyqDITztTWuFFCOgLporSGazAf%2FOecyW%2FXzk4%2FVcw6RhUnoppBTawLvHH253yAeQlWGroTN1yK6J606Nn9a8HzZjEWl591WVu3GQW1so0pOfw1fN4tU1%2B4uIHkVokTLCaILIAywWu5EVDxUT2Xt6%2BwY7rkaILWbhFXnqlGG91RhizoHFwOIeF7dK%2F%2FdqlpF%2BojglYYx5NM5d3H5YRNE4kUdbs&X-Amz-Signature=0f24c81ce82366590706f882396801d6d79d070fcc8cde1ce560866438e9977d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CRXILNV%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIFIDQvP3LBv%2BeajLfagfLpYDvXjpzKtbYhvkYoIh3CmrAiByQbjbNwBRr4WypI89Qk22Lz56xg6mXmeQNW%2Bm25BJ%2Fir%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM0dEMV2CXMLzjroDHKtwD%2BEaz0vhCBI3EXUZEXpw0V95ek7dhXzhju2w0vNCf%2FP5U7rLWoWCeXoWQMQYCf6P3Bl%2Fej5y6qEZqnEOjB6idslQB%2FLqDtXGlwteGQ84oo9xfvBF9%2BEvBIEmvLqeOvyhhYIb4qFa05jkrdN53pHfbj2qse%2BF%2FIiIWNphxUvArSXFhIrP93%2B0T4WjZS%2F%2Fm4TbwVYXmQXBDTKHmqFLiybnb11VEs1IFQJCIwY26mHr21ETouV9xYem7JNyl6mHQHrSa2tywLjb7iIkh%2BY5HyiTm03Ea3QiSw9%2FU1vLt6xB%2BEZoLjJhahKEnAay%2BT41JVng3PzwNJM60t6I0onMpXH6ajA6oO%2FEc%2FsdzMtBMVp2O4VNFUHtiTrCaHDHtLyENCoPETNEtyGOCW%2FJW1dHEQCTzbi%2B8tXqBaaCMHZYkwR9rg%2BJG4k5uVD9MwC84MQZT%2F7t6g2W%2BsLbkziaMc02fLQWZSv4UGmskD6IgPgE6Le%2BxvtWAkjDJuN%2FkwFcIh2gAFDaNyI1JMDTv8GKpau%2FbGdfxMoyABqe%2FDTzDPU0iqMgRIfp81H7zZ2cJQyl%2FvIzxWtnsi3GmmkPavpbSWWWgHvtjTOQozNeAlUPNeiUMeHGUhX9KRGG8c%2FtAPHSaNNMwyavwzQY6pgF4OyvhKvmvYA8Yr%2BXoiiqn%2BPYhfkVVgE7nwdh0bbaLmwlhTarWFHynXaqKKKKSHrTIcTaoeYhheBOHYNZvjEVohb3prYcQ8bGhhb%2BG4LE01vA4Jed3j1qxn5l9eMewAK8vZUe%2FlcbWCh8XOTxhbeL3uhIMwvHJAWz%2FN%2BN2i36t9%2BrbrvUtxtD%2BXgGEkn136RwrJVS6hfSX340ruMW16zgIwCdGTK7C&X-Amz-Signature=860995cf22ad6b60169e342aeb1e5cbb546fb115cbba4c27ad40bb93e7ab7b81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNTBMYTN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCK7TPHGqexwzlviztNAvAgcJqjrwvhBIrEVjw9Vj7jhgIgVnLY2kHUcq5O3pVcbbVnzy1BBg872rhLT7A35SwFQRkq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDF0lv0Vl0auXKvQyeCrcA5yNKfYjy06XdsdBO0iSbXCpf6JGqm0RajQO14haNE3VX4h8gwhbOuQJkU4sMWreSefjgGkhgRWMcVD%2FtB9cULL8mv18zF2n%2B0DggHQ8I4zVucgjqiACVBohnHB357WzZEK6cYe3ann1%2BYhCHBqcLDn%2BhX4kqCIifNh9UKVp1KuMd5zE3cxEbXlyb6mmSRrWf0wyAlMVzn7o%2B64E8%2FOfSRT1F7lL1QnkBlp6Jl%2BLkamHERG0ojgfgc41R4jiL0Ge3uBiViKsbCOD8pYqbkgB1Ayew7frEv9M40HGg2Pym1WQfS%2FUAkzFBwqz35OB1k6yq2xiHYiLDo5SO2%2B1q9BabqhI3OvgDMAvtH0tTytOIsiiSoBDnMeCP34X1sM2jEJqsYKDv3sxlE3fcxyo32kqYoAFXh%2F5YwIVcjlEc40YAIvkROAGRBPtNV%2F6NQyUm%2ByMNMVk8xCuGkDjoOpvnBAQf6tCtnu9kWZYKVnbAX0DYQesWyYL199p9Ura7YJHCHdQvMF%2BOSm%2BIBMi11MMhGL065Tjsiq%2FpGxEhMugfo2ukmuI0L7tbiNbKmN%2BWBoIJuauosuvfhPr7RpK%2Fu%2B7drNDgqzItzN4RhgqeWlrowtwjph1u7SLu%2Fmzakvk91OAMKGq8M0GOqUB%2F%2FZtIijP0X7UAOD9jVK6lkzP9lQf5Osj84NzTl0PRa2np7%2FwiFIj03Ywfjbn2SXT3ooITiVBEt0QT%2Bbp%2BBiBpj6kIuj0LddncCSVKtUnIz2ZObMrFg%2B3jXyxmSnfJT7xQA5iHupaxJwv2ro%2BQvac%2F2I%2FTwK0mrk5PbIQXcE9uq96mSNWsK5nPCK8pgk5gWozOuhV2UjhSvdnPMEMIh4ip%2BTzbxXr&X-Amz-Signature=0d71761c9c982447433584c299fc6da18532a654b958ab7aba291d120d515f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XFQ4LMZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQC7yvZzeSJlm6P5QbHOORY091g%2FXYDiXctK3qKgNURh7QIhAIFg976XTtpnEbKDyuakzUk%2FTjZD0Wf7QnUXeAbtC8rIKv8DCCAQABoMNjM3NDIzMTgzODA1IgxpP7aWMj%2BmoZ6PDUAq3ANEszEjRZvTc2yBb6tjOg2uhKyzc7GKhVZRZcjRhDC%2FOFf8B7%2FPfs%2B184HR%2B%2B6EdSo4ucJfrP1w0%2Fgd4tYM7o04bcgurHEyDdC0Sgb7hPlwyNa4BucbVGSjeHUIYDs8SYcUaE6NJQu2skIiX3wqzqdBvwshsE5i0XtvKJ66Cww%2FPh6JbgdGPn6L1bMX76xAiOJRnDhwvtnU4RItuUAONUsZXReSkBlScVks4puSb17FWCmWMqjmp5bkDVRdxDs6fFYelofeVSXripMSp9oC47719hnyNDhsmGlUfSvvhVv4hX2%2FgvlC03f48aERH1YJiyoPkvIT5QTMhXB8pAJq6iD%2BBNSs5wH%2Fdji2YscLNKOr4%2FLr4uXx1ljObM6IjiEBjhNUNHBc95yiPXskB0ltbiubZz%2B%2FkQ8uRBVo%2BIdvreC2L42VBuVAKHQzz%2Fs72uqXmf6k%2Fj%2Fz12G18w2r%2F5ped6uqr6mhO1K3js5DaMmVby5mNgGg684GAHgoFxdK0rrR2rc0TFfAaYUWHmTYVABxJ3NwaQePZZ61OdpgtrGEDnI3EKlzG9JFAA%2Ba34gH4USRsfYSJ6K7yjPRX5%2F260pzAkkLNDbaQi5%2BRJ2ObNX9s6T9hejQd6tTBugkUObjaTDFqvDNBjqkAYiX9vmg5BO5TRU9G%2BjnTPxgij4FZmiQR58IRDZFeDA0IDfIX5GCSxp27recTm6%2F%2BVmhXrresHTIeAFUCY90y4SbY7AME30X07GYWis1Tr5Zz%2B5GtGWzVB1Y5jl6a4k6XeAkbTxzuHkSkZHR0b%2F4Bk7qQrH8QHSYwwcA9a7%2BHdZw%2BAE1dqVOrb52TCB9E%2BfOM6viR8D%2FOEMna1oKEaxRt9p9%2BsRx&X-Amz-Signature=f94bb65ddff02499c117a9191a3f5fa17cbe621df529f650fb12ad86cce24e88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XFQ4LMZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQC7yvZzeSJlm6P5QbHOORY091g%2FXYDiXctK3qKgNURh7QIhAIFg976XTtpnEbKDyuakzUk%2FTjZD0Wf7QnUXeAbtC8rIKv8DCCAQABoMNjM3NDIzMTgzODA1IgxpP7aWMj%2BmoZ6PDUAq3ANEszEjRZvTc2yBb6tjOg2uhKyzc7GKhVZRZcjRhDC%2FOFf8B7%2FPfs%2B184HR%2B%2B6EdSo4ucJfrP1w0%2Fgd4tYM7o04bcgurHEyDdC0Sgb7hPlwyNa4BucbVGSjeHUIYDs8SYcUaE6NJQu2skIiX3wqzqdBvwshsE5i0XtvKJ66Cww%2FPh6JbgdGPn6L1bMX76xAiOJRnDhwvtnU4RItuUAONUsZXReSkBlScVks4puSb17FWCmWMqjmp5bkDVRdxDs6fFYelofeVSXripMSp9oC47719hnyNDhsmGlUfSvvhVv4hX2%2FgvlC03f48aERH1YJiyoPkvIT5QTMhXB8pAJq6iD%2BBNSs5wH%2Fdji2YscLNKOr4%2FLr4uXx1ljObM6IjiEBjhNUNHBc95yiPXskB0ltbiubZz%2B%2FkQ8uRBVo%2BIdvreC2L42VBuVAKHQzz%2Fs72uqXmf6k%2Fj%2Fz12G18w2r%2F5ped6uqr6mhO1K3js5DaMmVby5mNgGg684GAHgoFxdK0rrR2rc0TFfAaYUWHmTYVABxJ3NwaQePZZ61OdpgtrGEDnI3EKlzG9JFAA%2Ba34gH4USRsfYSJ6K7yjPRX5%2F260pzAkkLNDbaQi5%2BRJ2ObNX9s6T9hejQd6tTBugkUObjaTDFqvDNBjqkAYiX9vmg5BO5TRU9G%2BjnTPxgij4FZmiQR58IRDZFeDA0IDfIX5GCSxp27recTm6%2F%2BVmhXrresHTIeAFUCY90y4SbY7AME30X07GYWis1Tr5Zz%2B5GtGWzVB1Y5jl6a4k6XeAkbTxzuHkSkZHR0b%2F4Bk7qQrH8QHSYwwcA9a7%2BHdZw%2BAE1dqVOrb52TCB9E%2BfOM6viR8D%2FOEMna1oKEaxRt9p9%2BsRx&X-Amz-Signature=24f1ffb23c189dd1ae5233c9ca9ea8f418a3c63aef2be6fe9b22a5a96d5aa199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEEN3K2J%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIDn79jLgzXm8ZwmXxFIlcoD4f6fy7XkOxj8h5L68DDEcAiAuDRsQqbkTCwI%2BcHGNHgS%2Ff0Uyy8G2Sb9B0FkEVDWiBSr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMaQLzG8jMwTC%2FCBjxKtwDGZ%2Fv8f4Py58Cf%2FbbsJ0LpuIGK6KYjQRosem6W%2FSV83tAWXPa9qLmTO03ynWuf18MQuotEgjvx6Yk7aGD%2BXhDT5Dou00XQGxOBPIO6ZsOkaoiAkPGP0rVQ7OO8hdFqoGyvmGlyxtTtnQPyEu6LKnZ7kUBCbMsKEBrogIh%2B6bWotm6c4hYSZSGyCfgvQJx2dbCEzREoKQDdBoFtRJlLkwSYhT2Ulg15iMXpUvLThhkoLhqDPjnFalDuyUQBKQiHb8qUavZQo8iA6ADWWzlLpY4artoJbbL7jyAZARlaG7F16jrdoC3Sva4Epo4XqP8UuTrbiAmvGBsBOypgpiQlKGEyzg7WaJPAMetn9ss0whYTDTrzIT8osfTE035aIYsm%2FSocm2m2CFENs4muUBgOyF%2BllUg1%2BdS1tCQY2Cyly2P4AZOirnoWwn0ZpwcZDQ%2FFhPtEQeNHigDpHkQER4OD67No3toyo7TWLSplxZeQqnAtHyecn2Io5NZfzW%2BN5ct3EqSKqBdFLljScZie0fDN7BrI7%2FHqHFx7NIeyl7Nq5xFoXROzicTPRJF3QikGp%2BL0Pe3JhqfSTTlDcVfS7YAdkPG89OB26j4Byd9KvmSM1s6T%2Fu66ZPbtmSjtATT5rMwz6rwzQY6pgEzHLfhhnqrjBT7b0zRK3y2G6yfVVwuDC9hEoUIjQOZ%2BZIWHPhtXmYDg9xqqL3qVPTAtlgWAuPNKtJQCwaJVgoUXAvdO1AGvHcS346Wo0kExcJJRLDMl0ForvIcOAx00ZNBrIHGmfz6EWHydErRwnFl%2BHZ77TBw6aN8heIeS%2B4tFCYhJ01XUbLsa15xlE1kdeGdIXW%2F453qs9lWo1nqDGVL0%2BcDVQ%2Bj&X-Amz-Signature=a1c3da99d2f1fdcb0e96f549fc342c912fdd4cfa76938d425db5957fa83c2593&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BCEQOBI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIBQPGuM2qWdC2YChvArnBGuHLCDj01ljy3liPSR3bVuTAiAWo7%2FAd8LftQH74VlM8NVtwEcNR83t1exlSFwDK7qNeSr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMWA%2FyMyopJQlBzyWOKtwDZWXyZXx6SXTXGRXUFsJgpQB%2Fq57JeXWE2Q12g0ZOPUJNfT%2B4DIekGihEIAGedhvnzrtdnEVUeowEGetYoQhhhV7QE8W0vfvgKE5osSC1QOmT9%2FFrxlc50%2BZJL0%2FIje7QQNY2S7CYLwV1Ewgthjl3Dr9yQtTJNqWRs7wD8q19fRg3Ke%2B05rKebMligrS%2F7YCtAsvURZ%2F3YZVJVfPvA1X1Ys3T3QQ9sowcaiCBTYnf92aCWb4g3d4vDILeEcXqU0xxAHFbJG%2BL%2BQSL5YF%2B2yftlSiijVhHyUqv9%2Bg4LC3243ZU1xGWzNMQJMvgazRqGYJuOPgI991Zo2X%2FmY31L6hX1rvrHPEQLMZVpl2G8xa65zDHHnEuXbszA%2FyFiz9Ir%2BKHzXIliXLqvRv5bgOj4AO5m%2BIR9Vt2POgDsEE8qj3YW789ugleRJz48duRih2QdX39cK0HR4E%2FxJmfpSbS4liH0dTd2wXfLgsBk4xiDhxSKIev0ZaFaUt9XpiTg7iSNE%2B2cZVsG3JPzbXuGwjiLY0nXqxvqdr8eSclk10rwwqdNRszNhQCaC6PNXw%2BS%2BhEQQB36li3es5yUp1okA6skimyCwpkbBkaK0TWdlnyaEz0W7dEHscu3PmL6W54Swgw2KnwzQY6pgE%2F74AU9mqPBOmqAPiYHU4yXDkuNebu6cXPRDb8jiOqG4jJbwbgd5nDM%2Bzk5IjR6Igp0wXh3ex%2FMaqk6PfF5Qi6nEi1P6SFe6rCacDNjYKCXP7vvpcRzrrrcRANrNwoV8ACN3ERovMmFhjw0ymlF72VpxwfaLdMJfbxWK0rMMvmuYsTVP%2FkK4TpDEkUQsLQHy2FnxrdwCi71BY6srpWs%2F5ducH2HdmJ&X-Amz-Signature=de07c12aff15618d32ba1e219e22592aff6d05b6b60c2710027ee72200bc3308&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BCEQOBI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIBQPGuM2qWdC2YChvArnBGuHLCDj01ljy3liPSR3bVuTAiAWo7%2FAd8LftQH74VlM8NVtwEcNR83t1exlSFwDK7qNeSr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMWA%2FyMyopJQlBzyWOKtwDZWXyZXx6SXTXGRXUFsJgpQB%2Fq57JeXWE2Q12g0ZOPUJNfT%2B4DIekGihEIAGedhvnzrtdnEVUeowEGetYoQhhhV7QE8W0vfvgKE5osSC1QOmT9%2FFrxlc50%2BZJL0%2FIje7QQNY2S7CYLwV1Ewgthjl3Dr9yQtTJNqWRs7wD8q19fRg3Ke%2B05rKebMligrS%2F7YCtAsvURZ%2F3YZVJVfPvA1X1Ys3T3QQ9sowcaiCBTYnf92aCWb4g3d4vDILeEcXqU0xxAHFbJG%2BL%2BQSL5YF%2B2yftlSiijVhHyUqv9%2Bg4LC3243ZU1xGWzNMQJMvgazRqGYJuOPgI991Zo2X%2FmY31L6hX1rvrHPEQLMZVpl2G8xa65zDHHnEuXbszA%2FyFiz9Ir%2BKHzXIliXLqvRv5bgOj4AO5m%2BIR9Vt2POgDsEE8qj3YW789ugleRJz48duRih2QdX39cK0HR4E%2FxJmfpSbS4liH0dTd2wXfLgsBk4xiDhxSKIev0ZaFaUt9XpiTg7iSNE%2B2cZVsG3JPzbXuGwjiLY0nXqxvqdr8eSclk10rwwqdNRszNhQCaC6PNXw%2BS%2BhEQQB36li3es5yUp1okA6skimyCwpkbBkaK0TWdlnyaEz0W7dEHscu3PmL6W54Swgw2KnwzQY6pgE%2F74AU9mqPBOmqAPiYHU4yXDkuNebu6cXPRDb8jiOqG4jJbwbgd5nDM%2Bzk5IjR6Igp0wXh3ex%2FMaqk6PfF5Qi6nEi1P6SFe6rCacDNjYKCXP7vvpcRzrrrcRANrNwoV8ACN3ERovMmFhjw0ymlF72VpxwfaLdMJfbxWK0rMMvmuYsTVP%2FkK4TpDEkUQsLQHy2FnxrdwCi71BY6srpWs%2F5ducH2HdmJ&X-Amz-Signature=de07c12aff15618d32ba1e219e22592aff6d05b6b60c2710027ee72200bc3308&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPG2H4GN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T153920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCzIiVACMa%2FnDq5wZnbgwcNW4wxp%2FVXu%2Fn9neNjTHDp9AIgJSNYsrd3GLYgfhLr5V7fZ2BjZpSy0zLwRTEjxxVyBMwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDMw%2F8PkSZT%2Ftdr71kSrcA8c%2Fg3ZDlAia3rZXebI%2Bkmk6Nh424%2BNvb4m%2BCAVueedHUGXWfg%2BhnE6afjNPK3zVk%2BdBwe%2FVTiYPsrddrGW94IwxThZ599FTkWmEwDnS5kRaB3BFMDbW7SCr5c%2Ft%2Fz%2BbOky3ppCoAlRww02SvoVyU51h5rrLujc6CgrwsVU0%2BUfBkidFqNiuYnWufb8sizmQL%2FiDJC9QzgzAz4ykzHogCCRqanuFZp0QzbKXyyZ4UUH6jLMugY4shMeRoM4Fm%2F4c5qby%2Bw1Ynn745nIniqfo3E2zO7c%2F8ffvOzlKwnnWvlmvKLiYle3dssWRBnsTXZ2%2F4egIEfKTy4kffi80%2F0pmsjpyPgaC8E81hGdbnFDm1uLFm28toCqPpG%2BmKSTMV0p%2FetLHBREbIVZDWEpCS85JpUMdTsSHv7tvh8qHpRKB8oAkq%2FmJM797GuSO0ZS9fMYyW3lV2KGwmcX5RU9rnGJEWUdaCxJHM0t8vZl4jg2wx7SgBFInZIDb27hXM8rXp8RmGuAi2LEeyd%2F9UxcjgyhwHJYwSlBSKA9ByOt9%2BSaVab4mzpw8R6rstxNI3ClBBfZxlooCHqfstbJLMAC2bNVZEQ1difgNo7IBTlXlLXJPV5HPm%2But2RWsnBeV8hnVMNep8M0GOqUBp9AuZKyMOpJHpWmm5kCezSnfI7ywxa5jWl7C8x%2BxN%2F175W5LpqdE6%2BDYz%2FSuVP6CWQYjvOGBSLD%2BREkeBe9EkbqBfHCRK%2FeEiRTrPPmifr%2BneGOxaRkzp7cSWbhh4yvCH1f34qciLq2WgqwiceEypy%2FajJk1uKx4EEmwEWJC4w2Wxoco%2BaTNKoBwtor5kEn2k8WAdzjhfn6nILid%2BYuQlM6QDLVS&X-Amz-Signature=19038fae8de7830542801586b329b3dd5aba79a95f7fc4cd18e90fa1a9607ce3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

