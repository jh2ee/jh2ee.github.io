---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRC3PSPV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCMU5%2F4vxRQRnbW9YqPZOeA1w5ynefugVFnkI8MuPT3KgIgdwVvj8bVqoSFqkZrL%2FoWU%2BxmYuX%2F8ePOwgb1tmEMDrUq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDEFHlQSSM0Q7w%2BP7TircA0vHrG5nslN9eJB719AMf9y6f1YxPDbvq5%2F49q8nWLMwhPatTyDSfUS05J6XvUPjv0sE2bQQfp1lrMhEtTAvn2165JkV%2FZT%2FPrYp3LJ%2FXti1EEY0YmRyY0F9yePOaXke2YeiJ3gR4zQx33py9ibYY7wadf31aPmrlfQQ7f78luESeABe%2BbBLyYvEOEqwbbBK3hl6SofTyyylnkxv0WpWNOhw1YVFYG24QQY9NzAydcUgmBGGl8%2B%2FIdMXJHcteB%2BQ9bm9AtoX%2FG8radQ%2FTeXLVDi6eYCHrmH3A6SNvetVi1B%2BTZzWoB4SlaRwRnh9ErJazbWnbaab%2BKaJXudTp4UnNc0ziT4GvzKUmdHCjFdmFAMxOcn7sUiCBPLPWiDKcQ9s2rtbAadiQrWLE0mN2Ldj4gT1ftDD0xvogAdde%2FDyLOf%2F%2FMxnohMx8n3Q69pmZsO1jyW6j3X4OZSs1nABVAWatFUk6oPxTXD3xtouHYR%2FaJCItgqhE1QzCcM%2FWgw0Ziqg1Zoeb0tT%2BTxCOFde0cFzGuySWxaPInd8s%2BBhbdnQgQqNMvo74xoh7vd7crxiiKfHxV4j6PpDqt7zttacUScuegawFF5ilcvuGZ9x6fBZzZlIvVFtY7B6uOOLPTZXMJDHwskGOqUB3LMri0ngxfoow1DNi6JsV8G9TtmiTEBFPYHqtufyRXOo1Cnc47zoUR2JFbmM4RLrML4LMc6MoMJvtvO%2FPJ%2B3nM3udZNGjM2XrGdCtjUr51qb%2BAdP%2FzxSpH67H5gKNphB6m%2BT5PZh3P4vKBCCTqa2FCR2GdJWr3oAY6nCsoq0UWb0njaF%2B2bHLG7VUMyvyiCrqCDMfGfHw9gG%2FKXp0QttiVE3Atmn&X-Amz-Signature=48bf68d610189d77ead2bdd7160376dfd835c078405ef077f30e0a7d3d2adae3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRC3PSPV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCMU5%2F4vxRQRnbW9YqPZOeA1w5ynefugVFnkI8MuPT3KgIgdwVvj8bVqoSFqkZrL%2FoWU%2BxmYuX%2F8ePOwgb1tmEMDrUq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDEFHlQSSM0Q7w%2BP7TircA0vHrG5nslN9eJB719AMf9y6f1YxPDbvq5%2F49q8nWLMwhPatTyDSfUS05J6XvUPjv0sE2bQQfp1lrMhEtTAvn2165JkV%2FZT%2FPrYp3LJ%2FXti1EEY0YmRyY0F9yePOaXke2YeiJ3gR4zQx33py9ibYY7wadf31aPmrlfQQ7f78luESeABe%2BbBLyYvEOEqwbbBK3hl6SofTyyylnkxv0WpWNOhw1YVFYG24QQY9NzAydcUgmBGGl8%2B%2FIdMXJHcteB%2BQ9bm9AtoX%2FG8radQ%2FTeXLVDi6eYCHrmH3A6SNvetVi1B%2BTZzWoB4SlaRwRnh9ErJazbWnbaab%2BKaJXudTp4UnNc0ziT4GvzKUmdHCjFdmFAMxOcn7sUiCBPLPWiDKcQ9s2rtbAadiQrWLE0mN2Ldj4gT1ftDD0xvogAdde%2FDyLOf%2F%2FMxnohMx8n3Q69pmZsO1jyW6j3X4OZSs1nABVAWatFUk6oPxTXD3xtouHYR%2FaJCItgqhE1QzCcM%2FWgw0Ziqg1Zoeb0tT%2BTxCOFde0cFzGuySWxaPInd8s%2BBhbdnQgQqNMvo74xoh7vd7crxiiKfHxV4j6PpDqt7zttacUScuegawFF5ilcvuGZ9x6fBZzZlIvVFtY7B6uOOLPTZXMJDHwskGOqUB3LMri0ngxfoow1DNi6JsV8G9TtmiTEBFPYHqtufyRXOo1Cnc47zoUR2JFbmM4RLrML4LMc6MoMJvtvO%2FPJ%2B3nM3udZNGjM2XrGdCtjUr51qb%2BAdP%2FzxSpH67H5gKNphB6m%2BT5PZh3P4vKBCCTqa2FCR2GdJWr3oAY6nCsoq0UWb0njaF%2B2bHLG7VUMyvyiCrqCDMfGfHw9gG%2FKXp0QttiVE3Atmn&X-Amz-Signature=48bf68d610189d77ead2bdd7160376dfd835c078405ef077f30e0a7d3d2adae3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJDVELGK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIHFXdQWADyhh9kgfr1h2tALTLNHFVaIIXzy2NPDLicAPAiEA0xA%2F2IMFnFOW45YQXgP78oXMN7vPJTHlqYilGyVaLJEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDJB0%2B8ki7c0VDsExaCrcA84h8vPvVmFDzMSLO0Jb%2BP4r0a9nNIt6CPJ0N84Vy%2BXK9HfLIrlrl07%2F0cSBzsd%2BUYJUyOplF7hXsR84ANmcBEylb2qctlaeld0mM3q0Ogy4nx7lFYAM1OBlKB8vT51UMCMyeDf5RzVYeRMFlPNxefuYhhjQFXI2ZlILJBJavX%2F40olBBK83zDiFmE0QT78aS8oJ%2BDSb2f1EXCjXABjC2%2BKvtVrr%2FBo3laWWceXBQinlQdT9XWgarrUsKruq%2FBIxh15iHyYfLC3QjWqL3re4gWq0SlShaelxvNjteAY3ObHyk4qEhj6xNqd7NLbmiflb4H7rLJ28PN6MydgBrwWRHmhVzn4CWYjRXlEcURMVi1CxDb5m%2FfumyaQJISbwagvAQYv9KX46s8lRhXAHhcDdwfQN0D%2Fujpcs8iCz8KwxmrwNsV660p0pPf6%2B9M6KAVlQhrSZ8i0p7ObLsl1p1RZzmYFoKSivQl%2FdFbaI8k70VFNDt8m7s6Zxr5Um%2BRuYNV8veeJoUqA%2BoUngEcOvf2zu%2B8iG2%2BWKcTQiDTv4mXR%2FfmNhKhtcZ57iwLH7M1dyYaW6lp5FCzE%2Bn9k6XL1Es%2BHhXmgNPkXb4kwYW15W1MKeKI56apyNKpW%2FRdVguiOWMNzGwskGOqUBYAAlVbWhDp7aFtBoapHEpjQIvGVyvjQsRWwGWol2LEqrPUF4DvK0BMf6YrCFZ5hgNlI6%2F6nMBc774nYoPdZUx2gHfEtUddsMxyq09ts0%2F5ULSBW5KzzVpTS3pjJb1c0IHjWhqNoC%2Ft%2FpcB0hQ%2BGFHAMP%2BrUsVJXIwKrPMjWtDDJkek8%2B3PPnt6h85a9CAFUtjuyEklcyfuCsKMA2Az8uyvV2icpA&X-Amz-Signature=398db1c49f38bb98562da69f8b602474ac5c4fb7b9871760685e65d98ae6ff4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJDVELGK%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIHFXdQWADyhh9kgfr1h2tALTLNHFVaIIXzy2NPDLicAPAiEA0xA%2F2IMFnFOW45YQXgP78oXMN7vPJTHlqYilGyVaLJEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDJB0%2B8ki7c0VDsExaCrcA84h8vPvVmFDzMSLO0Jb%2BP4r0a9nNIt6CPJ0N84Vy%2BXK9HfLIrlrl07%2F0cSBzsd%2BUYJUyOplF7hXsR84ANmcBEylb2qctlaeld0mM3q0Ogy4nx7lFYAM1OBlKB8vT51UMCMyeDf5RzVYeRMFlPNxefuYhhjQFXI2ZlILJBJavX%2F40olBBK83zDiFmE0QT78aS8oJ%2BDSb2f1EXCjXABjC2%2BKvtVrr%2FBo3laWWceXBQinlQdT9XWgarrUsKruq%2FBIxh15iHyYfLC3QjWqL3re4gWq0SlShaelxvNjteAY3ObHyk4qEhj6xNqd7NLbmiflb4H7rLJ28PN6MydgBrwWRHmhVzn4CWYjRXlEcURMVi1CxDb5m%2FfumyaQJISbwagvAQYv9KX46s8lRhXAHhcDdwfQN0D%2Fujpcs8iCz8KwxmrwNsV660p0pPf6%2B9M6KAVlQhrSZ8i0p7ObLsl1p1RZzmYFoKSivQl%2FdFbaI8k70VFNDt8m7s6Zxr5Um%2BRuYNV8veeJoUqA%2BoUngEcOvf2zu%2B8iG2%2BWKcTQiDTv4mXR%2FfmNhKhtcZ57iwLH7M1dyYaW6lp5FCzE%2Bn9k6XL1Es%2BHhXmgNPkXb4kwYW15W1MKeKI56apyNKpW%2FRdVguiOWMNzGwskGOqUBYAAlVbWhDp7aFtBoapHEpjQIvGVyvjQsRWwGWol2LEqrPUF4DvK0BMf6YrCFZ5hgNlI6%2F6nMBc774nYoPdZUx2gHfEtUddsMxyq09ts0%2F5ULSBW5KzzVpTS3pjJb1c0IHjWhqNoC%2Ft%2FpcB0hQ%2BGFHAMP%2BrUsVJXIwKrPMjWtDDJkek8%2B3PPnt6h85a9CAFUtjuyEklcyfuCsKMA2Az8uyvV2icpA&X-Amz-Signature=398db1c49f38bb98562da69f8b602474ac5c4fb7b9871760685e65d98ae6ff4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPYNBWEZ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFOsihOlON6RG24Osa7ydCGg8wkN9IcuN8AfnyIQegg4AiARhE5aqdEEXpeqcClvV7K6imH8SwDE2ibMU4EG3vKsLSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMcszp8UrBOnV5YW56KtwDf8VupkebLSRM9FD8J8GRvvhNrNVqF8lHWJ%2FWaxvwOzLAZE0JeSWSkqPrHj5mtsBi2f5FcwdxH3KO%2F8QzM1NSc5%2FWf75RprsFKZZoFJ2tasTq7h45G9tiLftVo9%2FXvqFGxkSg%2FHQEB%2FpPYH%2FPbONFd8QBtx4S3yVNz4lkOSrRUpHprElS29kWASehcO3l0CV6Cf8GvVScNV%2F%2FMA0J24WUtsDj0aEKSKvQULJFVf8HfZGaJhFu2onRqLARXuj0XY0ZKc%2FtQ1IuhKb40i2jXxD84d%2FtI%2BNIciBqBGie5Oz3NHvNsX0oTaVPnT4EvSqPtYjYGQM9VZ0Tc4BNNlLIu0hpLHFaEdl9MV9eAmR8TAC2a5g3sdK1hpEy6RMo3C1Mlh1ZGn1wrQJ0jltP7DdExaaifjm6c%2FMx79O8Dz774EmTyDhGE1y%2BUuUerdh1ClLeESCq0o1wMW7CXejShXOZAIjIllHSgBYMemT%2BbIjUnfbStbUJKQ8EKZkPolt7ACorzEFxOyvNamyv8jwac%2B6Ql0pJFsPfpMtuzi2EOwCjX1dLKoFiZ6YWZV3P86D4E739Sf5YEBK%2B6UoLSW5Kf%2FhH6J38JBJtXvMMdhtxfdovccJgPKNnET%2FLtKLB8GHuVf0wp8bCyQY6pgHeg8eJdlN9dnOW%2FZG7T8DSJSz6ms266hrKshEAsO%2BVeMJfhzsCHXix2sF0vSRL7PVbzrSgjYW9RrbzvOwoTVZbxWZCo1O5D0KGDksD0px7uTSCv%2BgNDIATjjJBRGdvcUZ4z2cV2zSJcfLJWQdnTexnhz58%2FAVn6rDizkP%2FEBHLOjSgGoPHEw%2FKHdlpcA%2BtYm3sEJSuDbv6l8ezOCXQAv1Y3VJbXugv&X-Amz-Signature=d3298439b61548d934c876d3e778459c6c433a952adfac647026875f689c939f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QFFULJI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCID3b7YoFy6QPhF%2FzhQ1%2B3PY7i62M4nXILeGl9KOWYOPDAiBFrSa6fATRsxoJ0LVN7IXgH9MTlGpYvsjoZoVJMO0fGir%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIM6cAawKh2wXZ9GFcSKtwD6vqzgd08dxjOTsQ7ZTz2Gv9q0OTm2RttQkxLEnzEavjaVnUKkkGMB%2BRjbxlu%2BQ1D6ZM6orY5XoDqhMh237gf41891VNcLnjMDQU0P42wrRfdQlbIDnAHLDDM6NSTerZ4587Bb5GrkKiEbaPEZSpTo3mHj7frD760K%2BIPc5SRMFd%2B6dJC%2Fg5Qs57hUUTS8H3Ez8uAjRpONngbOBTYeJCAYi8YmI3DFdonAavc1f6yDLrIXZtaX3nwl0KeVYL7kV%2Fpx5YtedE6ueZBUfoRz%2FB4cgCXMydVC%2F1Z2MetKboZaNvF0Eo5WhS6oY1QWvgFHcrI5Og4hkdhDly1e1YXzC%2FbhzxHGft6ptPO8EyFdrlRZY3t1jrjrByIIHUhjHNlInNtzQxo%2Fz7kpjO2fGVmcShsP%2FbHgoZocvttmX8AmNZ3hwNmxX8zhsLQH1eqLLkGvWSZ8iTGLjnUB5HF41wXLsgyrF0FwWprcMEJw1n%2FIB35Q1%2Fv3MrtNjiD%2FOvTk%2BmJZQIeNvgRsK8VA%2FilQBOgAeBXDC%2BcrIVSi6M0d%2FfvheRWq6HYIMQ66ghu0LtoRrAx5%2FKVg8pV%2B0bmYQzB%2FIXfiVCDVuTyy4%2FqKVtz9%2B2btbO8l3agrl65ZL883K0HZ5UwqcfCyQY6pgG5fGLg0C2Pe0ssSLaw5gZLr%2FaIjrjwl6iDNLhN6RovNCdEMF2yLwPRcbUo%2F69yWxP%2BkPsM7gk4Pmvo%2Fk5ruJYjPDj7G75F1cttYJR3GrSexaPOMwXFXmYcvZ0HJaPdgWrCcHrFKcDBqwKKGAvfN9Dvs3mB4kUhxo1U%2Fvxqxt2wJzXwykxwG09l7GyrYW7JecOrqMC%2FjgmM0neRUxpC4Yshpuou%2BKeu&X-Amz-Signature=1e0cf805d4a27fccc58c3e0ed41d62768b25e9bff26b1e6b0b30b50e8054e109&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QFFULJI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T210116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCID3b7YoFy6QPhF%2FzhQ1%2B3PY7i62M4nXILeGl9KOWYOPDAiBFrSa6fATRsxoJ0LVN7IXgH9MTlGpYvsjoZoVJMO0fGir%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIM6cAawKh2wXZ9GFcSKtwD6vqzgd08dxjOTsQ7ZTz2Gv9q0OTm2RttQkxLEnzEavjaVnUKkkGMB%2BRjbxlu%2BQ1D6ZM6orY5XoDqhMh237gf41891VNcLnjMDQU0P42wrRfdQlbIDnAHLDDM6NSTerZ4587Bb5GrkKiEbaPEZSpTo3mHj7frD760K%2BIPc5SRMFd%2B6dJC%2Fg5Qs57hUUTS8H3Ez8uAjRpONngbOBTYeJCAYi8YmI3DFdonAavc1f6yDLrIXZtaX3nwl0KeVYL7kV%2Fpx5YtedE6ueZBUfoRz%2FB4cgCXMydVC%2F1Z2MetKboZaNvF0Eo5WhS6oY1QWvgFHcrI5Og4hkdhDly1e1YXzC%2FbhzxHGft6ptPO8EyFdrlRZY3t1jrjrByIIHUhjHNlInNtzQxo%2Fz7kpjO2fGVmcShsP%2FbHgoZocvttmX8AmNZ3hwNmxX8zhsLQH1eqLLkGvWSZ8iTGLjnUB5HF41wXLsgyrF0FwWprcMEJw1n%2FIB35Q1%2Fv3MrtNjiD%2FOvTk%2BmJZQIeNvgRsK8VA%2FilQBOgAeBXDC%2BcrIVSi6M0d%2FfvheRWq6HYIMQ66ghu0LtoRrAx5%2FKVg8pV%2B0bmYQzB%2FIXfiVCDVuTyy4%2FqKVtz9%2B2btbO8l3agrl65ZL883K0HZ5UwqcfCyQY6pgG5fGLg0C2Pe0ssSLaw5gZLr%2FaIjrjwl6iDNLhN6RovNCdEMF2yLwPRcbUo%2F69yWxP%2BkPsM7gk4Pmvo%2Fk5ruJYjPDj7G75F1cttYJR3GrSexaPOMwXFXmYcvZ0HJaPdgWrCcHrFKcDBqwKKGAvfN9Dvs3mB4kUhxo1U%2Fvxqxt2wJzXwykxwG09l7GyrYW7JecOrqMC%2FjgmM0neRUxpC4Yshpuou%2BKeu&X-Amz-Signature=1e0cf805d4a27fccc58c3e0ed41d62768b25e9bff26b1e6b0b30b50e8054e109&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

