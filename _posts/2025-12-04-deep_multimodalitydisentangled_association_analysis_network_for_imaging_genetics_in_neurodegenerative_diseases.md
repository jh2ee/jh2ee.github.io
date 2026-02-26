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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSGXTWPY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIDTZaKFO0m9N0N1gmQN4p3UdAJg%2BXqb%2BsY71SNDVhuNgAiEAx%2BlfQrmdt7HRY0IdK%2FYQGxu7DSdEucPVkhiU56718Vkq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJ4G8gVAoySQcb6DfyrcA1334mLLAh6GEFHg5rsGIZLPr%2FoxRzauhKqQIClc5f%2FTfJ2RJF4nn8TuSvQsl76wzrNHWFBTHr7LW6pI%2BqBTystNm7nvqh1xEiHTcz%2FWAxRHsba0aGanFf%2FMH9%2FulJVGwJzs09qXTC%2FJN4I4AfCv5697wkYLX7X3dVEB%2Fb5T43nVWkKXaW%2FxUlk9iYgAiTipoYnOW992TwqM6DqOEGAk%2FVX2fgQDWy2%2BAEucM7NClaPVJFVwHHwVgVqauOpkPRvUQroV8gvvIRhB1wwND9I%2FDS4r7Gd6oLN7nIUYCKlldaIXZMs5sLyrv2YXZLM%2BI%2B72rUU3X6IJOh03tcIG%2F5RtPr8PVhCSKLu8y1HYrPA0mAc2nk%2FGF4Qei3JaNyR%2FV%2FLOxqT0A8xqRcRhfFmU%2FOVeAOn%2FldQBazDDVE294SlKD7eczH73P5mrAoAKNMAlwzNLuGAUGPi7T2DBbRlIIuTCvLWiSXONZNVr1g4GZgC%2FFdGO49Uqfj5suWup897Wz0pOmwGh4Z9DDLG4oInteh6eqNFnHkb3XKOPtey1jU2OMDrW7KDkKB9T%2Bta6aTJcEHs0z2BlzdahyPsu%2FbqwgoDBtsIM50AxZOvIr5CbcsJNdpOGw7nJIJRKYolqwbe9MNy2gM0GOqUBP8AWYmeBUJO301WI1hUKRoI%2FAKwknr4ohfa3xKsdAjhoSWY%2Byvrw7wPwgkn8d6MYjl253f%2Fxn9QheWvtXdi5lmmJsH1fDilblQ7W%2B684nwAHSDinplhCj4DLDP1afdTs%2FHuY0MNNIjzdZqpdWVU0m2TKOMnmzPTVmr%2BXnWgApTs9Mb8bY8XRZJePghoSfuYHwh2RljjslNM2OC4%2FotK%2FnpCdUzIv&X-Amz-Signature=7ad6fb5d7fbd2112d71496068a08f2942b91ad01dbf6e3156c081359fe4babd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSGXTWPY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIDTZaKFO0m9N0N1gmQN4p3UdAJg%2BXqb%2BsY71SNDVhuNgAiEAx%2BlfQrmdt7HRY0IdK%2FYQGxu7DSdEucPVkhiU56718Vkq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJ4G8gVAoySQcb6DfyrcA1334mLLAh6GEFHg5rsGIZLPr%2FoxRzauhKqQIClc5f%2FTfJ2RJF4nn8TuSvQsl76wzrNHWFBTHr7LW6pI%2BqBTystNm7nvqh1xEiHTcz%2FWAxRHsba0aGanFf%2FMH9%2FulJVGwJzs09qXTC%2FJN4I4AfCv5697wkYLX7X3dVEB%2Fb5T43nVWkKXaW%2FxUlk9iYgAiTipoYnOW992TwqM6DqOEGAk%2FVX2fgQDWy2%2BAEucM7NClaPVJFVwHHwVgVqauOpkPRvUQroV8gvvIRhB1wwND9I%2FDS4r7Gd6oLN7nIUYCKlldaIXZMs5sLyrv2YXZLM%2BI%2B72rUU3X6IJOh03tcIG%2F5RtPr8PVhCSKLu8y1HYrPA0mAc2nk%2FGF4Qei3JaNyR%2FV%2FLOxqT0A8xqRcRhfFmU%2FOVeAOn%2FldQBazDDVE294SlKD7eczH73P5mrAoAKNMAlwzNLuGAUGPi7T2DBbRlIIuTCvLWiSXONZNVr1g4GZgC%2FFdGO49Uqfj5suWup897Wz0pOmwGh4Z9DDLG4oInteh6eqNFnHkb3XKOPtey1jU2OMDrW7KDkKB9T%2Bta6aTJcEHs0z2BlzdahyPsu%2FbqwgoDBtsIM50AxZOvIr5CbcsJNdpOGw7nJIJRKYolqwbe9MNy2gM0GOqUBP8AWYmeBUJO301WI1hUKRoI%2FAKwknr4ohfa3xKsdAjhoSWY%2Byvrw7wPwgkn8d6MYjl253f%2Fxn9QheWvtXdi5lmmJsH1fDilblQ7W%2B684nwAHSDinplhCj4DLDP1afdTs%2FHuY0MNNIjzdZqpdWVU0m2TKOMnmzPTVmr%2BXnWgApTs9Mb8bY8XRZJePghoSfuYHwh2RljjslNM2OC4%2FotK%2FnpCdUzIv&X-Amz-Signature=7ad6fb5d7fbd2112d71496068a08f2942b91ad01dbf6e3156c081359fe4babd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEI4T3S6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIGBtZyNgpW6sZjegZC30LOlePCByP1z5sjyiSfxOebeFAiBomfMc6SbQufjMLSQmrxpPPMvGqfmhQgWTCzg34xccDCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMuzGNghrsVDhRf2vsKtwD%2Bk58H9W6qiD515qM%2FR6gUtUrjxhbvIXxI4mDQQ%2Fe8tC7OEGZctzDUjMYvj%2BoXkEW247wAEFqbFZ0oXfDLh1SNz2j%2BQAHkR0qBpWYYcTg314%2FqzIke9XkdsfMj80EmJpwc2LTwiIPQmQ41wQFggfgn9cXjVvpgeMu9kctWtwJHzxN0jFl%2B1ZiatxWmcX7n2STfnFZyhXx15JwtFZM6ZenXV%2F7GkT7C%2FnmYxr%2F2uOT80fDxsj3OZZ4lYDdWiCXoOSgcu1iFGV1D%2BqOtSmQSSFM1VP7EhISCs%2F%2Blh4Qqb7OljIL4w4WC1FGDF1iC%2BhwZ729PJoK4HcsjeXtG01inuK%2Bwydz5cSwu7WVc911XxJo0%2B22uyUKAD3btb1z0ARCLzCn8xf5vAzEJfYAONUPBcUmCsWx%2FSm%2F17d4gTC5dn1O51scxRTn6NHboiXXvelQop3G02I1MlFAG2fP9scPnDTX301bmp73ICZzUeqTVOTkwIOAjytrb2NJuNq5YhPpCjUI0rmNHFYna6KOXVTNef4PyUwIFpcOag9jOMTYXpo7hDREnleuwasgZfBKSt%2FElFVV0Fk5QKWAB4rM9KMnCros4v0CDoz2SDhFD66Q2UVbyDpbWApDlRUBrdza4BwwhLeAzQY6pgFftTMzHvUcm8noEYlploo4rXccmcTUO8iA46jHo455KyLWVL0TO%2Bb4b43ZpllaqjVIUPOf1SyzqqKIr0CCOyasy3EO6RlPL5fMW%2BJgrnQXug6rbyBxUgHhe9pgldvCkm5mg1g72ooAUsLxz8G%2FSYESLHa%2B%2FCLBRNvaO32yMTFW5KKngodm8DAztsNvF9KWIrUIC1cAu9GXCb7cn0T7mNKHEzy80Fac&X-Amz-Signature=44ef70bf08397c7f0156c305e2dfe9a042a3213666eaffd5cbbee03f277dabda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FIM2QGH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDDNTy%2BGUh4nUgde2d7oIRMmF0fAaH8KsUyOioH36v1WwIgPKT2blRWqe%2BB5pahKDCmCXpe7cTH3g9suKuL%2BNgC5bIq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJPbna5GZQ3A5Ym0QyrcA1E9YKJ8nwuseJntES0F901ct9eQt%2FhbODx%2BZfT4TsXqxeUfGIl855cN9US%2BPuZsWpxDl8Pj5BwqiXI%2FCvcf5uQAGDdpcrpAu8lFgzZrGa2rk%2BiDTWY9JZ7bhwWqXTVhKN9AhTrUON%2FtBA2c6k0y7pXPOjUuI12ilH0z6YwW5SHiT4tWJboiHcr37eKjc4JrWhGC5pNJGLKPA8qbugI2wky3eCgUECVghy6W1eOWNmHftRWxiTObXZPIrkwGPuZzmvtsxHRtia9UpIZe5YqoOFSQrvcc974%2FUjksCJL%2F9Y9n7VG3NyyFoaoBVrkxWLhlF5Gm2l6GF%2FhMMql3jqFqPmsTwUVUT%2BxneMtHHGz%2Bz8eqQW5QufH%2FYQEilbmP4aR9MAq9x8R5D8APn0dAtAc4eSKG69igFOmCqb9UkcImbhSa8Ja4T3DCwfDUMxp12hPKTD1v5V%2BwEtmRh0e1A0GmYSyaPYTx9fXYHC9l0Ku0XhqCDtgGS8D3dc%2FlaoHnJlEuDi36ixRTNaskP0buez4SE7XFCZkhZJStqF8AzjhMJR1ahbrvwJZvQ%2FRwGRumw7eoFPstqAw%2FYhmz6M6J1Wa%2FJoodQiZg3TKRuCiM3F4FuhKdcvvRKzv2j4yMevIRMNG3gM0GOqUBYECR6HCwxyPqkB3X%2BeED3rBqV2JkRJDGURysf%2Fd9AxSjtvM7ZH6d%2F5ipBnlEi4Co%2BKpP%2BNWLGrshANGqbmkU%2BoUbseVFMoANpESth4W5FhB7phEq7VOvEFHGTa%2BK2DvFFO01Gnj9CCEZGXzAtfjeenxJ9iw6HRiexDyvGBz4GoR1WBBoy0PR009B4q0ayRRvGHjok5A09PNAlbv5Jq%2Fk%2FTPt4SNL&X-Amz-Signature=ddc95c9a15f0f4dbf4ea053e7e53e2fd2761facf673a02e067051bd140705224&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FIM2QGH%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDDNTy%2BGUh4nUgde2d7oIRMmF0fAaH8KsUyOioH36v1WwIgPKT2blRWqe%2BB5pahKDCmCXpe7cTH3g9suKuL%2BNgC5bIq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJPbna5GZQ3A5Ym0QyrcA1E9YKJ8nwuseJntES0F901ct9eQt%2FhbODx%2BZfT4TsXqxeUfGIl855cN9US%2BPuZsWpxDl8Pj5BwqiXI%2FCvcf5uQAGDdpcrpAu8lFgzZrGa2rk%2BiDTWY9JZ7bhwWqXTVhKN9AhTrUON%2FtBA2c6k0y7pXPOjUuI12ilH0z6YwW5SHiT4tWJboiHcr37eKjc4JrWhGC5pNJGLKPA8qbugI2wky3eCgUECVghy6W1eOWNmHftRWxiTObXZPIrkwGPuZzmvtsxHRtia9UpIZe5YqoOFSQrvcc974%2FUjksCJL%2F9Y9n7VG3NyyFoaoBVrkxWLhlF5Gm2l6GF%2FhMMql3jqFqPmsTwUVUT%2BxneMtHHGz%2Bz8eqQW5QufH%2FYQEilbmP4aR9MAq9x8R5D8APn0dAtAc4eSKG69igFOmCqb9UkcImbhSa8Ja4T3DCwfDUMxp12hPKTD1v5V%2BwEtmRh0e1A0GmYSyaPYTx9fXYHC9l0Ku0XhqCDtgGS8D3dc%2FlaoHnJlEuDi36ixRTNaskP0buez4SE7XFCZkhZJStqF8AzjhMJR1ahbrvwJZvQ%2FRwGRumw7eoFPstqAw%2FYhmz6M6J1Wa%2FJoodQiZg3TKRuCiM3F4FuhKdcvvRKzv2j4yMevIRMNG3gM0GOqUBYECR6HCwxyPqkB3X%2BeED3rBqV2JkRJDGURysf%2Fd9AxSjtvM7ZH6d%2F5ipBnlEi4Co%2BKpP%2BNWLGrshANGqbmkU%2BoUbseVFMoANpESth4W5FhB7phEq7VOvEFHGTa%2BK2DvFFO01Gnj9CCEZGXzAtfjeenxJ9iw6HRiexDyvGBz4GoR1WBBoy0PR009B4q0ayRRvGHjok5A09PNAlbv5Jq%2Fk%2FTPt4SNL&X-Amz-Signature=827a37fb14546f2e5e374101a4b922c9977161f61d3ff264636d137f537266c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677FMYVZL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIAGTz43YQZ2ZUFFLcohYr4kShNcye4gF8BL2vXZonyaQAiEA2XCHqFrghI77JHGrUPb07Jb4dQff7pDD094xMO4Mp3Mq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDM23%2F3k1J9g47jMPUCrcA9LN%2FSuTsHDPnSzJRjoGUJOaNsrN9D%2BVeLp%2BaZk4j7CrxVtblYnTIw2JPq1YSU5aMNcA%2FFwU6hcJpksqhKriDzj7n3FuICa%2FSHu0QwMpDbZeZ3ZtVkJKNQNuac6lqHoTwgSJSKt57pHweHeS0ZcC%2B2W3NCmDiulbkw3mkw9YBhQC52otVwoKhAry%2BXguC5mLElyf%2FT7Tipy30z831QjO6qMz5HEI3JeiKYySJ%2FJ42ZD2IblTg395vBfOm09EHtamDmlCNk4SoHIBg03BZ1JzoydrmtfPj99OynkNPm%2FbWVxiPDOFSHfA42XzIUGOKxI96NgKnMpWmrCxNqg9LkaqfV79kKfIct8VOsgh0GNMSY1QczhoqrHzeYkZMzSenJMG2sw7Ug9WerulSjFh7e7g43pYicgdM1csBiZPLGzuntpkNgu38UGGI40hzv6I%2BZw78bL31MOjOhZYzGnq1QxQg%2FLxDpX0TgbTX%2BlmtjQjCnfoXEsrCWfUa5wtpKRw04b%2BjZZM2XYihxNHugtvsTmMASO6Y9FguBWL59lFKZvhFtML6Oo6%2BKimkznvi0Mg8lsRwx%2BWQBTwy2Wq4mbxajovYLIshRCKWbRN%2F6uM6pDTSYVmfiMYqVz04n7INmdfMNC3gM0GOqUBDrLg44FEd2ZDPK4LsDryyz7RNGgb8CEF%2FSQTNDOwIYNYNIWForUU2nKXp3yOYrki8fS8tLPxGD27u%2BKvcADnTKcDdb2zzkx23CJxj6qlC6MPll1V094Tpd1jLIo0tH7Bh4KOFGpVDTOvjPTuqjPdUQN%2Bo%2Ff4S%2FPt9It0eZ0S1aGgyB6ytBq0oX%2F7dOSJVUbX4ACwiGIjCZrMSOTwd1QT4yiQjdDS&X-Amz-Signature=0067e5218e0b83b3665a9f8affdd62cf9aaad75b4d213faad7b3025b8f7bc8e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTBFNPHW%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDdvKJMP4qtXJHG1O2prNi%2BfAvHDBXeg7D7TlLkjbzTtAIgYNlWleQCkJWitCw1paFp5rP8bizA7BTe%2BPRaCLtM3owq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDPAMEmjU9e5eK5m7ayrcA3EGfEvL8tKI0tQs8aHAADXTNYLf0v0OcnO4mdITdGb8Kghr9UTjcBTvAqih3QCvZHU%2Bh%2BgdX5kDJh3RkUXv2YpU1gyqYKL4Q%2B4ULGvYT76pcEG4rrd%2F84jVbdR1jJQfBK15L1Xrc1hqFEBqriqucALCjK%2B3F9HTxdXqB5%2BoI2rmPqdeeiRQDKV%2F7yA9zwZ2EgxtMjurDDutobjT%2FWbVU2Yi5OA53sT1vziR81W5XVM%2B4txDEO%2FTdKECqyNBOMlGS0VNCaUao9PivGK5PMRd%2BmvdPot4tmyOD4PIXS4ye8K1WOG8wfgraOKL3btKLGCBd84yY%2FPz5UHraywnbOFgppTK0ewv04Z%2FHUkVRjs0pEzRrkiOn54zUtwXKd4NYLaBGlwF731ycfPaiHxyOOlkwScSannvZhLEcF%2BW9g%2FxV53HCiW0cBlzC37A1Eev%2B73%2B2nZnMm4ycEhn%2FcDXtDmhNBnW66GRXaWI9U39txNw1gIVSE6zHVb%2FwucNGf5qaUQ9jf0vcO73LCDrA2cua4xA4znWxc5z66FGDSq6dQbw%2FL2ccbZIuCZRjHdL77xslSlPmGe%2Bou2oUYBCdtJe38gofCuftEgtCA%2BH5nxijqg%2FOUf9WJzPJqy%2FSEhmtRLhMO%2B2gM0GOqUBlI8At5zPerf2B4W4WQzj7IpfOTVTD3Vsz%2Bzah6A6%2F2qFgnGPOzZ5uz1rQyqGIZqb4eOQGzABvxI338RrbV%2BGw5wnwk2kkQn8rl5EAPLlUFHVF9NgFtzGFg1ScU3LWiduC2ZZubZLaHopSRgFBzmQTLQ0LCkN5pyoLr3rfzRGjeULB%2F4%2BZO6aJCEgv6lGhj3Ps4XJKrVxr%2BcAJFNj2JK0blxQCkjF&X-Amz-Signature=44314a8cf4e75d2451b1f5d77d05ed5e656d86652c099b7a41ee933da8531c65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJAN7DYZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICnpAi0QRtd2H9EMV7oBAlgpu%2Bp6VQA3OItq7RdlFVXfAiEA02p%2BaZZNEL42OT8vAed8Mg625c7nxU67Fa6Rmr0GZzMq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDO2YJ8q4S0A9QOnAYyrcA6V2kj8M%2FigGOUDRQqrUqUn99EC1dPFKVboFZg3qgeDzG5D7hyYF4MYyQj8IOLqjaJGmpbEBws5eb6AKDEYOD65GNC8CD4CBnH53rIt%2FhO9d49SqWxtTMs8yada1TWs4Zi1fLq18mpiYm2cQcwrHH2QdFVcJINKjRdNatwFqf5SBbLx%2Fa3JsisS5wOrskBaJHRySYECJ%2BfDH0gHVFCod8YMwBywsHqO04AhYLmsjICQIjne311%2FLhM0IvqSi9h8Xvfrw1AXC2kr7DGzrPjFU1OGjHW1jel2QnD6awKpmS69JBc6sjmysne8sxe77I6iWg4fu1DvfcEpqULCKDtZYbKSM3WnWF%2FDWsIF43TS3xzNdKyMyOxbeWRshp3Gb6ftusouVUhBI4TfN1UIwlrQT4VJmFO2lrbjYkloPzoBB02q%2Fs3RNmu63r6QTa49TtEkiCBfP4B3q5VvSVgpYxxwG7giNbXIRZ79DA%2BhcZnXuJRVl1P%2F757cr2An4d1LFBSnQ3qWTHiXH%2FqEVO2Xx%2BI%2B%2BBe%2BQukK1ZdfpZMVNf8AG6Ac9ajn3A0O%2B%2BGyRDJYka3Dn3gvZqePvGxX6dVpddIPJeP9C3Aivsxec3FcRhBNIdLH7SojTLPRUb2UjSvueMNC3gM0GOqUBqdo3Bo3rIu8N0yZ6Ad00ZR5hGBWW6eVxwE%2F8WpZ0kY%2BBm36qW2gZJL3tg6TnqkbBe1kjTwicyuqPorLay4ZMYSLlDy1T2AkRqQ43WooeTg0oUvNImdbwpGnK%2FVUH1wKsMImMNziAEzKnypPwSLjWZEfNC2%2Bs1igwFJv4bDsHcyI3Qw8v0jlauwe9Wc0qSBLGWSk0gzANibMqWmf45%2Bt3T8LJZIzR&X-Amz-Signature=72c9add30c8d2fdde93915043a9fc08e13df9f7fee9938b64a1f712c88dbbe6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RQT44W3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCk2DBH9pTfo52ZAlvFp7o5VzGmVsCoAB3luydl6aeZbwIhANnB1s613r%2FZswvj3ee3YDdu7W8LxfwawIIsaV5U%2BU8oKv8DCCMQABoMNjM3NDIzMTgzODA1IgwCGKYERCBT4sIgZpAq3AN%2FO%2B2Nl2y4NhHe3brtG2gm0cSPPI40o3CtkoqO%2B1MTLjaH4fhdh28snG8FrWiYiK%2FcY0YJU1XRxgyeecW%2Bn19guyCQBMvr7ATqxevtdXfk9zNx%2F2OnzIAmLhUNYAachvibu35xIPN3RCgYnoOO0oW%2BFFM1h%2FiRN1HeSfxujlIZh5A4eEl6ZU4UXXCwaAz4iEjQNxN9EtZ6iWYeStM4Y9bjnBihch921jEXNgtdOJvV8ybaclshXNjrO5UzRxsvROhvL5UycoNY7qliAwpry9DeLi9svn6PUdM5Xi4IU3iV6GF5NszIQkjQj8pq%2Bm%2BCx645M3LCz9SiJ7wokiDCMdpQLjHFpAprU%2BLGqI8XEgtQvJpXrX8gSVvrf9tGNiqF5AWIaISFYho6wF687Czi%2BG2z0tnJN6Cr%2FnWQ3s7EwOw54fd61v7WbQgiN5iNcL0vuK%2FgDm3F5ON5k3mTPepqkEjSgR7YD7xdUfOPzvoOylK0H1gidjmsRFB5Jw3bVE9Y0SkN2GfNPPnAk6lgEkIpkvC3GVIPcm%2Fd2nDTNQa5wf7VpyOFIZ1fZ4jmUk1k7bxfayT66BonASHityc54d5r%2F09EeouwCYebav41Y3%2Bg2j4meiGZRItCC0g5B8dC1DDitoDNBjqkAYX7KpoT9AP1pkldyvKLGzrJO0sqIcovx2HoKY4I4n7NV1n5gQyNzA9sHDko5hNCkinejJpmAy%2Fo7Ku0KpMYzhmPJaaun0u3CgT34bTzGzAbHRdv%2B3xi0Y%2BCdR4D4KNnOwtMgVInt84zDkOFySCKX%2BEXyjBRM2%2BMOBL%2B4nHfm681h98KkoKZqFfY5ZX%2FXIrfBRsHom3aG3e7QxvdjNuVonF2q3wd&X-Amz-Signature=8d3f183340817c409f5b6f7421faead169a82a7de01198e005f35945fc5a0da0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RQT44W3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCk2DBH9pTfo52ZAlvFp7o5VzGmVsCoAB3luydl6aeZbwIhANnB1s613r%2FZswvj3ee3YDdu7W8LxfwawIIsaV5U%2BU8oKv8DCCMQABoMNjM3NDIzMTgzODA1IgwCGKYERCBT4sIgZpAq3AN%2FO%2B2Nl2y4NhHe3brtG2gm0cSPPI40o3CtkoqO%2B1MTLjaH4fhdh28snG8FrWiYiK%2FcY0YJU1XRxgyeecW%2Bn19guyCQBMvr7ATqxevtdXfk9zNx%2F2OnzIAmLhUNYAachvibu35xIPN3RCgYnoOO0oW%2BFFM1h%2FiRN1HeSfxujlIZh5A4eEl6ZU4UXXCwaAz4iEjQNxN9EtZ6iWYeStM4Y9bjnBihch921jEXNgtdOJvV8ybaclshXNjrO5UzRxsvROhvL5UycoNY7qliAwpry9DeLi9svn6PUdM5Xi4IU3iV6GF5NszIQkjQj8pq%2Bm%2BCx645M3LCz9SiJ7wokiDCMdpQLjHFpAprU%2BLGqI8XEgtQvJpXrX8gSVvrf9tGNiqF5AWIaISFYho6wF687Czi%2BG2z0tnJN6Cr%2FnWQ3s7EwOw54fd61v7WbQgiN5iNcL0vuK%2FgDm3F5ON5k3mTPepqkEjSgR7YD7xdUfOPzvoOylK0H1gidjmsRFB5Jw3bVE9Y0SkN2GfNPPnAk6lgEkIpkvC3GVIPcm%2Fd2nDTNQa5wf7VpyOFIZ1fZ4jmUk1k7bxfayT66BonASHityc54d5r%2F09EeouwCYebav41Y3%2Bg2j4meiGZRItCC0g5B8dC1DDitoDNBjqkAYX7KpoT9AP1pkldyvKLGzrJO0sqIcovx2HoKY4I4n7NV1n5gQyNzA9sHDko5hNCkinejJpmAy%2Fo7Ku0KpMYzhmPJaaun0u3CgT34bTzGzAbHRdv%2B3xi0Y%2BCdR4D4KNnOwtMgVInt84zDkOFySCKX%2BEXyjBRM2%2BMOBL%2B4nHfm681h98KkoKZqFfY5ZX%2FXIrfBRsHom3aG3e7QxvdjNuVonF2q3wd&X-Amz-Signature=dbf5bc5b2d9e2bea9ec3771050da0d8a818b31c003a939168edfa83e6d68531d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667VKZG6D%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICEZWe%2BbacC64DigvezITndcpnUDh5DhxINh0kPOax%2FwAiEAwbPNY8K1UgZjgyoTfiMj1FhljVUAspdC%2BFLDEvVhAzgq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDGg3C5Tlk9Mbc%2B%2F86ircA8wtESAxMSHmU9jGYATYuBDKtHluFnblvkvcCEDzfgqKWnOqq6h2ccx%2B2Icwe6lkzWXrqXc8gkaiVNB8%2Fh%2ByIVXTXsgINuyM8ZX04v%2B%2FxmMSjwYK0o94gl%2F55dCvX6ugcpBxa0Nn5EYjzO3li3MsyZ0W3Udq7X4tlxdUZrizidF54qpdA3ay3Pd0RMT9uoanzUoB01Cw0H1Y8nMU42ckY01LW1%2B%2BTOP5Pywqb2P3LzTxjRE7aFWNpoZYkBq2jb6KXKOMg1qhtbI2rebex4weIS7zxfy3cfI%2FKattPrwsT7GiuU492wOXi07ic2OBG5xtyKqA2Y2qyjGl2JIrO87CY0NTko0NKTfYresMwj190Ne3K2VFLzz1DL8yL0p1RVbNYghHiarADn%2FH8jDdA%2BVf41Hto%2FoMJNAjd%2BMjoS50HST68JeTePvHmVcOAerdQrJC%2BQd%2FV7bG15vnBtuNohX5v1d%2Br1NLu1YsPFpR9aflx%2BkcDLdRSGKhMjZEWqMmfzMBU1gU%2BnWoIj22L0AL%2BC6Z3KIJNaCy%2FdIMF6%2FLUlGwvB6GArxpLSrungwL1QZGdBpyXs0tUfhc1A%2BhG3OgAzSesYeleKjgfufHn%2Bdn5O72SWOT5QdgzLB6XnIhWsrGMOO3gM0GOqUBp1xbHMZ8hIzytY479XdnRPQIL%2B6%2BIYzzH0%2Fpr6tViZXpZSgrqB81sUsgz9QisKAt4yZ3gouxbVlRpXrf5V1J04UgZLUTJVycnNBXqZyjZ7BtvfaZeLXCeqCeCRbCDoU6Cmo2jEWv8LTrWe%2Fn4TQ3uosLLzAVc6WjfvOBmWb%2FfX45Uwyr7lreIe5TMagicswdrNUaXKVGmDLeCXdMzp9xyCn6Psgo&X-Amz-Signature=25101c49c18e8db81c8fb426b86f8cf414043b1b8a60062ca4297f3a1f51a9c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YMYR76L%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCJxvk7PIrH1DGBFoxXHJPk26YD57BzBN16wK%2BWrbbU6AIgHV1DM3lGVHxkwgV%2F%2B8YlytlfDtT5BllQbSI07dlNKHIq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDB4QlaYbayG0NXh9WyrcA7jt0W3JJ%2BgtK5h6XHzw%2For%2FBDEbRPIImisuMeiJ40%2B7U%2B5bHDvaJfqxAR6VHHmJWf4D5wwgI2I%2Fruyj19oHVgbr3ffawhHI2OLdQQ4EsULue7%2BOu7WVRltYqNbRw1AzYfIZjXLtRgW3TYpFF8nJCLOV5EcHB2zC60dR%2B4DufTf6J8sRZXo2AOZ%2Fx3%2Fpk9ZcmvrdJ6tWTnnIJQQFwLQ9ccGdo1YtGqqnPuO5pDrvmWadRxiu31fzih6WZT%2BDRHHHEManwwjeQkxeJg4bBox7ujViix9%2Fqy8VJhuuKwmbuUk%2BVqt5je7czybOIzSwEGFYmIovjg4LqOhgTT%2BGJLf2oTREDuM8p4R7yZg%2BIotLyY0gGaOBAWe5gxIO4ZuCEtMo89%2Bbq6VBHSsFUQcjfwtZuPsVYfQZV4Ua8fYlNUEduvgy2X3vXA6nL2xpMqAfe5u4SgwfAk1Zz8mayutA4SsD5tAes5L8VXXMoWupOivpkO%2Bfv18ucSJA8TeDNTZwR8tIwskix99YPHvm%2Fr%2FIdXICByClbVcOyA9juqpGOOMYmhwdbY6DV1QgW16DjPf3zyIJNOE4M3qHAioOH%2BFyuUoXC3AqSCaViOIeFurwTJ6J2lJC5TOkBL8mybPOyrAXMOK3gM0GOqUB8YVyXqeEMU1k2rqIeENxe0wkFyXyEbDOTKIx1BNgSHACJp1m%2FvBRhyIlQUMtzwAuw1oUZ0N82A96wIqoB0lug7A%2FRKqGuFXRUw2gdWDGGa2oB57TC7aBphz21JWWCVI8RfeTUFqxoMx%2FYDn4WHmr%2FRP%2F88Xgi%2Fl9pLqHQiIsn8W%2FGnqWI5laFtZPPaOAMjtg4DmJWOSeYqXuMcgK7rN%2BWUQ7H2Cj&X-Amz-Signature=83408f89d0d47ffbd4cf9795d722d2a884a731e7474baf2ceaf78aa126001f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YMYR76L%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCJxvk7PIrH1DGBFoxXHJPk26YD57BzBN16wK%2BWrbbU6AIgHV1DM3lGVHxkwgV%2F%2B8YlytlfDtT5BllQbSI07dlNKHIq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDB4QlaYbayG0NXh9WyrcA7jt0W3JJ%2BgtK5h6XHzw%2For%2FBDEbRPIImisuMeiJ40%2B7U%2B5bHDvaJfqxAR6VHHmJWf4D5wwgI2I%2Fruyj19oHVgbr3ffawhHI2OLdQQ4EsULue7%2BOu7WVRltYqNbRw1AzYfIZjXLtRgW3TYpFF8nJCLOV5EcHB2zC60dR%2B4DufTf6J8sRZXo2AOZ%2Fx3%2Fpk9ZcmvrdJ6tWTnnIJQQFwLQ9ccGdo1YtGqqnPuO5pDrvmWadRxiu31fzih6WZT%2BDRHHHEManwwjeQkxeJg4bBox7ujViix9%2Fqy8VJhuuKwmbuUk%2BVqt5je7czybOIzSwEGFYmIovjg4LqOhgTT%2BGJLf2oTREDuM8p4R7yZg%2BIotLyY0gGaOBAWe5gxIO4ZuCEtMo89%2Bbq6VBHSsFUQcjfwtZuPsVYfQZV4Ua8fYlNUEduvgy2X3vXA6nL2xpMqAfe5u4SgwfAk1Zz8mayutA4SsD5tAes5L8VXXMoWupOivpkO%2Bfv18ucSJA8TeDNTZwR8tIwskix99YPHvm%2Fr%2FIdXICByClbVcOyA9juqpGOOMYmhwdbY6DV1QgW16DjPf3zyIJNOE4M3qHAioOH%2BFyuUoXC3AqSCaViOIeFurwTJ6J2lJC5TOkBL8mybPOyrAXMOK3gM0GOqUB8YVyXqeEMU1k2rqIeENxe0wkFyXyEbDOTKIx1BNgSHACJp1m%2FvBRhyIlQUMtzwAuw1oUZ0N82A96wIqoB0lug7A%2FRKqGuFXRUw2gdWDGGa2oB57TC7aBphz21JWWCVI8RfeTUFqxoMx%2FYDn4WHmr%2FRP%2F88Xgi%2Fl9pLqHQiIsn8W%2FGnqWI5laFtZPPaOAMjtg4DmJWOSeYqXuMcgK7rN%2BWUQ7H2Cj&X-Amz-Signature=83408f89d0d47ffbd4cf9795d722d2a884a731e7474baf2ceaf78aa126001f2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2TAJ6HN%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T103216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC3XXYPOFiNnEBV%2FWUSFUM1bWcBNsxivjcpqonTNKrFpQIhAL8UaQgjNr7RdnF%2ByDKJtE%2F%2BtrJsMRq3v3ccDIJLgMfEKv8DCCMQABoMNjM3NDIzMTgzODA1IgyapTHj%2Bp%2BopEeDt04q3ANrE9vk86fR1rx%2B9Nbk%2Bu%2BPp3X2cv%2FSJg0Z0g2huvVYEaP%2F5hkYP6F6hj4AUHzogqz3TqE5lh9%2BsC7q1E85sb5q6j87vnpl68%2BTfIq2cfdGVjjEAb1zEL1q19jUk%2FR6FXzbtw7%2BJ1Fc9SN77yGr%2Bv0yyswD04K%2FshGMPw17UtWl1wF42dPNbZwJN4%2BmPsEC4xFMesZZS21JH7K02sO%2FQF%2B5SWSjdR6%2FmwEc16dveuGFMM%2Bzz1uBSTD%2FIwZQKPSjVW2ca9l7xG2pe%2BFgslsDXGjpbuDQY9KIQbpAbjeGEROcuYVz0IPReDneNhvsy5ABMVyN8hdta2OPJP7vr8Xyjl1aRa1a%2F1K%2BD5PMRafeRf%2BUuceLeNhg9CWl1JM6O4xtrqGKJ7FOhq3iX%2FEWuNq8eaHLu6jdoHPpftpSpeuG8hWmBKairRU4s9iOzIGdvR6aXv%2BGR%2BPr%2BsDUorO0t78evhl6%2B8wNOvRCJ6kApJWtpijVLChseASAitb468URjs7yUh1WuFpGc%2BImepI5aIwdGDwQt2JB9QMI3%2FX52w7YvQIbRyLpMVUY%2FbwdqajDPnxak8XFkxfx7yIEb3u6P2VdwssA5IT66%2BZ%2F43h%2BKH34eFRs20fVfOZMRie5kfikZjC1t4DNBjqkAbSS7%2BjTFG0ctEesN9GKEo37okbrdZ0Dg%2FZcnDGHnGyeNAklDtRCtWvG%2F7P74ygJq7m1Q6atMadfdPgSx0OQtKLjxybjNyqrN9PiUdu9oZxu5JlIsaohRI9jooWL2PwbMi4XRzZApPtZWMuo1vPEGeeKANWek3rqM5s%2F8ivALdSjQPf1E0pAuBsdNIF4KVq2j6DFjKxv8sSgcIxOcRPkPMrLnZNc&X-Amz-Signature=97f989aa870e4da00f4f60c4d1a1916ece80bb8667c6a732d77723d85e75d7ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

